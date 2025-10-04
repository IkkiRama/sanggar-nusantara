<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Services\MidtransService;


use App\Models\Discount;
use App\Models\DiscountUser;
use App\Models\Order;
use App\Models\PembelianEvent;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Midtrans\Snap;
use Midtrans\Config;
use Midtrans\Transaction;
use Illuminate\Support\Facades\Log;


class TransaksiController extends Controller
{

    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    function showDiskonAPI(Request $request) {

        $userId = auth()->id(); // Ambil ID user yang login
        $totalBiaya = $request->totalBiaya;
        $kodeDiskon = $request->kodeDiskon;


        // Cari diskon berdasarkan kode
        $diskon = Discount::where('code', $kodeDiskon)->first();

        // Jika diskon tidak ditemukan
        if (!$diskon) {
            return response()->json(['message' => 'Kode diskon tidak ditemukan'], 404);
        }

        // Cek apakah diskon sudah kadaluarsa
        if (now() > $diskon->end_date) {
            return response()->json(['message' => 'Diskon sudah kadaluarsa'], 400);
        }

        // Cek apakah batas penggunaan diskon sudah habis
        if (!is_null($diskon->usage_limit) && $diskon->usage_count >= $diskon->usage_limit) {
            return response()->json(['message' => 'Kuota penggunaan diskon sudah habis'], 400);
        }

        // Cek apakah pengguna sudah pernah menggunakan diskon ini
        $penggunaanDiskon = DiscountUser::where('user_id', $userId)
            ->where('discount_id', $diskon->id)
            ->count();

        if ($penggunaanDiskon > 0) {
            return response()->json(['message' => 'Anda sudah pernah menggunakan diskon ini'], 400);
        }

        // Cek apakah minimal pembelian terpenuhi
        if (!is_null($diskon->min_purchase) && $totalBiaya < $diskon->min_purchase) {
            return response()->json([
                'message' => 'Diskon tidak berlaku karena total belanja di bawah Rp '. number_format($diskon->min_purchase),
                'min_purchase' => $diskon->min_purchase
            ], 400);
        }

        // Hitung nilai diskon
        $nilaiDiskon = 0;
        if ($diskon->type === 'percentage') {
            $nilaiDiskon = ($diskon->amount / 100) * $totalBiaya;
            if (!is_null($diskon->max_discount) && $nilaiDiskon > $diskon->max_discount) {
                $nilaiDiskon = $diskon->max_discount;
            }
        } elseif ($diskon->type === 'fixed') {
            $nilaiDiskon = $diskon->amount;
        }

        // Pastikan nilai diskon tidak melebihi total biaya
        if ($nilaiDiskon > $totalBiaya) {
            $nilaiDiskon = $totalBiaya;
        }

        // Response jika diskon valid
        return response()->json([
            'message' => 'Diskon berhasil diterapkan',
            'diskon' => [
                'id' => $diskon->id,
                'name' => $diskon->name,
                'type' => $diskon->type,
                'amount' => $diskon->amount,
                'nilai_diskon' => $nilaiDiskon,
                'total_setelah_diskon' => $totalBiaya - $nilaiDiskon
            ]
        ], 200);
    }

    public function storeOrderAPI(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'discount_id' => 'nullable|exists:discounts,id',
            'total_pembelian' => 'required|numeric',
            'discount_amount' => 'nullable|numeric',
            'total_akhir' => 'required|numeric',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.item_type' => 'required|string|in:subscription,event',
            'items.*.jumlah' => 'required|integer|min:1',
            'items.*.nama' => 'required|string',
            'items.*.harga' => 'required|numeric',
            'items.*.subtotal' => 'required|numeric',
            'items.*.variasi' => 'nullable|string'
        ]);

        return DB::transaction(function () use ($request) {
            $discountId = $request->discount_amount > 0 ? $request->discount_id : null;

            // Handle diskon
            if ($discountId) {
                $discount = Discount::lockForUpdate()->find($discountId);
                if ($discount) {
                    $discount->increment('usage_count');
                    DiscountUser::create([
                        'discount_id' => $discount->id,
                        'user_id' => $request->user_id,
                    ]);
                } else {
                    $discountId = null;
                }
            }

            // Buat order
            $order = Order::create([
                'user_id' => $request->user_id,
                'discount_id' => $discountId,
                'total_pembelian' => $request->total_pembelian,
                'discount_amount' => $request->discount_amount ?? 0,
                'total_akhir' => $request->total_akhir,
                'status_pembelian' => 'pending',
                'order_id' => Str::uuid(),
                'metode_pembayaran' => 'midtrans',
            ]);

            $itemDetails = [];
            foreach ($request->items as $item) {
                if ($item['item_type'] === 'event') {
                    // Kurangi kuota event
                    $hargaEvent = DB::table('harga_events')
                        ->where([
                            ['event_id', '=', $item['id']],
                            ['nama', '=', $item['variasi']],
                        ])
                        ->lockForUpdate()
                        ->first();

                    if (!$hargaEvent || $hargaEvent->kuota < $item['jumlah']) {
                        return response()->json(['message' => 'Kuota tiket tidak mencukupi'], 400);
                    }

                    // Tambah pembelian event
                    PembelianEvent::create([
                        'event_id' => $item['id'],
                        'order_id' => $order->id,
                        'jumlah_tiket' => $item['jumlah'],
                        'jenis_tiket' => $item['variasi'],
                        'nama' => $item['nama'],
                        'harga' => $item['harga'],
                        'total_harga' => $item['subtotal'],
                        'tanggal' => now(),
                    ]);

                    $itemDetails[] = [
                        'id' => $item['id'],
                        'price' => (float) $item['harga'],
                        'quantity' => $item['jumlah'],
                        'name' => $item['nama'],
                    ];

                } elseif ($item['item_type'] === 'subscription') {
                    if (!Auth::user()->hasRole('super_admin')) {
                        // Cek apakah user sudah punya subscription aktif
                        $existingActiveSubscription = Subscription::where('user_id', $request->user_id)
                            ->where('status', 'aktif')
                            ->where('plan_id', $item['id'])
                            ->first();

                        if ($existingActiveSubscription) {
                            return response()->json([
                                'message' => 'Kamu sudah memiliki langganan yang aktif untuk paket ini.'
                            ], 400);
                        }
                    }

                    // Insert ke subscriptions
                    $plan = Plan::find($item['id']);
                    if (!$plan) {
                        return response()->json(['message' => 'Paket langganan tidak ditemukan'], 400);
                    }

                    Subscription::create([
                        'user_id' => $request->user_id,
                        'plan_id' => $plan->id,
                        'status' => 'cancelled',
                        'payment_status' => 'pending',
                        'transaction_id' => $order->order_id,
                    ]);

                    $itemDetails[] = [
                        'id' => $item['id'],
                        'price' => (float) $item['harga'],
                        'quantity' => 1,
                        'name' => $item['nama'],
                    ];
                }
            }

            // Tambah pajak dan biaya layanan
            $pajak = 0.11 * $request->total_pembelian;
            $biayaLayanan = 15000;
            $diskon = $request->discount_amount ?? 0;

            $itemDetails[] = [
                'id' => 'PAJAK',
                'price' => (float) $pajak,
                'quantity' => 1,
                'name' => 'Pajak (11%)'
            ];

            $itemDetails[] = [
                'id' => 'BIAYA_LAYANAN',
                'price' => (float) $biayaLayanan,
                'quantity' => 1,
                'name' => 'Biaya Layanan'
            ];

            if ($diskon > 0) {
                $itemDetails[] = [
                    'id' => 'DISKON',
                    'price' => - (float) $diskon,
                    'quantity' => 1,
                    'name' => 'Diskon'
                ];
            }

            // Hitung ulang total
            $totalAkhirDihitung = array_sum(array_column($itemDetails, 'price'));

            // Buat Snap Token
            $payload = [
                'transaction_details' => [
                    'order_id' => $order->order_id,
                    'gross_amount' => (float) $totalAkhirDihitung,
                ],
                'customer_details' => [
                    'user_id' => $request->user_id,
                ],
                'item_details' => $itemDetails,
                'callbacks' => [
                    'finish' => url("/payment-status/{$order->order_id}"),
                ],
            ];

            try {
                $snapToken = Snap::getSnapToken($payload);

                // Hapus cart user setelah sukses membuat snap token
                \App\Models\Cart::where('user_id', $request->user_id)->delete();

                return response()->json([
                    'snap_token' => $snapToken,
                    'order_id' => $order->order_id,
                ], 201);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Gagal membuat transaksi', 'error' => $e->getMessage()], 500);
            }
        });
    }



    public function updateTransaction(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        $signatureKey = $request->signature_key;
        $orderId = $request->order_id;
        $transactionStatus = $request->transaction_status;
        $fraudStatus = $request->fraud_status;

        $calculatedSignature = hash("sha512", $orderId . $request->status_code . $request->gross_amount . $serverKey);
        if ($signatureKey !== $calculatedSignature) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $order = Order::where('order_id', $orderId)->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        DB::transaction(function () use ($order, $transactionStatus, $fraudStatus, $request) {
            $updateData = [
                'transaction_id' => $request->transaction_id ?? $order->transaction_id,
                'midtrans_response' => json_encode($request->all()),
            ];

            if (!empty($request->payment_url)) {
                $updateData['payment_url'] = $request->payment_url;
            }

            if ($transactionStatus == 'capture' && $fraudStatus == 'accept') {
                $updateData['status_pembelian'] = 'sudah dibayar';
            } elseif ($transactionStatus == 'settlement') {
                $updateData['status_pembelian'] = 'sudah dibayar';
            } elseif ($transactionStatus == 'pending') {
                $updateData['status_pembelian'] = 'pending';
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
                $updateData['status_pembelian'] = 'gagal';
            } elseif ($transactionStatus == 'refund') {
                $updateData['status_pembelian'] = 'dikembalikan';
            }

            $order->update($updateData);
        });

        return response()->json(['message' => 'Transaction status updated']);
    }


    public function paymentSuccess($orderId)
    {
        $order = Order::where('order_id', $orderId)->firstOrFail();

        try {
            // Ambil status dari Midtrans via MidtransService
            $paymentStatus = $this->midtrans->getTransactionStatus($orderId);
            $transactionStatus = $paymentStatus['transaction_status'] ?? null;
            $transactionId = $paymentStatus['transaction_id'] ?? null;

            if (!$transactionStatus || !$transactionId) {
                abort(500, "Format respons dari Midtrans tidak valid.");
            }

            // Kalau belum settlement, redirect ke halaman menunggu pembayaran
            if (!in_array($transactionStatus, ['settlement', 'capture'])) {
                return Inertia::render('WaitingPage', [
                    'status' => $transactionStatus,
                    'order' => $order,
                    'user' => $user = Auth::user(),
                    'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
                ]);
            }

            // Kalau order sudah terbayar, pastikan status up-to-date
            if ($order->status_pembelian !== 'sudah dibayar') {
                DB::beginTransaction();
                try {
                    $order->update([
                        'status_pembelian' => 'sudah dibayar',
                        'transaction_id' => $transactionId,
                    ]);

                    // Update kuota tiket (kalau ada event)
                    $tickets = DB::table('pembelian_events')
                        ->where('order_id', $order->id)
                        ->get();

                    foreach ($tickets as $ticket) {
                        $hargaEvent = DB::table('harga_events')
                            ->where([
                                ['event_id', '=', $ticket->event_id],
                                ['nama', '=', $ticket->jenis_tiket],
                            ])
                            ->lockForUpdate()
                            ->first();

                        if (!$hargaEvent || $hargaEvent->kuota < $ticket->jumlah_tiket) {
                            DB::rollBack();
                            return response()->json(['message' => 'Kuota tiket tidak mencukupi'], 400);
                        }

                        // Kurangi kuota
                        DB::table('harga_events')
                            ->where('id', $hargaEvent->id)
                            ->update(['kuota' => $hargaEvent->kuota - $ticket->jumlah_tiket]);
                    }

                    // Update status subscription (kalau beli subscription)
                    $subscription = Subscription::where('transaction_id', $order->order_id)->first();
                    if ($subscription) {
                        $plan = Plan::find($subscription->plan_id);
                        $duration = $plan ? intval($plan->durasi) : 30;

                        $user = $order->user;

                        // Cek apakah user punya subscription aktif
                        $existingActive = Subscription::where('user_id', $user->id)
                            ->where('status', 'aktif')
                            ->orderByDesc('tanggal_berakhir')
                            ->first();

                        if ($existingActive) {
                            // Extend dari tanggal_berakhir terakhir
                            $tanggalMulaiBaru = \Carbon\Carbon::parse($existingActive->tanggal_berakhir)->greaterThan(now())
                                ? \Carbon\Carbon::parse($existingActive->tanggal_berakhir)
                                : now();

                            $tanggalBerakhirBaru = $tanggalMulaiBaru->copy()->addDays($duration);

                            $subscription->update([
                                'status' => 'aktif',
                                'payment_status' => 'paid',
                                'tanggal_mulai' => $tanggalMulaiBaru,
                                'tanggal_berakhir' => $tanggalBerakhirBaru,
                            ]);
                        } else {
                            // Tidak ada yang aktif, mulai dari sekarang
                            $subscription->update([
                                'status' => 'aktif',
                                'payment_status' => 'paid',
                                'tanggal_mulai' => now(),
                                'tanggal_berakhir' => now()->addDays($duration),
                            ]);
                        }

                        // Ubah role ke premium, kecuali super_admin
                        if (!$user->hasRole('super_admin') && $user && !$user->hasRole('premium')) {
                            $user->syncRoles(['premium']);
                        }
                    }

                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json(['message' => 'Terjadi kesalahan saat memproses: ' . $e->getMessage()], 500);
                }
            }

            return Inertia::render('SuccessPage', [
                'order' => $order,
                'user' => $user = Auth::user(),
                'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil status pembayaran: ' . $e->getMessage()], 500);
        }
    }


}

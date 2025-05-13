<?php

namespace App\Http\Controllers;

use App\Services\MidtransService;


use App\Models\Discount;
use App\Models\DiscountUser;
use App\Models\Order;
use App\Models\PembelianEvent;
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
                'message' => 'Total belanja belum memenuhi syarat minimal pembelian untuk diskon ini',
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
            'tickets' => 'required|array',
            'tickets.*.event_id' => 'required|exists:events,id',
            'tickets.*.jumlah_tiket' => 'required|integer|min:1',
            'tickets.*.jenis_tiket' => 'required|string',
            'tickets.*.nama_event' => 'required|string',
            'tickets.*.harga' => 'required|numeric',
            'tickets.*.total_harga' => 'required|numeric',
        ]);

        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        return DB::transaction(function () use ($request) {
            $discountId = $request->discount_amount > 0 ? $request->discount_id : null;

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

            foreach ($request->tickets as $ticket) {
                // Kurangi kuota tiket di harga_events
                $hargaEvent = DB::table('harga_events')
                            ->where([
                                ['event_id', '=', $ticket['event_id']],
                                ['nama', '=', $ticket['jenis_tiket']],
                            ])
                            ->lockForUpdate()
                            ->first();

                if ($hargaEvent && $hargaEvent->kuota >= $ticket['jumlah_tiket']) {

                    PembelianEvent::create([
                        'event_id' => $ticket['event_id'],
                        'order_id' => $order->id,
                        'jumlah_tiket' => $ticket['jumlah_tiket'],
                        'jenis_tiket' => $ticket['jenis_tiket'],
                        'nama' => $ticket['nama_event'],
                        'harga' => $ticket['harga'],
                        'total_harga' => $ticket['total_harga'],
                        'tanggal' => now(),
                    ]);

                } else {
                    return response()->json(['message' => 'Kuota tiket tidak mencukupi'], 400);
                }
            }

            $itemDetails = array_map(function ($ticket) {
                return [
                    'id' => $ticket['event_id'],
                    'price' => (float) $ticket['harga'],
                    'quantity' => $ticket['jumlah_tiket'],
                    'name' => $ticket['nama_event'],
                ];
            }, $request->tickets);

            // Tambahkan pajak dan biaya layanan
            $pajak = 11/100 * $request->total_pembelian;
            $biayaLayanan = 15000;
            $diskon = $request->discount_amount ?? 0;

            $itemDetails[] = [
                'id' => 'PAJAK',
                'price' => (float) $pajak,
                'quantity' => 1,
                'name' => 'Pajak (10%)'
            ];

            $itemDetails[] = [
                'id' => 'BIAYA_LAYANAN',
                'price' => (float) $biayaLayanan,
                'quantity' => 1,
                'name' => 'Biaya Layanan'
            ];

            $itemDetails[] = [
                'id' => 'DISKON',
                'price' => - (float) $diskon,
                'quantity' => 1,
                'name' => 'Diskon'
            ];

            // Pastikan totalnya sesuai dengan total_akhir
            $totalAkhirDihitung = array_sum(array_column($itemDetails, 'price'));

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
                return response()->json([
                    'snap_token' => $snapToken,
                    'order_id' => $order->order_id,
                ], 201);
            } catch (Exception $e) {
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
            // Ambil status dari Midtrans melalui service
            $paymentStatus = $this->midtrans->getTransactionStatus($orderId);

            $transactionStatus = $paymentStatus['transaction_status'] ?? null;
            $transactionId = $paymentStatus['transaction_id'] ?? null;

            if (!$transactionStatus || !$transactionId) {
                abort(500, "Format respons dari Midtrans tidak valid.");
            }

            // Jika status pembayaran belum berhasil, arahkan ke halaman menunggu pembayaran
            if (!in_array($transactionStatus, ['settlement', 'capture'])) {
                return Inertia::render('WaitingPage', [
                    'status' => $transactionStatus,
                    'order' => $order,
                    'user' => Auth::user()
                ]);
            }

            // Kalau status sudah dibayar tapi belum update di DB
            if ($order->status_pembelian !== 'sudah dibayar') {
                DB::beginTransaction();

                try {
                    $order->update([
                        "status_pembelian" => "sudah dibayar",
                        "transaction_id" => $transactionId,
                    ]);

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

                        // Update kuota
                        DB::table('harga_events')
                            ->where('id', $hargaEvent->id)
                            ->update(['kuota' => $hargaEvent->kuota - $ticket->jumlah_tiket]);
                    }

                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json(['message' => 'Terjadi kesalahan saat memproses tiket: ' . $e->getMessage()], 500);
                }
            }

            return Inertia::render('SuccessPage', [
                'order' => $order,
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil status pembayaran: ' . $e->getMessage()], 500);
        }
    }

    function subscription() {
        return Inertia::render('Subscription', [
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

}

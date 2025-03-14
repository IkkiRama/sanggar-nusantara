<?php

namespace App\Http\Controllers;

use App\Models\AlatMusik;
use App\Models\Artikel;
use App\Models\BahasaDaerah;
use App\Models\Discount;
use App\Models\DiscountUser;
use App\Models\Event;
use App\Models\Komentar;
use App\Models\LaguDaerah;
use App\Models\MakananKhas;
use App\Models\Order;
use App\Models\PembelianEvent;
use App\Models\RumahAdat;
use App\Models\SeniTari;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Midtrans\Snap;
use Midtrans\Config;
use Midtrans\Transaction;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

Config::$serverKey = config('services.midtrans.server_key');
Config::$isProduction = config('services.midtrans.is_production');
Config::$isSanitized = true;
Config::$is3ds = true;
class FrontController extends Controller
{
    public function index()
    {

        // Ambil event mendatang
        $events = Event::select("kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal")
            ->where('tanggal', '>=', now())
            ->where('status_event', '!=', 'draft')
            ->orderBy('tanggal', 'asc')
            ->take(3)
            ->withoutTrashed()
            ->get();

        // Jika tidak ada event mendatang, ambil 3 event terakhir yang sudah lewat
        if ($events->isEmpty()) {
            $events = Event::select("kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal")
                ->where('tanggal', '<', now())
                ->where('status_event', '!=', 'draft')
                ->orderBy('tanggal', 'desc')
                ->take(3)
                ->withoutTrashed()
                ->get();
        }

        $artikels = Artikel::select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id", "status_artikel")
            ->withoutTrashed()
            ->where('status_artikel', '!=', 'draft')
            ->with(["kategori:id,nama", "user:id,name"])
            ->where("status_artikel", '!=', "draft")
            ->orderBy('created_at', 'desc')
            ->limit(4)->get();

        return Inertia::render('Home', [
            'events' => $events,
            'artikels' => $artikels,
            'user' => Auth::user(),
        ]);
    }


    public function event(Request $request)
    {
        $perPage = 10;
        $page = $request->query('page', 1);
        $skip = ($page - 1) * $perPage;
        $today = now()->format('Y-m-d');
        $selectedFilter = $request->query('selectedFilter', null);
        $searchQuery = $request->query('searchQuery', null);

        $query = Event::select(
                "kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal",
                DB::raw("(SELECT MIN(harga) FROM harga_events WHERE harga_events.event_id = events.id) as harga_terendah")
            )
            ->where('status_event', '!=', 'draft');

        if (!empty($searchQuery)) {
            $query->where('nama', 'like', '%' . $searchQuery . '%');
        }

        $totalEvents = $query->count();
        $totalPages = ceil($totalEvents / $perPage);

        $events = $query->orderBy('tanggal', 'asc')
            ->skip($skip)
            ->take($perPage)
            ->withoutTrashed()
            ->get()
            ->map(function ($event) use ($today) {
                $event->status = ($event->tanggal < $today) ? "Event Sudah Berakhir" : "Pendaftaran Masih Dibuka";
                return $event;
            });

        if ($request->wantsJson()) {
            return response()->json([
                'events' => $events,
                'totalPages' => $totalPages,
                'user' => Auth::user(),
            ]);
        }

        return Inertia::render('Event', [
            'events' => $events,
            'totalPages' => $totalPages,
            'user' => Auth::user(),
        ]);
    }



    function showEvent($slug) {
        $event = Event::where('slug', $slug)->firstOrFail();

        // Ambil event yang masih akan datang
        $events = Event::where('tanggal', '>=', now())
            ->inRandomOrder()
            ->take(3)
            ->withoutTrashed()
            ->get();

        // Jika tidak ada event yang akan datang, ambil secara acak dari semua event
        if ($events->isEmpty()) {
            $events = Event::inRandomOrder()
                ->take(3)
                ->withoutTrashed()
                ->get();
        }


        // Ambil daftar harga event yang bersangkutan
        $hargaTiket = DB::table('harga_events')
            ->where('event_id', $event->id)
            ->select('id', 'nama', 'harga', 'kuota', 'deskripsi', 'tanggal_mulai', 'tanggal_selesai')
            ->get();

        return Inertia::render('DetailEvent', [
            'event' => $event,
            'hargaTiket' => $hargaTiket,
            'events' => $events,
            'user' => Auth::user(),
        ]);
    }


    function artikel() {

        // Hitung tanggal satu bulan ke belakang
        $oneMonthAgo = Carbon::now()->subMonth();

        // Query untuk artikel trending dalam 1 bulan terakhir berdasarkan views tertinggi
        $trendingArtikel = Artikel::select('title', 'slug', 'image', 'status_artikel')
            ->where('status_artikel', '!=', 'draft')
            ->where('published_at', '>=', $oneMonthAgo)
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

        // Query untuk artikel umum
        $dataArtikel = Artikel::select('title', 'views', 'slug', 'image', 'excerpt', 'published_at', 'user_id', 'kategori_id', 'status_artikel')
            ->where('status_artikel', '!=', 'draft')
            ->with(['kategori:id,nama', 'user:id,name'])
            ->orderBy('created_at', 'desc')
            ->get();

        $artikelRekomendasi = Artikel::select('title', "slug", "image", "status_artikel")
            ->where('status_artikel', '!=', 'draft')
            ->withoutTrashed()
            ->inRandomOrder()
            ->limit(5)
            ->get();

        return Inertia::render('Artikel', [
            'artikelTerbaru' => $dataArtikel->first(), // 1 artikel terbaru
            'artikelBerikutnya' => $dataArtikel->slice(1, 2)->values(), // 2 artikel berikutnya
            'artikels' => $dataArtikel->slice(3)->values(), // Sisa artikel dipaginasi
            'trendingArtikel' => $trendingArtikel, // Tambahkan trending artikel
            'artikelRekomendasi' => $artikelRekomendasi, // Tambahkan trending artikel
            'user' => Auth::user(),
        ]);
    }

    function showArtikel($slug) {
        $artikel = Artikel::where([
            ["slug", $slug],
            ["status_artikel", "!=", "draft"]
        ])
        ->withoutTrashed()
        ->with(["kategori:id,nama", "user:id,name,image,deskripsi", "komentar:id,artikel_id,nama,email,komentar"])
        ->firstOrFail();

        $rekomendasiArtikel = Artikel::
            select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id")
            ->withoutTrashed()
            ->where('status_artikel', '!=', 'draft')
            ->inRandomOrder()
            ->with("kategori:id,nama", "user:id,name")
            ->limit(3) // Batasi jumlah artikel
            ->get();

        $newViews = $artikel->views + 1;
        $artikel->update([
            "views" => $newViews
        ]);

        return Inertia::render('Detail', [
            'artikel' => $artikel,
            'rekomendasiArtikel' => $rekomendasiArtikel,
            'user' => Auth::user(),
        ]);
    }

    public function storeKomenAPI(Request $request)
    {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        $validated = $request->validate([
            'artikel_id'  => 'required',
            'nama'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'komentar' => 'required|string',
        ]);

        // Simpan data ke dalam database
        $contact = Komentar::create($validated);

        // Kembalikan response
        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil disimpan.',
            'data'    => $contact,
        ], 201, $headers);
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
            'tickets.*.nama' => 'required|string',
            'tickets.*.harga' => 'required|numeric',
            'tickets.*.total_harga' => 'required|numeric',
        ]);

        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
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
                $hargaEvent = DB::table('harga_events')->lockForUpdate()->where('event_id', $ticket['event_id'])->first();
                if ($hargaEvent && $hargaEvent->kuota >= $ticket['jumlah_tiket']) {
                    DB::table('harga_events')
                        ->where('event_id', $ticket['event_id'])
                        ->update(['kuota' => $hargaEvent->kuota - $ticket['jumlah_tiket']]);
                } else {
                    return response()->json(['message' => 'Kuota tiket tidak mencukupi'], 400);
                }

                PembelianEvent::create([
                    'event_id' => $ticket['event_id'],
                    'order_id' => $order->id,
                    'jumlah_tiket' => $ticket['jumlah_tiket'],
                    'jenis_tiket' => $ticket['jenis_tiket'],
                    'nama' => $ticket['nama'],
                    'harga' => $ticket['harga'],
                    'total_harga' => $ticket['total_harga'],
                    'tanggal' => now(),
                ]);
            }

            $itemDetails = array_map(function ($ticket) {
                return [
                    'id' => $ticket['event_id'],
                    'price' => (float) $ticket['harga'],
                    'quantity' => $ticket['jumlah_tiket'],
                    'name' => $ticket['nama'],
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
                    'finish' => url("/payment-success/{$order->order_id}"),
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
        $serverKey = env('MIDTRANS_SERVER_KEY');
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

    function paymentSuccess($orderId) {
        $order = Order::where('order_id', $orderId)->firstOrFail(); // Kalau tidak ada, otomatis 404

        // Pastikan ServerKey sudah diset
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // Ambil status pembayaran dari Midtrans
        $paymentStatus = json_decode(json_encode(Transaction::status($orderId)), true);

        // Pastikan response valid
        if (!isset($paymentStatus['transaction_status']) || !isset($paymentStatus['transaction_id'])) {
            abort(500, "Format respons dari Midtrans tidak valid.");
        }

        // Ambil status transaksi dan transaction_id dari Midtrans
        $transactionStatus = $paymentStatus['transaction_status'];
        $transactionId = $paymentStatus['transaction_id'];

        // Hanya update kalau sudah dibayar
        if (in_array($transactionStatus, ['capture', 'settlement'])) {
            $order->update([
                "status_pembelian" => "sudah dibayar",
                "transaction_id" => $transactionId, // Simpan transaction_id Midtrans
            ]);
        } else {
            abort(403, "Pembayaran belum berhasil.");
        }

        return Inertia::render('SuccessPage', [
            'user' => Auth::user(),
            'order' => $order,
        ]);
    }




    // public function storeOrderAPI(Request $request)
    //   {


    //     $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'discount_id' => 'nullable|exists:discounts,id',
    //         'total_pembelian' => 'required|numeric',
    //         'discount_amount' => 'nullable|numeric',
    //         'total_akhir' => 'required|numeric',
    //         'tickets' => 'required|array',
    //         'tickets.*.event_id' => 'required|exists:events,id',
    //         'tickets.*.jumlah_tiket' => 'required|integer|min:1',
    //         'tickets.*.jenis_tiket' => 'required|string',
    //         'tickets.*.nama' => 'required|string',
    //         'tickets.*.harga' => 'required|numeric',
    //         'tickets.*.total_harga' => 'required|numeric',
    //     ]);

    //     Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    //     Config::$isProduction = false;
    //     Config::$isSanitized = true;
    //     Config::$is3ds = true;

    //     return DB::transaction(function () use ($request) {
    //         $discountId = $request->discount_amount > 0 ? $request->discount_id : null;

    //         if ($discountId) {
    //             $discount = Discount::lockForUpdate()->find($discountId);
    //             if ($discount) {
    //                 $discount->increment('usage_count');
    //                 DiscountUser::create([
    //                     'discount_id' => $discount->id,
    //                     'user_id' => $request->user_id,
    //                 ]);
    //             } else {
    //                 $discountId = null;
    //             }
    //         }

    //         $order = Order::create([
    //             'user_id' => $request->user_id,
    //             'discount_id' => $discountId,
    //             'total_pembelian' => $request->total_pembelian,
    //             'discount_amount' => $request->discount_amount ?? 0,
    //             'total_akhir' => $request->total_akhir,
    //             'status_pembelian' => 'pending',
    //             'order_id' => Str::uuid(),
    //             'metode_pembayaran' => 'midtrans',
    //         ]);

    //         foreach ($request->tickets as $ticket) {
    //             PembelianEvent::create([
    //                 'event_id' => $ticket['event_id'],
    //                 'order_id' => $order->id,
    //                 'jumlah_tiket' => $ticket['jumlah_tiket'],
    //                 'jenis_tiket' => $ticket['jenis_tiket'],
    //                 'nama' => $ticket['nama'],
    //                 'harga' => $ticket['harga'],
    //                 'total_harga' => $ticket['total_harga'],
    //                 'tanggal' => now(),
    //             ]);
    //         }

    //         $transaction_details = [
    //             'order_id' => $order->order_id,
    //             'gross_amount' => $request->total_akhir,
    //         ];

    //         $customer_details = [
    //             'user_id' => $request->user_id,
    //         ];

    //         $item_details = [];
    //         foreach ($request->tickets as $ticket) {
    //             $item_details[] = [
    //                 'id' => $ticket['event_id'],
    //                 'price' => $ticket['harga'],
    //                 'quantity' => $ticket['jumlah_tiket'],
    //                 'name' => $ticket['nama'],
    //             ];
    //         }

    //         $payload = [
    //             'transaction_details' => $transaction_details,
    //             'customer_details' => $customer_details,
    //             'item_details' => $item_details,
    //         ];

    //         try {
    //             $snapToken = Snap::getSnapToken($payload);
    //             return response()->json(['snap_token' => $snapToken, 'order_id' => $order->order_id], 201);
    //         } catch (Exception $e) {
    //             return response()->json(['message' => 'Gagal membuat transaksi', 'error' => $e->getMessage()], 500);
    //         }
    //     });
    // }

    // public function updateTransaction(Request $request)
    // {
    //     $serverKey = env('MIDTRANS_SERVER_KEY');
    //     $signatureKey = $request->signature_key;
    //     $orderId = $request->order_id;
    //     $transactionStatus = $request->transaction_status;
    //     $fraudStatus = $request->fraud_status;

    //     $calculatedSignature = hash("sha512", $orderId . $request->status_code . $request->gross_amount . $serverKey);
    //     if ($signatureKey !== $calculatedSignature) {
    //         return response()->json(['message' => 'Invalid signature'], 403);
    //     }

    //     $order = Order::where('order_id', $orderId)->first();
    //     if (!$order) {
    //         return response()->json(['message' => 'Order not found'], 404);
    //     }

    //     DB::transaction(function () use ($order, $transactionStatus, $fraudStatus, $request) {
    //         if ($transactionStatus == 'capture' && $fraudStatus == 'accept') {
    //             $order->update(['status_pembelian' => 'success']);
    //         } elseif ($transactionStatus == 'settlement') {
    //             $order->update(['status_pembelian' => 'success']);
    //         } elseif ($transactionStatus == 'pending') {
    //             $order->update(['status_pembelian' => 'pending']);
    //         } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
    //             $order->update(['status_pembelian' => 'failed']);
    //         }
    //         $order->update([
    //             'transaction_id' => $request->transaction_id,
    //             'midtrans_response' => json_encode($request->all()),
    //         ]);
    //     });

    //     return response()->json(['message' => 'Transaction status updated']);
    // }


    // function storeOrderAPI(Request $request) {
    //     if (!Auth::check()) {
    //         return response()->json(['message' => 'Unauthorized, silakan login'], 401);
    //     }

    //     $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'discount_id' => 'nullable|exists:discounts,id',
    //         'total_pembelian' => 'required|numeric',
    //         'discount_amount' => 'nullable|numeric',
    //         'total_akhir' => 'required|numeric',
    //         'tickets' => 'required|array',
    //         'tickets.*.event_id' => 'required|exists:events,id',
    //         'tickets.*.jumlah_tiket' => 'required|integer|min:1',
    //         'tickets.*.jenis_tiket' => 'required|string',
    //         'tickets.*.nama' => 'required|string',
    //         'tickets.*.harga' => 'required|numeric',
    //         'tickets.*.total_harga' => 'required|numeric',
    //     ]);

    //     return DB::transaction(function () use ($request) {
    //         $discountId = $request->discount_amount > 0 ? $request->discount_id : null;
    //         // $discountId = $request->discount_amount > 0 ? ($request->discount_id ?? null) : null;

    //         if ($discountId) {
    //             $discount = Discount::lockForUpdate()->find($discountId);
    //             if ($discount) {
    //                 $discount->increment('usage_count'); // Menggunakan increment untuk menambah usage_count dengan aman
    //                 DiscountUser::create([
    //                     'discount_id' => $discount->id,
    //                     'user_id' => $request->user_id,
    //                 ]);
    //             } else {
    //                 $discountId = null; // Jika diskon tidak ditemukan, jangan gunakan diskon
    //             }
    //         }

    //         $order = Order::create([
    //             'user_id' => $request->user_id,
    //             'discount_id' => $discountId,
    //             'total_pembelian' => $request->total_pembelian,
    //             'discount_amount' => $request->discount_amount ?? 0,
    //             'total_akhir' => $request->total_akhir,
    //             'status_pembelian' => 'pending',
    //             'order_id' => Str::uuid(),
    //             'metode_pembayaran' => 'midtrans',
    //         ]);

    //         foreach ($request->tickets as $ticket) {
    //             PembelianEvent::create([
    //                 'event_id' => $ticket['event_id'],
    //                 'order_id' => $order->id,
    //                 'jumlah_tiket' => $ticket['jumlah_tiket'],
    //                 'jenis_tiket' => $ticket['jenis_tiket'],
    //                 'nama' => $ticket['nama'],
    //                 'harga' => $ticket['harga'],
    //                 'total_harga' => $ticket['total_harga'],
    //                 'tanggal' => now(),
    //             ]);
    //         }

    //         DB::commit();
    //         return response()->json(['message' => 'Pembayaran berhasil diproses', 'order_id' => $order->order_id], 201);
    //     });
    // }


    function subscription() {
        return Inertia::render('Subscription', [
            'user' => Auth::user(),
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

    function petaInteraktif() {
        $foods = MakananKhas::latest()->get();
        $alatMusik = AlatMusik::latest()->get();
        $rumahAdat = RumahAdat::latest()->get();
        $laguDaerah = LaguDaerah::latest()->get();
        $bahasaDaerah = BahasaDaerah::latest()->get();
        $seniTari = SeniTari::latest()->get();

        return Inertia::render('Map', [
            'user' => Auth::user(),
            'foods' => $foods,
            'alatMusik' => $alatMusik,
            'rumahAdat' => $rumahAdat,
            'laguDaerah' => $laguDaerah,
            'bahasaDaerah' => $bahasaDaerah,
            'seniTari' => $seniTari,
        ]);
    }

    function ragamIndonesia() {
        return Inertia::render('RagamIndonesia', [
            'user' => Auth::user(),
        ]);
    }

    function makananKhas() {
        $foods = MakananKhas::latest()->get();

        return Inertia::render('RagamMakanan', [
            'user' => Auth::user(),
            'foods' => $foods,
        ]);
    }

    function alatMusik() {
        $alatMusik = AlatMusik::latest()->get();

        return Inertia::render('RagamAlatMusik', [
            'user' => Auth::user(),
            'alatMusik' => $alatMusik,
        ]);
    }

    function rumahAdat() {
        $rumahAdat = RumahAdat::latest()->get();

        return Inertia::render('RagamRumahAdat', [
            'user' => Auth::user(),
            'rumahAdat' => $rumahAdat,
        ]);
    }


    function laguDaerah() {
        $laguDaerah = LaguDaerah::latest()->get();

        return Inertia::render('RagamLaguDaerah', [
            'user' => Auth::user(),
            'laguDaerah' => $laguDaerah,
        ]);
    }

    function bahasaDaerah() {
        $bahasaDaerah = BahasaDaerah::latest()->get();

        return Inertia::render('RagamBahasadaerah', [
            'user' => Auth::user(),
            'bahasaDaerah' => $bahasaDaerah,
        ]);
    }

    function seniTari() {
        $seniTari = SeniTari::latest()->get();

        return Inertia::render('RagamSeniTari', [
            'user' => Auth::user(),
            'seniTari' => $seniTari,
        ]);
    }

    public function updatePasswordAPI(Request $request)
    {
        $request->validate([
            'new_password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        $user = Auth::user();

        if (Hash::check($request->new_password, $user->password)) {
            return response()->json(['message' => 'New password cannot be the same as the old password.'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        Auth::logout();

        return response()->json(['message' => 'Password berhasil diperbarui'], 200);
    }


}

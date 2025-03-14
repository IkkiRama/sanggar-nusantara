<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PembelianEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Midtrans\Snap;
use Midtrans\Config;

class ProfileController extends Controller
{
    function index() {
        $userId = Auth::id(); // Mengambil ID user yang sedang login

        $pembelianEvents = DB::table('pembelian_events')
            ->join('orders', 'pembelian_events.order_id', '=', 'orders.id')
            ->join('events', 'pembelian_events.event_id', '=', 'events.id')
            ->select(
                'orders.order_id',
                'orders.created_at',
                'orders.status_pembelian',
                'pembelian_events.jumlah_tiket',
                'pembelian_events.jenis_tiket',
                'events.nama as event_nama',
                'events.image',
                'events.tempat',
                'events.tanggal as event_tanggal'
            )
            ->where('events.status_event', '!=', 'draft')
            ->where('orders.user_id', $userId) // Menggunakan user_id dari tabel order
            ->orderBy("orders.created_at", "desc")
            ->get();

        return Inertia::render('Profile', [
            'user' => Auth::user(),
            "pembelianEvents" => $pembelianEvents
        ]);
    }

    function invoice($orderId) {
        // Ambil order dengan filter awal (hanya cek user_id dan status_pembelian)
        $order = Order::where('order_id', $orderId)
            ->where('user_id', Auth::id()) // Cek apakah order milik user yang login
            ->first();

        // Jika order tidak ditemukan, bukan milik user, atau belum dibayar → Tampilkan error 403
        if (!$order || $order->status_pembelian !== 'sudah dibayar') {
            return abort(403, 'Anda tidak memiliki akses ke invoice ini.');
        }

        // Ambil order lengkap dengan relasi jika lolos filter
        $order = Order::with(['pembelianEvent', 'pembelianEvent.event', 'discount'])
            ->where('order_id', $orderId)
            ->firstOrFail();

        return Inertia::render('Invoice', [
            'user' => Auth::user(),
            'order' => $order,
        ]);
    }

    public function getSnapToken($order_id)
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // Cek apakah user sudah login
        if (Auth::check()) {
            return response()->json(['error' => 'User belum login'], 401);
        }

        // Ambil order yang sesuai dengan user yang login
        $order = Order::where('order_id', $order_id)
                    // ->where('user_id', Auth::id()) // Pastikan order ini milik user yang login
                    ->first();

        // Jika order tidak ditemukan, kembalikan response error
        if (!$order) {
            return response()->json(['error' => 'Order tidak ditemukan atau bukan milik Anda'], 404);
        }

        // Buat data transaksi Midtrans
        $transaction = [
            'transaction_details' => [
                'order_id' => $order->order_id, // Jangan tambahkan time() agar tetap sama
                'gross_amount' => (int) $order->total_akhir,
            ],
            'customer_details' => [
                'first_name' => $order->user->name ?? 'Guest', // Handle jika user null
                'email' => $order->user->email ?? 'no-email@example.com', // Handle jika email null
            ],
            'callbacks' => [
                'finish' => url("/payment-success/{$order->order_id}"),
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($transaction);
            return response()->json(['token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mendapatkan token Midtrans', 'message' => $e->getMessage()], 500);
        }
    }



    function etiket($orderId) {
        // Ambil user yang sedang login
        $user = auth()->user();

        // Query untuk mendapatkan data pembelian tiket berdasarkan user yang login
        $orders = DB::table('orders')
            ->join('pembelian_events', 'orders.id', '=', 'pembelian_events.order_id')
            ->join('events', 'pembelian_events.event_id', '=', 'events.id')
            ->join('users', 'orders.user_id', '=', 'users.id') // Join ke tabel users
            ->select(
                'events.nama as nama_event',
                'events.image',
                'events.tanggal as tanggal_event',
                'events.tempat',
                'pembelian_events.jenis_tiket',
                'orders.id as order_id',
                'pembelian_events.jenis_tiket as kode_tagihan',
                'orders.created_at as tanggal_pembelian',
                'user_id', // Id user untuk validasi
                'users.name',
            )
            ->where('orders.user_id', $user->id) // Filter berdasarkan user yang sedang login
            ->where('orders.order_id', $orderId) // Filter berdasarkan user yang sedang login
            ->get();


        return Inertia::render('Etiket', [
            'orders' => $orders,
        ]);
    }

    function profileEdit() {
        return Inertia::render('EditProfile', [
            'user' => Auth::user(),
        ]);
    }

    function transaksi() {
        // Ambil transaksi berdasarkan user yang sedang login
        $transaksi = Order::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('TransaksiProfile', [
            'user' => Auth::user(),
            'transaksi' => $transaksi,
        ]);
    }

    function ubahPassword() {
        return Inertia::render('UbahPassword', [
            'user' => Auth::user(),
        ]);
    }
}

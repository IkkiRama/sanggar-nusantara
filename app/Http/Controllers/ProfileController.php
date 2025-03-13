<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PembelianEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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
        $order = Order::with(['pembelianEvent', 'discount'])
            ->where('order_id', $orderId)
            ->firstOrFail();

        return Inertia::render('Invoice', [
            'user' => Auth::user(),
            'order' => $order,
        ]);
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
        return Inertia::render('TransaksiProfile', [
            'user' => Auth::user(),
        ]);
    }
}

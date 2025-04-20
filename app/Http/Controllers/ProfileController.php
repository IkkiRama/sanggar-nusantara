<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PembelianEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Services\MidtransService;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProfileController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    function index() {
        $userId = Auth::id(); // Mengambil ID user yang sedang login

            // Cek semua order pending milik user
            $ordersPending = DB::table('orders')
                ->where('user_id', $userId)
                ->where('status_pembelian', 'pending')
                ->where('created_at', '<', Carbon::now()->subHours(24))
                ->get();

            // Update status jadi 'kadaluarsa' kalau sudah > 24 jam
            foreach ($ordersPending as $order) {
                DB::table('orders')
                    ->where('id', $order->id)
                    ->update(['status_pembelian' => 'kadaluarsa']);
            }

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
            ->whereIn('orders.status_pembelian', ['pending', 'sudah dibayar'])
            ->where('orders.user_id', $userId) // Menggunakan user_id dari tabel order
            ->orderBy("orders.created_at", "desc")
            ->get();

        return Inertia::render('Profile', [
            'user' => Auth::user(),
            "pembelianEvents" => $pembelianEvents
        ]);
    }

    public function batalkanTransaksi($orderId, Request $request)
    {
        $order = Order::where('order_id', $orderId)->first();

        if (!$order) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        // Cek apakah statusnya sudah "sudah dibayar"
        if ($order->status_pembelian === 'sudah dibayar') {
            return response()->json(['message' => 'Pesanan sudah dibayar dan tidak bisa dibatalkan.'], 400);
        }

        $order->status_pembelian = 'dibatalkan';
        $order->save();

        return response()->json(['message' => 'Pesanan berhasil dibatalkan.']);
    }

    function invoice($orderId) {
        // Ambil order dengan filter awal (hanya cek user_id dan status_pembelian)
        $order = Order::where('order_id', $orderId)
            ->where('user_id', Auth::id()) // Cek apakah order milik user yang login
            ->first();

        // Jika order tidak ditemukan, bukan milik user, atau belum dibayar → Tampilkan error 403
        // if (!$order || $order->status_pembelian !== 'sudah dibayar') {
        //     return abort(403, 'Anda tidak memiliki akses ke invoice ini.');
        // }

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
        // Validasi login
        if (Auth::check()) {
            return response()->json(['error' => 'User belum login'], 401);
        }

        // Cari order milik user login
        $order = Order::where('order_id', $order_id)
                    // ->where('user_id', Auth::id()) // Aktifkan ini kalau perlu keamanan ekstra
                    ->first();

        if (!$order) {
            return response()->json(['error' => 'Order tidak ditemukan atau bukan milik Anda'], 404);
        }

        try {
            $snapToken = $this->midtrans->getSnapToken($order);
            return response()->json(['token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Gagal mendapatkan token Midtrans',
                'message' => $e->getMessage()
            ], 500);
        }
    }



    function etiket($orderId) {
        // Ambil user yang sedang login
        $user = auth()->user();

        // Query untuk mendapatkan data pembelian tiket berdasarkan user yang login
        $orders = Order::with([
            'pembelianEvent.event', // eager load relasi ke event lewat pembelianEvent
            'user' // relasi ke tabel users
        ])
        ->where('user_id', $user->id)
        ->where('order_id', $orderId)
        ->get()
        ->map(function ($order) {
            return $order->pembelianEvent->map(function ($pembelianEvent) use ($order) {
                return [
                    'nama_event' => $pembelianEvent->event->nama,
                    'image' => $pembelianEvent->event->image,
                    'tanggal_event' => $pembelianEvent->event->tanggal,
                    'tempat' => $pembelianEvent->event->tempat,
                    'jenis_tiket' => $pembelianEvent->jenis_tiket,
                    'jumlah_tiket' => $pembelianEvent->jumlah_tiket,
                    'id_order' => $order->id,
                    'order_id' => $order->order_id,
                    'tanggal_pembelian' => $order->created_at,
                    'user_id' => $order->user_id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ];
            });
        })->flatten(1); // untuk menjadikan koleksi datar jika banyak pembelian dalam satu order


        return Inertia::render('Etiket', [
            'orders' => $orders,
        ]);
    }

    function downloadEtiket($orderId) {
        // Ambil user yang sedang login
        $user = auth()->user();

        // Query untuk mendapatkan data pembelian tiket berdasarkan user yang login
        $orders = Order::with([
            'pembelianEvent.event', // eager load relasi ke event lewat pembelianEvent
            'user' // relasi ke tabel users
        ])
        ->where('user_id', $user->id)
        ->where('order_id', $orderId)
        ->get()
        ->map(function ($order) {
            return $order->pembelianEvent->map(function ($pembelianEvent) use ($order) {
                return [
                    'nama_event' => $pembelianEvent->event->nama,
                    'image' => $pembelianEvent->event->image,
                    'tanggal_event' => $pembelianEvent->event->tanggal,
                    'tempat' => $pembelianEvent->event->tempat,
                    'jenis_tiket' => $pembelianEvent->jenis_tiket,
                    'jumlah_tiket' => $pembelianEvent->jumlah_tiket,
                    'order_id' => $order->id,
                    'tanggal_pembelian' => $order->created_at,
                    'user_id' => $order->user_id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ];
            });
        })->flatten(1); // untuk menjadikan koleksi datar jika banyak pembelian dalam satu order


        return Inertia::render('DownloadEtiket', [
            'orders' => $orders,
        ]);
    }

    public function generateQr($orderId, $ticketNumber)
    {

        $writer = new PngWriter();

        $qrCode = new QrCode(url("/verifikasi-etiket/{$orderId}/{$ticketNumber}"));

        $result = $writer->write($qrCode);

        header ("Content-Type:", $result->getMimeType());
        // Simpan QR ke file (opsional)
        $filename = "{$result->getString()}.png";
        // Storage::disk('public')->put($filename, $result->getString());
        // echo $result->getString();

        // Return path QR code-nya
        return $result->getString();
    }

    function profileEdit() {
        return Inertia::render('EditProfile', [
            'user' => Auth::user(),
        ]);
    }

    function transaksi() {
        // Ambil transaksi berdasarkan user yang sedang login
        $transaksi = Order::where('user_id', Auth::id())->latest()->get();

         // Loop untuk update status kadaluarsa jika pending > 24 jam
        foreach ($transaksi as $order) {
            if (
                $order->status_pembelian === 'pending' &&
                Carbon::parse($order->created_at)->addHours(24)->isPast()
            ) {
                $order->status_pembelian = 'kadaluarsa';
                $order->save();
            }
        }

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

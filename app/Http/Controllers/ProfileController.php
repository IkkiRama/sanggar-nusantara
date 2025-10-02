<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\PembelianEvent;
use App\Models\User;
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
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    function index() {
        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

        // Ubah status order "pending" yang sudah lebih dari 24 jam jadi "kadaluarsa"
        $ordersPending = DB::table('orders')
            ->where('user_id', Auth::user()->id)
            ->where('status_pembelian', 'pending')
            ->where('created_at', '<', Carbon::now()->subHours(24))
            ->get();

        foreach ($ordersPending as $order) {
            DB::table('orders')
                ->where('id', $order->id)
                ->update(['status_pembelian' => 'kadaluarsa']);
        }

        // Ambil data pembelian event
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
            ->where('orders.status_pembelian', 'sudah dibayar')
            ->where('orders.user_id', Auth::user()->id)
            ->orderBy('orders.created_at', 'desc')
            ->get();

        // Ambil data subscription milik user
        $subscriptions = DB::table('subscriptions')
            ->join('plans', 'subscriptions.plan_id', '=', 'plans.id')
            ->select(
                'subscriptions.id',
                'subscriptions.status',
                'subscriptions.tanggal_mulai',
                'subscriptions.tanggal_berakhir',
                'subscriptions.payment_status',
                'plans.nama as plan_nama',
                'plans.harga',
                'plans.harga_diskon',
                'plans.durasi',
                'plans.fitur'
            )
            ->where('subscriptions.user_id', Auth::user()->id)
            ->orderBy('subscriptions.created_at', 'desc')
            ->get();

        $user = Auth::user();

        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'role' => $user->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
            'pembelianEvents' => $pembelianEvents,
            'subscription' => $subscriptions, // Tambahkan subscriptions ke props
        ]);
    }


    public function batalkanTransaksi($orderId, Request $request)
    {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

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

    public function invoice($orderId)
    {
        // Pastikan user terautentikasi
        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

        $user = Auth::user();

        // Ambil order milik user yang sedang login
        $order = Order::where('order_id', $orderId)
            ->where('user_id', $user->id)
            ->first();

        // Jika order tidak ditemukan atau bukan milik user, tampilkan 403
        if (!$order) {
            return abort(403, 'Anda tidak memiliki akses ke invoice ini.');
        }

        // Ambil order lengkap dengan relasi
        $order = Order::with([
                'pembelianEvent',
                'pembelianEvent.event',
                'discount',
                'subscription.plan'
            ])
            ->where('order_id', $orderId)
            ->firstOrFail();

        // Hitung jumlah item di keranjang user
        $cartCount = Cart::where('user_id', $user->id)->sum('jumlah');

        return Inertia::render('Profile/Invoice', [
            'user' => $user,
            'role' => $user->getRoleNames()->first(),
            'cartCount' => $cartCount,
            'order' => $order,
        ]);
    }

    public function getSnapToken($order_id)
    {
        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

        // Ambil order berdasarkan order_id
        $order = Order::where('order_id', $order_id)->first();

        if (!$order) {
            return response()->json(['error' => 'Order tidak ditemukan'], 404);
        }

        try {
            // Cek status transaksi di Midtrans
            $status = \Midtrans\Transaction::status($order->order_id);
            $transaction_status = $status->transaction_status;

            // Jika transaksi sudah sukses, tidak perlu token baru
            if (in_array($transaction_status, ['settlement', 'capture'])) {
                return response()->json([
                    'message' => 'Transaksi sudah dibayar',
                    'status' => $transaction_status
                ]);
            }

            // Jika transaksi masih pending dan snap_token tersedia, gunakan token lama
            if ($transaction_status === 'pending' && $order->snap_token) {
                return response()->json(['token' => $order->snap_token]);
            }

            // Jika transaksi gagal / expired, buat order_id baru untuk retry
            $new_order_id = $order->order_id . '-' . time();
            $order->order_id = $new_order_id;

        } catch (\Exception $e) {
            // Jika belum pernah ada transaksi di Midtrans (misalnya error 404), lanjutkan
            if (str_contains($e->getMessage(), '404')) {
                // Tidak ada transaksi sebelumnya, lanjut
            } else {
                return response()->json([
                    'error' => 'Gagal cek status Midtrans',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        // Generate Snap Token baru
        try {
            $snapToken = $this->midtrans->getSnapToken($order);
            $order->snap_token = $snapToken;
            $order->save();

            return response()->json(['token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Gagal mendapatkan token Midtrans',
                'message' => $e->getMessage()
            ], 500);
        }
    }




    function etiket($orderId) {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

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


        return Inertia::render('Profile/Etiket', [
            "user" => $user = Auth::user(),
            'role' => Auth::user()->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'orders' => $orders,
        ]);
    }

    function downloadEtiket($orderId) {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

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


        return Inertia::render('Profile/DownloadEtiket', [
            "user" => $user = Auth::user(),
            'role' => Auth::user()->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'orders' => $orders,
        ]);
    }

    public function generateQr($orderId, $ticketNumber)
    {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

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

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

        $user = User::with('alamat')->find(Auth::id());

        return Inertia::render('Profile/EditProfile', [
            "user" => $user,
            'role' => Auth::user()->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }

    function updateProfileAPI(Request $request) {
        $user = Auth::user();

        // Validasi
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'alamat' => 'nullable|string|max:500',
            'provinsi' => 'nullable|string|max:100',
            'kabupaten' => 'nullable|string|max:100',
            'kecamatan' => 'nullable|string|max:100',
            'desa' => 'nullable|string|max:100',
            'kode_pos' => 'nullable|string|max:10',
            'image' => 'nullable|image|max:2048',
        ]);

        // Email tidak boleh diubah
        if ($request->has('email') && $request->email !== $user->email) {
            return response()->json(['error' => 'Email tidak boleh diubah.'], 422);
        }

        // Simpan foto jika ada
        if ($request->hasFile('image')) {
            // Hapus file lama jika ada
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            // Ambil file
            $file = $request->file('image');

            // Generate nama acak + ekstensi asli
            $filename =
            Str::random(40) . '-' . Str::uuid() . '.' . $file->getClientOriginalExtension();

            // Simpan ke folder 'user' di disk 'public'
            $path = $file->storeAs('user', $filename, 'public');

            // Simpan path ke database
            $user->image = $path;
        }


        // Update data user
        $user->name = $validated['name'];
        $user->deskripsi = $validated['deskripsi'] ?? null;
        $user->save();

        // Simpan atau update alamat
        $alamat = $user->alamat()->firstOrNew(); // get alamat if exists, or new one
        $alamat->user_id = $user->id;
        $alamat->alamat = $validated['alamat'] ?? '';
        $alamat->provinsi = $validated['provinsi'] ?? '';
        $alamat->kabupaten = $validated['kabupaten'] ?? '';
        $alamat->kecamatan = $validated['kecamatan'] ?? '';
        $alamat->desa = $validated['desa'] ?? '';
        $alamat->kode_pos = $validated['kode_pos'] ?? '';
        $alamat->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
    }

    function transaksi() {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

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

        return Inertia::render('Profile/TransaksiProfile', [
            "user" => $user = Auth::user(),
            'role' => Auth::user()->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'transaksi' => $transaksi,
        ]);
    }

    function ubahPassword() {

        if (!Auth::check() || !Auth::user()->id) {
            return redirect('/admin/login');
        }

        return Inertia::render('Profile/UbahPassword', [
            "user" => $user = Auth::user(),
            'role' => Auth::user()->getRoleNames()->first(), // Ambil satu role
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }
}

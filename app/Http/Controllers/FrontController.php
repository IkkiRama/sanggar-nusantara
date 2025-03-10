<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Event;
use App\Models\Komentar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
        $perPage = 10; // Banyaknya event per halaman
        $page = $request->query('page', 1);
        $skip = ($page - 1) * $perPage;

        // Ambil tanggal hari ini
        $today = now()->format('Y-m-d');

        // Ambil filter dan search query dari request
        $selectedFilter = $request->query('selectedFilter', null);
        $searchQuery = $request->query('searchQuery', null);

        // Query dasar
        $query = Event::select("kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal")
            ->where('status_event', '!=', 'draft');

        // Filter berdasarkan status event (Sudah Berakhir / Masih Dibuka)
        // if ($selectedFilter === "Sudah Berakhir") {
        //     $query->whereDate('tanggal', '<', $today);
        // } elseif ($selectedFilter === "Pendaftaran Masih Dibuka") {
        //     $query->whereDate('tanggal', '>=', $today);
        // }

        // Penerapan pencarian berdasarkan nama event
        if (!empty($searchQuery)) {
            $query->where('nama', 'like', '%' . $searchQuery . '%');
        }

        // Hitung total event setelah filter diterapkan
        $totalEvents = $query->count();
        $totalPages = ceil($totalEvents / $perPage);

        // Ambil data event dengan pagination
        $events = $query->orderBy('tanggal', 'asc')
            ->skip($skip)
            ->take($perPage)
            ->withoutTrashed()
            ->get()
            ->map(function ($event) use ($today) {
                $event->status = ($event->tanggal < $today) ? "Event Sudah Berakhir" : "Pendaftaran Masih Dibuka";
                return $event;
            });

        // Jika request AJAX, kembalikan JSON
        if ($request->wantsJson()) {
            return response()->json([
                'events' => $events,
                'totalPages' => $totalPages,
                'user' => Auth::user(),
            ]);
        }

        // Jika request biasa, gunakan Inertia
        return Inertia::render('Event', [
            'events' => $events,
            'totalPages' => $totalPages,
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

    public function storeKomen(Request $request)
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




    function subscription() {
        return Inertia::render('Subscription', [
            'user' => Auth::user(),
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

    function petaInteraktif() {
        return Inertia::render('Map', [
            'user' => Auth::user(),
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

    function ragamIndonesia() {
        return Inertia::render('RagamIndonesia', [
            'user' => Auth::user(),
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }
}

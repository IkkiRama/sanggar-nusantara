<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        ]);
    }

    // public function event(Request $request)
    // {
    //     $perPage = 3; // Banyaknya event per halaman
    //     $page = $request->query('page', 1);
    //     $skip = ($page - 1) * $perPage;

    //     // Ambil tanggal hari ini
    //     $today = now()->format('Y-m-d');

    //     $events = Event::select("kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal")
    //         ->where('status_event', '!=', 'draft')
    //         ->orderBy('tanggal', 'asc')
    //         ->skip($skip)
    //         ->take($perPage)
    //         ->withoutTrashed()
    //         ->get()
    //         ->map(function ($event) use ($today) {
    //             // Tambahkan status event berdasarkan tanggal
    //             $event->status_event = ($event->tanggal < $today) ? "Event Sudah Berakhir" : "Pendaftaran Masih Dibuka";
    //             return $event;
    //         });

    //     // Hitung total halaman
    //     $totalEvents = Event::where('status_event', '!=', 'draft')->count();
    //     $totalPages = ceil($totalEvents / $perPage);

    //     // Jika request AJAX, kembalikan JSON
    //     if ($request->wantsJson()) {
    //         return response()->json([
    //             'events' => $events,
    //             'totalPages' => $totalPages,
    //         ]);
    //     }

    //     // Jika request biasa, gunakan Inertia
    //     return Inertia::render('Event', [
    //         'events' => $events,
    //         'totalPages' => $totalPages,
    //     ]);
    // }


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
        ]);
    }

    // Jika request biasa, gunakan Inertia
    return Inertia::render('Event', [
        'events' => $events,
        'totalPages' => $totalPages,
    ]);
}




    function subscription() {
        return Inertia::render('Subscription', [
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

    function petaInteraktif() {
        return Inertia::render('Map', [
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }

    function ragamIndonesia() {
        return Inertia::render('RagamIndonesia', [
            // 'events' => $events,
            // 'artikels' => $artikels,
        ]);
    }
}

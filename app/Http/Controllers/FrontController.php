<?php

namespace App\Http\Controllers;

use App\Models\AlatMusik;
use App\Models\Artikel;
use App\Models\BahasaDaerah;
use App\Models\Cart;
use App\Models\Discount;
use App\Models\DiscountUser;
use App\Models\Event;
use App\Models\Komentar;
use App\Models\Kontak;
use App\Models\LaguDaerah;
use App\Models\MakananKhas;
use App\Models\Order;
use App\Models\PembelianEvent;
use App\Models\Plan;
use App\Models\RumahAdat;
use App\Models\SeniTari;
use App\Models\Subscription;
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
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class FrontController extends Controller
{
    public function index()
    {

        // Ambil event mendatang
        $events = Event::select(
            "kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal",
            DB::raw("(SELECT MIN(harga) FROM harga_events WHERE harga_events.event_id = events.id) as harga_terendah")
        )
        ->where('status_event', '!=', 'draft')
        ->where('tanggal', '>=', now())
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

                $plans = Plan::whereNull('deleted_at')->get();

        $specialTags = [
            "🎉 Mulai Gratis",
            "🔥 Populer",
            "💼 Terbaik untuk Profesional"
        ];

        $response = $plans->map(function ($plan) use ($specialTags) {
            // Konversi durasi ke label
            $durationMap = [
                '30' => 'Bulanan',
                '90' => 'Triwulanan',
                '365' => 'Tahunan',
            ];

            $durationLabel = $durationMap[$plan->durasi] ?? 'lainnya';

            // Pecah fitur menjadi array
            $features = array_filter(array_map(function ($line) {
                return trim(preg_replace('/^-/', '', $line));
            }, preg_split('/\r\n|\r|\n/', $plan->fitur)));

            // Pecah deskripsi menjadi dua paragraf
            $deskripsiParts = preg_split('/\r\n|\r|\n/', $plan->deskripsi);
            $description = trim($deskripsiParts[0] ?? '');
            $specialNote = trim($deskripsiParts[1] ?? '');

            // Mapping specialTag berdasarkan nama plan
            $tagMap = [
                "Gratis" => $specialTags[0],
                "Pelajar" => $specialTags[1],
                "Profesional" => $specialTags[2],
            ];

            return [
                "id" => $plan->id,
                "nama" => $plan->nama,
                "description" => $description,
                "specialNote" => $specialNote,
                "harga_diskon" => (int) $plan->harga_diskon,
                "harga" => (int) $plan->harga,
                "durasi" => $durationLabel,
                "features" => array_values($features),
                "highlight" => $plan->nama === "Pelajar",
                "specialTag" => $tagMap[$plan->nama] ?? null,
            ];
        });

        return Inertia::render('Home', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'events' => $events,
            'artikels' => $artikels,
            "plans" => $response,
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
            ]);
        }

        return Inertia::render('Event/Event', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'events' => $events,
            'totalPages' => $totalPages,
        ]);
    }


    function showEvent($slug)
    {
        $event = Event::with('harga:id,event_id,nama,harga,kuota,deskripsi,tanggal_mulai,tanggal_selesai')
            ->where([
                ['slug', $slug],
                ['status_event', '!=', 'draft']
            ])
            ->firstOrFail();

        $cekUserPremium = Subscription::where([
            ["user_id", Auth::id()],
            ["status", "aktif"]
        ])->first();

        if ($cekUserPremium && Auth::user()->role !== "admin") {
            $tanggalBerakhir = Carbon::parse($cekUserPremium->tanggal_berakhir);

            if (now()->greaterThanOrEqualTo($tanggalBerakhir)) {
                // Update status subscription jadi expire
                $cekUserPremium->update([
                    "status" => "expired"
                ]);

                // Ubah role user jadi role biasa
                $user = Auth::user();
                $user->syncRoles("user"); // ganti "user" sesuai role default
            }
        }

        // Jika event premium dan user bukan premium
        if ($event->status_event === "premium" && (Auth::user()?->role !== 'premium')) {
            $eventPreview = [
                'nama' => $event->nama,
                'excerpt' => "Konten ini eksklusif untuk pengguna premium!",
                'content' => "Anda sedang melihat cuplikan event premium.\n\nUntuk menikmati keseluruhan informasi berkualitas ini, silakan upgrade akun Anda ke versi premium!\n\nDapatkan akses penuh ke detail event, harga tiket, dan fitur eksklusif lainnya yang hanya tersedia bagi anggota premium.",
                'tanggal' => $event->tanggal,
                'tempat' => $event->tempat,
                "status_event" => $event->status_event,
                "image" => $event->image
            ];

            $status = 'restricted';
            $message = 'Event ini hanya tersedia penuh untuk pengguna premium.';

            return Inertia::render('Event/DetailEvent', [
                "user" => $user = Auth::user(),
                'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
                'event' => $eventPreview,
                'hargaTiket' => [],
                'events' => [],
                'restricted' => compact('status', 'message')
            ]);
        }

        // Ambil event yang akan datang dan status publish, kecuali event yang sedang ditampilkan
        $events = Event::where('tanggal', '>=', now())
            ->where('status_event', 'publish')
            ->where('id', '!=', $event->id)
            ->inRandomOrder()
            ->take(3)
            ->withoutTrashed()
            ->get();

        if ($events->isEmpty()) {
            $events = Event::where('status_event', 'publish')
                ->where('id', '!=', $event->id)
                ->inRandomOrder()
                ->take(3)
                ->withoutTrashed()
                ->get();
        }

        return Inertia::render('Event/DetailEvent', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'event' => $event,
            'hargaTiket' => $event->harga,
            'events' => $events,
        ]);
    }




    function artikel() {
        // Hitung tanggal satu bulan ke belakang
        $oneMonthAgo = Carbon::now()->subMonth();

        // Query trending artikel dalam 1 bulan terakhir
        $trendingArtikel = Artikel::select('title', 'slug', 'image', 'status_artikel')
            ->where('status_artikel', '!=', 'draft')
            ->where('published_at', '>=', $oneMonthAgo)
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

        // Jika tidak ada artikel trending dalam 1 bulan, ambil dari semua artikel
        if ($trendingArtikel->isEmpty()) {
            $trendingArtikel = Artikel::select('title', 'slug', 'image', 'status_artikel')
                ->where('status_artikel', '!=', 'draft')
                ->orderBy('views', 'desc')
                ->limit(10)
                ->get();
        }

        // Query artikel umum
        $dataArtikel = Artikel::select('title', 'views', 'slug', 'image', 'excerpt', 'published_at', 'user_id', 'kategori_id', 'status_artikel')
            ->where('status_artikel', '!=', 'draft')
            ->with(['kategori:id,nama', 'user:id,name'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Artikel/Artikel', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'artikelTerbaru' => $dataArtikel->first(),
            'artikelBerikutnya' => $dataArtikel->slice(1, 2)->values(),
            'artikels' => $dataArtikel->slice(3)->values(),
            'trendingArtikel' => $trendingArtikel,
        ]);
    }

    function showArtikel($slug): JsonResponse {
        try {
            $artikel = Artikel::where([
                ["slug", $slug],
                ["status_artikel", "!=", "draft"]
            ])
            ->withoutTrashed()
            ->with([
                "kategori:id,nama",
                "user:id,name,image,deskripsi",
                "komentar:id,artikel_id,nama,email,komentar"
            ])
            ->firstOrFail();

            // Konversi ke array
            $artikelData = $artikel->toArray();

            // Default status dan message
            $status = 'success';
            $message = 'Artikel berhasil dimuat.';

            $cekUserPremium = Subscription::where([
                ["user_id", Auth::id()],
                ["status", "aktif"]
            ])->first();

            if ($cekUserPremium && Auth::user()->role !== "admin") {
                $tanggalBerakhir = Carbon::parse($cekUserPremium->tanggal_berakhir);

                if (now()->greaterThanOrEqualTo($tanggalBerakhir)) {
                    // Update status subscription jadi expire
                    $cekUserPremium->update([
                        "status" => "expired"
                    ]);

                    // Ubah role user jadi role biasa
                    $user = Auth::user();
                    $user->syncRoles("user"); // ganti "user" sesuai role default
                }
            }


            // Cek jika artikel premium dan user bukan premium
            if (
                $artikel->status_artikel === 'premium' &&
                (!Auth::check() || !(Auth::user()->hasRole("premium") || Auth::user()->hasRole("super_admin")))
            ) {
                $artikelData['excerpt'] = "Konten ini eksklusif untuk pengguna premium!";
                $artikelData['content'] = "
                    Anda sedang melihat cuplikan artikel premium.
                    Untuk menikmati keseluruhan konten berkualitas ini, silakan upgrade akun Anda ke versi premium!
                    Dapatkan akses penuh ke artikel mendalam, wawasan eksklusif, dan sumber daya lainnya yang hanya tersedia bagi anggota premium.";

                $status = 'restricted';
                $message = 'Artikel ini hanya tersedia penuh untuk pengguna premium.';
            } else {
                // Tambah views hanya jika user bisa baca penuh
                $artikel->increment('views');
            }

            // Ambil rekomendasi artikel
            $rekomendasiArtikel = Artikel::select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id", "status_artikel")
                ->withoutTrashed()
                ->where('status_artikel', '!=', 'draft')
                ->where('slug', '!=', $slug)
                ->inRandomOrder()
                ->with("kategori:id,nama", "user:id,name")
                ->limit(3)
                ->get();

            return response()->json([
                'status' => $status,
                'message' => $message,
                'data' => [
                    'artikel' => $artikelData,
                    'rekomendasiArtikel' => $rekomendasiArtikel
                ]
            ]);
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error('Gagal memuat artikel: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat memuat artikel/',
                'error' => $e->getMessage() // Hapus di production kalau perlu
            ], 500);
        }
    }


    public function detailArtikel($slug){
        return Inertia::render('Artikel/Detail', [
            "user" => $user = Auth::user(),
            'slug' => $slug,
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }

    public function subscription(){
        $plans = Plan::whereNull('deleted_at')->get();

        $specialTags = [
            "🎉 Mulai Gratis",
            "🔥 Populer",
            "💼 Terbaik untuk Profesional"
        ];

        $response = $plans->map(function ($plan) use ($specialTags) {
            // Konversi durasi ke label
            $durationMap = [
                '30' => 'Bulanan',
                '90' => 'Triwulanan',
                '365' => 'Tahunan',
            ];

            $durationLabel = $durationMap[$plan->durasi] ?? 'lainnya';

            // Pecah fitur menjadi array
            $features = array_filter(array_map(function ($line) {
                return trim(preg_replace('/^-/', '', $line));
            }, preg_split('/\r\n|\r|\n/', $plan->fitur)));

            // Pecah deskripsi menjadi dua paragraf
            $deskripsiParts = preg_split('/\r\n|\r|\n/', $plan->deskripsi);
            $description = trim($deskripsiParts[0] ?? '');
            $specialNote = trim($deskripsiParts[1] ?? '');

            // Mapping specialTag berdasarkan nama plan
            $tagMap = [
                "Gratis" => $specialTags[0],
                "Pelajar" => $specialTags[1],
                "Profesional" => $specialTags[2],
            ];

            return [
                "id" => $plan->id,
                "nama" => $plan->nama,
                "description" => $description,
                "specialNote" => $specialNote,
                "harga_diskon" => (int) $plan->harga_diskon,
                "harga" => (int) $plan->harga,
                "durasi" => $durationLabel,
                "features" => array_values($features),
                "highlight" => $plan->nama === "Pelajar",
                "specialTag" => $tagMap[$plan->nama] ?? null,
            ];
        });

        return Inertia::render('Subscription', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            "plans" => $response
        ]);
    }




    public function storeKomenAPI(Request $request)
    {
        // if (!Auth::check() || !Auth::user()->id) {
        //     return redirect('/admin/login');
        // }

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

    function petaInteraktif() {
        $foods = MakananKhas::latest()->get();
        $alatMusik = AlatMusik::latest()->get();
        $rumahAdat = RumahAdat::latest()->get();
        $laguDaerah = LaguDaerah::latest()->get();
        $bahasaDaerah = BahasaDaerah::latest()->get();
        $seniTari = SeniTari::latest()->get();

        return Inertia::render('RagamIndonesia/Map', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'foods' => $foods,
            'alatMusik' => $alatMusik,
            'rumahAdat' => $rumahAdat,
            'laguDaerah' => $laguDaerah,
            'bahasaDaerah' => $bahasaDaerah,
            'seniTari' => $seniTari,
        ]);
    }

    function ragamIndonesia() {
        return Inertia::render('RagamIndonesia/RagamIndonesia', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }

    function makananKhas() {
        $foods = MakananKhas::latest()->get();

        return Inertia::render('RagamIndonesia/RagamMakanan', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'foods' => $foods,
        ]);
    }

    function alatMusik() {
        $alatMusik = AlatMusik::latest()->get();

        return Inertia::render('RagamIndonesia/RagamAlatMusik', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'alatMusik' => $alatMusik,
        ]);
    }

    function rumahAdat() {
        $rumahAdat = RumahAdat::latest()->get();

        return Inertia::render('RagamIndonesia/RagamRumahAdat', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'rumahAdat' => $rumahAdat,
        ]);
    }


    function laguDaerah() {
        $laguDaerah = LaguDaerah::latest()->get();

        return Inertia::render('RagamIndonesia/RagamLaguDaerah', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'laguDaerah' => $laguDaerah,
        ]);
    }

    function bahasaDaerah() {
        $bahasaDaerah = BahasaDaerah::latest()->get();

        return Inertia::render('RagamIndonesia/RagamBahasadaerah', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'bahasaDaerah' => $bahasaDaerah,
        ]);
    }

    function seniTari() {
        $seniTari = SeniTari::latest()->get();

        return Inertia::render('RagamIndonesia/RagamSeniTari', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
            'seniTari' => $seniTari,
        ]);
    }

    public function submitKontak(Request $request){
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        $validated = $request->validate([
            'nama'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' => 'required|string',
        ]);

        // Simpan data ke dalam database
        $contact = Kontak::create($validated);

        // Kembalikan response
        return response()->json([
            'success' => true,
            'message' => 'Kontak berhasil disimpan.',
            'data'    => $contact,
        ], 201, $headers);
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

    function tentangKami() {

        return Inertia::render('TentangKami', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }

    function nusantaraAI() {
        // if (!Auth::check() || !Auth::user()->id) {
        //     return redirect('/masuk');
        // }

        return Inertia::render('NusantaraAI/NusantaraAI', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }


}

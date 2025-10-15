<?php

namespace App\Http\Controllers;

use App\Models\AlatMusik;
use App\Models\Artikel;
use App\Models\BahasaDaerah;
use App\Models\Cart;
use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use App\Models\ChallengeProgres;
use App\Models\Discount;
use App\Models\DiscountUser;
use App\Models\Event;
use App\Models\Komentar;
use App\Models\Kontak;
use App\Models\LaguDaerah;
use App\Models\MakananKhas;
use App\Models\NusantaraPoint;
use App\Models\Order;
use App\Models\PembelianEvent;
use App\Models\Plan;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\QuizAttempt;
use App\Models\QuizAttemptAnswer;
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
use Illuminate\Support\Facades\Http;

class FrontController extends Controller
{
    public function index()
    {
        $today = now();

        // === EVENTS ===
        $events = Event::select(
            "kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal",
            DB::raw("(SELECT MIN(harga) FROM harga_events WHERE harga_events.event_id = events.id) as harga_terendah")
        )
        ->where('status_event', '!=', 'draft')
        ->where('tanggal', '>=', $today)
        ->orderBy('tanggal', 'asc')
        ->take(3)
        ->withoutTrashed()
        ->get();

        if ($events->isEmpty()) {
            $events = Event::select("kategori_event_id", "nama", "slug", "image", "status_event", "excerpt", "tempat", "tanggal")
                ->where('tanggal', '<', $today)
                ->where('status_event', '!=', 'draft')
                ->orderBy('tanggal', 'desc')
                ->take(3)
                ->withoutTrashed()
                ->get();
        }

        // === CHALLENGE ===
        $challenges = Challenge::orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        // === KUIS ===
        $quizzes = Quiz::orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // === ARTIKEL & PLAN (seperti sebelumnya) ===
        $artikels = Artikel::select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id", "status_artikel")
            ->withoutTrashed()
            ->where('status_artikel', '!=', 'draft')
            ->with(["kategori:id,nama", "user:id,name"])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        $plans = Plan::whereNull('deleted_at')->get();
        $specialTags = ["🎉 Mulai Gratis", "🔥 Populer", "💼 Terbaik untuk Profesional"];

        $response = $plans->map(function ($plan) use ($specialTags) {
            $durationMap = [
                '30' => 'Bulanan',
                '90' => 'Triwulanan',
                '365' => 'Tahunan',
            ];
            $durationLabel = $durationMap[$plan->durasi] ?? 'lainnya';

            $features = array_filter(array_map(function ($line) {
                return trim(preg_replace('/^-/', '', $line));
            }, preg_split('/\r\n|\r|\n/', $plan->fitur)));

            $deskripsiParts = preg_split('/\r\n|\r|\n/', $plan->deskripsi);
            $description = trim($deskripsiParts[0] ?? '');
            $specialNote = trim($deskripsiParts[1] ?? '');

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
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
            'events' => $events,
            'challenges' => $challenges,
            'quizzes' => $quizzes,
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

        // Urutkan agar event yang masih open (tanggal >= hari ini) muncul dulu
        $events = $query
            ->orderByRaw("CASE WHEN tanggal >= ? THEN 0 ELSE 1 END", [$today]) // open dulu, baru yang lewat
            ->orderBy('tanggal', 'asc') // dalam masing-masing kategori, urut berdasar tanggal terdekat
            ->skip($skip)
            ->take($perPage)
            ->withoutTrashed()
            ->get()
            ->map(function ($event) use ($today) {
                $event->status = ($event->tanggal < $today)
                    ? "Event Sudah Berakhir"
                    : "Pendaftaran Masih Dibuka";
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
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
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

    function ragamChallenge() {
        // if (!Auth::check() || !Auth::user()->id) {
        //     return redirect('/masuk');
        // }

        return Inertia::render('RagamChallenge/Challenge', [
            "challenges" => Challenge::orderBy('created_at', 'desc')->get(),
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah')  : 0,
        ]);
    }

    public function detailRagamChallenge($slug)
    {
        $user = Auth::user();
        $challenge = Challenge::where('slug', $slug)->firstOrFail();

        $participant = null;

        if ($user) {
            $participant = ChallengeParticipant::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->whereIn('status', ['in_progres', 'completed'])
                ->latest()
                ->first();

            // Jika participant ditemukan dan masih "in_progres"
            if ($participant && $participant->status === 'in_progres') {
                $durationDays = $challenge->duration_days;
                $endDate = Carbon::parse($participant->started_at)->addDays($durationDays);

                // Jika sudah lewat durasi, ubah status menjadi failed
                if (Carbon::now()->greaterThan($endDate)) {
                    $participant->update(['status' => 'failed']);
                }
            }
        }

        return Inertia::render('RagamChallenge/DetailChallenge', [
            'user' => $user,
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
            'challenge' => $challenge,
            'participant' => $participant,
        ]);
    }

    public function joinChallenge($id)
    {
        $user = Auth::user();
        $challenge = Challenge::findOrFail($id);

        // Role validation
        if ($challenge->status === 'premium' && !in_array($user->role, ['admin', 'premium'])) {
            return back()->with('error', 'Challenge ini hanya untuk pengguna premium.');
        }

        // Cek apakah user sudah ikut challenge ini
        $existing = ChallengeParticipant::where('user_id', $user->id)
            ->where('challenge_id', $challenge->id)
            ->whereIn('status', ['in_progres'])
            ->first();

        if ($existing) {
            // Langsung arahkan ke halaman progres yang sudah ada
            return redirect()->route('challenge.progres', ['slug' => $challenge->slug]);
        }

        // Buat participant baru
        $participant = ChallengeParticipant::create([
            'user_id' => $user->id,
            'challenge_id' => $challenge->id,
            'status' => 'in_progres',
            'started_at' => Carbon::now(),
        ]);

        // Setelah join, langsung arahkan ke progres challenge
        return redirect()->route('challenge.progres', [
                'slug' => $challenge->slug,
                'uuid' => $participant->uuid,
            ])
            ->with('success', 'Kamu berhasil mengikuti challenge!');
    }


    // Hentikan challenge
    public function stopChallenge($id)
    {
        $user = Auth::user();

        $participant = ChallengeParticipant::where('user_id', $user->id)
            ->where('challenge_id', $id)
            ->where('status', 'in_progres')
            ->firstOrFail();

        $participant->update([
            'status' => 'failed',
            'completed_at' => Carbon::now(),
        ]);

        return back()->with('info', 'Challenge telah dihentikan.');
    }


    public function challengeProgres($slug, $uuid)
    {
        $user = auth()->user();

        $challenge = Challenge::where('slug', $slug)->firstOrFail();

        $participant = ChallengeParticipant::with('challenge')
            ->where('uuid', $uuid)
            ->where('challenge_id', $challenge->id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $duration = (int) $challenge->duration_days;
        $startDate = Carbon::parse($participant->started_at)->startOfDay();
        $endDate = $startDate->copy()->addDays($duration - 1)->endOfDay(); // durasi N hari: day 1..N
        $today = Carbon::now()->startOfDay();

        // Ambil semua progres peserta -> pastikan day_number int
        $progres = ChallengeProgres::where('challenge_participant_id', $participant->id)
            ->orderBy('day_number', 'asc')
            ->get();

        $uploadedDays = $progres->pluck('day_number')->map(function($v){ return (int) $v; })->toArray();

        // Tentukan batas pengecekan: hari yang kita periksa adalah sampai "hari kemarin" maksimal sampai endDate
        $lastCheckDate = $today->copy()->subDay();              // hari kemarin
        if ($lastCheckDate->greaterThan($endDate)) {
            $lastCheckDate = $endDate->copy();
        }

        // Kalau lastCheckDate masih sebelum startDate -> tidak ada yang perlu dicek
        $missedDays = [];
        if ($lastCheckDate->gte($startDate)) {
            // hitung nomor hari terakhir yang perlu dicek (1-based)
            $lastDayNumberToCheck = $startDate->diffInDays($lastCheckDate) + 1;
            // Pastikan tidak melebihi durasi
            $lastDayNumberToCheck = min($lastDayNumberToCheck, $duration);

            for ($i = 1; $i <= $lastDayNumberToCheck; $i++) {
                if (!in_array($i, $uploadedDays, true)) {
                    $missedDays[] = $i;
                }
            }
        }

        // Gagal hanya jika ada missedDays (yang artinya ada hari sebelum hari ini yang terlewat)
        if ((!empty($missedDays) || $today->greaterThan($endDate)) && $participant->status === 'in_progres') {
            $participant->update(['status' => 'failed']);
        }

        $uploadedToday = $progres->contains(function ($item) {
            return Carbon::parse($item->created_at)->isToday();
        });

        $rewardClaimed = NusantaraPoint::where('user_id', $user->id)
            ->where('uuid', $participant->uuid)
            ->exists();

        return inertia('RagamChallenge/ChallengeProgres', [
            'user' => $user,
            'participant' => $participant,
            'progres' => $progres,
            'uploadedToday' => $uploadedToday,
            'expired' => $today->greaterThan($endDate),
            'rewardClaimed' => $rewardClaimed,
            'cartCount' => Auth::user() ? Cart::where('user_id', Auth::user()->id)->sum('jumlah')  : 0,
        ]);
    }





    public function storeChallengeProgres(Request $request, $participantId)
    {
        $request->validate([
            'image_bukti' => 'required|image|max:2048',
        ]);

        $participant = ChallengeParticipant::findOrFail($participantId);

        $path = $request->file('image_bukti')->store('challenge_progres', 'public');

        ChallengeProgres::create([
            'challenge_participant_id' => $participant->id,
            'day_number' => ChallengeProgres::where('challenge_participant_id', $participant->id)->count() + 1,
            'image_bukti' => $path,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Bukti berhasil dikirim!');
    }


    public function claimReward($participantUuid)
    {
        $participant = ChallengeParticipant::where('uuid', $participantUuid)->firstOrFail();
        $user = auth()->user();

        $completedDays = $participant->progres()->where('status', 'approved')->count();
        if ($completedDays < $participant->challenge->duration_days) {
            return response()->json([
                'success' => false,
                'message' => 'Challenge belum selesai semua.'
            ], 400);
        }


        $alreadyClaimed = $user->nusantaraPoints()
            ->where('uuid', $participantUuid)
            ->exists();
        if ($alreadyClaimed) {
            return response()->json([
                'success' => false,
                'message' => 'Reward sudah diklaim.'
            ], 400);
        }

        // Tambahkan poin
        NusantaraPoint::create([
            'uuid' => $participantUuid,
            "user_id" => $user->id,
            'amount' => $participant->challenge->nusantara_points ?? 50,
            'source' => 'Challenge: '.$participant->challenge->title,
        ]);

        // Update status participant
        $participant->update(['status' => 'completed']);
    }



    public function kuisNusantara()
    {
        $now = now();

        $quizzes = Quiz::select('id', 'uuid', 'title', 'description', 'is_premium', 'start_at', 'end_at', 'duration_minutes')
            ->where(function ($query) use ($now) {
                // hanya tampilkan kuis yang sudah mulai & belum berakhir
                $query->whereNull('start_at')->orWhere('start_at', '<=', $now);
            })
            ->where(function ($query) use ($now) {
                $query->whereNull('end_at')->orWhere('end_at', '>=', $now);
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'uuid' => $quiz->uuid,
                    'title' => $quiz->title,
                    'description' => $quiz->description ?? '',
                    'is_premium' => $quiz->is_premium,
                    'status' => $quiz->is_premium ? 'premium' : 'gratis',
                    'start_at' => optional($quiz->start_at)->toDateTimeString(),
                    'end_at' => optional($quiz->end_at)->toDateTimeString(),
                    'duration_minutes' => $quiz->duration_minutes,
                ];
            });

        return Inertia::render('KuisNusantara/Kuis', [
            'quizzes' => $quizzes,
            'user' => auth()->check()
                ? [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                    'role' => auth()->user()->getRoleNames()->first(),
                ]
                : null,
            'cartCount' => Auth::user() ? Cart::where('user_id', Auth::user()->id)->sum('jumlah')  : 0,
        ]);
    }


    public function mulaiKuisNusantara($uuid)
    {
        if (!auth()->check()) {
            return redirect('/masuk');
        }

        $quiz = Quiz::where('uuid', $uuid)
            ->with(['quizQuizQuestions.quizQuestion.answers'])
            ->firstOrFail();

        // Cek apakah user sudah ada attempt aktif
        $attempt = QuizAttempt::firstOrCreate(
            [
                'quiz_id' => $quiz->id,
                'user_id' => auth()->id(),
                'finished_at' => null,
            ],
            ['started_at' => now()]
        );

        // Load jawaban sebelumnya kalau ada
        $answers = $attempt->answers()->pluck('quiz_answer_id', 'quiz_question_id');

        return Inertia::render('KuisNusantara/Mulai', [
            'quiz' => [
                'uuid' => $quiz->uuid,
                'title' => $quiz->title,
                'duration_minutes' => $quiz->duration_minutes,
                'questions' => $quiz->quizQuizQuestions->map(function ($q) use ($answers) {
                    return [
                        'id' => $q->quizQuestion->id,
                        'question_text' => $q->quizQuestion->question_text,
                        'answers' => $q->quizQuestion->answers->map(fn($a) => [
                            'id' => $a->id,
                            'answer_text' => $a->answer_text,
                            'selected' => $answers[$q->quizQuestion->id] ?? null,
                        ]),
                    ];
                }),
            ],
            'attempt' => [
                'id' => $attempt->id,
                'started_at' => $attempt->started_at,
            ],
            'user' => auth()->user(),
            'cartCount' => Auth::user() ? Cart::where('user_id', Auth::user()->id)->sum('jumlah')  : 0,
        ]);
    }


    public function submitQuiz($uuid)
    {
        $quiz = Quiz::where('uuid', $uuid)->firstOrFail();
        $attempt = QuizAttempt::where('quiz_id', $quiz->id)
            ->where('user_id', auth()->id())
            ->whereNull('finished_at')
            ->firstOrFail();

        $answers = request('answers', []);

        $totalCorrect = 0;
        $answerDetails = [];

        foreach ($answers as $questionId => $answerId) {
            $answer = QuizAnswer::find($answerId);
            $isCorrect = $answer?->is_correct ?? false;

            if ($isCorrect) $totalCorrect++;

            QuizAttemptAnswer::updateOrCreate(
                [
                    'quiz_attempt_id' => $attempt->id,
                    'quiz_question_id' => $questionId,
                ],
                [
                    'quiz_answer_id' => $answerId,
                    'is_correct' => $isCorrect,
                ]
            );

            $answerDetails[] = [
                'question_id' => $questionId,
                'answer_id' => $answerId,
                'is_correct' => $isCorrect,
            ];
        }

        $totalQuestions = $quiz->quizQuizQuestions()->count();
        $score = round(($totalCorrect / $totalQuestions) * 100);

        // Generate rekomendasi
        if ($score === 100){
            $recommendation = "Kerja bagus! Semua jawaban benar, terus pertahankan.";
        } else if ($score >= 70){
            $recommendation = "Hampir sempurna! Perhatikan beberapa jawaban yang kurang tepat.";
        } else if ($score >= 50){
            $recommendation = "Perlu latihan lebih, review jawaban yang salah dan pelajari penjelasannya.";
        } else{
            $recommendation = "Skor rendah, sebaiknya pelajari ulang materi dan coba lagi.";
        }

        $attempt->update([
            'finished_at' => now(),
            'score' => $score,
            'recomendation' => $recommendation,
        ]);

        return redirect()->route('kuis-nusantara.lihat', [
            'uuid' => $uuid,
            'uuidAttempt' => $attempt->uuid,
            'cartCount' => Auth::user() ? Cart::where('user_id', Auth::user()->id)->sum('jumlah')  : 0,
        ]);
    }

    // Contoh fungsi generateRecommendation menggunakan AI (dummy)
    protected function generateRecommendation($quiz, $score, $answers)
    {
        // Bisa pakai API GPT seperti di JS-mu, tapi di PHP
        // Untuk contoh sederhana:
        if ($score === 100) return "Kerja bagus! Semua jawaban benar, terus pertahankan.";
        if ($score >= 70) return "Hampir sempurna! Perhatikan beberapa jawaban yang kurang tepat.";
        if ($score >= 50) return "Perlu latihan lebih, review jawaban yang salah dan pelajari penjelasannya.";
        return "Skor rendah, sebaiknya pelajari ulang materi dan coba lagi.";
    }

    protected function generateAIRecommendation(string $quizTitle, int $score, array $answerDetails): string
    {
        $questionsSummary = collect($answerDetails)->map(function ($a) {
            return "QID {$a['question_id']}: " . ($a['is_correct'] ? "Benar" : "Salah");
        })->join("\n");

        $prompt = "Buat rekomendasi belajar untuk quiz berjudul '{$quizTitle}' berdasarkan jawaban user berikut:\n{$questionsSummary}\nBerikan saran yang jelas, singkat, dan membangun, gunakan bahasa Indonesia.";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('VITE_OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'system', 'content' => 'Kamu adalah ahli pendidikan dan quiz Nusantara.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens' => 200,
            ]);

            $data = $response->json();

            return $data['choices'][0]['message']['content'] ?? "Rekomendasi tidak tersedia.";
        } catch (\Exception $e) {
            return "Terjadi kesalahan saat membuat rekomendasi.";
        }
    }


    public function lihatAttemptKuisNusantara($uuid, $uuidAttempt)
    {
        if (!auth()->check()) {
            return redirect('/masuk');
        }

        $quiz = Quiz::where('uuid', $uuid)
            ->with(['quizQuizQuestions.quizQuestion.answers'])
            ->firstOrFail();

        $attempt = QuizAttempt::where('uuid', $uuidAttempt)
            ->where('quiz_id', $quiz->id)
            ->where('user_id', auth()->id())
            ->with(['answers'])
            ->firstOrFail();

        // Map jawaban user
        $userAnswers = $attempt->answers->pluck('quiz_answer_id', 'quiz_question_id');

        $questions = $quiz->quizQuizQuestions->map(function ($q) use ($userAnswers) {
            $question = $q->quizQuestion;
            return [
                'id' => $question->id,
                'question_text' => $question->question_text,
                'answers' => $question->answers->map(function ($a) use ($userAnswers) {
                    return [
                        'id' => $a->id,
                        'answer_text' => $a->answer_text,
                        'is_correct' => $a->is_correct,
                        'selected_by_user' => ($userAnswers[$a->quiz_question_id] ?? null) == $a->id,
                        'answer_explanation' => $a->answer_explanation, // tambahan penjelasan jawaban
                    ];
                }),
                'explanation_correct' => $question->explanation_correct,
            ];
        });

        return Inertia::render('KuisNusantara/LihatAttempt', [
            'quiz' => [
                'uuid' => $quiz->uuid,
                'title' => $quiz->title,
                'duration_minutes' => $quiz->duration_minutes,
                'questions' => $questions,
            ],
            'attempt' => $attempt,
            'user' => auth()->user(),
            'cartCount' => Auth::user() ? Cart::where('user_id', Auth::user()->id)->sum('jumlah')  : 0,
        ]);
    }


}

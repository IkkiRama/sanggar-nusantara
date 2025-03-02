<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Carbon\Carbon;
use App\Models\Artikel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        try {

            $artikel = Artikel::select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id", "status_artikel")
            ->withoutTrashed()
            ->with(["kategori:id,nama", "user:id,name"])
            ->where("status_artikel", '!=', "draft")
            ->latest()
            ->paginate(7);

            if (empty($artikel)) {
                return response()->json([
                    "success" => false,
                    "data" => null,
                    "message" => "Artikel Tidak Ditemukan"
                ], 404, $headers);
            }

            return response()->json([
                "success" => true,
                "data" => $artikel,
                "message" => "Artikel Berhasil Ditampilkan"
            ], 200, $headers);

        } catch (\Exception $e) {

            return response()->json([
                "success" => false,
                "data" => null,
                "message" => "Terjadi Kesalahan pada Server: " . $e->getMessage()
            ], 500, $headers);

        }

    }

    /**
     * Randomly recommends 4 articles.
     */
    public function rekomendasi(): JsonResponse
    {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        try {
            // Mengambil 3 artikel secara acak
            $artikels = Artikel::select('title', "slug", "image", "status_artikel")
                        ->withoutTrashed()->inRandomOrder()->limit(4)->get();

            return response()->json([
                'success' => true,
                'data' => $artikels,
                'message' => 'Artikel berhasil diambil secara acak.'
            ], 200, $headers);
        } catch (\Exception $e) {
            // Tangani error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500, $headers);
        }
    }

    /**
     * Retrieve the 4 most recent articles for the home page.
     */
    public function homeArtikel(): JsonResponse
    {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        try {
            // Mengambil 4 artikel terbaru berdasarkan created_at
            $artikels = Artikel::select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "kategori_id", "status_artikel")
            ->withoutTrashed()
            ->with(["kategori:id,nama", "user:id,name"])
            ->where("status_artikel", '!=', "draft")
            ->orderBy('created_at', 'desc')
            ->limit(4)->get();

            return response()->json([
                'success' => true,
                'data' => $artikels,
                'message' => '4 artikel terbaru berhasil diambil.'
            ], 200, $headers);
        } catch (\Exception $e) {
            // Tangani error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500, $headers);
        }
    }

    public function getRandomArtikel() : JsonResponse {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        try{

            // Ambil artikel dengan views tertinggi selama satu bulan terakhir
            $trendingArtikel = Artikel::
                select('title','views', "slug", "image", "excerpt", "published_at", "user_id", "status_artikel")
                ->withoutTrashed()
                ->where("status_artikel", '!=', "draft")
                ->inRandomOrder()
                ->with("user:id,name")
                ->limit(3) // Batasi jumlah artikel
                ->get();

            return response()->json([
                'success' => true,
                'data' => $trendingArtikel,
                'message' => 'Artikel Trending Bulanan Berhasil Ditampilkan',
            ], 200, $headers);

        }catch (\Exception $e) {

            return response()->json([
                "success" => false,
                "data" => null,
                "message" => "Terjadi Kesalahan pada Server: " . $e->getMessage()
            ], 500, $headers);

        }

    }

    public function getTrendingMonthlyArtikel() : JsonResponse {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        // Hitung tanggal satu bulan ke belakang
        $oneMonthAgo = Carbon::now()->subMonth();

        try{

            // Ambil artikel dengan views tertinggi selama satu bulan terakhir
            $trendingArtikel = Artikel::select('title', "slug", "image", "status_artikel")
                ->where("status_artikel", '!=', "draft")
                ->withoutTrashed()
                ->where('published_at', '>=', $oneMonthAgo) // Artikel yang diterbitkan dalam 1 bulan terakhir
                ->orderBy('views', 'desc') // Urutkan berdasarkan views tertinggi
                ->limit(10) // Batasi jumlah artikel
                ->get();

            return response()->json([
                'success' => true,
                'data' => $trendingArtikel,
                'message' => 'Artikel Trending Bulanan Berhasil Ditampilkan',
            ], 200, $headers);

        }catch (\Exception $e) {

            return response()->json([
                "success" => false,
                "data" => null,
                "message" => "Terjadi Kesalahan pada Server: " . $e->getMessage()
            ], 500, $headers);

        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }



    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $headers = [
            'Content-Type' => 'application/json',
            'X-Powered-By' => 'Rifki Romadhan',
            'X-Content-Language' => 'id',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];

        try {
            $artikel = Artikel::where([
                ["slug", $slug],
                ["status_artikel", '!=', "draft"]
            ])
            ->withoutTrashed()
            ->with("komentar", "kategori:id,nama", "user:id,name")
            ->firstOrFail();

            if (empty($artikel)) {
                throw new \Exception("Artikel tidak ditemukan.");
            }

            // Ambil user yang sedang login
            $user = auth()->user();

            // Jika artikel premium, cek apakah user memiliki langganan aktif
            if ($artikel->status_artikel === 'premium') {
                $isPremiumUser = false;

                if ($user) {
                    $isPremiumUser = \App\Models\Subscription::where('user_id', $user->id)
                        ->where('status', 'aktif')
                        ->where('tanggal_berakhir', '>=', now()) // Langganan masih berlaku
                        ->exists();
                }

                if (!$isPremiumUser) {
                    return response()->json([
                        "success" => false,
                        "message" => "Artikel ini hanya tersedia untuk pengguna premium. Silakan berlangganan untuk mengakses konten lengkap.",
                        "data" => [
                            "title" => $artikel->title,
                            "excerpt" => $artikel->excerpt,
                            "kategori" => $artikel->kategori->nama ?? null
                        ]
                    ], 403, $headers);
                }
            }

            // Tambah view count jika user bisa mengakses artikel penuh
            $artikel->increment('views');

            return response()->json([
                "success" => true,
                "data" => $artikel,
                "message" => "Artikel ".$slug." Berhasil ditampilkan"
            ], 200, $headers);

        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "data" => null,
                "message" => "Error: " . $e->getMessage()
            ], 500, $headers);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

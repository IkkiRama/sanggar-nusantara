<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Event;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{

    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Ambil semua item cart milik user
        $cartItems = Cart::where('user_id', $userId)->get();

        // Kelompokkan berdasarkan item_type
        $groupedItems = $cartItems->groupBy('item_type');

        // Siapkan hasil akhir
        $result = [];

        foreach ($cartItems as $item) {
            $itemDetails = null;

            switch ($item->item_type) {
                case 'event':
                    // Optional: gunakan cache, jika perlu
                    $itemDetails = Event::find($item->item_id);
                    break;

                case 'subscription':
                    $itemDetails = Plan::find($item->item_id);
                    break;

                // case 'product':
                //     $itemDetails = Product::find($item->item_id);
                //     break;

                // case 'course':
                //     $itemDetails = Course::find($item->item_id);
                //     break;

                default:
                    $itemDetails = null;
                    break;
            }

            $result[] = [
                'id' => $item->id,
                'item_type' => $item->item_type,
                'jumlah' => $item->jumlah,
                'data' => $itemDetails,
            ];
        }

        return Inertia::render('Cart', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->count() : 0,
            'keranjang' => $result,
        ]);
    }

    public function addSubscriptionToCart(Request $request)
    {
        // Jika user belum login
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Silakan login terlebih dahulu.'
            ], 401);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'item_id' => 'required|integer',
            'item_type' => 'required|string',
            'jumlah' => 'required|integer|min:1',
        ]);

        $validated['user_id'] = Auth::id();

        // Cek apakah user sudah punya item subscription lain di keranjang
        if ($validated['item_type'] === 'subscription') {
            $existingSubscription = Cart::where('user_id', $validated['user_id'])
                ->where('item_type', 'subscription')
                ->first();

            if ($existingSubscription) {
                return response()->json([
                    'message' => 'Anda sudah memiliki langganan di keranjang. Silakan hapus dulu untuk memilih yang lain.'
                ], 409); // 409 Conflict
            }
        }

        // Tambahkan ke cart (atau update jika item sama kecuali subscription)
        $existing = Cart::where('user_id', $validated['user_id'])
            ->where('item_id', $validated['item_id'])
            ->where('item_type', $validated['item_type'])
            ->first();

        if ($existing) {
            $existing->jumlah += $validated['jumlah'];
            $existing->save();
        } else {
            Cart::create($validated);
        }

        return response()->json(['message' => 'Berhasil ditambahkan ke keranjang.']);
    }

    public function addEventToCart(Request $request)
    {
        $userId = $request->user_id;

        foreach ($request->items as $item) {
            // Hitung total jumlah semua baris untuk event yang sama
            $existingJumlah = Cart::where('user_id', $userId)
                ->where('item_type', $item['item_type']) // biasanya 'event'
                ->where('item_id', $item['item_id'])     // ID event
                ->sum('jumlah');                         // total semua jumlah, terlepas dari variasi

            $jumlahBaru = $item['jumlah'];

            if ($existingJumlah >= 5) {
                return response()->json([
                    'message' => 'Sudah ada ' . $existingJumlah . ' tiket dalam keranjang anda',
                ], 422);
            } elseif (($existingJumlah + $jumlahBaru) > 5) {
                return response()->json([
                    'message' => 'Sudah ada ' . $existingJumlah . ' tiket dalam keranjang anda. Anda hanya bisa membeli ' . (5 - $existingJumlah) . ' tiket tambahan',
                ], 422);
            } elseif ($jumlahBaru > 5) {
                return response()->json([
                    'message' => 'Maksimal pembelian tiket untuk event ini adalah 5 tiket.',
                ], 422);
            }

            // Tambahkan atau update jumlah di cart untuk kombinasi variasi yang unik
            $cartItem = Cart::firstOrNew([
                'user_id' => $userId,
                'item_id' => $item['item_id'],
                'item_type' => $item['item_type'],
                'variasi' => $item['variasi'],
            ]);

            $cartItem->jumlah += $jumlahBaru;
            $cartItem->save();
        }

        return response()->json(['message' => 'Tiket berhasil ditambahkan ke keranjang.'], 200);
    }




}

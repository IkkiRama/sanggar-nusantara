<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{

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
            Cart::updateOrCreate(
                [
                    'user_id' => $userId,
                    'item_id' => $item['item_id'],
                    'item_type' => $item['item_type']
                ],
                ['jumlah' => DB::raw('jumlah + ' . $item['jumlah'])]
            );
        }

        return response()->json(['message' => 'Berhasil ditambahkan ke keranjang.'], 200);
    }


}

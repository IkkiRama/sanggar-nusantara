<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Event;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
                'variasi' => $item->variasi,
                'harga' => $item->harga,
                'subtotal' => $item->subtotal,
                'jumlah' => $item->jumlah,
                'data' => $itemDetails,
            ];
        }

        return Inertia::render('Cart', [
            "user" => $user = Auth::user(),
            'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
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

        // Manual validator
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'item_id' => 'required|integer',
            'item_type' => 'required|string|in:subscription',
            'jumlah' => 'required|integer|min:1',
            'variasi' => 'required|string',
            'harga' => 'required|integer|min:0',
            'subtotal' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Ambil data tervalidasi
        $validated = $validator->validated();
        $validated['user_id'] = Auth::id(); // paksa user ID dari auth

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

        // Validasi awal untuk user_id dan items
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|integer',
            'items.*.item_type' => 'required|string|in:subscription,product,event,course',
            'items.*.jumlah' => 'required|integer|min:1|max:5',
            'items.*.variasi' => 'required|string',
            'items.*.harga' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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

            $cartItem->harga = $item['harga'];
            $cartItem->subtotal = $item['subtotal'];
            $cartItem->jumlah += $jumlahBaru;
            $cartItem->save();
        }

        return response()->json(['message' => 'Tiket berhasil ditambahkan ke keranjang.'], 200);
    }

    public function updateCartQuantity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required|exists:carts,id',
            'jumlah' => 'required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cart = Cart::find($request->cart_id);
        $cart->jumlah = $request->jumlah;
        $cart->subtotal = $cart->harga * $cart->jumlah;
        $cart->save();

        return response()->json([
            'message' => 'Jumlah berhasil diperbarui',
            'jumlah' => $cart->jumlah,
            'subtotal' => $cart->subtotal,
        ]);
    }


    public function deleteCartItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required|exists:carts,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        Cart::destroy($request->cart_id);

        return response()->json(['message' => 'Item berhasil dihapus dari keranjang']);
    }






}

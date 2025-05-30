<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

// Tambahkan di atas route API kamu
// RateLimiter::for('api', function (Request $request) {
//     return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
// });

Route::post('/komen', [FrontController::class, 'storeKomenAPI']);
Route::post('/kontak', [FrontController::class, 'submitKontak']);

Route::get('/artikel/{slug}', [FrontController::class, 'showArtikel']);

Route::middleware(['web'])->group(function () {
    Route::post('/midtrans-callback', [TransaksiController::class, 'updateTransaction']); // Callback Midtrans

    Route::get('/midtrans/token/{order_id}', [ProfileController::class, 'getSnapToken']);
    Route::post('/event/batalkan/{orderId}', [ProfileController::class, 'batalkanTransaksi']);

    Route::post('/bayar', [TransaksiController::class, 'storeOrderAPI']);



    Route::post('/profile/update', [ProfileController::class, 'updateProfileAPI']);
    Route::post('/updatePassword', [FrontController::class, 'updatePasswordAPI']);

});





// Route::post('/daftar', [AuthController::class, 'postRegister']);
// Route::post('/masuk', [AuthController::class, 'postLogin']);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



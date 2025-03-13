<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontController::class, 'index']);
Route::get('/subscription', [FrontController::class, 'subscription']);
Route::get('/peta-interaktif', [FrontController::class, 'petaInteraktif']);
// Route::post('/komen', [FrontController::class, 'storeKomen']);

Route::get('/event', [FrontController::class, 'event']);
Route::get('/event/{slug}', [FrontController::class, 'showEvent']);

Route::get('/artikel', [FrontController::class, 'artikel']);
Route::get('/artikel/{slug}', [FrontController::class, 'showArtikel']);

Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
Route::get('/payment-success/{orderId}', [FrontController::class, 'paymentSuccess']);
Route::get('/etiket/{orderId}', [ProfileController::class, 'etiket']);
Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
Route::get('/profile/edit', [ProfileController::class, 'profileEdit']);
Route::get('/profile/transaksi', [ProfileController::class, 'transaksi']);

Route::get('/ragam-indonesia', [FrontController::class, 'ragamIndonesia']);
Route::get('/ragam-indonesia/bahasa-daerah', [FrontController::class, 'alatMusik']);
Route::get('/ragam-indonesia/alat-musik', [FrontController::class, 'alatMusik']);
Route::get('/ragam-indonesia/rumah-adat', [FrontController::class, 'rumahAdat']);
Route::get('/ragam-indonesia/seni-tari', [FrontController::class, 'laguDaerah']);
Route::get('/ragam-indonesia/lagu-daerah', [FrontController::class, 'laguDaerah']);
Route::get('/ragam-indonesia/rumah-adat/{slug}', [FrontController::class, 'showRumahAdat']);
Route::get('/ragam-indonesia/makanan-khas', [FrontController::class, 'makananKhas']);
Route::get('/ragam-indonesia/makanan-khas/{slug}', [FrontController::class, 'showMakananKhas']);

Route::get('/login', [AuthController::class, 'masuk'])->name('masuk');
Route::post('/login', [AuthController::class, 'postMasuk']);

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('daftar', [AuthController::class, 'register'])->name('register');
    Route::post('daftar', [AuthController::class, 'postRegister']);
});

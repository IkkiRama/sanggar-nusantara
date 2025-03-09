<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontController::class, 'index']);
Route::get('/event', [FrontController::class, 'event']);
Route::get('/event/{slug}', [FrontController::class, 'showEvent']);
Route::get('/subscription', [FrontController::class, 'subscription']);
Route::get('/peta-interaktif', [FrontController::class, 'petaInteraktif']);
Route::get('/artikel', [FrontController::class, 'artikel']);
Route::get('/artikel/{slug}', [FrontController::class, 'showArtikel']);

Route::get('/profile', [FrontController::class, 'profile']);
Route::get('/profile/edit', [FrontController::class, 'profileEdit']);
Route::get('/profile/event', [FrontController::class, 'profileEvent']);
Route::get('/profile/subscription', [FrontController::class, 'profileSubscription']);
Route::get('/profile/transaksi', [FrontController::class, 'transaksi']);

Route::get('/ragam-indonesia', [FrontController::class, 'ragamIndonesia']);
Route::get('/ragam-indonesia/alat-musik', [FrontController::class, 'alatMusik']);
Route::get('/ragam-indonesia/rumah-adat', [FrontController::class, 'rumahAdat']);
Route::get('/ragam-indonesia/lagu-daerah', [FrontController::class, 'laguDaerah']);
Route::get('/ragam-indonesia/rumah-adat/{slug}', [FrontController::class, 'showRumahAdat']);
Route::get('/ragam-indonesia/makanan-khas', [FrontController::class, 'makananKhas']);
Route::get('/ragam-indonesia/makanan-khas/{slug}', [FrontController::class, 'showMakananKhas']);

Route::get('masuk', [AuthController::class, 'masuk'])->name('masuk');
Route::post('masuk', [AuthController::class, 'postMasuk']);

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('daftar', [AuthController::class, 'register'])->name('register');
    Route::post('daftar', [AuthController::class, 'postRegister']);
});

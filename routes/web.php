<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Support\Facades\Route;
use Endroid\QrCode\Builder\Builder;


Route::get('/', [FrontController::class, 'index']);
Route::get('/subscription', [FrontController::class, 'subscription']);
Route::get('/peta-interaktif', [FrontController::class, 'petaInteraktif']);
// Route::post('/komen', [FrontController::class, 'storeKomen']);

Route::get('/event', [FrontController::class, 'event']);
Route::get('/event/{slug}', [FrontController::class, 'showEvent']);
Route::get('/payment-status/{orderId}', [TransaksiController::class, 'paymentSuccess']);

Route::get('/artikel', [FrontController::class, 'artikel']);
Route::get('/artikel/{slug}', [FrontController::class, 'detailArtikel']);

Route::get('/profile/dashboard', [ProfileController::class, 'index']);
Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
Route::get('/etiket/{orderId}', [ProfileController::class, 'etiket']);
Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
Route::get('/profile/edit', [ProfileController::class, 'profileEdit']);
Route::get('/profile/transaksi', [ProfileController::class, 'transaksi']);
Route::get('/profile/ubah-password', [ProfileController::class, 'ubahPassword']);

Route::get('/download-etiket/{orderId}', [ProfileController::class, 'downloadEtiket']);
Route::get('/qr/{orderId}/{ticketNo}', [ProfileController::class, 'generateQr']);

Route::get('/ragam-indonesia', [FrontController::class, 'ragamIndonesia']);
Route::get('/ragam-indonesia/bahasa-daerah', [FrontController::class, 'bahasaDaerah']);
Route::get('/ragam-indonesia/alat-musik', [FrontController::class, 'alatMusik']);
Route::get('/ragam-indonesia/rumah-adat', [FrontController::class, 'rumahAdat']);
Route::get('/ragam-indonesia/seni-tari', [FrontController::class, 'seniTari']);
Route::get('/ragam-indonesia/lagu-daerah', [FrontController::class, 'laguDaerah']);
Route::get('/ragam-indonesia/makanan-khas', [FrontController::class, 'makananKhas']);

Route::get('/login', function () {
    return redirect('/admin/login');
})->name('masuk');

// Route untuk user yang sudah login (auth)
Route::middleware('auth')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

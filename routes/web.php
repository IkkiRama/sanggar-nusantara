<?php

use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\NusantaraAIController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use App\Models\Cart;
use Illuminate\Support\Facades\Route;
use Endroid\QrCode\Builder\Builder;

use Illuminate\Support\Facades\Auth;

Route::get('/', [FrontController::class, 'index']);
Route::get('/subscription', [FrontController::class, 'subscription']);
Route::get('/tentang-kami', [FrontController::class, 'tentangKami']);
Route::get('/peta-interaktif', [FrontController::class, 'petaInteraktif']);
Route::get('/terms', function () {
    return Inertia::render('TermsAndConditions', [
        "user" => $user = Auth::user(),
        'cartCount' => $user ? Cart::where('user_id', $user->id)->sum('jumlah') : 0,
    ]);
})->name('terms');


Route::get('/event', [FrontController::class, 'event']);
Route::get('/event/{slug}', [FrontController::class, 'showEvent']);

Route::get('/artikel', [FrontController::class, 'artikel']);
Route::get('/artikel/{slug}', [FrontController::class, 'detailArtikel']);


Route::post('/api/addSubscription', [CartController::class, 'addSubscriptionToCart'])->middleware('auth');
Route::post('/api/cart/addEvent', [CartController::class, 'addEventToCart'])->middleware('auth');
Route::post('/api/cart/update-quantity', [CartController::class, 'updateCartQuantity'])->middleware('auth');
Route::post('/api/cart/delete-item', [CartController::class, 'deleteCartItem'])->middleware('auth');
Route::post('/api/diskon', [TransaksiController::class, 'showDiskonAPI'])->middleware('auth');


Route::get('/ragam-indonesia', [FrontController::class, 'ragamIndonesia']);
Route::get('/ragam-indonesia/bahasa-daerah', [FrontController::class, 'bahasaDaerah']);
Route::get('/ragam-indonesia/alat-musik', [FrontController::class, 'alatMusik']);
Route::get('/ragam-indonesia/rumah-adat', [FrontController::class, 'rumahAdat']);
Route::get('/ragam-indonesia/seni-tari', [FrontController::class, 'seniTari']);
Route::get('/ragam-indonesia/lagu-daerah', [FrontController::class, 'laguDaerah']);
Route::get('/ragam-indonesia/makanan-khas', [FrontController::class, 'makananKhas']);

Route::get('/nusantara-ai', [FrontController::class, 'nusantaraAI']);
Route::get('/ragam-challenge', [FrontController::class, 'ragamChallenge']);
Route::get('/ragam-challenge/{slug}', [FrontController::class, 'detailRagamChallenge']);


// Route::get('/admin/login', [AuthController::class, 'login'])->name("login");
Route::get('/auth-google-redirect', [AuthController::class, 'googleRedirect']);
Route::get('/auth-google-callback', [AuthController::class, 'googleCallback']);
Route::get('/masuk', [AuthController::class, 'login'])->name("login");

Route::get('/syarat', [AuthController::class, 'syarat']);
Route::get('/kebijakan-privasi', [AuthController::class, 'kebijakanPrivasi']);
// Route::get('/login', function () {
//     return redirect('/admin/login');
// })->name('masuk');

// Route::middleware('web')->get('/test-session', function () {
// Route::middleware(['auth:sanctum'])->get('/test-session', function () {
//     return dd(Auth::guard('sanctum')->user());
// });

Route::post('/nusantara/ask', [NusantaraAIController::class, 'ask']);

// Route untuk user yang sudah login (auth)
Route::middleware(['web', 'auth'])->group(function () {
    // Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('/ragam-challenge/{id}/join', [FrontController::class, 'joinChallenge'])->name('challenge.join');
    Route::post('/ragam-challenge/{id}/stop', [FrontController::class, 'stopChallenge'])->name('challenge.stop');

    Route::get('/ragam-challenge/{slug}/progres', [FrontController::class, 'challengeProgres'])->name('challenge.progres');
    Route::post('/ragam-challenge/{slug}/progres', [FrontController::class, 'storeChallengeProgres'])->name('challenge.progres.store');


    Route::get('/profile/dashboard', [ProfileController::class, 'index']);
    Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
    Route::get('/profile/etiket/{orderId}', [ProfileController::class, 'etiket']);
    Route::get('/profile/invoice/{orderId}', [ProfileController::class, 'invoice']);
    Route::get('/profile/edit', [ProfileController::class, 'profileEdit']);
    Route::get('/profile/transaksi', [ProfileController::class, 'transaksi']);
    Route::get('/profile/ubah-password', [ProfileController::class, 'ubahPassword']);

    Route::get('/download-etiket/{orderId}', [ProfileController::class, 'downloadEtiket']);
    Route::get('/qr/{orderId}/{ticketNo}', [ProfileController::class, 'generateQr']);

    Route::get('/keranjang', [CartController::class, 'index']);

    Route::get('/payment-status/{orderId}', [TransaksiController::class, 'paymentSuccess']);
});

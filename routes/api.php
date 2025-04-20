<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/artikel/{slug}', [FrontController::class, 'showArtikel']);
Route::post('/komen', [FrontController::class, 'storeKomenAPI']);
Route::post('/diskon', [FrontController::class, 'showDiskonAPI']);
Route::post('/bayar', [TransaksiController::class, 'storeOrderAPI']);
// Route::post('/updatePassword', [FrontController::class, 'updatePasswordAPI']);
// Route::middleware('auth:sanctum')->get('/midtrans/token/{order_id}', [ProfileController::class, 'getSnapToken']);
Route::post('/midtrans-callback', [TransaksiController::class, 'updateTransaction']); // Callback Midtrans

Route::get('/midtrans/token/{order_id}', [ProfileController::class, 'getSnapToken']);
Route::post('/event/batalkan/{orderId}', [ProfileController::class, 'batalkanTransaksi']);

Route::middleware(['auth:sanctum', 'cors'])->group(function () {
});


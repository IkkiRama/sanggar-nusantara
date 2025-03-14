<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/komen', [FrontController::class, 'storeKomenAPI']);
Route::post('/diskon', [FrontController::class, 'showDiskonAPI']);
Route::post('/bayar', [FrontController::class, 'storeOrderAPI']);
// Route::post('/updatePassword', [FrontController::class, 'updatePasswordAPI']);
Route::get('/midtrans/token/{order_id}', [ProfileController::class, 'getSnapToken']);
Route::post('/midtrans-callback', [FrontController::class, 'updateTransaction']); // Callback Midtrans


// Route::middleware('auth:sanctum')->group(function () {
// });


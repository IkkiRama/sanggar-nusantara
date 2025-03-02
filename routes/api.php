<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/rekomendasi', [ArtikelController::class, 'rekomendasi']);
Route::get('/artikel/rekomendasi-detail-artikel', [ArtikelController::class, 'getRandomArtikel']);
Route::get('/artikel/homeArtikel', [ArtikelController::class, 'homeArtikel']);
Route::get('/artikel/trending-monthly', [ArtikelController::class, 'getTrendingMonthlyArtikel']);
Route::get('/artikel/{slug}', [ArtikelController::class, 'show']);


Route::get('/event', [EventController::class, 'index']);
Route::get('/event/homeEvent', [EventController::class, 'homeEvent']);
Route::get('/event/rekomendasiEvent', [EventController::class, 'rekomendasiEvent']);
Route::get('/event/{slug}', [EventController::class, 'show']);

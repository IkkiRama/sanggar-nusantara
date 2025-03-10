<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrontController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/komen', [FrontController::class, 'storeKomen']);

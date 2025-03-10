<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    function index() {
        return Inertia::render('Profile', [
            'user' => Auth::user(),
        ]);
    }

    function profileEdit() {
        return Inertia::render('EditProfile', [
            'user' => Auth::user(),
        ]);
    }

    function transaksi() {
        return Inertia::render('TransaksiProfile', [
            'user' => Auth::user(),
        ]);
    }
}

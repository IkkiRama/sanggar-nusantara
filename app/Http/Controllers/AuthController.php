<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{

    public function login(Request $request)
    {
        return Inertia::render('Auth/Login', []);
    }

    public function loginWeb(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('web')->attempt($credentials, $request->remember)) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout(); // Logout user

        $request->session()->invalidate(); // Hapus sesi pengguna
        $request->session()->regenerateToken(); // Regenerasi token CSRF untuk keamanan

        return redirect('/admin/login')->with('success', 'Anda telah logout.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    public function login()
    {
        if (Auth::check()) {
            return redirect('/');
        }

        return Inertia::render('Auth/Login', []);
    }

    public function syarat()
    {
        return Inertia::render('Auth/TermsPage', []);
    }

    public function kebijakanPrivasi()
    {
        return Inertia::render('Auth/PrivacyPolicy', []);
    }

    public function googleRedirect() {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $dataUser = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                // 'image' => $googleUser->getAvatar(),
                'email_verified_at' => now(),
            ]
        );

        // Kalau user baru dibuat, langsung kasih role 'user'
        if ($dataUser->wasRecentlyCreated) {
            $dataUser->syncRoles(['user']);
        }

        Auth::login($dataUser);

        return redirect('/');
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

        return redirect('/masuk')->with('success', 'Anda telah logout.');
    }
}

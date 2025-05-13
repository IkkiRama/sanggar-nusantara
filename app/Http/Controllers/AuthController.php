<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        return Inertia::render('Register', []);
    }

    public function login(Request $request)
    {
        return Inertia::render('Login', []);
    }

    public function postRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'token' => $user->createToken('Sanggar Nusantara')->plainTextToken
        ]);
    }

    public function postLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('Sanggar Nusantara')->plainTextToken;

            // Simpan ID pengguna ke session
            session(['user_id' => $user->id]);

            // Simpan token ke dalam session juga jika diperlukan
            session(['api_token' => $token]);

            // Mengirimkan ID pengguna dan token sebagai response
            return response()->json([
                'user_id' => $user->id,
                'token' => $token
            ])
            ->cookie('user_id', $user->id, 60, '/', null, false, true) // ← cookie user_id
            ->cookie('api_token', $token, 60, '/', null, false, true); // ← cookie token
        }

        return response()->json(['message' => 'Unauthorized'], 401);
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

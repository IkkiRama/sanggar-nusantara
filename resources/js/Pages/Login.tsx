import React, { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Inertia
import axios from 'axios';
import { Link } from '@inertiajs/react';
import AuthLayout from '../Layouts/authLayout';
import AuthNavbar from '../Layouts/authNavbar';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [error, setError] = useState('');

  // handle submit form untuk login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Login menggunakan Session (Inertia)
    post('/masuk');  // Ini untuk memulai session login, menggunakan Laravel default session auth

    // 2. Login menggunakan API (Sanctum)
    // try {
    //   axios.defaults.withCredentials = true; // Kirim cookie jika diperlukan
    //   const response = await axios.post('/api/login', {
    //     email: data.email,
    //     password: data.password,
    //   });

    //   const token = response.data.token;
    //   if (token) {
    //     // Simpan token di localStorage atau state sesuai kebutuhan
    //     localStorage.setItem('token', token);
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     alert('Login successful!');
    //   } else {
    //     console.error("Token tidak ditemukan di response:", response.data);
    //   }
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Login gagal');
    // }
  };

  return (
    <AuthLayout title='Masuk | Sanggar Nusantara'>
      <AuthNavbar />
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Masuk</h2>

          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="example@example.com"
                className="mt-1 p-3 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="********"
                className="mt-1 p-3 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 bg-red-600 text-white px-6 py-3 rounded-md w-full hover:bg-red-700 focus:outline-none font-semibold focus:ring-2 cursor-pointer focus:ring-red-500"
                disabled={processing}
              >
                Masuk
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link href="/daftar" className="text-red-600 hover:text-red-700 font-medium">
                Daftar Disini!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

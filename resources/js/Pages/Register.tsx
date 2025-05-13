import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../Layouts/authLayout';
import AuthNavbar from '../Layouts/authNavbar';
import { Link } from '@inertiajs/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/daftar', { name, email, password });
      alert('Registration successful!');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title='Daftar | Sanggar Nusantara' >
        <AuthNavbar />
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Nama Lengkap
                </label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-1 p-3 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email 
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="mt-1 p-3 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 p-3 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                />
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <div className="flex justify-center">
                <button
                type="submit"
                className="mt-4 bg-red-600 text-white px-6 py-3 rounded-md w-full hover:bg-red-700 cursor-pointer font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                Daftar
                </button>
            </div>
            </form>

            <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/masuk" className="text-red-600 hover:text-red-700 font-medium">
                    Masuk Disini!
                </Link>
            </p>
            </div>
        </div>
        </div>
    </AuthLayout>
  );
};

export default Register;

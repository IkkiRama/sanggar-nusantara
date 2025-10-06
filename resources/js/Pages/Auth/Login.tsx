import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/mainLayout';
import LightNavbar from '../../layouts/lightNavbar';
import { Info } from 'lucide-react';

const Login = ({ user, cartCount }) => {
  return (
    <MainLayout title={`Masuk | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="min-h-screen py-25 lg:py-0 lg:pt-15 lg:px-0 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl md:text-xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Selamat Datang di Sanggar Nusantara
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
            Platform digital untuk menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia. Eksplorasi budaya nusantara melalui fitur interaktif dan konten eksklusif.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl w-full max-w-md p-8 mb-7 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
            Masuk Kembali
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Masuk untuk mengakses dunia budaya Nusantara
          </p>

          {/* Sign in Button */}
          <a
            href="/auth-google-redirect"
            className="w-full flex items-center justify-center my-7 md:my-10 gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 cursor-pointer rounded-md shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Lanjutkan dengan Google
            </span>
          </a>

          {/* Terms */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Dengan masuk, Anda setuju <br /> dengan{" "}
            <Link href="/syarat" className="text-blue-600 dark:text-blue-400 hover:underline">
              syarat
            </Link>{" "}
            dan{" "}
            <Link href="/kebijakan-privasi" className="text-blue-600 dark:text-blue-400 hover:underline">
              kebijakan privasi
            </Link>{" "}
            website
          </p>

          {/* Info Box */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md text-sm text-gray-600 dark:text-gray-300 flex">
            <Info className="h-10 w-10 text-blue-500 mr-2" />
            <div className="flex flex-col">
              <strong className="">Info Login:</strong>
              <span className="mt-1 text-sm">
                Pengguna baru akan otomatis didaftarkan saat login pertama kali dengan Google.
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Butuh bantuan? Hubungi{" "}
          <a
            className="font-semibold text-blue-500 dark:text-blue-400"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=georgeikkirama@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            georgeikkirama@gmail.com
          </a>
        </p>
      </div>
    </MainLayout>
  );
};

export default Login;

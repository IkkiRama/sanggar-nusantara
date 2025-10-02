import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/authLayout';
import AuthNavbar from '../../Layouts/authNavbar';
import MainLayout from '../../Layouts/mainLayout';
import LightNavbar from '../../layouts/lightNavbar';
import { Info } from 'lucide-react';

const Login = ({user, cartCount}) => {

  return (
    <MainLayout title={`Syarat dan Ketentuan | Sanggar Nusantara`} >

        <LightNavbar user={user} cartCount={cartCount} />

        <div className="min-h-screen py-25 lg:py-0 lg:px-0 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-xl md:text-xl lg:text-3xl font-semibold text-gray-800">
                    Selamat Datang di Sanggar Nusantara
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl">
                    Platform digital untuk menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia. Eksplorasi budaya nusantara melalui fitur interaktif dan konten eksklusif.
                </p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Masuk Kembali
                </h2>
                <p className=" text-center text-gray-600 mt-2">
                    Masuk untuk mengakses dunia budaya Nusantara
                </p>

                {/* Sign in Button */}
                <button className="w-full flex items-center justify-center my-7 md:my-10 gap-2 py-2 px-4 border border-gray-300 cursor-pointer rounded-md shadow-sm bg-white hover:bg-gray-50 transition">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">
                        Lanjutkan dengan Google
                    </span>
                </button>

                {/* Terms */}
                <p className="text-sm text-gray-500 text-center">
                    Dengan masuk, Anda setuju <br/> dengan{" "}

                    <a href="#" className="text-blue-600 hover:underline">
                        syarat
                    </a>{" "}

                    dan{" "}

                    <a href="#" className="text-blue-600 hover:underline">
                        kebijakan privasi
                    </a>{" "}

                    konferensi
                </p>

                {/* Info Box */}
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-600 flex">
                    <Info className="h-10 fill-blue-500 text-white w-10 hidden"></Info>
                    <div className="flex flex-col ml-2">
                        <strong className="">Info Login:</strong>
                        <span className="mt-1 text-sm">
                            Pengguna baru akan otomatis didaftarkan saat login pertama kali dengan Google.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
  );
};

export default Login;

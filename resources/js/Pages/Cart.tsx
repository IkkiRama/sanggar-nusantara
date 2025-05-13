import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

export default function HostingCart() {
  return (

    <MainLayout title="Keranjang | Sanggar Nusantara">
        <LightNavbar user={user} />
        <div className="min-h-screen bg-[#F5F6FF] p-4 font-sans">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white p-4 rounded-xl text-center mb-6 relative">
            <p className="font-semibold text-sm">Jangan lewatkan!</p>
            <p className="text-2xl font-bold">+ 3 bulan gratis di paket 48 bulan</p>
            <div className="absolute top-2 right-4 bg-[#4F46E5] px-4 py-1 rounded-md text-xs">
            00 : 07 : 55 : 25
            </div>
        </div>

        {/* Cart */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">Cart Anda</h1>
            <div>
                <h2 className="text-xl font-semibold">Event</h2>

            </div>

            <div>
                <h2 className="text-xl font-semibold">Paket Langganan</h2>
                <label className="block mt-4 text-sm font-medium text-gray-700">Durasi</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                <option>48 bulan</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                Biaya perpanjangan Rp49.900/bln per 4 tahun. Bisa dibatalkan kapan saja!
                </p>
                <div className="mt-4 flex items-center justify-between">
                <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                    HEMAT RP4.080.000
                </span>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">Rp24.900/bln</p>
                    <p className="text-sm line-through text-gray-400">Rp109.900/bln</p>
                </div>
                </div>
                <div className="mt-4 bg-green-50 border-l-4 border-green-400 text-green-700 p-4 text-sm rounded">
                Selamat! Anda dapat domain <strong>GRATIS</strong> dan 3 bulan <strong>GRATIS</strong> di paket ini.
                </div>
            </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Subtotal</h3>
            <p className="text-2xl font-bold text-gray-800">Rp1.195.200</p>
            <p className="text-sm line-through text-gray-400">Rp5.275.200</p>
            <div className="mt-2 text-sm text-green-700 font-medium">Diskon -77%</div>
            <div className="text-green-700">-Rp4.080.000</div>

            <div className="mt-4">
                <p className="text-sm text-purple-700 font-medium">Punya Kode Kupon?</p>
                <div className="flex mt-1 gap-2">
                <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="Tambahkan kode kupon"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                    Tambahkan
                </button>
                </div>
            </div>

            <button className="w-full mt-6 bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800">
                Lanjutkan
            </button>

            <p className="mt-3 text-xs text-gray-500 text-center">
                GARANSI 30 HARI UANG KEMBALI
            </p>
            </div>
        </div>
        </div>
    </MainLayout>
  );
}

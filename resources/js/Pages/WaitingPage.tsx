import { ClockIcon, XCircleIcon } from "lucide-react";
import { Link } from "@inertiajs/react";
import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import ProfileLayout from './../Layouts/profileLayout';

function WaitingPage({ user, status, cartCount }) {

  return (
    <ProfileLayout>
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="flex px-4 flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
          {status === "pending" ? (
            <>
              {/* Icon Pending (Clock) */}
              <div className="flex justify-center">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <ClockIcon className="w-16 h-16 text-yellow-500" />
                </div>
              </div>
              <h2 className="text-yellow-600 text-2xl font-semibold mt-4">Transaksi Anda Belum Selesai</h2>
              <p className="text-gray-600 mt-2">Anda menutup halaman pembayaran. Silakan lanjutkan untuk menyelesaikan transaksi.</p>
            </>
          ) : (
            <>
              {/* Icon X (Gagal) */}
              <div className="flex justify-center">
                <div className="bg-red-100 p-4 rounded-full">
                  <XCircleIcon className="w-16 h-16 text-red-500" />
                </div>
              </div>
              <h2 className="text-red-600 text-2xl font-semibold mt-4">Pembayaran Gagal</h2>
              <p className="text-gray-600 mt-2">Terjadi masalah dengan pembayaran Anda. Silakan coba lagi.</p>
            </>
          )}

          <div className="mt-6 flex justify-center gap-4">
            <Link href="/profile/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
              Ke Profil
            </Link>
            <Link href="/profile/transaksi" className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600">
              Lihat Transaksi
            </Link>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default WaitingPage;

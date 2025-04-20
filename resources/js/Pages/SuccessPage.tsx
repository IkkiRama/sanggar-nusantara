import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import ProfileLayout from './../Layouts/profileLayout';

function SuccessPage({order, user}) {
//   const { order } = usePage().props; // Ambil order langsung dari Laravel

  return (
    <ProfileLayout>

        <LightNavbar user={user} />

        <div className="flex px-4 flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
                {order.status_pembelian === "sudah dibayar" ? (
                <>
                    {/* Icon Checklist */}
                    <div className="flex justify-center">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <CheckCircleIcon className="w-16 h-16 text-blue-500" />
                    </div>
                    </div>
                    <h2 className="text-green-600 text-2xl font-semibold mt-4">Pembayaran Berhasil!</h2>
                    <p className="text-gray-600 mt-2">Terima kasih telah melakukan pembayaran. Pesanan Anda sedang diproses.</p>
                </>
                ) : (
                <>
                    {/* Icon X (Gagal) */}
                    <div className="flex justify-center">
                        <div className="bg-red-100 p-4 rounded-full">
                            <XCircleIcon className="w-16 h-16 text-red-500" />
                        </div>
                    </div>
                    <h2 className="text-red-600 text-2xl font-semibold mt-4">Pembayaran Belum Selesai</h2>
                    <p className="text-gray-600 mt-2">Silakan selesaikan pembayaran untuk melanjutkan pesanan.</p>
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


export default SuccessPage;

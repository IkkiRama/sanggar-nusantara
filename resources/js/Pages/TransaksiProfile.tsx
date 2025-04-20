import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layouts/mainLayout';
import LightNavbar from '../layouts/lightNavbar';
import UserProfile from '../Components/userProfile';
import ProfileLayout from '../Layouts/profileLayout';


export default function Transaksi({user, transaksi}) {
    const [isChecking, setIsChecking] = useState(true);

    const handleBayar = async (order_id: string) => {
        try {
            const token = localStorage.getItem("token"); // Ambil token dari localStorage atau session storage

            const response = await fetch(`http://sanggar-nusantara.test/api/midtrans/token/${order_id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (data.token) {
                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        console.log("Pembayaran sukses");
                        window.location.href = `/payment-status/${order_id}`;
                    },
                    onPending: function (result) {
                        console.log("Pembayaran tertunda");
                    },
                    onError: function (error) {
                        console.log("Pembayaran gagal", error);
                    },
                    onClose: function () {
                        console.log("Popup ditutup tanpa transaksi");
                    }
                });
            } else {
                console.error("Token Midtrans tidak ditemukan", data);
            }
        } catch (error) {
            console.error("Gagal mendapatkan token Midtrans", error);
        }
    };

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'; // Redirect ke halaman login jika belum login
        } else {
            setIsChecking(false);
        }
    }, [user]);

    if (isChecking) {
        return <div className="flex justify-center h-screen items-center text-center text-red-500 text-xl font-semibold">Memeriksa akses...</div>;
    }



  return (
    <ProfileLayout>
        <Head>
            <script
                type="text/javascript"
                src={import.meta.env.VITE_SNAP_EMBEDED_LINK}
                data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
            ></script>
        </Head>

        <LightNavbar user={user} />
        <div className="bg-blue-500 h-[30vh]"></div>

        <div className="lg:-mt-[10vh] -mt-[30vh] pb-20 px-4 min-h-screen">
            <div className="flex flex-wrap lg:flex-nowrap gap-5 2xl:max-w-[2000px] mx-auto px-4 2xl:px-10">

                <UserProfile isActive="transaksi" user={user} />
                <div className="p-5 mt-40 md:mt-0 relative bg-white shadow-lg rounded-xl w-full lg:w-[75%]">
                    <h2 className="text-xl font-semibold mb-4">Transaksi</h2>
                    <div className="table-scroll overflow-x-auto">
                        <table className=" w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">No</th>
                                <th className="p-3">Waktu</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Opsi</th>
                            </tr>
                            </thead>

                            <tbody>
                            {transaksi.length > 0 ? (
                                transaksi.map((trx, index) => (
                                <tr key={trx.id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{new Date(trx.created_at).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold 
                                            ${trx.status_pembelian === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                                            ${trx.status_pembelian === "sudah dibayar" ? "bg-blue-100 text-blue-600" : ""}
                                            ${trx.status_pembelian === "dibatalkan" || 
                                                trx.status_pembelian === "gagal" ||
                                                trx.status_pembelian === "kadaluarsa" ||
                                                trx.status_pembelian === "dikembalikan" 
                                                ? "bg-red-100 text-red-600" : ""}
                                            `}
                                        >
                                            {trx.status_pembelian}
                                        </span>
                                    </td>
                                    <td className="p-3">Rp {trx.total_akhir.toLocaleString()}</td>
                                    <td className="p-3 flex gap-2">
                                    {/* <button className="bg-blue-500 text-white px-3 py-1 rounded">Invoice</button> */}
                                    <Link
                                        href={`/profile/invoice/${trx.order_id}`} className="bg-emerald-500 border-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded">
                                        Invoice
                                    </Link>

                                    {trx.status_pembelian === "pending" && (
                                        <button
                                            onClick={() => handleBayar(trx.order_id)}
                                            className="px-5 cursor-pointer text-white py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
                                        >
                                            Bayar
                                        </button>
                                    )}
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan={5} className="text-center p-5">Tidak ada transaksi</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </ProfileLayout>
  )
}

import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layouts/mainLayout';
import LightNavbar from '../layouts/lightNavbar';
import UserProfile from '../Components/userProfile';





const Transactions = () => {
  const transactions = [
    { id: 1, date: "Sabtu, 12 November 2004", status: "Sudah Bayar", total: "Rp 150.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
    { id: 2, date: "Minggu, 12 November 2004", status: "Belum Bayar", total: "Rp 170.000" },
  ];

  return (
    <div className="p-5 mt-40 md:mt-0 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%] table-scroll">
      <h2 className="text-xl font-semibold mb-4">Transaksi</h2>
      <table className="w-full border-collapse">
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
          {transactions.map((trx, index) => (
            <tr key={trx.id} className="border-b">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{trx.date}</td>
              <td className="p-3">{trx.status}</td>
              <td className="p-3">{trx.total}</td>
              <td className="p-3 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Nota</button>
                {trx.status === "Belum Bayar" ? (
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Kirim Pembayaran</button>
                ) : (
                  <button className="bg-green-500 text-white px-3 py-1 rounded">Lihat Pembayaran</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Transaksi() {
    const { user } = usePage().props;
    const [isChecking, setIsChecking] = useState(true);

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
    <MainLayout>
        <LightNavbar user={user} />
        <div className="bg-blue-500 h-[30vh]"></div>

        <div className="flex flex-wrap lg:flex-nowrap lg:-mt-[10vh] -mt-[30vh] gap-5 pb-20 px-4 min-h-screen">
            <UserProfile isActive="transaksi" user={user} />
            <Transactions />
        </div>
    </MainLayout>
  )
}

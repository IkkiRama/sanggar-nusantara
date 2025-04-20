import { Link } from '@inertiajs/react';
import { ArrowUpRightFromSquare, KeySquare, LayoutDashboard, LogOut, Pen, PenBox, Wallet2 } from 'lucide-react';
import React from 'react'

const UserProfile = ({isActive, user}) => {
    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Apakah Anda yakin ingin logout?")) {
            window.location.href = "/logout";
        }
    };

  return (
    <div className="w-full lg:sticky top-36 p-5 bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl lg:w-[25%] h-full relative dark:bg-gray-800">
        {/* <Link href="/profile/edit" className="absolute top-[10px] right-[10px] px-3 py-2 rounded-md border-2 border-[#e4e4e7]">
            <PenBox className="w-5 h-5"  />
        </Link> */}

      <img
        src={user.image ? `../storage/${user.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
        alt="Profile"
        className="w-[150px] h-[150px] border-[5px] border-white rounded-full mx-auto object-cover -mt-14"
      />
      <h2 className="text-center dark:text-gray-200 text-xl font-semibold mt-5">{user.name}</h2>
      <p className="text-center text-blue-500">{user.email}</p>

        <div className="mt-5">
            <h3 className="font-semibold text-slate-800 text-lg dark:text-gray-300">Tentang Saya</h3>
            <p className="text-gray-700 mt-1 dark:text-gray-400 line-clamp-4">
            {user.deskripsi}
            </p>
        </div>

      <ul className="mt-5">

        <Link href="/profile/dashboard">
            <li className={`p-3 rounded-lg dark:text-gray-300 cursor-pointer flex flex-row gap-3 mb-2
                ${isActive === "dashboard" ? "bg-blue-500 text-white font-semibold" : "font-medium hover:bg-gray-300 dark:hover:bg-gray-700"}
            `}><LayoutDashboard className="w-5 h-5" /> Dashboard</li>
        </Link>

        <Link href="/profile/transaksi">
            <li className={`p-3 rounded-lg dark:text-gray-300 cursor-pointer flex flex-row gap-3 mb-2
                ${isActive === "transaksi" ? "bg-blue-500 text-white font-semibold" : "font-medium hover:bg-gray-300 dark:hover:bg-gray-700"}
            `}><Wallet2 className="w-5 h-5" /> Transaksi</li>
        </Link>

        {/* <Link href="/profile/ubah-password">
            <li className={`p-3 rounded-lg dark:text-gray-300 cursor-pointer flex flex-row gap-3 mb-2
                ${isActive === "ubahPasword" ? "bg-blue-500 text-white font-semibold" : "font-medium hover:bg-gray-300 dark:hover:bg-gray-700"}
            `}><KeySquare className="w-5 h-5" /> Ubah Password</li>
        </Link> */}

        <Link href="https://wa.me/+6282133320489">
            <li className="p-3 rounded-lg dark:text-gray-300 cursor-pointer flex flex-row gap-3 mb-2 font-medium hover:bg-gray-300 dark:hover:bg-gray-700"><ArrowUpRightFromSquare className="w-5 h-5" /> Gabung Forum</li>
        </Link>

        <li
            className="p-3 rounded-lg dark:text-gray-300 cursor-pointer flex flex-row gap-3 mb-2 font-medium hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={handleLogout}
        >
            <LogOut className="w-5 h-5" /> Logout
        </li>

      </ul>
    </div>
  );
};

export default UserProfile

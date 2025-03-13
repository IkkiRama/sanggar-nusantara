import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import LightNavbar from '../layouts/lightNavbar';
import UserProfile from '../Components/userProfile';
import { changeDate } from '../Utils/changeDate';
import { LucideCalendarDays, Ticket } from 'lucide-react';
import formatTanggal from './../Utils/formatTanggal';
import toCapitalize from './../Utils/toCapitalize';
import ProfileLayout from '../Layouts/profileLayout';



export default function Profile({user, pembelianEvents}) {
    const [isChecking, setIsChecking] = useState(true);
    const [activeTab, setActiveTab] = useState("event");

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
    <ProfileLayout title={`Dasboard ${user.name} | Sanggar Nusantara`}>
        <LightNavbar user={user} />
        <div className="bg-blue-500 h-[30vh]"></div>

        <div className="flex flex-wrap lg:flex-nowrap lg:-mt-[10vh] -mt-[30vh] gap-5 pb-20 px-4 min-h-screen">
            <UserProfile isActive="dashboard" user={user} />
            <div className="p-5 md:mt-0 mt-40 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%] table-scroll">
                <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
                    <h2 className="text-lg lg:text-2xl mb-2 font-semibold">Halo, {user.name}!</h2>
                    <p className="lg:text-md">Jelajahi kekayaan budaya dan warisan Indonesia bersama Sanggar Nusantara. Saatnya menambah wawasan dan keterampilan dalam seni dan tradisi negeri.</p>
                </div>
                <div className="flex gap-2 mb-4">
                    <button
                    className={`cursor-pointer font-semibold px-4 py-2 rounded-lg ${activeTab === "event" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setActiveTab("event")}
                    >
                    Event
                    </button>
                    <button
                    className={`cursor-pointer font-semibold px-4 py-2 rounded-lg ${activeTab === "produk" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setActiveTab("produk")}
                    >
                    Produk
                    </button>
                </div>
                <div>
                    {activeTab === "event" && (
                        <div className="space-y-4">
                            {pembelianEvents.map((event, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <div className="flex mr-5">

                                    <div className="">
                                        <div className="flex gap-2 mb-2 lg:mb-4">
                                            <span
                                            className={`
                                                px-2 py-1 rounded text-xs md:text-sm
                                                ${event.status_pembelian === "pending" ? "bg-yellow-200 text-yellow-600" :
                                                event.status_pembelian === "gagal" ? "bg-red-200 text-red-600" :
                                                "bg-green-200 text-green-600"}
                                            `}
                                            >
                                            {toCapitalize(event.status_pembelian)}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold line-clamp-2 text-lg">{event.event_nama}</h3>
                                        <div className="flex items-center gap-7 mt-2">

                                            <div className="flex items-center gap-3 text-gray-500">
                                                <LucideCalendarDays className="w-4 h-4" />
                                                <p className="text-sm line-clamp-2">
                                                    {changeDate(new Date(event.event_tanggal))}
                                                </p>
                                            </div>

                                            <div className="flex text-gray-500 items-center gap-3">
                                                <Ticket className="w-4 h-4" />
                                                <p className=" text-sm line-clamp-2">
                                                    {event.jumlah_tiket} Tiket {event.jenis_tiket}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-slate-700 mt-2 text-sm">Tiket dibeli pada  {formatTanggal(event.created_at)} </p>

                                        <div className="flex items-center gap-5 mt-5">
                                            {event.status_pembelian === "pending" ? (
                                                <a
                                                href={`/bayar/${event.order_id}`}
                                                className="px-5 text-white py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
                                                >
                                                Bayar
                                                </a>
                                            ) : event.status_pembelian !== "gagal" ? (
                                                <>
                                                    <a
                                                        href={`/etiket/${event.order_id}`}
                                                        className="px-5 text-white py-2 text-sm bg-red-500 border-2 border-red-500 hover:bg-red-600 rounded-md font-semibold"
                                                    >
                                                        E-Tiket
                                                    </a>
                                                    <a
                                                        href={`/profile/invoice/${event.order_id}`}
                                                        className="px-5 text-slate-700 py-2 text-sm border-2 border-slate-700 hover:bg-slate-100 rounded-md font-semibold"
                                                    >
                                                        Invoice
                                                    </a>
                                                </>
                                            ) : null}
                                        </div> 

                                    </div>
                                </div>
                                <img
                                    src={event.image ? event.image : "/images/NO IMAGE AVAILABLE.jpg"}
                                    alt={`gambar event ${event.event_nama}`}
                                    className="flex-shrink-0 w-24 lg:w-44 h-20 lg:h-28 rounded-md object-cover bg-gray-400" />
                            </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "produk" && (
                        <div className="flex justify-center items-center flex-col mt-7">
                            <img src="/images/under-construction.png" className="w-[350px] h-[350px]" alt="image comming soon" />
                            <h2 className="text-2xl lg:text-4xl text-red-500 font-semibold">Coming Soon....</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </ProfileLayout>
  )
}

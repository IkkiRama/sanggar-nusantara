import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import LightNavbar from '../layouts/lightNavbar';
import UserProfile from '../Components/userProfile';
import { changeDate } from '../Utils/changeDate';
import { LucideCalendarDays, Ticket } from 'lucide-react';
import formatTanggal from './../Utils/formatTanggal';
import toCapitalize from './../Utils/toCapitalize';
import ProfileLayout from '../Layouts/profileLayout';
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';



export default function Profile({pembelianEvents, user, cartCount, subscription, role}) {
    // const { user, loading } = useAuth();

    const [isChecking, setIsChecking] = useState(true);
    const [activeTab, setActiveTab] = useState("event");
    const [snapToken, setSnapToken] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            window.location.href = '/admin/login'; // Redirect ke halaman login jika belum login
        } else {
            setIsChecking(false);
        }
    }, [user]);

    if (isChecking) {
        return <div className="flex justify-center h-screen items-center text-center text-red-500 text-xl font-semibold">Memeriksa akses...</div>;
    }

    const handleBayar = async (order_id: string) => {
        try {
            const token = localStorage.getItem("token"); // Ambil token dari localStorage atau session storage

            const response = await fetch(`/api/midtrans/token/${order_id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            const data = await response.json();

            if (data.token) {
                window.snap.pay(data.token, {
                    onSuccess: function (result) {
                        toast.success("Pembayaran sukses");
                        console.log("Pembayaran sukses");
                        router.visit(`/payment-success/${order_id}`);
                    },
                    onPending: function (result) {
                        toast.warning("Pembayaran tertunda");
                        console.log("Pembayaran tertunda");
                    },
                    onError: function (error) {
                        toast.error("Pembayaran gagal", error);
                        console.log("Pembayaran gagal", error);
                    },
                    onClose: function () {
                        toast.info("Popup ditutup tanpa transaksi");
                        console.log("Popup ditutup tanpa transaksi");
                    }
                });
            } else {
                toast.error("Token Midtrans tidak ditemukan", data);
                console.error("Token Midtrans tidak ditemukan", data);
            }
        } catch (error) {
            toast.error("Gagal mendapatkan token Midtrans", error);
            console.error("Gagal mendapatkan token Midtrans", error);
        }
    };

    const handleBatalkan = async (orderId) => {
        if (!confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) return;

        try {
            const response = await fetch(`/api/event/batalkan/${orderId}`, {
                method: "POST", // atau "PUT" tergantung API-mu
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ status_pembelian: "dibatalkan" }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Gagal membatalkan pesanan.");
            }

            toast.success("Pesanan berhasil dibatalkan.");
            // Refresh halaman atau data jika perlu
            // window.location.reload();
            router.reload()

        } catch (error) {
            toast.error("Terjadi kesalahan: " + error.message);
            console.error(error);
        }
    };





  return (
    <ProfileLayout title={`Dasboard ${user.name} | Sanggar Nusantara`}>
        <Head>
            <script
                type="text/javascript"
                src={import.meta.env.VITE_SNAP_EMBEDED_LINK}
                data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
            ></script>
        </Head>

        <LightNavbar user={user} cartCount={cartCount} />
        <div className="bg-blue-500 h-[30vh]"></div>

        <div className="lg:-mt-[10vh] -mt-[30vh] pb-20 px-4 min-h-screen">
            <div className="flex flex-wrap gap-5 lg:flex-nowrap container mx-auto">

                <UserProfile isActive="dashboard" user={user} role={role} />
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
                        <button
                        className={`cursor-pointer font-semibold px-4 py-2 rounded-lg ${activeTab === "subscription" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => setActiveTab("subscription")}
                        >
                        Subscription
                        </button>
                    </div>
                    <div>
                        {activeTab === "event" && (
                            <div className="space-y-4">
                                {pembelianEvents.map((event, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center flex-wrap md:flex-nowrap flex-column md:flex-row">
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
                                            <h3 className="hidden md:block font-semibold line-clamp-2 text-lg">{event.event_nama}</h3>
                                            <div className="hidden md:flex items-center gap-7 mt-2">

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

                                            <p className="hidden md:block text-slate-700 mt-2 text-sm">Tiket dibeli pada  {formatTanggal(event.created_at)} </p>

                                            <div className="hidden md:flex items-center gap-5 mt-5">
                                                {event.status_pembelian === "pending" ? (
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleBayar(event.order_id)}
                                                            className="px-5 cursor-pointer text-white py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
                                                        >
                                                            Bayar
                                                        </button>

                                                        <button
                                                            onClick={() => handleBatalkan(event.order_id)}
                                                            className="px-5 cursor-pointer text-white py-2 text-sm bg-red-500 border-2 border-red-500 hover:bg-red-600 rounded-md font-semibold"
                                                        >
                                                            Batalkan
                                                        </button>
                                                    </div>

                                                ) : event.status_pembelian === "sudah dibayar" ? (
                                                    <>
                                                        <Link
                                                            href={`/profile/etiket/${event.order_id}`}
                                                            className="px-5 text-white py-2 text-sm bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                                                        >
                                                            Lihat E-Tiket
                                                        </Link>
                                                    </>
                                                ) : null}
                                            </div>

                                        </div>
                                    </div>
                                    <img
                                        src={event.image ? `../storage/${event.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                        alt={`gambar event ${event.event_nama}`}
                                        className="flex-shrink-0 w-full h-[200px] md:h-[150px] md:w-[200px] lg:w-44 lg:h-28 rounded-md object-cover bg-gray-400 my-3 md:my-0" />

                                    <h3 className="block md:hidden font-semibold line-clamp-2 text-lg">{event.event_nama}</h3>
                                    <div className="flex md:hidden items-center gap-7 mt-2">

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

                                    <p className="block md:hidden text-slate-700 mt-2 text-sm">Tiket dibeli pada  {formatTanggal(event.created_at)} </p>

                                    <div className="flex md:hidden items-center gap-5 mt-5">
                                        {event.status_pembelian === "pending" ? (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleBayar(event.order_id)}
                                                    className="px-5 cursor-pointer text-white py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
                                                >
                                                    Bayar
                                                </button>

                                                <button
                                                    onClick={() => handleBatalkan(event.order_id)}
                                                    className="px-5 cursor-pointer text-white py-2 text-sm bg-red-500 border-2 border-red-500 hover:bg-red-600 rounded-md font-semibold"
                                                >
                                                    Batalkan
                                                </button>
                                            </div>

                                        ) : event.status_pembelian === "sudah dibayar" ? (
                                            <>
                                                <Link
                                                    href={`/etiket/${event.order_id}`}
                                                    className="px-5 text-white py-2 text-sm bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                                                >
                                                    Lihat E-Tiket
                                                </Link>
                                            </>
                                        ) : null}
                                    </div>

                                </div>
                                ))}
                                {pembelianEvents.length === 0 && (
                                    <div className="mt-16 flex justify-center items-center flex-col">
                                        <img src="./../images/kosong.svg" className="lg:w-[10%] w-[25%] h-[30%]" alt="icon-splash" />
                                        <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500">Belum Ada Event</h1>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "produk" && (
                            <div className="flex justify-center items-center flex-col mt-7 pb-20">
                                <img src="/images/under-construction.png" className="w-[350px] h-[350px]" alt="image comming soon" />
                                <h2 className="text-2xl lg:text-4xl text-red-500 font-semibold">Coming Soon....</h2>
                            </div>
                        )}

                        {activeTab === "subscription" && (
                            <div className="space-y-4">
                                {subscription.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center flex-wrap md:flex-nowrap flex-column md:flex-row"
                                    >
                                        <div className="flex mr-5 flex-col gap-2 w-full md:w-auto">
                                        {/* Status langganan */}
                                            <div className="flex gap-2 mb-2 lg:mb-4">
                                                <span
                                                className={`
                                                    px-2 py-1 rounded text-xs md:text-sm
                                                    ${item.status === "expired" ? "bg-yellow-200 text-yellow-600" :
                                                    item.status === "cancelled" ? "bg-red-200 text-red-600" :
                                                    "bg-green-200 text-green-600"}
                                                `}
                                                >
                                                {toCapitalize(item.status)}
                                                </span>
                                            </div>

                                            {/* Nama Paket */}
                                            <h3 className="font-semibold text-lg line-clamp-2">{item.plan_nama}</h3>

                                            {/* Info tanggal mulai dan berakhir */}
                                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                                <LucideCalendarDays className="w-4 h-4" />
                                                <p>Mulai: {formatTanggal(item.tanggal_mulai)}</p>
                                                <p>Berakhir: {formatTanggal(item.tanggal_berakhir)}</p>
                                            </div>

                                            {/* Payment status */}
                                            <div className="text-sm text-gray-600 mt-2">
                                                Status Pembayaran:{" "}
                                                <span className={item.payment_status === "paid" ? "text-green-600" : "text-yellow-600"}>
                                                {toCapitalize(item.payment_status)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tombol Aksi jika perlu */}
                                        {/* <div className="flex flex-col md:items-end mt-4 md:mt-0 w-full md:w-auto">
                                        {item.payment_status === "pending" && (
                                            <div className="flex gap-3">
                                            <button
                                                onClick={() => handleBayar(item.transaction_id)}
                                                className="px-5 py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold"
                                            >
                                                Bayar
                                            </button>
                                            <button
                                                onClick={() => handleBatalkan(item.transaction_id)}
                                                className="px-5 py-2 text-sm bg-red-500 border-2 border-red-500 hover:bg-red-600 text-white rounded-md font-semibold"
                                            >
                                                Batalkan
                                            </button>
                                            </div>
                                        )}
                                        </div> */}
                                    </div>
                                ))}

                                {subscription.length === 0 && (
                                    <div className="mt-16 flex justify-center items-center flex-col">
                                        <img src="./../images/kosong.svg" className="lg:w-[10%] w-[25%] h-[30%]" alt="icon-splash" />
                                        <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500">Belum Ada Langganan</h1>
                                    </div>
                                )}
                            </div>
                        )}



                    </div>
                </div>

            </div>
        </div>
    </ProfileLayout>
  )
}

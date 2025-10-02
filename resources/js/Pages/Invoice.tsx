import React, { useEffect, useState } from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";
import { Head } from "@inertiajs/react";
import { toast } from "react-toastify";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Invoice = ({ order, user, cartCount }) => {
    // useEffect(() => {
    //     if (!order || order.status_pembelian !== "sudah dibayar" || order.user_id !== user.id) {
    //         window.location.href = "/profile"; // Redirect ke halaman profile
    //     }
    // }, [order, user]);

    const navigate = useNavigate();

    const [isChecking, setIsChecking] = useState(true);
    const [snapToken, setSnapToken] = useState<string | null>(null);

    const handleBayar = async (order_id: string) => {
        try {
            const token = localStorage.getItem("token"); // Ambil token dari localStorage atau session storage

            const response = await fetch(`/api/midtrans/token/${order_id}`, {
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
                        toast.success("Pembayaran sukses");
                        console.log("Pembayaran sukses");
                        window.location.href = `/payment-status/${order_id}`;
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

    useEffect(() => {
        if (!user) {
            window.location.href = '/admin/login'; // Redirect ke halaman login jika belum login
        } else {
            setIsChecking(false);
        }
    }, [user]);

    if (!order) {
        return <p className="text-center text-gray-500">Loading invoice...</p>;
    }

    const ppn = order.total_pembelian * 0.11;
    const serviceFee = 15000;
    const discount = order.discount_amount || 0;
    const totalSetelahDiskon = order.total_pembelian - discount;
    const totalAkhir = totalSetelahDiskon + ppn + serviceFee;


    return (
        <MainLayout title="Invoice | Sanggar Nusantara" >
            <Head>
                <script
                    type="text/javascript"
                    src={import.meta.env.VITE_SNAP_EMBEDED_LINK}
                    data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>

            <LightNavbar user={user} cartCount={cartCount} />
            <div className="container mx-auto px-4 lg:py-0 py-20 lg:px-14 relative lg:pt-28 lg:pb-20">
                <div className="lg:p-6">
                    <h2 className="text-3xl font-semibold mb-4 text-slate-600">Invoice</h2>
                    <div className="flex flex-wrap-reverse md:flex-nowrap justify-between items-center mb-10">
                        <div className="flex flex-col gap-3">
                            <p className="font-medium text-gray-600">No. Invoice :
                                <span className="font-semibold text-red-500"> {order.order_id}</span>
                            </p>

                            <p className="font-medium text-gray-600">Waktu Pembayaran :
                                <span className="font-semibold text-gray-800"> {new Date(order.created_at).toLocaleString("id-ID")}</span>
                            </p>

                            <p className="font-medium text-gray-600 flex items-center gap-2">
                                Status Transaksi:
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                        ${order.status_pembelian === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                                        ${order.status_pembelian === "sudah dibayar" ? "bg-blue-100 text-blue-600" : ""}
                                        ${["dibatalkan", "gagal", "kadaluarsa", "dikembalikan"].includes(order.status_pembelian) ? "bg-red-100 text-red-600" : ""}
                                    `}
                                >
                                    {order.status_pembelian}
                                </span>
                            </p>

                        </div>
                        <div className="flex flex-col md:items-end mb-5 sm:mb-0">
                            <p className="text-[20px] font-semibold text-left">{user.name}</p>
                            <p className="text-[16px] text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <div className="border-2 bg-white border-gray-200 shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-lg p-4 mb:p-6">
                        <h3 className="text-xl font-semibold mb-4 text-slate-600">Daftar Produk</h3>

                        {/* EVENT */}
                        {order.pembelian_event && order.pembelian_event.length > 0 && (
                            <>
                                {order.pembelian_event.map((event, index) => (
                                    <div key={index} className="flex items-center gap-4 border-b border-gray-300 py-4 px-4">
                                        <div className="flex flex-wrap lg:flex-nowrap lg:w-1/2 w-full lg:border-r-2 border-gray-200">
                                            <img
                                                src={event.event?.image ? `/storage/${event.event.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                                alt="Event"
                                                className="bg-gray-600 object-cover lg:w-20 lg:h-20 h-36 mb-5 lg:mb-0 w-full rounded-lg lg:mr-2"
                                            />

                                            <div>
                                                <p className="font-semibold text-lg text-slate-700">{event.nama}</p>
                                                <p className="font-medium text-slate-500">Jenis Tiket : {event.jenis_tiket}</p>

                                                <div className="mt-3 flex lg:hidden flex-col gap-2">
                                                    <p className="text-[16px] text-gray-600 font-medium">Harga Tiket</p>
                                                    <p className="font-bold text-gray-700">
                                                        {event.harga > 0 ? `Rp${event.harga.toLocaleString()}` : "GRATIS"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:flex hidden flex-col gap-2 w-1/2 pl-3">
                                            <p className="text-[16px] text-gray-600 font-medium">Harga Tiket</p>
                                            <p className="font-bold text-gray-700">
                                                {event.harga > 0 ? `Rp${event.harga.toLocaleString()}` : "GRATIS"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* SUBSCRIPTION */}
                        {order.subscription && order.subscription.plan && (
                            <div className="flex items-center gap-4 border-b border-gray-300 py-4 px-4">
                                <div className="flex flex-wrap lg:flex-nowrap lg:w-1/2 w-full lg:border-r-2 border-gray-200">
                                    <div className="md:mr-4 w-full lg:w-fit lg:mr-2 flex justify-center items-center">
                                        <CreditCard className="text-gray-200 bg-gray-400 lg:w-20 lg:h-20 h-36 mb-5 lg:mb-0 rounded-md p-3 w-full" />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-lg text-slate-700">{order.subscription.plan.nama}</p>
                                        <p className="text-slate-500 text-sm">Durasi: {order.subscription.plan.durasi} hari</p>
                                        <p className="text-slate-500 text-sm mt-1">{order.subscription.plan.deskripsi}</p>

                                        <div className="mt-3 flex lg:hidden flex-col gap-2">
                                            <p className="text-[16px] text-gray-600 font-medium">Harga Langganan</p>
                                            <p className="font-bold text-gray-700">
                                                {order.subscription.plan.harga_diskon
                                                    ? `Rp${order.subscription.plan.harga_diskon.toLocaleString()}`
                                                    : `Rp${order.subscription.plan.harga.toLocaleString()}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:flex hidden flex-col gap-2 w-1/2 pl-3">
                                    <p className="text-[16px] text-gray-600 font-medium">Harga Langganan</p>
                                    <p className="font-bold text-gray-700">
                                        {order.subscription.plan.harga_diskon
                                            ? `Rp${order.subscription.plan.harga_diskon.toLocaleString()}`
                                            : `Rp${order.subscription.plan.harga.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* KOSONG */}
                        {!order.pembelian_event?.length && !order.subscription && (
                            <p className="text-gray-500">Tidak ada produk dalam pembelian ini.</p>
                        )}
                    </div>


                    <div className="flex mt-10 gap-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="px-5 cursor-pointer text-white py-2 text-sm bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 rounded-md font-semibold"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={() => handleBayar(order.order_id)}
                                    className="px-5 cursor-pointer text-white py-2 text-sm bg-yellow-500 border-2 border-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
                                >
                                    Bayar
                                </button>
                        {/* { order.status_pembelian === "pending" && (
                        ) } */}
                    </div>


                </div>
            </div>
        </MainLayout>
    );
};

export default Invoice;

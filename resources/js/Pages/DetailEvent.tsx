import React, {useEffect, useState } from 'react'
import { ShoppingCart, Calendar, Clock, MapPin, Ticket, ChevronDown, ChevronUp, X, InfoIcon, Link, Lock } from "lucide-react";

// component

import LightNavbar from '../layouts/lightNavbar';
import MainLayout from '../Layouts/mainLayout';
import { FaCalendar } from 'react-icons/fa';
import { changeDate } from '../Utils/changeDate';
import formatTanggal from './../Utils/formatTanggal';
import { Head, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

interface Ticket {
    event_id: any;
    id: number;
    nama: string;
    harga: number;
    kuota: number;
}

export default function DetailEvent({user, event, hargaTiket, events, cartCount}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [snapToken, setSnapToken] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [expandedId, setExpandedId] = useState(null);

    const [showTooltipPPN, setShowTooltipPPN] = useState(false);
    const [showTooltipServiceFee, setShowTooltipServiceFee] = useState(false);

    const [kodePromo, setKodePromo] = useState("");
    const [pesan, setPesan] = useState({ text: "", isSuccess: false });
    const [diskon, setDiskon] = useState({
        "kode": "",
        "id": 0,
        "name": "",
        "type": "",
        "amount": 0,
        "nilai_diskon": 0,
    });

    const [activeTab, setActiveTab] = useState("deskripsi");

    const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
    const [alertMessage, setAlertMessage] = useState({
        "text" : "",
        "type" : ""
    });


    const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.kuota, 0);
    const totalPrice = selectedTickets.reduce((sum, ticket) => sum + ticket.kuota * parseInt(ticket.harga, 10), 0);
    const pajakPPN = 11/100*totalPrice;
    const totalBiaya = totalPrice + pajakPPN + 15000 - diskon.nilai_diskon;

    const availableTickets = hargaTiket.filter(ticket => ticket.kuota > 0);
    const minPrice = availableTickets.length > 0
        ? Math.min(...availableTickets.map(ticket => parseInt(ticket.harga, 10)))
        : null;


    const EventContent = ({ content }) => {
        return (
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{ lineHeight: "1.6", fontSize: "16px" }}
                className="content-artikel dark:text-white"
            />
        );
    };


    useEffect(() => {
        const script = document.createElement("script");
        script.src = import.meta.env.VITE_SNAP_EMBEDED_LINK;
        script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // bersihkan saat komponen di-unmount
        };
    }, []);

    useEffect(() => {
        if (snapToken) {
            window.snap.embed(snapToken, {
                embedId: "snap-container",
            });
        }
    }, [snapToken]);

    const cekDiskon = async () => {
        if (totalBiaya === 15000) {
            setPesan({
                text: "Kode promo tidak dapat digunakan karena total biaya masih Rp 0. Silakan pilih tiket terlebih dahulu.",
                isSuccess: false,
            });
            return;
        }

        if (diskon.kode) {
            setPesan({
                text: `Kode promo "${diskon.kode}" sudah diterapkan. Anda tidak bisa mengganti kode promo.`,
                isSuccess: false,
            });
            return;
        }

        setPesan({ text: "", isSuccess: false });
        // setLoading({
        //     "diskon":true,
        //     "bayar":false
        // });

        try {
            const response = await fetch("/api/diskon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    // Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    totalBiaya: totalBiaya,
                    kodeDiskon: kodePromo,
                }),
            });

            const data = await response.json();
            // setLoading({
            //     "diskon":false,
            //     "bayar":false
            // });

            if (response.ok) {
                setDiskon({
                    kode: kodePromo,
                    id: data.diskon.id,
                    name: data.diskon.name,
                    type: data.diskon.type,
                    amount: data.diskon.amount,
                    nilai_diskon: data.diskon.nilai_diskon,
                });
                setPesan({
                    text: `Diskon "${kodePromo}" berhasil ditambahkan!`,
                    isSuccess: true,
                });
            } else {
                setPesan({
                    text: data.message || "Kode promo tidak valid.",
                    isSuccess: false,
                });
            }
        } catch (error) {
            // setLoading({
            //     "diskon":false,
            //     "bayar":false
            // });
            setPesan({
                text: "Terjadi kesalahan saat memproses permintaan.",
                isSuccess: false,
            });
        }
    };

    const handleTambahkanKeKeranjang = async () => {

        if (selectedTickets.length === 0) {
            toast.error('Pilih tiket terlebih dahulu dibagian tab menu tiket')
            setActiveTab("tiket");
            return;
        }

        // Belum login
        if (user === null) {
            toast.error("Silahkan login terlebih dahulu")
            return window.location.href = "/admin/login";
        }

        try {
            const response = await fetch("/api/cart/addEvent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    user_id: user.id,
                    items: selectedTickets.map(ticket => ({
                        item_id: ticket.event_id,
                        item_type: 'event',
                        jumlah: ticket.kuota,
                        variasi: ticket.nama,
                        harga: ticket.harga,
                        subtotal: ticket.kuota * ticket.harga,
                    })),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Tiket berhasil ditambahkan ke keranjang.")
                setSelectedTickets([]);

                // Redirect ke /keranjang tanpa reload
                router.visit('/keranjang');
            } else {
                toast.error(data.message || "Gagal menambahkan ke keranjang.")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan pada server.")
        }

    };


    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);


    const formatTanggalPendek = (tanggal) => {
        return new Date(tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    };

    const formatTanggalPanjang = (tanggal) => {
        return new Date(tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const updateQuantity = (ticketId, change) => {
        const totalSelected = selectedTickets.reduce((acc, ticket) => acc + ticket.kuota, 0);

        // Cek batas maksimal 5 tiket
        if (totalSelected >= 5 && change > 0) {
            toast.error("Maksimal pembelian tiket dalam 1 transaksi adalah 5 tiket")
            return;
        }

        setSelectedTickets(prevTickets => {
            // Cari tiket berdasarkan ID
            const ticketIndex = prevTickets.findIndex(t => t.id === ticketId);


            if (ticketIndex !== -1) {
                // Jika tiket sudah ada, update kuota
                return prevTickets.map(ticket =>
                    ticket.id === ticketId
                        ? { ...ticket, kuota: ticket.kuota + change }
                        : ticket
                ).filter(ticket => ticket.kuota > 0); // Hapus jika kuota = 0
            } else {
                // Ambil data lengkap tiket dari daftar tiket
                const ticketData = hargaTiket.find(t => t.id === ticketId);
                if (!ticketData) return prevTickets; // Jika tidak ditemukan, tidak ada perubahan

                // Tambahkan tiket baru dengan semua property yang diperlukan
                return [...prevTickets, { ...ticketData, kuota: 1 }];
            }
        });
    };

    return (
        <MainLayout title={`${event.nama} | Sanggar Nusantara`} >

              <LightNavbar user={user} cartCount={cartCount} />

            <div className="bg-gray-100 dark:bg-gray-950 leading-normal tracking-normal pb-10 md:pb-20">

                <div className="grid container mx-auto px-4 lg:grid-cols-5 pt-10 md:pt-20 pb-5 md:px-20 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
                    <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-red-700/30 to-red-700/0"></span>

                    <div className="lg:col-span-3 order-2 lg:order-1 relative">
                        <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-lg text-gray-900 dark:text-gray-200">
                            {//@ts-ignore
                            event.nama}
                        </h1>

                        <div className="md:flex gap-10 md:mb-8 mb-4">
                            <p className="flex md:mb-0 mb-5 md:text-base text-[14px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <MapPin className="w-[20px] h-[20px]" />
                                <span>{
                                //@ts-ignore
                                event.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar className="w-[20px] h-[20px]" />
                                <span>{changeDate(new Date(event.tanggal))}</span>
                            </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap lg:text-base md:text-sm text-[14px]">{
                        //@ts-ignore
                        event.excerpt}</p>
                    </div>
                    <div className="md:pb-8 pt-8 pb-3 lg:col-span-2 relative lg:order-2 order-1">
                        <img
                            src={
                                //@ts-ignore
                                event.image ? `./../storage/${event.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-[200px] md:h-[350px] rounded object-cover bg-gray-300"
                            alt={//@ts-ignore
                            event.nama}
                        />
                    </div>
                </div>

                {event.status_event === "premium" ? (
                    <div className="flex justify-center items-center">
                        <div className="lg:col-span-2 text-gray-800 dark:text-gray-200 flex justify-center items-center flex-col text-center px-4 w-full md:w-[70%] ">
                            <Lock className="w-[75px] h-[75px] text-yellow-500" />
                            <h1 className="lg:text-xl text-lg font-semibold mt-5 mb-3 ">{event?.excerpt}</h1>
                            <p>{event?.content}</p>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto sm:px-6 px-0 md:justify-center flex-wrap lg:flex-nowrap relative mt-10 flex-grow flex justify-between lg:gap-10 h-full">

                        <div className="w-full dark:bg-gray-950 lg:w-2/3 bg-white md:shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] md:rounded-lg md:border-2 md:border-gray-200 dark:border-gray-900">

                            {/* Sticky Tabs */}
                            <div className="sticky dark:bg-gray-950 bg-white/80 backdrop-blur-md md:rounded-tl-lg md:rounded-tr-lg md:top-20 top-15 z-10 shadow-sm flex">
                                <button
                                className={`flex-1 py-5 text-center font-medium cursor-pointer ${
                                    activeTab === "deskripsi" ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "border-b-2 border-white/80 dark:border-gray-950 text-gray-600 dark:text-gray-200"
                                }`}
                                onClick={() => setActiveTab("deskripsi")}
                                >
                                DESKRIPSI
                                </button>
                                <button
                                className={`flex-1 py-5 text-center font-medium cursor-pointer ${
                                    activeTab === "tiket" ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "border-b-2 border-white/80 dark:border-gray-950 text-gray-600 dark:text-gray-200"
                                }`}
                                onClick={() => setActiveTab("tiket")}
                                >
                                TIKET
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="pt-4 pb-12 px-4">
                                {activeTab === "deskripsi" && (
                                    <div>
                                        {event.linkGmap && (
                                            <div className="flex justify-center">
                                                <iframe
                                                src={event.linkGmap}
                                                loading="lazy"
                                                className="bg-gray-300 w-full h-[250px] mt-5 rounded-md sm:h-[400px] mb-10"
                                                ></iframe>
                                            </div>
                                        )}
                                        <EventContent content={event.deskripsi}></EventContent>
                                    </div>
                                )}
                                {activeTab === "tiket" && (
                                    <div className="space-y-4 w-full">
                                        {hargaTiket.map((ticket) => (
                                            <div key={ticket.id} className="border w-full border-blue-400 rounded-lg p-4 bg-blue-50 relative flex flex-col dark:bg-gray-950">
                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(ticket.id)}>
                                                <h3 className="font-semibold dark:text-gray-200">{ticket.nama}</h3>
                                                {expandedId === ticket.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                            </div>
                                            <p className="text-gray-600 text-sm dark:text-gray-400">
                                                Pembelian Tiket : {formatTanggalPendek(ticket.tanggal_mulai)} - {formatTanggalPanjang(ticket.tanggal_selesai)}
                                            </p>
                                            <p className={`text-gray-700 whitespace-pre-wrap text-sm my-2 transition-all ${expandedId === ticket.id ? "line-clamp-none" : "line-clamp-1"}`}>{ticket.deskripsi}</p>
                                            <div className="flex items-center text-blue-600 text-sm mt-1">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>Berakhir {formatTanggalPanjang(ticket.tanggal_selesai)}</span>
                                            </div>
                                            <hr className="border-dashed border-gray-300 my-2" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-base md:text-lg font-bold dark:text-gray-200">
                                                    {
                                                    ticket.harga === 0 ?
                                                        "Gratis" :
                                                        `Rp ${ticket.harga.toLocaleString("id-ID")}`
                                                    }
                                                </span>

                                                {new Date(ticket.tanggal_selesai) < new Date() ||new Date(event.tanggal) < new Date() ? ( // Cek jika event sudah berakhir
                                                    <span className="text-sm md:text-lg font-bold text-red-500">
                                                        Pemesanan telah ditutup
                                                    </span>
                                                ) : ticket.kuota === 0 ? (
                                                    <span className="text-sm md:text-lg font-bold text-red-500">
                                                        Sold Out
                                                    </span>
                                                ) : (
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="border border-blue-400 text-blue-400 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                                                            onClick={() => updateQuantity(ticket.id, -1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-5 text-center dark:text-gray-200">{selectedTickets.find(t => t.id === ticket.id)?.kuota || 0}</span>
                                                        <button
                                                            className="border border-blue-400 text-blue-400 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                                                            onClick={() => updateQuantity(ticket.id, 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )}

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="w-full lg:w-[30%] self-start lg:sticky md:mt-0 top-28">
                            <div className="bg-white dark:bg-gray-950 md:shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] md:rounded-lg md:border-2 md:border-gray-200 px-4 py-7">

                                <div className="border-b-2 border-b-gray-200 px-3 pb-5 flex  gap-4">
                                    {selectedTickets.length > 0 ? (
                                        <div className="flex flex-col gap-4 w-full">
                                            {selectedTickets.map((ticket) => (
                                                <div className="flex justify-between w-full gap-4">
                                                    <img src="/images/ic-ticket-widget.svg" alt="image icon tiket" />
                                                    <div className="w-full space-y-2">
                                                        <div key={ticket.id} className="flex justify-between">
                                                            <div className="">
                                                                <p className="text-slate-700 font-medium dark:text-gray-300">{ticket.nama}</p>
                                                                <span className="text-gray-600 dark:text-gray-400 text-sm">{ticket.kuota} Tiket</span>
                                                            </div>
                                                            <span className="text-gray-800 dark:text-gray-200 font-bold">
                                                                {
                                                                ticket.harga === 0 ?
                                                                    "Gratis" :
                                                                    `Rp ${ticket.harga.toLocaleString("id-ID")}`
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <img src="/images/ic-ticket-widget.svg" alt="image icon tiket" />
                                            <p className="text-gray-600 dark:text-gray-300 ">Kamu belum memilih tiket. Silakan pilih lebih dulu di tab menu TIKET.</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-between my-4">
                                    {new Date(event.tanggal) < new Date() ? (
                                        <>
                                            <p className="text-gray-600 dark:text-gray-300 italic">Pendaftaran ditutup</p>
                                            <p className="text-red-500 font-bold text-xl dark:text-red-400">Event telah berakhir</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {totalTickets > 0 ? `Total ${totalTickets} tiket` : "Harga mulai dari"}
                                            </p>
                                            <p className="text-gray-800 font-bold text-xl dark:text-gray-200">
                                                {totalTickets > 0
                                                    ? `Rp ${totalPrice.toLocaleString("id-ID")}`
                                                    : minPrice === 0
                                                    ? "Gratis"
                                                    : minPrice !== null
                                                    ? `Rp ${minPrice.toLocaleString("id-ID")}`
                                                    : "Sold Out"}
                                            </p>
                                        </>
                                    )}
                                </div>


                                <button className="w-full bg-blue-600 focus:outline-2 outline-blue-300 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 rounded" onClick={() => handleTambahkanKeKeranjang()}>
                                    {selectedTickets.length === 0 ? "Beli Tiket" : "Tambahkan ke Keranjang"}
                                </button>

                            </div>
                        </div>

                    </div>
                )}


            </div>


            {/* Modal Event Selesai */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-9999999999 flex items-center justify-center lg:py-[10%]">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold text-red-500">Event Sudah Berakhir</h3>
                        <p className="mt-2">Pendaftaran untuk event ini sudah ditutup. Terima kasih telah mengunjungi halaman ini.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="cursor-pointer mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

        </MainLayout>
    )
}

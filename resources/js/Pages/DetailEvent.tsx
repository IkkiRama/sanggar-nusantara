import React, {useEffect, useState } from 'react'
import { ShoppingCart, Calendar, Clock, MapPin, Ticket, ChevronDown, ChevronUp, X, InfoIcon } from "lucide-react";

// component

import LightNavbar from '../layouts/lightNavbar';
import MainLayout from '../Layouts/mainLayout';
import { FaCalendar } from 'react-icons/fa';
import { changeDate } from '../Utils/changeDate';
import formatTanggal from './../Utils/formatTanggal';
import { Head } from '@inertiajs/react';

interface Ticket {
    id: number;
    nama: string;
    harga: number;
    kuota: number;
}

export default function DetailEvent({user, event, hargaTiket}) {
    const [isOpen, setIsOpen] = useState(false);

    const [snapToken, setSnapToken] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [expandedId, setExpandedId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

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
    const [loading, setLoading] = useState({
        "diskon":false,
        "bayar":false
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


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "SB-Mid-client-sCSfDCWXJfjySHKn");
        document.body.appendChild(script);
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
        setLoading({
            "diskon":true,
            "bayar":false
        });

        try {
            const response = await fetch("http://sanggar-nusantara.test/api/diskon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    totalBiaya: totalBiaya,
                    kodeDiskon: kodePromo,
                }),
            });

            const data = await response.json();
            setLoading({
                "diskon":false,
                "bayar":false
            });

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
            setLoading({
                "diskon":false,
                "bayar":false
            });
            setPesan({
                text: "Terjadi kesalahan saat memproses permintaan.",
                isSuccess: false,
            });
        }
    };


    const handleBayar = async () => {
        if (!isChecked) {
        setAlertMessage({
            text: "Anda harus menyetujui Terms & Conditions sebelum melanjutkan pembayaran.",
            type: "danger",
        });
        setTimeout(() => setAlertMessage({ text: "", type: "" }), 5000);
        return;
        }

        if (selectedTickets.length === 0) {
        setAlertMessage({
            text: "Pilih tiket terlebih dahulu",
            type: "danger",
        });
        setTimeout(() => setAlertMessage({ text: "", type: "" }), 5000);
        return;
        }

        setLoading({ diskon: false, bayar: true });

        try {
        const response = await fetch("http://sanggar-nusantara.test/api/bayar", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
            user_id: user.id,
            discount_id: diskon.id ? diskon.id : null,
            total_pembelian: totalPrice,
            discount_amount: diskon.nilai_diskon,
            total_akhir: totalBiaya,
            tickets: selectedTickets.map(st => ({
                event_id: event.id,
                jumlah_tiket: st.kuota,
                jenis_tiket: st.nama,
                nama: event.nama,
                harga: st.harga,
                total_harga: st.kuota * st.harga,
            })),
            }),
        });

        const data = await response.json();
        setLoading({ diskon: false, bayar: false });

        if (response.ok && data.snap_token) {
            setSnapToken(data.snap_token);
            setOrderId(data.order_id);
        } else {
            setAlertMessage({
            text: data.message || "Terjadi kesalahan saat pembayaran.",
            type: "danger",
            });
        }
        } catch (error) {
        setLoading({ diskon: false, bayar: false });
        setAlertMessage({
            text: "Terjadi kesalahan saat menghubungi server.",
            type: "danger",
        });
        setTimeout(() => setAlertMessage({ text: "", type: "" }), 5000);
        return;
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

    const handleBeli = () => {
        if (totalTickets === 0) {
            setAlertMessage({
                "text" : "Pilih tiket terlebih dahulu dibagian tab menu tiket",
                "type" : "danger"
            });
            setActiveTab("tiket")
            setTimeout(() => setAlertMessage({"text" : "","type" : ""}), 5000);
            return;
        }else if (user === null) {
            setAlertMessage({
                "text" : "Silahkan login terlebih dahulu",
                "type" : "danger"
            });
            return window.location.href = "/login";
        }else{
            setIsOpen(true)
        }
    }

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
            setAlertMessage({
                "text" : "Maksimal pembelian tiket dalam 1 transaksi adalah 5 tiket",
                "type" : "danger"
            });
            setTimeout(() => setAlertMessage({"text" : "","type" : ""}), 5000);
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
                {/* <Head>
                    <script type="text/javascript"
                        src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key="SB-Mid-client-sCSfDCWXJfjySHKn"></script>
                </Head> */}
              <LightNavbar user={user} />

            <div className="bg-gray-100 dark:bg-black leading-normal tracking-normal">

                {alertMessage.text !== "" && (
                    <div className={`fixed top-5 left-1/2 w-[90%] lg:w-fit transform -translate-x-1/2 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out z-999999 flex gap-4 ${
                        alertMessage.type === "danger" ? "bg-red-500" : "bg-green-600"
                    }`}>
                        <InfoIcon />
                        {alertMessage.text}
                    </div>
                )}
                <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
                    <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-red-700/30 to-red-700/0"></span>

                    <div className="lg:col-span-3 order-2 lg:order-1 relative">
                        <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-xl text-gray-900 dark:text-gray-200">
                            {//@ts-ignore
                            event.nama}
                        </h1>

                        <div className="md:flex gap-10 md:mb-8 mb-4">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <MapPin />
                                <span>{
                                //@ts-ignore
                                event.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(
                                    //@ts-ignore
                                    event.tanggal))}</span>
                            </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap lg:text-base md:text-sm text-[15px]">{
                        //@ts-ignore
                        event.excerpt}</p>
                    </div>
                    <div className="md:pb-8 pt-8 pb-3 lg:col-span-2 relative lg:order-2 order-1">
                        <img
                            src={
                                //@ts-ignore
                                event.image ? event.image : "/images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-[200px] md:h-[350px] rounded object-cover bg-gray-300"
                            alt={//@ts-ignore
                            event.nama}
                        />
                    </div>
                </div>

                {/* <div className="relative max-w-5xl mx-auto px-5 md:px-0">
                </div> */}

                <div className="container sm:px-6 px-2 md:justify-center flex-wrap lg:flex-nowrap relative mt-10 flex-grow flex justify-between lg:gap-10 h-full">

                    <div className="w-full lg:w-2/3 bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-lg border-2 border-gray-200">

                        {/* Sticky Tabs */}
                        <div className="sticky bg-white/80 backdrop-blur-md rounded-tl-lg rounded-tr-lg top-20 z-10 shadow-sm flex">
                            <button
                            className={`flex-1 py-5 text-center font-medium cursor-pointer ${
                                activeTab === "deskripsi" ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "text-gray-600"
                            }`}
                            onClick={() => setActiveTab("deskripsi")}
                            >
                            DESKRIPSI
                            </button>
                            <button
                            className={`flex-1 py-5 text-center font-medium cursor-pointer ${
                                activeTab === "tiket" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
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
                                    <p className="text-gray-700 dark:text-gray-300">{event.deskripsi}</p>
                                </div>
                            )}
                            {activeTab === "tiket" && (
                                <div className="space-y-4 w-full">
                                    {hargaTiket.map((ticket) => (
                                        <div key={ticket.id} className="border w-full border-blue-400 rounded-lg p-4 bg-blue-50 relative flex flex-col">
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(ticket.id)}>
                                            <h3 className="font-semibold">{ticket.nama}</h3>
                                            {expandedId === ticket.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Pembelian Tiket : {ticket.id} {formatTanggalPendek(ticket.tanggal_mulai)} - {formatTanggalPanjang(ticket.tanggal_selesai)}
                                        </p>
                                        <p className={`text-gray-700 whitespace-pre-wrap text-sm my-2 transition-all ${expandedId === ticket.id ? "line-clamp-none" : "line-clamp-1"}`}>{ticket.deskripsi}</p>
                                        <div className="flex items-center text-blue-600 text-sm mt-1">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>Berakhir {formatTanggalPanjang(ticket.tanggal_selesai)}</span>
                                        </div>
                                        <hr className="border-dashed border-gray-300 my-2" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold">
                                                {
                                                ticket.harga === 0 ?
                                                    "Gratis" :
                                                    `Rp ${ticket.harga.toLocaleString("id-ID")}`
                                                }
                                            </span>

                                            {new Date(ticket.tanggal_selesai) < new Date() ? ( // Cek jika event sudah berakhir
                                                <span className="text-lg font-bold text-red-500">
                                                    Pemesanan telah ditutup
                                                </span>
                                            ) : ticket.kuota === 0 ? (
                                                <span className="text-lg font-bold text-red-500">
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
                                                    <span className="w-5 text-center">{selectedTickets.find(t => t.id === ticket.id)?.kuota || 0}</span>
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

                    <div className="w-full lg:w-[30%] self-start lg:sticky mt-10 lg:mt-0 top-28">
                        <div className="bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-lg border-2 border-gray-200 px-4 py-7">

                            <div className="border-b-2 border-b-gray-200 px-3 pb-5 flex  gap-4">
                                {selectedTickets.length > 0 ? (
                                    <div className="flex flex-col gap-4 w-full">
                                        {selectedTickets.map((ticket) => (
                                            <div className="flex justify-between w-full gap-4">
                                                <img src="/images/ic-ticket-widget.svg" alt="image icon tiket" />
                                                <div className="w-full space-y-2">
                                                    <div key={ticket.id} className="flex justify-between">
                                                        <div className="">
                                                            <p className="text-slate-700 font-medium">{ticket.nama}</p>
                                                            <span className="text-gray-600 text-sm">{ticket.kuota} Tiket</span>
                                                        </div>
                                                        <span className="text-gray-800 font-bold">
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
                                        <p className="text-gray-600">Kamu belum memilih tiket. Silakan pilih lebih dulu di tab menu TIKET.</p>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between my-4">
                                <p className="text-gray-600">{totalTickets > 0 ? `Total ${totalTickets} tiket` : "Harga mulai dari"}</p>
                                <p className="text-gray-800 font-bold text-xl">
                                    {totalTickets > 0
                                    ? `Rp ${totalPrice.toLocaleString("id-ID")}`
                                    : minPrice === 0
                                    ? "Gratis"
                                    : minPrice !== null
                                    ? `Rp ${minPrice.toLocaleString("id-ID")}`
                                    : "Sold Out"}
                                </p>
                            </div>

                            <button className="w-full bg-blue-600 focus:outline-2 outline-blue-300 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 rounded" onClick={() => handleBeli()}>Beli TIket</button>

                        </div>
                    </div>

                </div>


                <div className="container mx-auto mt-10 pb-10 px-6">
                    <h3 className="text-xl sm:text-2xl font-semibold sm:mb-4">Rekomendasi Event</h3>
                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/FGS.jpeg"
                            alt="image event"
                            className="object-cover h-full w-full"
                            data-aos-once="true"
                            data-aos="fade-left"
                            />
                        </div>
                        <div
                            className="lg:col-span-3"
                            data-aos-once="true"
                            data-aos="fade-right"
                        >
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"FESTIVAL GUNUNG SLAMET"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Acara ini akan menjadi salah satu festival budaya terbesar di Jawa Tengah, menghadirkan berbagai kegiatan seperti pentas seni, pameran kerajinan lokal, dan kuliner tradisional. Setiap pengunjung akan mendapatkan pengalaman unik dan mendalam tentang kebudayaan masyarakat sekitar Gunung Slamet. Ayo, jangan lewatkan kesempatan ini untuk merasakan kekayaan budaya Nusantara dan menjadi bagian dari sejarah!
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                {/* <IconTicket /> */}
                                <small>Rp 5.000</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                {/* <IconCalendar /> */}
                                <small>12-14 Juli Des 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                {/* <IconLocation /> */}
                                <small>Purbalingga</small>
                            </span>
                            </div>
                        </div>
                    </a>

                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10 ">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/KKS.jpg"
                            alt="image event"
                            className="object-cover h-full w-full"
                            data-aos-once="true"
                            data-aos="fade-left"
                            />
                        </div>
                        <div
                            className="lg:col-span-3"
                            data-aos-once="true"
                            data-aos="fade-right"
                        >
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"KARYA KREATIVE SERAYU 2024"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Karya Kreative Serayu 2024 akan menampilkan berbagai hasil karya kreatif dari seniman lokal dan nasional. Acara ini bertujuan untuk memperkenalkan seni dan budaya yang berkembang di sekitar wilayah Serayu, memberikan wadah bagi generasi muda untuk mengekspresikan kreativitas mereka. Jadilah bagian dari perayaan seni dan budaya ini, dengan berbagai kegiatan menarik seperti pameran seni, workshop, dan pertunjukan musik yang akan memanjakan para pengunjung.
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                {/* <IconTicket /> */}
                                <small>Gratis</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                {/* <IconCalendar /> */}
                                <small>20-21 Juli 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                {/* <IconLocation /> */}
                                <small>Kompleks Menara Pandang Teratai Purwokerto</small>
                            </span>
                            </div>
                        </div>
                    </a>


                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed lg:z-30 z-999 inset-0 bg-white/20 backdrop-blur-md bg-opacity-50 flex justify-center items-center lg:py-[30%]">
                    <div className="bg-white overflow-y-auto max-h-screen lg:p-6 p-4 rounded-lg shadow-lg w-[95%] lg:w-[40%]">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                            <h2 className="text-lg font-semibold">Checkout Event</h2>
                            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="mt-4 px-2 overflow-y-auto">
                            <label className="block font-semibold text-lg text-slate-800">Kode Promo</label>
                            <div className="flex gap-3 mt-2 mb-1">
                                <input
                                    type="text"
                                    placeholder="Masukkan kode promo agar lebih hemat"
                                    className="w-full lg:px-4 px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-1 focus:ring-blue-300 outline-1 focus:outline-2 outline-gray-200 focus:outline-secondary focus:outline-blue-500"
                                    value={kodePromo}
                                    onChange={(e) => setKodePromo(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && cekDiskon()}
                                    disabled={diskon.kode !== ""}
                                />
                                <button
                                    type="button"
                                    onClick={cekDiskon}
                                    disabled={loading.diskon || diskon.kode !== ""}
                                    className={`lg:px-4 px-3 py-2 rounded-md font-semibold cursor-pointer whitespace-nowrap ${
                                        diskon.kode ? "bg-gray-400 text-white" : "bg-red-500 text-white"
                                    }`}
                                >
                                    {loading.diskon ? "Memeriksa..." : diskon.kode ? "Kode Diterapkan" : "Tambahkan"}
                                </button>
                            </div>
                            {pesan.text && (
                                <span className={`text-sm ${pesan.isSuccess ? "text-green-600" : "text-red-600"}`}>
                                    {pesan.text}
                                </span>
                            )}
                        </div>

                        <div className="mt-3">
                            <h3 className="block mb-3 font-semibold text-lg text-slate-800">Payment details</h3>
                            <div className="text-base font-medium text-slate-500 flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <span>Total harga tiket</span>
                                    <span>{`Rp ${totalPrice.toLocaleString("id-ID")}`}</span>
                                </div>

                                {diskon.nilai_diskon !== 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Diskon</span>
                                        <span>- {diskon.nilai_diskon}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-red-600 relative">
                                    <span className="flex items-center gap-1">
                                        Pajak PPN
                                        {/* Icon tanda tanya dengan tooltip */}
                                        <span className="relative">
                                            <button
                                                onClick={() => setShowTooltipPPN(!showTooltipPPN)}
                                                className="cursor-pointer text-blue-500 text-sm font-bold border border-blue-400 bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ?
                                            </button>
                                            {/* Tooltip PPN */}
                                            {showTooltipPPN && (
                                                <span className="absolute left-0 bottom-full mb-2 w-48 p-2 text-xs text-white bg-gray-700 rounded shadow-lg">
                                                    Pajak Pertambahan Nilai (PPN) sebesar 11% dikenakan sesuai dengan ketentuan perpajakan yang berlaku. Pajak ini diterapkan pada total transaksi dan akan disetorkan kepada pemerintah sebagai kewajiban perpajakan.
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                    <span>+ Rp {totalPrice > 0 ?
                                    pajakPPN.toLocaleString("id-ID") : 0}</span>
                                </div>

                                {/* Service Fee */}
                                <div className="flex justify-between text-red-600 relative">
                                    <span className="flex items-center gap-1">
                                        Biaya servis per pembelian
                                        {/* Icon tanda tanya dengan tooltip */}
                                        <span className="relative">
                                            <button
                                                onClick={() => setShowTooltipServiceFee(!showTooltipServiceFee)}
                                                className="cursor-pointer text-blue-500 text-sm font-bold border border-blue-400 bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ?
                                            </button>
                                            {/* Tooltip Service Fee */}
                                            {showTooltipServiceFee && (
                                                <span className="absolute left-0 bottom-full mb-2 w-48 p-2 text-xs text-white bg-gray-700 rounded shadow-lg">
                                                    Biaya untuk fee payment gateway dan platform services lainnya.
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                    <span>+ Rp 15.000</span>
                                </div>

                                <div className="flex justify-between font-semibold mt-4 text-slate-700">
                                    <span>Total transfer</span>
                                    <span className="text-black">{`Rp ${totalBiaya.toLocaleString("id-ID")}`}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center">
                            <input type="checkbox" id="terms" className="mr-2"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                            />
                            <label htmlFor="terms" className="text-sm cursor-pointer text-gray-700">
                                Saya setuju dengan <span className="text-blue-600 font-semibold">Terms & Conditions</span>
                            </label>
                        </div>

                        <button
                        className={`w-full mt-4  py-2 rounded-lg font-semibold ${
                                        isChecked ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-300 text-slate-700 cursor-default"
                                    }`}
                        onClick={handleBayar}
                        disabled={!isChecked}
                        >
                        {loading.bayar ? "Proses Bayar..." : "Bayar"}
                        </button>

                        <div id="snap-container" className="w-full pt-3">
                        {/* <div id="snap-container" className="w-full px-4 py-7"> */}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

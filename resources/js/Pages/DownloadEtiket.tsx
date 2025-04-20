import { Head, Link } from "@inertiajs/react";
import { Calendar, Download, MapPin, Printer, Ticket } from "lucide-react";
import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const DownloadEtiket = ({orders}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.print();
        }, 500); // kasih delay biar render dulu

        return () => clearTimeout(timeout);
    }, []);
    const changeDate = (tanggal: Date) => {
        const formattedDate = new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(tanggal);

        const jam = tanggal.getHours().toString().padStart(2, "0");
        const menit = tanggal.getMinutes().toString().padStart(2, "0");

        return `${formattedDate} Pukul ${jam}:${menit}`;
    };

    const changeDatePembelian = (tanggal: Date) => {
        const formatterTanggal = new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Jakarta", // biar tetap WIB
        });

        const formatterWaktu = new Intl.DateTimeFormat("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
        });

        return `${formatterTanggal.format(tanggal)} Pukul ${formatterWaktu.format(tanggal)}`;
    };

  return (
    <div className="relative min-h-screen bg-gray-100">
        <Head title={`Download E-Tiket ${orders[0].order_id}`} />
      {/* Fixed Header */}
      {/* Content */}
        <div className="flex flex-col items-center gap-7 lg:gap-10 min-h-screen pt-5 pb-28">
            {orders.map((order, index) =>
                Array.from({ length: order.jumlah_tiket }).map((_, i) => (
                <div
                    key={`${index}-${i}`}
                    className="bg-white shadow-lg rounded-lg w-[95%] lg:w-[70%]"
                    id="voucher-content"
                >
                    <div
                    className="flex items-center justify-between md:p-6 p-4 rounded-t-lg"
                    style={{
                        backgroundImage: "url('/images/header etiket.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    >
                    <h2 className="lg:text-2xl text-lg font-bold text-white">
                        Sanggar Nusantara
                    </h2>
                    <p className="text-white font-semibold md:text-lg text-sm">E-Tiket #{i + 1}</p>
                    </div>

                    <div className="md:p-7 p-3 overflow-x-auto">
                    <div className="border-2 border-gray-300 rounded-lg md:p-5 p-4 relative">
                        <h2 className="lg:text-2xl text-lg mb-5 font-semibold text-slate-900">
                        {order.nama_event}
                        </h2>
                        <div className="flex flex-wrap md:flex-nowrap gap-5">
                        <div className="w-full md:w-[45%]">
                            <img
                            src={order.image ? `../storage/${order.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                            alt="image event"
                            className="w-[100%] h-48 rounded-lg object-cover shrink-0 bg-gray-500"
                            />
                        </div>
                        <div className="md:mr-10">
                            <div className="text-gray-500 flex items-center gap-5 mb-3">
                            <Calendar />
                            <p className="text-lg font-medium text-slate-800">
                                {changeDate(new Date(order.tanggal_event ))}
                            </p>
                            </div>
                            <div className="text-gray-500 flex items-center gap-5 mb-3">
                            <MapPin />
                            <p className="text-lg font-medium text-slate-800">
                                {order.tempat}
                            </p>
                            </div>
                            <div className="text-gray-500 flex items-center gap-5 mb-3">
                            <Ticket />
                            <p className="text-lg font-medium text-slate-800">
                                Jenis Tiket: {order.jenis_tiket}
                            </p>
                            </div>
                        </div>
                        </div>
                        <img
                        src="/logo.png"
                        alt="logo sanggar nusantara"
                        className="lg:absolute hidden top-0 right-0 w-32 h-32 rounded-full"
                        />
                    </div>

                    <h2 className="lg:text-2xl text-lg font-bold mt-7 mb-4 text-slate-800">
                        Informasi Pesanan <span className="text-slate-400">/ Order Information</span>
                    </h2>

                    <div className="flex gap-5 items-center flex-wrap-reverse justify-center md:flex-nowrap">
                        <div className="border-2 border-gray-300 rounded-lg p-5 w-full md:w-[70%]">
                        <div className="flex justify-between">
                            <div>
                            <div className="mb-5">
                                <p className="font-medium mb-2 text-slate-400">
                                Nama <span className="text-slate-400 italic">/ Name</span>
                                </p>
                                <p className="font-bold text-lg">{order.name}</p>
                            </div>

                            <div>
                                <p className="font-medium mb-2 text-slate-400">
                                Tanggal Pembelian <span className="text-slate-400 italic">/ Order Date</span>
                                </p>
                                <p className="font-medium text-lg">{changeDatePembelian(new Date(order.tanggal_pembelian))}</p>
                            </div>
                            </div>
                            <div>
                            <div className="mb-5">
                                <p className="font-medium mb-2 text-slate-400">
                                Email <span className="text-slate-400 italic">/ Email</span>
                                </p>
                                <p className="font-bold text-lg">{order.email}</p>
                            </div>
                            <div>
                                <p className="font-medium mb-2 text-slate-400">
                                Referensi <span className="text-slate-400 italic">/ Reference</span>
                                </p>
                                <p className="font-medium text-lg">Online</p>
                            </div>
                            </div>
                        </div>
                        <div className="md:py-2 py-1 md:px-4 px-3 bg-gray-200 mt-3 md:mt-7 rounded-md">
                            <p className="text-sm md:text-base text-slate-700">
                            Simpan tiket ini dan tunjukkan saat acara berlangsung. Tiket ini adalah
                            bukti pembelian Anda dan diperlukan untuk masuk ke lokasi acara. Jangan
                            bagikan tiket ini kepada orang lain untuk menghindari penyalahgunaan.
                            Selamat menikmati acara!
                            </p>
                        </div>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg p-5 ld:p-14 w-[50%] md:w-[30%]">
                        <QRCodeCanvas
                            value={`/verifikasi-etiket/${order.order_id}/${i + 1}`}
                            size={250}
                            style={{ width: "100%", height: "100%" }}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                ))
            )}
        </div>
    </div>
  );
};

export default DownloadEtiket;

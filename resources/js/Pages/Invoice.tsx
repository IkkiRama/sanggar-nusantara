import React, { useEffect } from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

const Invoice = ({ order, user }) => {
    useEffect(() => {
        if (!order || order.status_pembelian !== "sudah dibayar" || order.user_id !== user.id) {
            window.location.href = "/profile"; // Redirect ke halaman profile
        }
    }, [order, user]);

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
            <LightNavbar user={user}  />
            <div className="lg:py-0 py-20 px-4 lg:px-14 relative min-h-screen lg:pt-28 lg:pb-20">
                <div className="p-6 ">
                    <h2 className="text-3xl font-semibold mb-4 text-slate-600">Invoice</h2>
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex flex-col gap-3">
                            <p className="font-medium text-gray-600">No. Invoice :
                                <span className="font-semibold text-red-500"> {order.order_id}</span>
                            </p>

                            <p className="font-medium text-gray-600">Waktu Pembayaran :
                                <span className="font-semibold text-gray-800"> {new Date(order.created_at).toLocaleString("id-ID")}</span>
                            </p>

                            <p className="font-medium text-gray-600">Status Transaksi :
                                <span className="font-semibold text-green-500 capitalize"> {order.status_pembelian}</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[20px] font-semibold text-left">{user.name}</p>
                            <p className="text-[16px] text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <div className="border-2 bg-white border-gray-200 shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-lg p-4 mb:p-6 mb-4">
                        <h3 className="text-xl font-semibold mb-4 text-slate-600">Daftar Produk</h3>
                        {order.pembelian_event && order.pembelian_event.length > 0 ? (
                            <>
                                {order.pembelian_event.map((event, index) => (
                                    <div key={index} className="flex items-center gap-4 border-b border-gray-300 py-4 px-4">
                                        <div className="flex w-1/2 lg:border-r-2 border-gray-200">
                                            <img
                                            src={event.event.image ? event.event.image :
                                                "/images/NO IMAGE AVAILABLE.jpg"}
                                            alt="Event"
                                            className="bg-gray-600 w-16 object-cover h-16 rounded-lg mr-4" />

                                            <div className="">
                                                <p className="font-semibold text-lg text-slate-700">{event.nama}</p>
                                                <p className="font-medium text-slate-500">Jenis Tiket : {event.jenis_tiket}</p>

                                                <div className="mt-3 flex lg:hidden flex-col gap-2 ">
                                                    <p className="text-[16px] text-gray-600 font-medium ">Harga Tiket</p>
                                                    <p className="font-bold text-gray-700">{event.harga > 0 ? `Rp${event.harga.toLocaleString()}` : "GRATIS"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:flex hidden flex-col gap-2 w-1/2 pl-3">
                                            <p className="text-[16px] text-gray-600 font-medium">Harga Tiket</p>
                                            <p className="font-bold text-gray-700">{event.harga > 0 ? `Rp${event.harga.toLocaleString()}` : "GRATIS"}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 mt-3 w-full lg:w-1/2">
                                    <h3 className="text-xl font-semibold mb-4 text-slate-600">Detail Pembayaran</h3>
                                    <div className="flex flex-col gap-3">
                                        <p className="flex justify-between">
                                            <span className="text-slate-700">Subtotal Harga Produk ({order.pembelian_event ? order.pembelian_event.length : 0})</span>
                                            <span className="font-bold text-slate-700">{order.total_pembelian > 0 ? `Rp${order.total_pembelian.toLocaleString()}` : "GRATIS"}</span>
                                        </p>

                                        <p className="flex justify-between">
                                            <span className="text-green-500">Diskon</span>
                                            <span className="font-bold text-green-500">-Rp{discount.toLocaleString()}</span>
                                        </p>

                                        <p className="flex justify-between">
                                            <span className="text-red-500">PPN (11%)</span>
                                            <span className="font-bold text-red-500">Rp{ppn.toLocaleString()}</span>
                                        </p>

                                        <p className="flex justify-between">
                                            <span className="text-red-500">Biaya Layanan</span>
                                            <span className="font-bold text-red-500">Rp{serviceFee.toLocaleString()}</span>
                                        </p>

                                        <p className="flex justify-between text-red-500 font-bold text-lg">
                                            <span className="text-slate-700 font-semibold">Total Pembayaran</span>
                                            <span className="text-black font-semibold">{totalAkhir > 0 ? `Rp${totalAkhir.toLocaleString()}` : "GRATIS"}</span>
                                        </p>

                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-500">Tidak ada produk dalam pembelian ini.</p>
                        )}
                    </div>


                </div>
            </div>
        </MainLayout>
    );
};

export default Invoice;

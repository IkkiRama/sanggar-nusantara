import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

const Invoice = ({ order, user }) => {
    if (!order) {
        return <p className="text-center text-gray-500">Loading invoice...</p>;
    }

    const ppn = order.total_pembelian * 0.11;
    const serviceFee = 5000;
    const discount = order.discount_amount || 0;
    const totalSetelahDiskon = order.total_pembelian - discount;
    const totalAkhir = totalSetelahDiskon + ppn + serviceFee;

    return (
        <MainLayout title="Invoice | Sanggar Nusantara" >
            <LightNavbar user={user}  />
            <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
                <h2 className="text-3xl font-bold mb-4">Invoice</h2>

                <div className="mb-4">
                    <p><strong>No. Invoice</strong>: <span className="text-red-500">{order.order_id}</span></p>
                    <p><strong>Waktu Pembayaran</strong>: {new Date(order.created_at).toLocaleString("id-ID")}</p>
                    <p><strong>Status Transaksi</strong>: <span className="text-green-500">{order.status_pembelian}</span></p>
                </div>

                <div className="border rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-semibold mb-2">Daftar Produk</h3>
                    {order.pembelian_event && order.pembelian_event.length > 0 ? (
                        order.pembelian_event.map((event, index) => (
                            <div key={index} className="flex items-center gap-4 border-b py-2">
                                <img src="/placeholder.jpg" alt="Event" className="w-16 h-16 rounded-lg" />
                                <div className="w-1/2 border-r-2 border-gray-300">
                                    <p className="font-semibold">{event.nama}</p>
                                    <p className="font-semibold">{event.jenis_tiket}</p>
                                </div>
                                <p className="w-1/2 font-bold text-gray-700">{event.harga > 0 ? `Rp${event.harga.toLocaleString()}` : "GRATIS"}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tidak ada produk dalam pembelian ini.</p>
                    )}
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Detail Pembayaran</h3>
                    <p className="flex justify-between"><span>Subtotal Harga Produk ({order.pembelian_event ? order.pembelian_event.length : 0})</span> <span className="font-bold">{order.total_pembelian > 0 ? `Rp${order.total_pembelian.toLocaleString()}` : "GRATIS"}</span></p>
                    <p className="flex justify-between"><span>Diskon</span> <span className="font-bold text-red-500">-Rp{discount.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>PPN (11%)</span> <span className="font-bold">Rp{ppn.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Biaya Layanan</span> <span className="font-bold">Rp{serviceFee.toLocaleString()}</span></p>
                    <p className="flex justify-between text-red-500 font-bold text-lg"><span>Total Pembayaran</span> <span>{totalAkhir > 0 ? `Rp${totalAkhir.toLocaleString()}` : "GRATIS"}</span></p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Invoice;

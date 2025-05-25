import React, { useState } from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart({user}) {
    const [showVoucherModal, setShowVoucherModal] = useState(false);


    const [expandedId, setExpandedId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isBayar, setIsBayar] = useState(false);
    const [showTooltipPPN, setShowTooltipPPN] = useState(false);
    const [showTooltipServiceFee, setShowTooltipServiceFee] = useState(false);

    const [loading, setLoading] = useState({
        "diskon":false,
        "bayar":false
    });

  return (

    <MainLayout title="Keranjang | Sanggar Nusantara">
        <LightNavbar user={user} />
        <div className="min-h-screen bg-[#F5F6FF] container mx-auto py-20 px-4 lg:px-20 md:px-5 lg:py-36">
            {/* Cart */}
            <div className="grid grid-cols-1 relative">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h1 className="text-2xl font-bold mb-4">Keranjang Anda</h1>

                    <div>
                        <h2 className="text-xl font-semibold">Event</h2>

                        <div className="mt-3 mb-7">

                            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between border-b border-gray-300 py-4">
                                <div className="flex md:w-1/2 w-full">
                                    <img
                                    src="/images/NO IMAGE AVAILABLE.jpg"
                                    alt="Event"
                                    className="bg-gray-600 object-cover rounded-md w-20 h-20 md:mr-4 mr-2" />

                                    <div className="">
                                        <p className="font-semibold md:text-lg text-base text-slate-700 line-clamp-2">Festival Gunung Slamet Lorem ipsum dolor sit amet.</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500">Jenis Tiket : VIP</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500">Harga Tiket : Rp 30000</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500 block md:hidden">
                                            Subtotal :
                                            <span className="font-bold text-gray-700">Rp 30000</span>
                                        </p>
                                    </div>
                                </div>

                                {/* TEMPAT BUAT UBAH QUANTITY */}
                                <div className="flex justify-center w-full md:w-1/2">

                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex md:justify-center w-full">
                                            <div className="border-2 border-gray-300 border-r-1 md:p-2 p-1 rounded-tl-md rounded-bl-md flex justify-center items-center">
                                                <Plus className="md:w-[20px] w-[15px] font-bold"></Plus>
                                            </div>

                                            <input type="text" className="border-2 border-gray-300 border-r-1 border-l-1 md:px-5 px-3 md:w-[60px] w-[40px] font-semibold md:text-base text-sm" value={1} />

                                            <div className="border-2 border-gray-300 border-l-1 md:p-2 p-1 rounded-tr-md rounded-br-md flex justify-center items-center">
                                                <Minus className="md:w-[20px] w-[15px] font-bold"></Minus>
                                            </div>
                                        </div>

                                        <div className="flex md:hidden">
                                            <Trash2 className="cursor-pointer text-red-500 md:w-[25px] w-[20px]"></Trash2>
                                        </div>
                                    </div>

                                </div>

                                <div className="md:flex justify-center hidden w-1/2">
                                    <div className="flex flex-col gap-1 ">
                                        <p className="text-[16px] text-gray-600 font-medium ">Subtotal</p>
                                        <p className="font-bold text-gray-700">Rp 20000</p>
                                    </div>
                                </div>

                                <div className="md:flex justify-center hidden flex-[10%]">
                                    <Trash2 className="cursor-pointer text-red-500"></Trash2>
                                </div>
                            </div>

                            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between border-b border-gray-300 py-4">
                                <div className="flex md:w-1/2 w-full">
                                    <img
                                    src="/images/NO IMAGE AVAILABLE.jpg"
                                    alt="Event"
                                    className="bg-gray-600 object-cover rounded-md w-20 h-20 md:mr-4 mr-2" />

                                    <div className="">
                                        <p className="font-semibold md:text-lg text-base text-slate-700 line-clamp-2">Festival Gunung Slamet Lorem ipsum dolor sit amet.</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500">Jenis Tiket : VIP</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500">Harga Tiket : Rp 30000</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500 block md:hidden">
                                            Subtotal :
                                            <span className="font-bold text-gray-700">Rp 30000</span>
                                        </p>
                                    </div>
                                </div>

                                {/* TEMPAT BUAT UBAH QUANTITY */}
                                <div className="flex justify-center w-full md:w-1/2">

                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex md:justify-center w-full">
                                            <div className="border-2 border-gray-300 border-r-1 md:p-2 p-1 rounded-tl-md rounded-bl-md flex justify-center items-center">
                                                <Plus className="md:w-[20px] w-[15px] font-bold"></Plus>
                                            </div>

                                            <input type="text" className="border-2 border-gray-300 border-r-1 border-l-1 md:px-5 px-3 md:w-[60px] w-[40px] font-semibold md:text-base text-sm" value={1} />

                                            <div className="border-2 border-gray-300 border-l-1 md:p-2 p-1 rounded-tr-md rounded-br-md flex justify-center items-center">
                                                <Minus className="md:w-[20px] w-[15px] font-bold"></Minus>
                                            </div>
                                        </div>

                                        <div className="flex md:hidden">
                                            <Trash2 className="cursor-pointer text-red-500 md:w-[25px] w-[20px]"></Trash2>
                                        </div>
                                    </div>

                                </div>

                                <div className="md:flex justify-center hidden w-1/2">
                                    <div className="flex flex-col gap-1 ">
                                        <p className="text-[16px] text-gray-600 font-medium ">Subtotal</p>
                                        <p className="font-bold text-gray-700">Rp 20000</p>
                                    </div>
                                </div>

                                <div className="md:flex justify-center hidden flex-[10%]">
                                    <Trash2 className="cursor-pointer text-red-500"></Trash2>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Paket Langganan</h2>

                        <div className="mt-3 mb-7">
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between border-b border-gray-300 py-4">
                                <div className="flex md:w-[95%] w-full">
                                    <img
                                    src="/images/NO IMAGE AVAILABLE.jpg"
                                    alt="Event"
                                    className="bg-gray-600 object-cover rounded-md w-20 h-20 md:mr-4 mr-2" />

                                    <div className="">
                                        <p className="font-semibold md:text-lg text-base text-slate-700 line-clamp-2">Festival Gunung Slamet Lorem ipsum dolor sit amet.</p>
                                        <p className="font-medium md:text-base text-sm text-slate-500">Harga Tiket : Rp 30000</p>
                                        <Trash2 className="md:hidden flex cursor-pointer text-red-500 w-[20px] mt-3"></Trash2>
                                    </div>
                                </div>

                                {/* TEMPAT BUAT UBAH QUANTITY */}
                                <div className="md:flex justify-center hidden w-[7%]">
                                    <Trash2 className="cursor-pointer text-red-500 ml-2"></Trash2>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Summary */}
                <div className="z-[9999999] w-full flex gap-10 mt-10">
                    <div id="snap-container" className="w-1/2"></div>
                    <div className="container mx-auto bg-white w-1/2 p-6 rounded-tl-xl rounded-tr-xl">

                        <div className={`p-4`}>
                            <label className="block font-semibold text-lg text-slate-800 dark:text-gray-200">Kode Promo</label>
                            <div className="flex gap-3 mt-2 mb-1">
                                <input
                                    type="text"
                                    placeholder="Masukkan kode promo agar lebih hemat"
                                    className="w-full lg:px-4 px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-1 focus:ring-blue-300 outline-1 focus:outline-2 outline-gray-200 focus:outline-secondary focus:outline-blue-500 dark:text-gray-400"
                                    // value={}
                                    // onChange={(e) => setKodePromo(e.target.value)}
                                    // onKeyDown={(e) => e.key === "Enter" && cekDiskon()}
                                    // disabled={diskon.kode !== ""}
                                />
                                <button
                                    type="button"
                                    // onClick={cekDiskon}
                                    // disabled={loading.diskon || diskon.kode !== ""}
                                    className={`lg:px-4 px-2 py-1 rounded-md font-semibold cursor-pointer whitespace-nowrap text-[14px] lg:text-base bg-red-500 text-white`}
                                >
                                    Tambahkan
                                    {/* {loading.diskon ? "Memeriksa..." : diskon.kode ? "Kode Diterapkan" : "Tambahkan"} */}
                                </button>
                            </div>

                            {/* <span className={`text-sm text-green-600`}>
                            </span> */}
                            <p className="mt-4 bg-green-50 border-l-4 border-green-400 text-green-700 p-4 text-sm rounded">
                                Selamat! Anda dapat domain <strong>GRATIS</strong> dan 3 bulan <strong>GRATIS</strong> di paket ini.
                            </p>

                            <div className="mt-3">
                                <h3 className="block mb-3 font-semibold text-lg text-slate-800 dark:text-gray-200">Payment details</h3>
                                <div className="text-base font-medium text-slate-500 flex flex-col gap-3">
                                    <div className="flex justify-between gap-2">
                                        <span className="dark:text-gray-300 text-sm md:text-base">Total harga </span>
                                        <span className="dark:text-gray-300 text-sm md:text-base">Rp 90000</span>
                                    </div>

                                    <div className="flex justify-between gap-2 text-green-600">
                                        <span className="text-sm md:text-base">Diskon</span>
                                        <span className="text-sm md:text-base">- Rp 20000</span>
                                    </div>

                                    <div className="flex justify-between items-center gap-2 text-red-600 relative">
                                        <span className="flex items-center gap-1 text-sm md:text-base">
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
                                        <span className="text-sm md:text-base whitespace-nowrap">+ Rp 0</span>
                                    </div>

                                    {/* Service Fee */}
                                    <div className="flex justify-between items-center gap-2 text-red-600 relative">
                                        <span className="flex items-center gap-1 text-sm md:text-base">
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
                                        <span className="text-sm md:text-base whitespace-nowrap">+ Rp 15.000</span>
                                    </div>

                                    <div className="flex justify-between font-semibold mt-4 text-slate-700">
                                        <span className="dark:text-gray-300">Total transfer</span>
                                        <span className="text-black">Rp 30000</span>
                                    </div>
                                </div>
                            </div>

                            {!isBayar && (
                                <>
                                    <div className="mt-4 flex items-center">
                                        <input type="checkbox" id="terms" className="mr-2"
                                            checked={isChecked}
                                            onChange={() => setIsChecked(!isChecked)}
                                        />
                                        <label htmlFor="terms" className="text-sm cursor-pointer text-gray-700 dark:text-gray-400">
                                            Saya setuju dengan <span className="text-blue-600 font-semibold">Terms & Conditions</span>
                                        </label>
                                    </div>

                                    <button
                                        className={`w-full mt-4 py-2 rounded-lg font-semibold ${
                                                        isChecked ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-300 text-slate-700 cursor-default"
                                                    }`}
                                        disabled={!isChecked}
                                    >
                                    {loading.bayar ? "Proses Bayar..." : "Bayar"}
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
  );
}

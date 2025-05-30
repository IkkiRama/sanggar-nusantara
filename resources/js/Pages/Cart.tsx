import React, { useEffect, useState } from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";
import { CreditCard, Loader, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Cart({user, keranjang, cartCount}) {

    const [snapToken, setSnapToken] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [cartItems, setCartItems] = useState(keranjang);
    const [isChecked, setIsChecked] = useState(false);
    const [isBayar, setIsBayar] = useState(false);
    const [showTooltipPPN, setShowTooltipPPN] = useState(false);
    const [showTooltipServiceFee, setShowTooltipServiceFee] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [disabledIds, setDisabledIds] = useState([]);
    const [kodePromo, setKodePromo] = useState("");
    const [diskon, setDiskon] = useState(null); // null jika belum ada, objek jika sudah berhasil
    const [loadingDiskon, setLoadingDiskon] = useState(false);


    const [quantities, setQuantities] = useState(() => {
        const map = {};
        cartItems.forEach(item => {
            map[item.id] = item.jumlah;
        });
        return map;
    });

    const [lastSavedQuantities, setLastSavedQuantities] = useState(() => {
        const map = {};
        cartItems.forEach(item => {
            map[item.id] = item.jumlah;
        });
        return map;
    });

    const [subtotals, setSubtotals] = useState(() => {
        const map = {};
        cartItems.forEach(item => {
            map[item.id] = item.subtotal;
        });
        return map;
    });

    const [loadingButton, setLoadingButton] = useState({
        type: null, // "plus" | "minus"
        id: null,   // cartId
      });

    const [loading, setLoading] = useState({
        "diskon":false,
        "bayar":false
    });

    const safeNumber = (val) => {
        const n = Number(val);
        return isNaN(n) ? 0 : n;
    };

    const totalHarga = cartItems.reduce((acc, item) => {
        const subtotal = Number(subtotals[item.id] ?? item.subtotal ?? 0);
        return acc + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);

    const nilaiDiskon = Number(diskon?.nilai_diskon ?? 0);
    const pajakPPN = Math.round(totalHarga * 0.11);
    const biayaServis = 15000;

    const totalTransfer = totalHarga - nilaiDiskon + pajakPPN + biayaServis;



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

    const handleBayar = async () => {
        if (!isChecked) {
          toast.error("Anda harus menyetujui Terms & Conditions sebelum melanjutkan pembayaran.");
          return;
        }

        if (cartItems.length === 0) {
          toast.error("Keranjang kosong! Pilih item dulu sebelum checkout.");
          return;
        }

        setLoading({ diskon: false, bayar: true });

        try {
          // Susun data items
          const items = cartItems.map(item => ({
            id: item.data?.id,
            item_type: item.item_type,
            jumlah: quantities[item.id] ?? item.jumlah,
            nama: item.data?.nama || "Item",
            harga: item.harga,
            subtotal: subtotals[item.id] ?? item.subtotal,
            variasi: item.variasi || null,
          }));

          const response = await fetch("/api/bayar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({
              user_id: user.id,
              discount_id: diskon?.id || null,
              total_pembelian: totalHarga,
              discount_amount: nilaiDiskon,
              total_akhir: totalTransfer,
              items: items,
            }),
          });

          const data = await response.json();
          setLoading({ diskon: false, bayar: false });
          setIsBayar(true);

          if (response.ok && data.snap_token) {
            setSnapToken(data.snap_token);
            setOrderId(data.order_id);
            toast.success("Transaksi berhasil dibuat. Silakan lanjutkan pembayaran!");
          } else {
            toast.error(data.message || "Terjadi kesalahan saat pembayaran.");
          }
        } catch (error) {
          console.error(error);
          setLoading({ diskon: false, bayar: false });
          toast.error("Terjadi kesalahan saat menghubungi server.");
        }
      };






    const cekDiskon = async () => {
        if (!kodePromo) return;

        setLoadingDiskon(true);

        try {
            const res = await fetch("/api/diskon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify({
                    totalBiaya: totalHarga,
                    kodeDiskon: kodePromo,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Gagal menerapkan diskon");
                setLoadingDiskon(false);
                return;
            }

            setDiskon(data.diskon);
            toast.success(data.message);
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan saat cek diskon");
        } finally {
            setLoadingDiskon(false);
        }
    };

    const cekDiskonUlang = async (customTotal = null) => {
        if (!diskon || !kodePromo) return;

        const totalBiaya = customTotal ?? cartItems.reduce((acc, item) => {
            const subtotal = Number(subtotals[item.id] ?? item.subtotal ?? 0);
            return acc + (isNaN(subtotal) ? 0 : subtotal);
        }, 0);

        try {
            const res = await fetch("/api/diskon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify({
                    totalBiaya,
                    kodeDiskon: kodePromo,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.diskon) {
                toast.warn("Diskon tidak lagi memenuhi syarat dan telah dihapus.");
                setDiskon(null);
            } else {
                setDiskon(data.diskon);
            }
        } catch (err) {
            console.error("Gagal validasi diskon ulang:", err);
        }
    };

    useEffect(() => {
        if (diskon) {
            cekDiskonUlang();
        }
    }, [subtotals]); // akan jalan setiap subtotal berubah





    const updateBackendQuantity = async (cartId, newJumlah) => {
        const totalEventTickets = cartItems
            .filter(i => i.item_type === 'event' && i.id !== cartId)
            .reduce((sum, i) => {
                const qty = parseInt(quantities[i.id]) || lastSavedQuantities[i.id] || i.jumlah;
                return sum + qty;
            }, 0) + newJumlah;

        if (totalEventTickets > 5) {
            toast.warning("Maksimal total 5 tiket event dalam keranjang.");
            const original = lastSavedQuantities[cartId] || 1;
            setQuantities(prev => ({ ...prev, [cartId]: original }));
            return false;
        }

        try {
            const res = await fetch("/api/cart/update-quantity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify({ cart_id: cartId, jumlah: newJumlah }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Gagal update jumlah");
                const original = lastSavedQuantities[cartId] || 1;
                setQuantities(prev => ({ ...prev, [cartId]: original }));
                return false;
            }

            // Update state
            setQuantities(prev => ({ ...prev, [cartId]: data.jumlah }));
            setLastSavedQuantities(prev => ({ ...prev, [cartId]: data.jumlah }));
            setSubtotals(prev => ({ ...prev, [cartId]: data.subtotal }));

            // Hitung total harga baru secara manual
            const newSubtotals = { ...subtotals, [cartId]: data.subtotal };
            const newTotalHarga = Object.values(newSubtotals).reduce((acc, val) => acc + Number(val), 0);

            // Cek ulang diskon pakai total baru
            await cekDiskonUlang(newTotalHarga);

            return true;

        } catch (error) {
            console.error("Gagal menghubungi server:", error);
            const original = lastSavedQuantities[cartId] || 1;
            setQuantities(prev => ({ ...prev, [cartId]: original }));
            return false;
        }
    };



    const handleInputChange = (cartId, value) => {
        const raw = typeof value === "string" ? value : String(value);

        // biarkan kosong selama masih diketik
        if (raw === "") {
            setQuantities(prev => ({ ...prev, [cartId]: "" }));
            return;
        }

        const numeric = parseInt(raw, 10);
        if (isNaN(numeric) || numeric < 1 || numeric > 5) return;

        setQuantities(prev => ({ ...prev, [cartId]: numeric }));
    };


    const handleInputBlur = (cartId) => {
        const value = quantities[cartId];
        const numeric = parseInt(value, 10);

        if (isNaN(numeric) || numeric < 1 || numeric > 5) {
            const original = cartItems.find(i => i.id === cartId)?.jumlah || 1;
            setQuantities(prev => ({ ...prev, [cartId]: original }));
            return;
        }

        updateBackendQuantity(cartId, numeric);
    };

    const handlePlus = async (item) => {
        const cartId = item.id;
        if (disabledIds.includes(cartId)) return;

        setDisabledIds(prev => [...prev, cartId]);
        setLoadingButton({ type: "plus", id: cartId });

        const currentQty = parseInt(quantities[cartId]) || item.jumlah;
        const newQty = currentQty + 1;

        const success = await updateBackendQuantity(cartId, newQty);

        setDisabledIds(prev => prev.filter(id => id !== cartId));
        setLoadingButton({ type: null, id: null });
    };


    const handleMinus = async (item) => {
        const cartId = item.id;
        if (disabledIds.includes(cartId)) return;

        setDisabledIds(prev => [...prev, cartId]);
        setLoadingButton({ type: "minus", id: cartId });

        const currentQty = parseInt(quantities[cartId]) || item.jumlah;

        if (currentQty === 1) {
            setConfirmDeleteId(cartId);
            setDisabledIds(prev => prev.filter(id => id !== cartId));
            setLoadingButton({ type: null, id: null });
            return;
        }

        const newQty = currentQty - 1;
        const success = await updateBackendQuantity(cartId, newQty);

        setDisabledIds(prev => prev.filter(id => id !== cartId));
        setLoadingButton({ type: null, id: null });
    };

    const handleDeleteItem = async (cartId) => {
        try {
            const res = await fetch("/api/cart/delete-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify({ cart_id: cartId }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Gagal menghapus item");
                return;
            }

            // Update state lokal keranjang
            const updatedCart = cartItems.filter(item => item.id !== cartId);
            setCartItems(updatedCart);

            const updatedQuantities = { ...quantities };
            const updatedSubtotals = { ...subtotals };
            const updatedLastSaved = { ...lastSavedQuantities };

            delete updatedQuantities[cartId];
            delete updatedSubtotals[cartId];
            delete updatedLastSaved[cartId];

            setQuantities(updatedQuantities);
            setSubtotals(updatedSubtotals);
            setLastSavedQuantities(updatedLastSaved);

            toast.success("Item berhasil dihapus");

            // Cek ulang diskon berdasarkan total baru
            const newTotal = Object.values(updatedSubtotals).reduce((acc, val) => acc + Number(val), 0);
            await cekDiskonUlang(newTotal);

        } catch (error) {
            console.error("Gagal menghapus item:", error);
            toast.warning("Terjadi kesalahan saat menghapus item");
        }
    };



    useEffect(() => {
        const handleEsc = (e) => {
          if (e.key === "Escape") {
            setConfirmDeleteId(null);
          }
        };

        if (confirmDeleteId !== null) {
          document.addEventListener("keydown", handleEsc);
        }

        return () => {
          document.removeEventListener("keydown", handleEsc);
        };
      }, [confirmDeleteId]);






  return (

    <MainLayout title="Keranjang | Sanggar Nusantara">
        <LightNavbar user={user} cartCount={cartCount} />
        <div className="min-h-screen container mx-auto py-20 px-4 lg:px-5 xl:px-20 lg:py-36">
            {/* Cart */}
            <div className="grid grid-cols-1 relative">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h1 className="text-2xl font-bold mb-4">Keranjang Anda</h1>

                    {cartItems.filter(item => item.item_type === 'event').length !== 0 && (
                        <div>
                            <h2 className="text-xl font-semibold">Event</h2>

                            <div className="mt-3 mb-7">
                            {cartItems.filter(item => item.item_type === 'event').map((item, index) => (
                                <div key={index} className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between border-b border-gray-300 py-4">
                                    <div className="flex md:w-1/2 w-full">
                                        <img
                                        src={
                                            item.data?.image ? `./../storage/${item.data?.image}` : "/images/NO IMAGE AVAILABLE.jpg"
                                        }
                                        alt={item.data?.nama}
                                        className="bg-gray-600 object-cover rounded-md w-20 h-20 md:mr-4 mr-2" />

                                        <div className="">
                                            <p className="font-semibold md:text-lg text-base text-slate-700 line-clamp-2">
                                                {item.data?.nama}
                                            </p>

                                            <p className="font-medium md:text-base text-sm text-slate-500">
                                                Jenis Tiket: {item?.variasi}
                                            </p>

                                            <p className="font-medium md:text-base text-sm text-slate-500">
                                                Harga Tiket: Rp {item?.harga.toLocaleString("id-ID")}
                                            </p>

                                            <p className="font-medium md:text-base text-sm text-slate-500 block md:hidden">
                                                Subtotal:
                                                <span className="font-bold text-gray-700">
                                                    Rp {(subtotals[item.id] ?? item.subtotal).toLocaleString("id-ID")}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* TEMPAT BUAT UBAH QUANTITY */}
                                    <div className="flex justify-center w-full md:w-1/2">

                                        <div className="flex w-full justify-between items-center">
                                            <div className="flex md:justify-center w-full">
                                                <button
                                                    onClick={() => handleMinus(item)}
                                                    disabled={disabledIds.includes(item.id)}
                                                    className={`border-2 border-gray-300 border-r-1 md:p-2 p-1 rounded-tl-md rounded-bl-md flex justify-center items-center
                                                        ${disabledIds.includes(item.id) ? "bg-gray-200 opacity-70 cursor-not-allowed" : "cursor-pointer"}
                                                    `}
                                                    >
                                                    {loadingButton.type === "minus" && loadingButton.id === item.id ? (
                                                        <Loader className="animate-spin w-4 h-4" />
                                                    ) : (
                                                        <Minus className="md:w-[20px] w-[15px] font-bold" />
                                                    )}
                                                </button>

                                                <input
                                                    value={quantities[item.id] ?? item.jumlah}
                                                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                                                    onBlur={() => handleInputBlur(item.id)}
                                                    disabled={disabledIds.includes(item.id)}
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    className={`border-2 border-gray-300 border-r-1 border-l-1 md:px-5 px-3 md:w-[60px] w-[40px] font-semibold md:text-base text-sm
                                                        text-center ${disabledIds.includes(item.id) ? "bg-gray-200 opacity-70" : ""}
                                                    `}
                                                />


                                                <button
                                                    onClick={() => handlePlus(item)}
                                                    disabled={disabledIds.includes(item.id)}
                                                    className={`border-2 border-gray-300 border-l-1 md:p-2 p-1 rounded-tr-md rounded-br-md flex justify-center items-center
                                                        ${disabledIds.includes(item.id) ? "bg-gray-200 opacity-70 cursor-not-allowed" : "cursor-pointer"}
                                                    `}
                                                    >
                                                    {loadingButton.type === "plus" && loadingButton.id === item.id ? (
                                                        <Loader className="animate-spin w-4 h-4" />
                                                    ) : (
                                                        <Plus className="md:w-[20px] w-[15px] font-bold" />
                                                    )}
                                                </button>


                                            </div>

                                            <div className="flex md:hidden">
                                            <Trash2
                                                onClick={() => setConfirmDeleteId(item.id)}
                                                className="cursor-pointer text-red-500 hover:text-red-700"
                                            />

                                            </div>
                                        </div>

                                    </div>

                                    <div className="md:flex justify-center hidden w-1/2">
                                        <div className="flex flex-col gap-1 ">
                                            <p className="text-[16px] text-gray-600 font-medium ">Subtotal</p>
                                            <p className="font-bold text-gray-700">Rp {(subtotals[item.id] ?? item.subtotal).toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>

                                    <div className="md:flex justify-center hidden flex-[10%]">
                                    <Trash2
                                        onClick={() => setConfirmDeleteId(item.id)}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                    />

                                    </div>
                                </div>
                            ))}
                            </div>

                        </div>
                    )}

                    {cartItems.filter(item => item.item_type === 'subscription').length !== 0 && (
                        <div>
                            <h2 className="text-xl font-semibold">Paket Langganan</h2>
                            {cartItems.filter(item => item.item_type === 'subscription').map((item, index) => (
                                <div className="mt-3 mb-7" key={index}>
                                    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 justify-between border-b border-gray-300 py-4">
                                        <div className="flex md:w-[95%] w-full">

                                            <div className="md:mr-4 mr-2 flex justify-center items-center">
                                                <CreditCard className="text-gray-200 bg-gray-400 w-20 h-20 rounded-md p-3" />
                                            </div>

                                            <div className="">
                                                <p className="font-semibold md:text-lg text-base text-slate-700 line-clamp-2">Paket Langganan {item.data.nama} {item.data.durasi} Hari</p>
                                                <p className="font-medium md:text-base text-sm text-slate-500">Harga : Rp {item.harga.toLocaleString("id-ID")}</p>
                                                <Trash2
                                                    onClick={() => setConfirmDeleteId(item.id)}
                                                    className="md:hidden flex cursor-pointer text-red-500 w-[20px] mt-3"
                                                />
                                            </div>
                                        </div>

                                        {/* TEMPAT BUAT UBAH QUANTITY */}
                                        <div className="md:flex justify-center hidden w-[7%]">
                                            <Trash2
                                                onClick={() => setConfirmDeleteId(item.id)}
                                                className="cursor-pointer text-red-500 hover:text-red-700"
                                            />
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                            <div className="bg-gray-100 rounded-full p-6 mb-4">
                                <ShoppingCart size={48} className="text-gray-500" />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-700">Keranjangmu Kosong</h2>

                            <p className="text-gray-500 mb-6">Yuk, tambahkan paket langganan atau tiket event ke keranjangmu!</p>

                            <div className="flex gap-6 flex-col md:flex-row w-full md:w-auto">
                                <Link
                                    href="/subscription"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                                >
                                    Jelajahi Paket
                                </Link>

                                <Link
                                    href="/event"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                                >
                                    Jelajahi Event
                                </Link>
                            </div>
                        </div>
                    )}

                </div>

                {/* Summary */}
                {cartItems.length !== 0 && (
                    <div className="w-full flex flex-wrap-reverse xl:flex-nowrap gap-10 mt-10">
                        <div className="w-full xl:w-1/2">
                            <div id="snap-container" className="w-full"></div>
                        </div>
                        <div className="container mx-auto bg-white w-full xl:w-1/2 p-2 rounded-tl-xl rounded-tr-xl">

                            <div className={`p-4`}>
                                <h2 className="md:text-xl font-bold mb-4 text-lg text-slate-800 dark:text-gray-200">Kode Promo</h2>
                                <div className="flex gap-3 mt-2 mb-1">
                                <input
                                    type="text"
                                    placeholder="Masukkan kode promo agar lebih hemat"
                                    className={`w-full lg:px-4 px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-1 focus:ring-blue-300 outline-1 focus:outline-2 outline-gray-200 focus:outline-secondary focus:outline-blue-500 dark:text-gray-400
                                        ${diskon ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                                        ${loadingDiskon ? "opacity-50" : ""}
                                    `}
                                    value={kodePromo}
                                    onChange={(e) => setKodePromo(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && cekDiskon()}
                                    disabled={loadingDiskon || !!diskon}
                                />

                                <button
                                    type="button"
                                    onClick={cekDiskon}
                                    disabled={loadingDiskon || !!diskon}
                                    className={`lg:px-4 px-2 py-1 rounded-md font-semibold text-white text-sm lg:text-base cursor-pointer
                                        ${loadingDiskon || diskon ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"}
                                    `}
                                >
                                    {loadingDiskon ? "Memeriksa..." : diskon ? "Kode Diterapkan" : "Tambahkan"}
                                </button>

                                </div>

                                {/* <span className={`text-sm text-green-600`}>
                                </span> */}
                                {diskon && (
                                    <p className="mt-4 bg-green-50 border-l-4 border-green-400 text-green-700 p-4 text-sm rounded">
                                        🎉 <strong>{diskon.name}</strong> berhasil diterapkan! Anda mendapatkan potongan harga sebesar{" "}
                                        <strong>Rp {diskon.nilai_diskon.toLocaleString("id-ID")}</strong>.
                                    </p>
                                )}

                                <div className="mt-7">
                                    <h2 className="md:text-xl font-bold mb-4 text-lg text-slate-800 dark:text-gray-200">Detail Pembayaran</h2>
                                    <div className="text-base font-medium text-slate-500 flex flex-col gap-3">
                                        <div className="flex justify-between gap-2">
                                            <span className="dark:text-gray-300 text-sm md:text-base">Total harga </span>
                                            <span className="dark:text-gray-300 text-sm md:text-base">Rp {totalHarga.toLocaleString("id-ID")}</span>
                                        </div>

                                        {nilaiDiskon > 0 && (
                                            <div className="flex justify-between gap-2 text-green-600">
                                                <span className="text-sm md:text-base">Diskon</span>
                                                <span className="text-sm md:text-base">- Rp {nilaiDiskon.toLocaleString("id-ID")}</span>
                                            </div>
                                        )}

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
                                            <span className="text-sm md:text-base whitespace-nowrap">+ Rp {pajakPPN.toLocaleString("id-ID")}</span>
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
                                            <span className="text-sm md:text-base whitespace-nowrap">+ Rp {biayaServis.toLocaleString("id-ID")}</span>
                                        </div>

                                        <div className="flex justify-between font-semibold mt-4 text-slate-700">
                                            <span className="dark:text-gray-300">Total transfer</span>
                                            <span className="text-black">Rp {totalTransfer.toLocaleString("id-ID")}</span>
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
                                                Saya setuju dengan
                                                <Link href='/terms' className="text-blue-600 font-semibold">
                                                    {" "} Syarat & Ketentuan
                                                </Link>
                                            </label>
                                        </div>

                                        <button
                                            className={`w-full mt-4 py-2 rounded-lg font-semibold ${
                                                isChecked ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-300 text-slate-700 cursor-default"
                                            }`}
                                            disabled={!isChecked}
                                            onClick={handleBayar}
                                            >
                                            {isBayar ? 'Memproses...' : 'Bayar Sekarang'}
                                        </button>

                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>

            {/* MODAL HAPUS CART */}
            {confirmDeleteId !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4"
                    onClick={() => setConfirmDeleteId(null)}
                >
                    <div
                        className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()} // biar klik di dalam modal tidak ikut close
                    >
                        <div className="flex flex-col items-center text-center">
                            <Trash2 className="w-12 h-12 text-red-500 mb-3" />

                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Hapus Item dari Keranjang?
                            </h2>

                            <p className="text-sm text-gray-600 mb-6">
                            Apakah kamu yakin ingin menghapus item ini dari keranjangmu?
                            </p>

                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={() => {
                                    handleDeleteItem(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                    }}
                                    className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                                >
                                    Ya, Hapus
                                </button>
                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="cursor-pointer flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    </MainLayout>
  );
}

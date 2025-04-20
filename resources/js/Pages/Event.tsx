import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// icons
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";



import axios from "axios";
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { Head, Link, usePage } from '@inertiajs/react';
import { changeDate } from './../Utils/changeDate';
import { Filter, MapPin, Search, SlidersHorizontal, X } from "lucide-react";

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

interface Event {
    kategori_event_id:string;
    nama:string;
    slug:string;
    image:string;
    status:string;
    status_event:string;
    excerpt:string;
    tempat:string;
    tanggal:string;
    harga_terendah:number;
}

interface PageProps {
  events: Event[];
  totalPages: number;
  [key: string]: any; // Tambahkan ini agar tidak error
}

export default function Event() {
    const [error, setError] = useState(null);
    const { events: initialEvents = [], totalPages: initialTotalPages } = usePage<PageProps>().props;
    const { user } = usePage().props;

    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const isDesktop = useMemo(() => {
        return window.innerWidth >= 1024;
    }, [window.innerWidth]); // Cek apakah user di desktop
    const [tabActive, setTabActive] = useState("Semua Kegiatan");
    const [isUserInteracted, setIsUserInteracted] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Semua");
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

    // Fungsi untuk mengambil lebih banyak event
    const loadMoreEvents = async () => {
        if (loading || page >= totalPages) return;
        setLoading(true);

        try {
            const response = await axios.get(`/event?page=${page + 1}`);
            setEvents([...filteredEvents, ...response.data.events]);
            setFilteredEvents([...events, ...response.data.events]);
            setPage(page + 1);
        } catch (error) {
            console.error("Error loading more events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowFilter(false);
                searchInputRef.current?.blur();
            }
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Auto Load untuk desktop ketika user scroll sampai bawah
    useEffect(() => {
        if (!isDesktop) return;

        const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
            loadMoreEvents();
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDesktop, loadMoreEvents]);

    useEffect(() => {
        let filtered = events;

        // Filter berdasarkan tabActive
        if (tabActive === "Sudah Berakhir") {
            filtered = filtered.filter(event => event.status === "Event Sudah Berakhir");
        } else if (tabActive === "Sedang Berlangsung") {
            filtered = filtered.filter(event => event.status === "Pendaftaran Masih Dibuka");
        }

        setFilteredEvents(filtered);
    }, [tabActive]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/event', {
                params: {
                    selectedFilter,
                    searchQuery
                }
            });

            console.log("Response Data:", response.data); // Cek data di console

            if (response.data && Array.isArray(response.data.events)) {
                setFilteredEvents(response.data.events);
                setTotalPages(response.data.totalPages);
            } else {
                console.error("Invalid Response Structure", response.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [searchQuery]);

  if (events.length > 0) return (
    <MainLayout title="Event | Sanggar Nusantara">
        <LightNavbar user={user} />
        <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="container mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900`}>Semua Event Sanggar Nusantara</h1>
                    <div className="mt-5 md:mt-10 flex flex-col md:items-center">
                        <div className="flex items-center gap-2 mb-7 md:w-[50%]">
                            {/* <button
                                onClick={() => setShowFilter(true)}
                                className="bg-gray-200 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 outline-1 outline-gray-300 flex md:hidden items-center cursor-pointer"
                            >
                                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filter
                            </button> */}

                            {/* Search Bar */}
                            <div className="flex items-center w-full rounded-lg p-2 shadow-sm border-2 border-gray-400 focus-within:outline-2 focus-within:outline-blue-500">
                                <Search className="w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    ref={searchInputRef}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari event..."
                                    className="ml-2 w-full outline-none"
                                />
                                <div className="hidden md:flex px-2 py-1 bg-gray-400 rounded-md">
                                    <span className="text-white text-sm font-semibold whitespace-nowrap">Ctrl + K</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Tabs */}
                        <div className="md:hidden flex justify-around w-full border-b border-gray-300  pb-2 mb-4">
                            {["Semua Kegiatan", "Sedang Berlangsung", "Sudah Berakhir"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setTabActive(tab)}
                                    className={` font-semibold cursor-pointer px-4 py-2 ${tabActive === tab ? "text-blue-600" : "text-gray-500" }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:flex justify-start md:justify-center mb-4">
                            {/* <button
                                onClick={() => setShowFilter(true)}
                                className="md:mr-4 bg-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 outline-1 outline-gray-300 flex items-center cursor-pointer"
                            >
                                <SlidersHorizontal className="w-5 h-5 mr-2" /> Filter
                            </button> */}

                            {["Semua Kegiatan", "Sedang Berlangsung", "Sudah Berakhir"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setTabActive(tab)}
                                    className={`cursor-pointer px-4 py-2 mx-2 rounded-lg ${tabActive === tab ? "bg-red-600 text-white" : "active:bg-gray-300 bg-gray-200 hover:bg-gray-300"}`}
                                >
                                    <span className="font-semibold">{tab}</span>
                                </button>
                            ))}
                        </div>

                        {showFilter && (
                            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-40">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] md:w-[60%] lg:w-[40%] border border-gray-300">
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-3">
                                        <div className="flex items-center">
                                            <Filter className="w-5 h-5 mr-2 text-gray-600" />
                                            <h2 className="text-lg font-semibold">Filter Event</h2>
                                        </div>
                                        <button className="cursor-pointer" onClick={() => setShowFilter(false)}>
                                            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                                        </button>
                                    </div>
                                    <div className="mb-6">
                                        <select
                                            value={selectedFilter}
                                            onChange={(e) => setSelectedFilter(e.target.value)}
                                            className="w-full p-3 border rounded-lg border-gray-400 outline-2 outline-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih Filter</option>
                                            <option value="gratis">Gratis</option>
                                            <option value="berbayar">Berbayar</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setShowFilter(false)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer font-semibold"
                                        >
                                            Terapkan Filter
                                        </button>

                                        <button
                                            onClick={() => setSelectedFilter("")}
                                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer font-semibold"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {filteredEvents.length >= 1 ? (
                    <>
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-7 md:gap-10 items-center lg:px-10 px-3">
                            {filteredEvents.map((item, index) => (
                            <Link key={index} href={`/event/${item.slug}`} className="bg-white rounded-lg shadow-sm relative">
                                {item.status_event === "premium" && (
                                    <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs lg:text-base font-bold px-2 py-1 rounded">
                                        Premium
                                    </span>
                                )}
                                <img
                                src={item.image ? `./storage/${item.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                alt={item.nama}
                                className="w-full h-[200px] md:h-[300px] object-cover rounded-lg mb-8"
                                />
                                <h2 className="px-4 text-lg font-bold mb-2 text-slate-800">{item.nama}</h2>

                                <p className="px-4 text-gray-700 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.excerpt}</p>

                                <h3 className="px-4 text-lg font-bold mt-2 text-red-500 blinker z-1">
                                    {item.harga_terendah ? `Rp ${item.harga_terendah.toLocaleString('id-ID')}` : 'Gratis'}
                                </h3>

                                <div className="mt-3 md:flex gap-5 px-4 pb-4">
                                    <p className="w-[70%] flex md:mb-0 mb-2 gap-2 text-gray-600 items-center">
                                        <MapPin className="w-[25px] h-[25px]" />
                                        <span className="line-clamp-2 text-sm">{item.tempat}</span>
                                    </p>
                                    <p className="w-[30%] flex gap-2 text-sm text-gray-600 items-center">
                                        <FaCalendar className="w-[20px] h-[20px]" />
                                        <span className="line-clamp-2 text-sm">{changeDate(new Date(item.tanggal))}</span>
                                    </p>
                                </div>
                                <div className={`p-5 rounded-b-lg text-center ${item.status === "Event Sudah Berakhir" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}`}>
                                <p className="text-capitalize lg:text-base md:text-sm text-[12px] font-semibold">{item.status}</p>
                                </div>
                            </Link>
                            ))}
                        </div>

                        {/* Tombol Load More */}
                        {!isDesktop && page < totalPages && (
                            <div className="mt-10 text-center">
                                <button
                                    onClick={loadMoreEvents}
                                    className="cursor-pointer px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? "Memuat..." : "Muat Lebih Banyak"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mt-16 flex justify-center items-center flex-col">
                        <img src="./images/kosong.svg" className="lg:w-[10%] w-[25%] h-[30%]" alt="icon-splash" />
                        <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500">Belum Ada Event</h1>
                    </div>
                )}
            </div>
        </div>

    </MainLayout>
  );
}

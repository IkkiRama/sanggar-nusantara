"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";
import { Link } from "@inertiajs/react";

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Challenge = ({ challenges, user, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);


  // Keyboard Shortcut: Ctrl + K → fokus ke kolom pencarian
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      // Windows/Linux pakai Ctrl, Mac pakai Meta (Cmd)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Filtered Challenge berdasarkan search dan filter
  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query);

      const matchFilter =
        selectedFilter === ""
          ? true
          : selectedFilter === "gratis"
          ? c.status !== "premium"
          : c.status === "premium";

      return matchSearch && matchFilter;
    });
  }, [challenges, searchQuery, selectedFilter]);

  return (
    <MainLayout title="Challenge | Sanggar Nusantara">
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto relative z-10">
          <motion.div {...fadeInUpAnimation} className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Semua Challenge Sanggar Nusantara
            </h1>

            {/*  Search Bar + Filter Button */}
            <div className="mt-6 md:mt-10 flex flex-col md:items-center">
              <div className="flex items-center gap-2 mb-7 w-full md:w-[60%]">
                <div className="flex items-center w-full rounded-lg p-2 shadow-sm border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition">
                  <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari challenge..."
                    className="ml-2 w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="hidden md:flex px-2 py-1 bg-gray-400 dark:bg-gray-700 rounded-md">
                    <span className="text-white text-sm font-semibold whitespace-nowrap">
                      Ctrl + K
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/*  Filter Modal */}
            {showFilter && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-40">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-[90%] md:w-[60%] lg:w-[40%] border border-gray-300 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
                    <div className="flex items-center">
                      <Filter className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Filter Challenge
                      </h2>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() => setShowFilter(false)}
                    >
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full p-3 border rounded-lg border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Filter</option>
                      <option value="gratis">Gratis</option>
                      <option value="berbayar">Berbayar (Premium)</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Terapkan
                    </button>
                    <button
                      onClick={() => setSelectedFilter("")}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/*  Challenge List */}
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4">
              {filteredChallenges.map((challenge, idx) => (
                <Link
                  key={idx}
                  href={`/ragam-challenge/${challenge.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
                >
                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      challenge.status === "premium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {challenge.status}
                  </span>

                  {/* Image */}
                  <img
                    src={
                      challenge.image
                        ? `./storage/${challenge.image}`
                        : "/images/NO IMAGE AVAILABLE.jpg"
                    }
                    alt={challenge.title}
                    className="w-full h-[220px] object-cover"
                  />

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100 mb-2">
                        {challenge.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {challenge.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-red-500 flex items-center gap-1">
                        🪙 {challenge.nusantara_points} poin
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        ⏱️ {challenge.duration_days} hari
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className={`text-center p-5 ${
                      challenge.status === "premium"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}
                  >
                    <p className="text-capitalize lg:text-base md:text-sm text-[12px] font-semibold">
                      {challenge.status === "premium"
                        ? "Khusus Member Premium"
                        : "Gratis diikuti"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-16 flex justify-center items-center flex-col">
              <img
                src="/images/kosong.svg"
                className="lg:w-[10%] w-[25%] h-[30%] opacity-80 dark:opacity-60"
                alt="icon-splash"
              />
              <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500 dark:text-red-400">
                Tidak ditemukan challenge
              </h1>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenge;

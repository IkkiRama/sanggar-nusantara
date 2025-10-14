"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";
import { Link, router } from "@inertiajs/react";

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

interface Quiz {
  id: number;
  uuid: string;
  title: string;
  description: string;
  status: "gratis" | "premium";
  duration_minutes: number;
  start_at?: string;
  is_premium:boolean;
  end_at?: string;
}

interface Props {
  quizzes: Quiz[];
  user: any;
  cartCount?: number;
}

const Kuis = ({ quizzes, user, cartCount }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        quiz.title.toLowerCase().includes(query) ||
        (quiz.description?.toLowerCase().includes(query) ?? false);

      const matchFilter =
        selectedFilter === ""
          ? true
          : selectedFilter === "gratis"
          ? quiz.status === "gratis"
          : quiz.status === "premium";

      return matchSearch && matchFilter;
    });
  }, [quizzes, searchQuery, selectedFilter]);



  return (
    <MainLayout title="Kuis Nusantara">
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="lg:py-0 py-20 px-4 min-h-screen lg:pt-28 lg:pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <motion.div {...fadeInUpAnimation} className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Semua Kuis Nusantara
            </h1>

            {/* Search + Filter */}
            <div className="mt-6 md:mt-10 flex flex-col md:items-center">
              <div className="flex items-center gap-2 mb-7 w-full md:w-[60%]">
                <div className="flex items-center w-full rounded-lg p-2 shadow-sm border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition">
                  <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kuis..."
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
                </div>

                <button
                  onClick={() => setShowFilter(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Modal Filter */}
            {showFilter && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-40">
                <div
                  onClick={() => setShowFilter(false)}
                  className="absolute inset-0 cursor-pointer"
                ></div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-[90%] md:w-[60%] lg:w-[40%] border border-gray-300 dark:border-gray-700 z-50"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
                    <div className="flex items-center">
                      <Filter className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Filter Kuis
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
                      <option value="premium">Berbayar (Premium)</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold cursor-pointer"
                    >
                      Terapkan
                    </button>
                    <button
                      onClick={() => setSelectedFilter("")}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Daftar Quiz */}
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4">
              {filteredQuizzes.map((quiz, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedQuiz(quiz)}
                  className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
                >
                  {/* <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      quiz.status === "premium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {quiz.status}
                  </span> */}

                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100 mb-2">
                        {quiz.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {quiz.description ?? "Tidak ada deskripsi."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-blue-500 flex items-center gap-1">
                        ⏱️ {quiz.duration_minutes} menit
                      </span>
                      {quiz.start_at && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          Mulai:{" "}
                          {new Date(quiz.start_at).toLocaleDateString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`text-center p-5 ${
                      quiz.status === "premium"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}
                  >
                    <p className="lg:text-base md:text-sm text-[12px] font-semibold">
                      {quiz.status === "premium"
                        ? "Khusus Member Premium"
                        : "Gratis untuk semua pengguna"}
                    </p>
                  </div>
                </div>
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
                Tidak ditemukan kuis
              </h1>
            </div>
          )}
        </div>
      </div>

        {/* MODAL DETAIL QUIZ */}
        {selectedQuiz && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedQuiz(null)} // klik luar → tutup modal
            >
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()} // biar klik dalam modal nggak nutup
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-[90%] p-6 border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                        {selectedQuiz.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedQuiz.description || "Tidak ada deskripsi."}
                    </p>

                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                        ⏱️ Durasi: {selectedQuiz.duration_minutes} menit
                        </span>
                        <span
                        className={`${
                            selectedQuiz.is_premium
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        } font-semibold`}
                        >
                        {selectedQuiz.is_premium ? "Premium" : "Gratis"}
                        </span>
                    </div>

                    <h3 className={`my-5 font-semibold text-lg lg:text-2xl text-center text-red-500 ${
                            user.role === "user" || user.role === null
                                ? "block"
                                : "hidden"
                            }`}>
                        {selectedQuiz.is_premium && (user.role === "user" || user.role === null) ? "Anda Bukan Premium" : "" }
                    </h3>

                    {/* Tombol Mulai Kuis */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                            if (!user) {
                                // belum login
                                alert("Silakan login terlebih dahulu untuk mulai kuis.");
                                window.location.href = "/masuk";
                                return;
                            }

                            if (selectedQuiz.is_premium && user.is_premium) {
                                // user login tapi bukan premium
                                alert("Kuis ini khusus untuk member premium. Upgrade dulu ya!");
                                return;
                            }

                            // Jika lolos semua kondisi
                            router.visit(`/kuis-nusantara/mulai/${selectedQuiz?.uuid}`);
                            }}
                            disabled={user.role === "user" || user.role === null ? true : false}
                            className={`py-3 rounded-lg font-semibold text-white transition ${
                            user.role === "user" || user.role === null
                                ? "hidden flex-1/6 bg-yellow-600 hover:bg-yellow-700"
                                : "w-full bg-red-500 hover:bg-red-600 cursor-pointer"
                            }`}
                        >
                            {selectedQuiz.is_premium && (user.role === "user" || user.role === null) ? "Anda Bukan Premium" : "Mulai Kuis" }
                        </button>
                        {selectedQuiz.is_premium && (user.role === "user" || user.role === null) && (
                            <Link
                                href="/subscription"
                                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-600 transition-all"
                            >
                                Langganan Sekarang
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        )}

    </MainLayout>
  );
};

export default Kuis;

import { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaMusic, FaPlay } from "react-icons/fa";
import React from "react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";
import { FaMapLocation } from "react-icons/fa6";

interface LaguDaerahItem {
  nama: string;
  pencipta: string;
  tahun_diciptakan: number;
  asal: string;
  image: string;
  audio?: string;
  video?: string;
  kategori: string;
  lirik: string;
  sejarah: string;
  lat: number;
  lng: number;
}

export default function RagamLaguDaerah({ user, laguDaerah = [], cartCount }) {
  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<LaguDaerahItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLagu, setSelectedLagu] = useState<LaguDaerahItem | null>(null);

  useEffect(() => {
    if (!Array.isArray(laguDaerah)) return; // Cegah error jika data undefined atau bukan array
    setFilteredData(
      laguDaerah.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch, laguDaerah]);

  // Fungsi untuk membuka modal dan menampilkan detail lagu
  const openModal = (lagu: LaguDaerahItem) => {
    setSelectedLagu(lagu);
    setModalOpen(true);
  };

  // Fungsi untuk mengonversi link YouTube menjadi format embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <MainLayout title="Ragam Lagu Daerah | Sanggar Nusantara">
      <LightNavbar user={user} cartCount={cartCount} />
      <main className="pt-44 lg:px-20 md:px-10 px-5 dark:bg-black container mx-auto">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="shadow text-center bg-emerald-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <FaMusic size={30} />
          </span>
          RAGAM LAGU DAERAH INDONESIA
        </h1>

        {/* Input pencarian */}
        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-100 border-gray-500 focus:outline-2 focus:outline-blue-500 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full dark:text-gray-200"
              placeholder="Cari Lagu Daerah"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Lagu Daerah */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((lagu) => (
              <div
                key={lagu.nama} // Menggunakan nama lagu sebagai key
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(lagu)} // Klik untuk buka modal
              >
                <img
                  src={lagu.image ? `../storage/${lagu.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full bg-gray-300 h-full object-cover"
                  alt={lagu.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-emerald-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {lagu.asal}
                  </span>
                  <h3 className="mt-3 font-bold dark:text-gray-200">{lagu.nama}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Tidak ada lagu daerah yang ditemukan.</p>
          )}
        </section>
      </main>

      {/* Modal Detail Lagu Daerah */}
        {modalOpen && selectedLagu && (
            <section className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[9999999999] flex items-center justify-center overflow-y-auto">
                <div className="relative w-full max-w-3xl mx-auto my-10">
                    <div className="bg-white dark:bg-gray-950 rounded shadow-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between pb-5 border-b-2 mb-5 border-b-gray-400">
                            <div className="">
                                <h1 className="text-2xl font-bold dark:text-gray-200">{selectedLagu.nama}</h1>
                                <p className="text-sm dark:text-gray-400 mt-1">
                                    Kategori: {selectedLagu.kategori} &nbsp;
                                    {selectedLagu.tahun_diciptakan && (
                                        <span>
                                            Diciptakan tahun : {selectedLagu.tahun_diciptakan}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                className="cursor-pointer text-gray-800 dark:text-gray-200 hover:text-emerald-500 z-10"
                                onClick={() => setModalOpen(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div>
                            {/* Gambar */}
                            <img
                                src={selectedLagu.image ? `../storage/${selectedLagu.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                className="rounded lg:h-[350px] h-[200px] object-cover w-full bg-gray-300"
                                alt={selectedLagu.nama}
                            />

                            {/* Tahun & Kategori */}
                            {/* <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                                Kategori: {selectedLagu.kategori}
                            </p>
                            {selectedLagu.tahun_diciptakan && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                Tahun Diciptakan: {selectedLagu.tahun_diciptakan}
                                </p>
                            )} */}

                            <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                                <b>Sejarah:</b> <br />
                                <span className="text-base text-slate-600">
                                    {selectedLagu.sejarah}
                                </span>
                            </p>

                            {/* Lirik */}
                            <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                                <b>Lirik:</b> <br />
                                <span className="text-base text-slate-600">
                                    {selectedLagu.lirik}
                                </span>
                            </p>

                            {/* Audio */}
                            {selectedLagu.audio && (
                                <div className="mt-4">
                                    <p className="text-sm font-semibold mb-2 dark:text-gray-300">Dengarkan Lagu:</p>
                                    <audio controls className="w-full">
                                        <source src={`../storage/${selectedLagu.audio}`} type="audio/mpeg" />
                                        Browser Anda tidak mendukung tag audio.
                                    </audio>
                                </div>
                            )}

                            {/* Video YouTube */}
                            {selectedLagu.video && getYouTubeEmbedUrl(selectedLagu.video) && (
                                <div className="mt-5">
                                    <p className="text-sm font-semibold mb-2 dark:text-gray-300">Tonton Video:</p>
                                    <iframe
                                        width="100%"
                                        src={getYouTubeEmbedUrl(selectedLagu.video)!}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded lg:h-[400px] h-[300px]"
                                    ></iframe>
                                </div>
                            )}

                            <hr className="my-5 dark:border-gray-700" />
                            <div className="flex items-center justify-between">
                                <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                                <FaMapLocation />
                                {selectedLagu.asal}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}


    </MainLayout>
  );
}

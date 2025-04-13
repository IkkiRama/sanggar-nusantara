import { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaMusic, FaPlay } from "react-icons/fa";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";
import { FaMapLocation } from "react-icons/fa6";

interface LaguDaerahItem {
  nama: string;
  pencipta: string;
  tahun_diciptakan: number;
  asal_lagu: string;
  image: string;
  audio?: string;
  video?: string;
  kategori: string;
  lirik: string;
  sejarah: string;
  lat: number;
  lng: number;
}

export default function RagamLaguDaerah({ user, laguDaerah = [] }) {
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
      <LightNavbar user={user} />
      <main className="pt-44 lg:px-20 md:px-10 px-5 dark:bg-black">
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
                    {lagu.asal_lagu}
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
        <section className="fixed inset-0 bg-black/40 flex items-center justify-center lg:py-[10%] z-9999999999">
          <div className="bg-white overflow-y-auto max-h-screen lg:p-6 p-4 dark:bg-gray-950 md:w-[60%] w-[95%] md:mx-0 mx-auto rounded relative">
            {/* Tombol Tutup Modal */}
            <button
              className="cursor-pointer absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-emerald-500"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Konten Modal */}
            <h1 className="text-2xl font-bold dark:text-gray-200">{selectedLagu.nama}</h1>
            <p className="text-sm dark:text-gray-400">Kategori: {selectedLagu.kategori}</p>
            <hr className="my-3 border-gray-400" />

            <div>
              {/* Gambar */}
              <img
                src={selectedLagu.image ? `../storage/${selectedLagu.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                className="rounded h-[300px] object-cover w-full bg-gray-300"
                alt={selectedLagu.nama}
              />

              {/* Sejarah */}
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
                <div className="mt-3">
                  <p className="text-lg text-slate-700 font-semibold my-3 dark:text-gray-300">Dengarkan Lagu:</p>
                  <audio controls className="w-full">
                    <source src={`../storage/${selectedLagu.audio}`} type="audio/mpeg" />
                    Browser Anda tidak mendukung tag audio.
                  </audio>
                </div>
              )}

              <hr className="my-5 border-gray-400" />
              <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                <FaMapLocation />
                {selectedLagu.asal_lagu}
              </p>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

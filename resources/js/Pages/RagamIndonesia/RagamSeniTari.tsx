import { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaTheaterMasks } from "react-icons/fa";
import React from "react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";
import { FaMapLocation } from "react-icons/fa6";

interface SeniTariItem {
  nama: string;
  pencipta: string;
  tahun_diciptakan: number;
  asal: string;
  image: string;
  video?: string;
  kategori: string;
  deskripsi: string;
  sejarah: string;
}

export default function RagamSeniTari({ user, seniTari, cartCount }) {
  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<SeniTariItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTari, setSelectedTari] = useState<SeniTariItem | null>(null);

  useEffect(() => {
    if (!Array.isArray(seniTari)) return; // Cegah error jika data undefined atau bukan array
    setFilteredData(
      seniTari.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch, seniTari]);

  // Fungsi untuk membuka modal dan menampilkan detail seni tari
  const openModal = (tari: SeniTariItem) => {
    setSelectedTari(tari);
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
    <MainLayout title="Ragam Seni Tari | Sanggar Nusantara">
      <LightNavbar user={user} cartCount={cartCount} />
      <main className="pt-44 lg:px-20 md:px-10 px-5 dark:bg-black container mx-auto">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="shadow text-center bg-yellow-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <FaTheaterMasks size={30} />
          </span>
          RAGAM SENI TARI INDONESIA
        </h1>

        {/* Input pencarian */}
        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-100 border-gray-500 focus:outline-2 focus:outline-red-500 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full dark:text-gray-200"
              placeholder="Cari Seni Tari"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Seni Tari */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((tari, index) => (
              <div
                key={index} // Menggunakan nama seni tari sebagai key
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(tari)} // Klik untuk buka modal
              >
                <img
                  src={tari.image ? `../storage/${tari.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full bg-gray-300 h-full object-cover"
                  alt={tari.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-yellow-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {tari.asal}
                  </span>
                  <h3 className="mt-3 font-bold dark:text-gray-200">{tari.nama}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Tidak ada seni tari yang ditemukan.</p>
          )}
        </section>
      </main>

      {/* Modal Detail Seni Tari */}
        {modalOpen && selectedTari && (
            <section className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[9999999999] flex items-center justify-center overflow-y-auto">
                <div className="relative w-full max-w-3xl mx-auto my-10">
                    <div className="bg-white dark:bg-gray-950 rounded shadow-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between pb-5 border-b-2 mb-5 border-b-gray-400">
                            <div className="">
                                <h1 className="text-2xl font-bold dark:text-gray-200">{selectedTari.nama}</h1>

                                <p className="text-sm dark:text-gray-400 mt-1">
                                    Kategori: {selectedTari.kategori} &nbsp;
                                    {selectedTari.tahun_diciptakan && (
                                        <span>
                                            Diciptakan tahun : {selectedTari.tahun_diciptakan}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                className="cursor-pointer text-gray-800 dark:text-gray-200 hover:text-yellow-500 z-10"
                                onClick={() => setModalOpen(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div>
                            {/* Gambar */}
                            <img
                                src={selectedTari.image ? `../storage/${selectedTari.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                className="rounded lg:h-[350px] h-[200px] object-cover w-full bg-gray-300"
                                alt={selectedTari.nama}
                            />

                            {/* Sejarah */}
                            <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                                <b>Sejarah:</b> <br />
                                <span className="text-base text-slate-600">
                                    {selectedTari.sejarah}
                                </span>
                            </p>

                            {/* Deskripsi */}
                            <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                                <b>Deskripsi:</b> <br />
                                <span className="text-base text-slate-600">
                                    {selectedTari.deskripsi}
                                </span>
                            </p>

                            {/* Video YouTube */}
                            {selectedTari.video && getYouTubeEmbedUrl(selectedTari.video) && (
                                <div className="mt-5">
                                    <p className="md:text-lg text-slate-700 text-[13px] mb-3 dark:text-gray-300">
                                        <b>Tonton Vidio:</b>
                                    </p>
                                <iframe
                                    width="100%"
                                    src={getYouTubeEmbedUrl(selectedTari.video)!}
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
                                {selectedTari.asal}
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

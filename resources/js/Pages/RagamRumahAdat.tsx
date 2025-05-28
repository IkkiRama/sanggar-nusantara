import { useEffect, useState } from "react";
import {FaSearch, FaTimes } from "react-icons/fa";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";
import { MdHouse } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";

interface RumahAdatItem {
  nama: string;
  asal: string;
  image: string;
  deskripsi: string;
  video: string; // Link YouTube
}

export default function RagamRumahAdat({ user, rumahAdat, cartCount }) {
  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<RumahAdatItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRumahAdat, setSelectedRumahAdat] = useState<RumahAdatItem | null>(null);

  useEffect(() => {
    setFilteredData(
      rumahAdat.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch, rumahAdat]);

  // Fungsi untuk membuka modal dan menampilkan detail rumah adat
  const openModal = (rumahAdat: RumahAdatItem) => {
    setSelectedRumahAdat(rumahAdat);
    setModalOpen(true);
  };

  // Fungsi untuk mengonversi link YouTube menjadi format embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) return null;

    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <MainLayout title="Ragam Rumah Adat | Sanggar Nusantara">
      <LightNavbar user={user} cartCount={cartCount} />
      <main className="pt-44 lg:px-20 md:px-10 px-5 dark:bg-black container mx-auto">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="shadow text-center bg-emerald-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <MdHouse size={30} />
          </span>
          RAGAM RUMAH ADAT INDONESIA
        </h1>

        {/* Input pencarian */}
        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-200 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full dark:text-gray-200"
              placeholder="Cari Rumah Adat"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Rumah Adat */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((rumah, index) => (
              <div
                key={index}
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(rumah)} // Klik untuk buka modal
              >
                <img
                  src={rumah.image ? `../storage/${rumah.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full h-full object-cover bg-gray-300"
                  alt={rumah.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-emerald-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {rumah.asal}
                  </span>
                  <h3 className="mt-3 font-bold dark:text-gray-200">{rumah.nama}</h3>
                  <small className="text-gray-700 dark:text-gray-400">{rumah.deskripsi}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Tidak ada rumah adat yang ditemukan.</p>
          )}
        </section>
      </main>

      {/* Modal Detail Rumah Adat */}
      {modalOpen && selectedRumahAdat && (
        <section className="fixed inset-0 bg-white/40 backdrop-blur-lg z-9999999999 flex items-center justify-center lg:py-[10%]">
          <div className="bg-white overflow-y-auto max-h-screen lg:p-6 p-4 dark:bg-gray-950 md:w-[60%] w-[95%] md:mx-0 mx-auto rounded relative">
            {/* Tombol Tutup Modal */}
            <button
              className="cursor-pointer absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-emerald-500"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Konten Modal */}
            <h1 className="text-2xl font-bold dark:text-gray-200">{selectedRumahAdat.nama}</h1>
            <hr className="my-3 dark:border-gray-700" />

            <div>
              {/* Gambar */}
              <img
                src={selectedRumahAdat.image ? `../storage/${selectedRumahAdat.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                className="rounded h-[200px] lg:h-[400px] object-cover w-full bg-gray-300"
                alt={selectedRumahAdat.nama}
              />

              {/* Deskripsi */}
              <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                {selectedRumahAdat.deskripsi}
              </p>

              {/* Video YouTube */}
              {selectedRumahAdat.video && getYouTubeEmbedUrl(selectedRumahAdat.video) && (
                <div className="mt-3">
                  <p className="text-sm font-semibold my-3 dark:text-gray-300">Tonton Video:</p>
                  <iframe
                    width="100%"
                    src={getYouTubeEmbedUrl(selectedRumahAdat.video)!}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded lg:h-[350] h-[300]"
                  ></iframe>
                </div>
              )}

              <hr className="my-5 dark:border-gray-700" />
              <div className="flex items-center justify-between">
                <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                  <FaMapLocation />
                  {selectedRumahAdat.asal}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

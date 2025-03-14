import { useEffect, useState } from "react";

// icons
import { FaArrowRight, FaBowlFood, FaMapLocation, FaMusic } from "react-icons/fa6";

import { FaSearch, FaTimes } from "react-icons/fa";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";
import { MdOutlinePiano } from "react-icons/md";

interface AlatMusikItem {
    nama: string;
    asal: string;
    image: string;
    deskripsi: string;
    cara_main:string;
    audio:string;
    video:string;
    excerpt:string;
}

export default function RagamAlatMusik({user, alatMusik}) {

  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<AlatMusikItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlatMusik, setSelectedAlatselectedAlatMusik] = useState<AlatMusikItem | null>(null);


  useEffect(() => {
    setFilteredData(
      alatMusik.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch]);

  // Fungsi untuk membuka modal dan menampilkan detail makanan
  const openModal = (alatMusik: AlatMusikItem) => {
    setSelectedAlatselectedAlatMusik(alatMusik);
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
    <MainLayout title="Ragam Makanan | Sanggar Nusantara">
        <LightNavbar user={user} />
      <main className="mt-44 lg:px-20 md:px-10 px-5 dark:bg-black">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="shadow text-center bg-indigo-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <MdOutlinePiano size={30} />
          </span>
          RAGAM ALAT MUSIK INDONESIA
        </h1>

        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-200 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full"
              placeholder="Cari Alat Musik"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Alat Musik */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((food, index) => (
              <div
                key={index}
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(food)} // Klik untuk buka modal
              >
                <img
                  src={food.image ? food.image : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full h-full object-cover bg-gray-300"
                  alt={food.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-indigo-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {food.asal}
                  </span>
                  <h3 className="mt-3 font-bold dark:text-gray-200">{food.nama}</h3>
                  <small className="text-gray-700 dark:text-gray-400">{food.deskripsi}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Tidak ada makanan yang ditemukan.</p>
          )}
        </section>
      </main>

      {/* Modal Detail Alat Musik */}
      {modalOpen && selectedAlatMusik && (
        <section className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center lg:py-[10%]">
          <div className="bg-white overflow-y-auto max-h-screen lg:p-6 p-4 dark:bg-gray-950 md:w-[60%] w-[95%] md:mx-0 mx-auto rounded relative">
            {/* Tombol Tutup Modal */}
            <button
              className="cursor-pointer absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-orange-500"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Konten Modal */}
            <h1 className="text-2xl font-bold dark:text-gray-200">{selectedAlatMusik.nama}</h1>
            <hr className="my-3 dark:border-gray-700" />

            <div>
              {/* Gambar */}
              <img
                src={selectedAlatMusik.image}
                className="rounded h-[200px] object-cover w-full bg-gray-300"
                alt={selectedAlatMusik.nama}
              />

              {/* Deskripsi */}
              <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                {selectedAlatMusik.deskripsi}
              </p>

              {/* Cara Main */}
              <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                <b className="text-indigo-500">Cara Main:</b> {selectedAlatMusik.cara_main}
              </p>

              {/* Audio */}
              {selectedAlatMusik.audio && (
                <div className="mt-3">
                  <p className="text-sm font-semibold my-3 dark:text-gray-300">Dengar Suara:</p>
                  <audio controls className="w-full">
                    <source src={selectedAlatMusik.audio} type="audio/mpeg" />
                    Browser Anda tidak mendukung tag audio.
                  </audio>
                </div>
              )}

              {/* Video YouTube */}
              {selectedAlatMusik.video && getYouTubeEmbedUrl(selectedAlatMusik.video) && (
                <div className="mt-3">
                  <p className="text-sm font-semibold my-3 dark:text-gray-300">Tonton Video:</p>
                  <iframe
                    width="100%"
                    src={getYouTubeEmbedUrl(selectedAlatMusik.video)!}
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
                  {selectedAlatMusik.asal}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </MainLayout>
  );
}

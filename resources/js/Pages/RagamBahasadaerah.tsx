import { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaGlobe, FaLanguage } from "react-icons/fa";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";
import { FaMapLocation } from "react-icons/fa6";

interface BahasaDaerahItem {
  nama: string;
  daerah_asal: string;
  jumlah_penutur: number;
  kategori: string;
  deskripsi: string;
  image: string;
}

export default function RagamBahasaDaerah({ user, bahasaDaerah}) {
  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<BahasaDaerahItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBahasa, setSelectedBahasa] = useState<BahasaDaerahItem | null>(null);

  useEffect(() => {
    if (!Array.isArray(bahasaDaerah)) return; // Cegah error jika data undefined atau bukan array
    setFilteredData(
      bahasaDaerah.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch, bahasaDaerah]);

  // Fungsi untuk membuka modal dan menampilkan detail bahasa daerah
  const openModal = (bahasa: BahasaDaerahItem) => {
    setSelectedBahasa(bahasa);
    setModalOpen(true);
  };

  return (
    <MainLayout title="Ragam Bahasa Daerah | Sanggar Nusantara">
      <LightNavbar user={user} />
      <main className="mt-44 lg:px-20 md:px-10 px-5 dark:bg-black">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="shadow text-center bg-red-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <FaLanguage size={30} />
          </span>
          RAGAM BAHASA DAERAH INDONESIA
        </h1>

        {/* Input pencarian */}
        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-100 border-gray-500 focus:outline-2 focus:outline-blue-500 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full"
              placeholder="Cari Bahasa Daerah"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Bahasa Daerah */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((bahasa, index) => (
              <div
                key={index}
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(bahasa)} // Klik untuk buka modal
              >
                <img
                  src={bahasa.image ? `../storage/${bahasa.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full h-full object-cover bg-gray-300"
                  alt={bahasa.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-orange-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {bahasa.daerah_asal}
                  </span>
                  <h3 className="mt-3 font-bold dark:text-gray-200">{bahasa.nama}</h3>
                  <small className="text-gray-700 dark:text-gray-400">{bahasa.deskripsi}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Tidak ada bahasa daerah yang ditemukan.</p>
          )}
        </section>
      </main>

      {/* Modal Detail Bahasa Daerah */}
      {modalOpen && selectedBahasa && (
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
            <h1 className="text-2xl font-bold dark:text-gray-200">{selectedBahasa.nama}</h1>
            <p className="text-sm dark:text-gray-400">Kategori: {selectedBahasa.kategori}</p>
            <hr className="my-3 border-gray-400" />

            <img
                src={selectedBahasa.image ? `../storage/${selectedBahasa.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                className="rounded h-[200px] lg:h-[400px] object-cover w-full bg-gray-300"
                alt={selectedBahasa.nama}
            />

            <div>
              {/* Deskripsi */}
              <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                <b>Deskripsi:</b> <br />
                <span className="text-base text-slate-600">
                    {selectedBahasa.deskripsi}
                </span>
              </p>

              <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                <b>Jumlah Penutur:</b> {selectedBahasa.jumlah_penutur.toLocaleString("id-ID")}
              </p>

              <hr className="my-5 border-gray-400" />
              <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                <FaMapLocation />
                {selectedBahasa.daerah_asal}
              </p>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}

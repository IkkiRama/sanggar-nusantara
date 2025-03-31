import { useEffect, useState } from "react";

// icons
import { FaArrowRight, FaBowlFood, FaMapLocation } from "react-icons/fa6";
import { Link } from '@inertiajs/react';
import DarkNavbar from "../layouts/darkNavbar";

// import foods from "./../data/foods.json";
import { FaSearch, FaTimes } from "react-icons/fa";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";

interface FoodItem {
  nama: string;
  asal_makanan: string;
  image: string;
  bahan_utama: string;
  deskripsi: string;
  slug: string;
}

export default function RagamMakanan({user, foods}) {

  const [filterSearch, setFilterSearch] = useState("");
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);


  useEffect(() => {
    setFilteredData(
      foods.filter((item) =>
        item.nama?.toLowerCase().includes(filterSearch.toLowerCase())
      )
    );
  }, [filterSearch]);

  // Fungsi untuk membuka modal dan menampilkan detail makanan
  const openModal = (food: FoodItem) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  return (
    <MainLayout title="Ragam Makanan | Sanggar Nusantara">
        <LightNavbar user={user} />
      <main className="mt-44 lg:px-20 md:px-10 px-5 dark:bg-black">
        <h1 className="md:flex gap-3 text-center justify-center items-center font-bold md:text-3xl text-2xl dark:text-gray-200">
          <span className="bg-orange-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full md:mx-0 mx-auto">
            <FaBowlFood size={30} />
          </span>
          RAGAM MAKANAN KHAS
        </h1>

        <div className="flex items-center justify-center my-5">
          <div className="relative mb-10">
            <input
              type="text"
              className="border bg-gray-200 dark:border-gray-900 dark:bg-gray-800 py-2 pr-5 pl-10 rounded md:w-[500px] w-full"
              placeholder="Cari Makanan"
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[10px] dark:text-gray-300" />
          </div>
        </div>

        {/* Grid Makanan */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 pb-20">
          {filteredData.length > 0 ? (
            filteredData.map((food) => (
              <div
                key={food.slug}
                className="h-[300px] relative rounded overflow-hidden cursor-pointer"
                onClick={() => openModal(food)} // Klik untuk buka modal
              >
                <img
                  src={food.image ? `./storage/${food.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                  className="absolute inset-0 w-full h-full object-cover bg-gray-300"
                  alt={food.nama}
                />
                <div className="absolute z-10 w-[90%] left-1/2 -translate-x-1/2 dark:bg-gray-900 bg-white p-5 rounded bottom-[10px] text-center">
                  <span className="bg-orange-500 absolute left-1/2 -translate-x-1/2 -top-[10px] text-white px-5 rounded py-1 text-sm">
                    {food.asal_makanan}
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

      {/* Modal Detail Makanan */}
      {modalOpen && selectedFood && (
        <section className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-950 md:w-[500px] w-[95%] md:mx-0 mx-auto p-7 rounded relative">
            {/* Tombol Tutup Modal */}
            <button
              className="cursor-pointer absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-orange-500"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Konten Modal */}
            <h1 className="text-2xl font-bold dark:text-gray-200">{selectedFood.nama}</h1>
            <hr className="my-3 dark:border-gray-700" />
            <div>
              <img
                src={`../storage/${selectedFood.image}`}
                className="rounded h-[200px] object-cover w-full bg-gray-300"
                alt={selectedFood.nama}
              />
              <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                {selectedFood.deskripsi}
              </p>
              <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                <b className="text-orange-500">Bahan utama:</b> {selectedFood.bahan_utama}
              </p>

              <hr className="my-5 dark:border-gray-700" />
              <div className="flex items-center justify-between">
                <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                  <FaMapLocation />
                  {selectedFood.asal_makanan}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </MainLayout>
  );
}

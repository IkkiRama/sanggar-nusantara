import React, { useState, useEffect, useCallback } from "react";
import {
  FaCalendar,
  FaEnvelope,
  FaFire,
  FaMapMarkedAlt,
  FaUser,
} from "react-icons/fa";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { getRandomColor } from "../Utils/getRandomColor";
import { changeDate } from "../Utils/changeDate";

// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import backgroundImageArtikel from "../../../public/images/NO IMAGE AVAILABLE.jpg";

interface Kategori {
  id: number;
  nama: string;
}

interface User {
  id: number;
  name: string;
}

interface Artikel {
  title: string;
  views: number;
  slug: string;
  image: string;
  excerpt: string;
  published_at: string;
  user_id: number;
  kategori_id: number;
  status_artikel: string;
  kategori: Kategori;
  user: User;
}

interface trendingArtikel {
  title: string;
  slug: string;
  image: string;
  status_artikel: string;
}
interface artikelRekomendasi {
  title: string;
  slug: string;
  image: string;
  status_artikel: string;
}

interface PageProps {
  artikelTerbaru: Artikel;
  artikelBerikutnya: Artikel[];
  artikels: Artikel[];
  trendingArtikel: trendingArtikel[];
  artikelRekomendasi: artikelRekomendasi[];
  [key: string]: any;
}




export default function Artikel() {
    const { artikelTerbaru, artikelBerikutnya = [], artikels = [], trendingArtikel = [], artikelRekomendasi = []} = usePage<PageProps>().props;
    const { user } = usePage().props;

    const [countTrandingArtikel, setCountTrandingArtikel] = useState(1);


    useEffect(() => {

        if (window.innerWidth <= 500) {
            setCountTrandingArtikel(1)
        }else if(window.innerWidth > 500 && window.innerWidth <= 700){
            setCountTrandingArtikel(2)
        }else if(window.innerWidth > 700 && window.innerWidth <= 1000){
            setCountTrandingArtikel(3)
        }else if(window.innerWidth > 700){
            setCountTrandingArtikel(4)
        }

    }, []);

  return (
    <MainLayout title="Artikel | Sanggar Nusantara">
        <LightNavbar user={user} />

      <header className="mx-auto pt-30 lg:px-20 md:px-5 px-3">
        <div className="grid lg:grid-cols-4 gap-10 2xl:max-w-[2000px] mx-auto px-4 2xl:px-10">

            <span
            className="w-[1000px] h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg]"
            style={{
                backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
            ></span>

            {artikelTerbaru && (
                <Link
                href={`/artikel/${artikelTerbaru.slug}`}
                className="lg:col-span-3 lg:h-[600px] md:h-[400px] h-[300px] bg-cover relative z-10 flex items-end md:p-10 p-4 after:content-[''] after:absolute after:inset-0 after:bg-black/40 after:-z-10 bg-bottom rounded overflow-hidden"
                // style={{
                //     backgroundImage: artikelTerbaru.image ?
                //     "url(./storage/" + artikelTerbaru.image + ")" :
                //     "url(backgroundImageArtikel)",
                // }}
                style={{
                        backgroundImage: artikelTerbaru.image !== null ? `url(./storage/${artikelTerbaru.image})` : `url(${backgroundImageArtikel})`,
                    }}
                >
                    {artikelTerbaru.status_artikel === "premium" && (
                        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Premium
                        </span>
                    )}
                    <div className="w-[80%]">
                        <h6 className={`${getRandomColor("text")} md:mb-3 mb-1 font-semibold md:text-base text-sm`}>
                            {artikelTerbaru.kategori.nama.toUpperCase()}
                        </h6>
                        <h2 className="lg:text-3xl md:text-2xl font-bold text-white">
                            {artikelTerbaru.title}
                        </h2>
                        <p className="text-gray-200 mt-3 text-sm lg:block hidden">
                            {artikelTerbaru.excerpt}
                        </p>
                    </div>
                </Link>
            )}
            <div className="md:grid hidden lg:grid-cols-1 grid-cols-2 lg:gap-0 gap-10">
                {artikelBerikutnya.map((artikel) => (
                    <Link href={`/artikel/${artikel.slug}`} key={artikel.slug}>
                        <div className="h-[200px] relative">
                            <img
                                src={artikel.image ? `./storage/${artikel.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                className="bg-gray-300 h-full rounded-xl object-cover w-full"
                            />

                            {artikel.status_artikel === "premium" && (
                                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    Premium
                                </span>
                            )}
                        </div>
                        <small className={`${getRandomColor("text")}`}>
                            {artikel.kategori.nama.toUpperCase()}
                        </small>

                        <h2 className="font-semibold lg:text-xl text-base text-gray-800 dark:text-gray-200 line-clamp-2">
                            {artikel.title}
                        </h2>
                    </Link>
                ))}
            </div>

        </div>
      </header>

      <main className="mx-auto mt-20 lg:px-20 md:px-10 px-3">
        <div className="2xl:max-w-[2000px] mx-auto px-4 2xl:px-10">
        
            <section>
            <div className="grid lg:grid-cols-4 md:gap-10">
                <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-5">
                    <span className="flex gap-2 items-center text-red-500 text-xl font-semibold">
                    <FaFire />
                    <h2>TRENDING</h2>
                    </span>
                </div>
                <div className="grid">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={countTrandingArtikel}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        className="w-full"
                        // className='w-full'
                    >
                        {trendingArtikel.map((artikel, index) => (

                            <SwiperSlide key={index}>
                                <Link href={`/artikel/${artikel.slug}`}>
                                    <div className="h-[200px] relative">
                                        <img
                                            src={artikel.image ? `./storage/${artikel.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                            className="bg-gray-300 h-full rounded-xl object-cover"
                                        />

                                        {artikel.status_artikel === "premium" && (
                                            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                Premium
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold mt-2 dark:text-gray-200 line-clamp-2">{artikel.title}</h3>
                                </Link>

                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>
                </div>
                <div className="border border-gray-300 rounded-md p-7 relative dark:border-gray-800 md:block hidden">
                <div className="bg-red-500 w-[50px] h-[50px] text-white flex items-center justify-center absolute top-0 left-[20px] lg:-translate-y-1/2">
                    <FaEnvelope size={20} />
                </div>
                <h3 className="mb-5 lg:mt-6 mt-12 dark:text-gray-300">
                    Berlangganan untuk mendapatkan notifikasi saat ada berita baru!
                </h3>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full py-3 px-3 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-200"
                    placeholder="Email Address"
                />
                <Link href={"/subscription"}>
                    <button className="bg-red-500 px-10 py-2 rounded-full text-white mt-5 text-sm">
                    Subscribe
                    </button>
                </Link>
                </div>
            </div>
            </section>
            <hr className="my-10 border-gray-300" />
            <section className="grid lg:grid-cols-4 gap-20 mt-10">
            <div className="lg:col-span-3 md:w-auto w-[95%]">
                {artikels.map((item, index) => (

                    <Link
                        href={`/artikel/${item.slug}`}
                        key={index}
                        className="md:grid md:grid-cols-5 items-center lg:gap-10 md:gap-5  md:mb-5 mb-16"
                    >
                        <div className="md:col-span-2 h-[150px] md:h-[250px] relative ">
                            {item.status_artikel === "premium" && (
                                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    Premium
                                </span>
                            )}

                            <img
                            src={item.image ? `./storage/${item.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                            className="bg-gray-300 w-full h-full rounded object-cover"
                            alt={item.title}
                            />
                        </div>
                        <div className="md:col-span-3 mb-10 md:mb-0 mt-3 md:mt-0">
                            <small className={`${getRandomColor("text")} text-sm md:text-base font-semibold`}>
                                {item.kategori.nama.toUpperCase()}
                            </small>
                            <h3 className=" text-base md:text-xl line-clamp-3 font-bold mb-3 dark:text-gray-200">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 line-clamp-4 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">
                            {item.excerpt}
                            </p>
                            <div className="mt-5 md:flex gap-10">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaUser />
                                <span>Penulis : {item.user.name}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(item.published_at))}</span>
                            </p>
                            </div>
                        </div>
                    </Link>
                ))}


            </div>
            <div className="lg:block hidden sticky top-28 h-max">
                <img
                src="/images/news/kabarBudaya.png"
                alt="kabarBudayaBanner"
                className="rounded"
                />
                {/* Artikel Rekomendasi */}
                {/* <h2 className='text-red-500 text-xl font-semibold mb-10 mt-5 md:mt-10'>REKOMENDASI</h2>
                {artikelRekomendasi.map((item, index) => (
                    <Link href={`/artikel/${item.slug}`} key={index}>
                        <img
                        src={item.image ? item.image : "/images/NO IMAGE AVAILABLE.jpg"}
                        alt={item.title}
                        className="bg-gray-300 rounded-xl h-[200px] object-cover"
                        />
                        <h3 className="font-bold mt-2 line-clamp-2 dark:text-gray-200 mb-10">{item.title}</h3>
                    </Link>
                ))} */}
            </div>
            </section>

        </div>
      </main>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </MainLayout>
  );
}

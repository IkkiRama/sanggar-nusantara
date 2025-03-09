import React, { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";
import { Link } from "react-router-dom";

import DarkNavbar from "../layouts/darkNavbar";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";

export default function Subscription() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqDescription = {
    benefit:
      "Berlangganan bukan hanya soal akses eksklusif ke konten keren, tapi juga tentang keuntungan eksklusif. Kamu bisa dapetin info terkini duluan sebelum yang lain, nikmatin acara eksklusif, dan bahkan lepas dari gangguan iklan. Ada juga diskon, promosi, dan hadiah spesial buat yang langganan setia. Jadi, dengan berlangganan, bukan cuma akses ke konten premium, tapi juga gaya hidup kekinian dan manfaat ekstra lainnya!",
    cara: "Dapatkan akses eksklusif dengan berlangganan sekarang! Pilih paketmu, bayar, dan langsung nikmati konten premium serta penawaran spesial. Mudah, cepat, dan langsung di ujung jari. Tetap update tanpa ribet!",
  };

  return (
    <MainLayout title="Berlangganan | Sanggar Nusantara">
        <LightNavbar />

      <header className="grid lg:grid-cols-2 md:gap-10 items-center md:px-20 px-5 lg:h-[800px] h-[700px] relative">
        <span
          className="w-[1000px] h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg]"
          style={{
            backgroundImage:
              "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
          }}
        ></span>

        <div>
          <h2 className="md:text-5xl text-3xl font-bold mb-5 dark:text-gray-100">
            {/* after:content-[''] after:w-[10px] after:h-full after:absolute after:bg-red-500 relative z-10 after:-z-10 after:-left-[13px] after:bottom-0 */}
            SUBSCRIPTION
            <span className="text-red-500">.</span>
          </h2>
          <p className="md:text-sm text-[12px] text-gray-800 dark:text-gray-300">
            Berlangganan sekarang untuk mendapatkan konten eksklusif dan tetap
            terinformasi dengan berita dan penawaran terbaru
          </p>
          <div className="relative mt-10 flex">
            <input
              type="text"
              className="border px-5 py-2 dark:bg-gray-700 dark:border-gray-700 bg-gray-100 dark:text-gray-200 text-gray-800 rounded-l  md:max-w-[350px] max-w-[200px]"
              placeholder="Email..."
            />
            <button className="bg-red-500  px-5 py-2 text-white border border-red-500 hover:bg-red-400 hover:border-red-400 rounded-r md:text-base text-sm">
              Subscribe
            </button>
          </div>
          <div className="mt-10">
            <h3 className="font-semibold mb-3 md:text-base text-sm md:text-left text-center">
              Subscribe lewat :
            </h3>
            <div className="flex md:justify-start justify-center gap-10">
              <div className="flex flex-col md:items-start items-center">
                <img
                  src="/images/icons/gmail.png"
                  alt="gmailIcon"
                  className="w-[30px]"
                />
                <p className="mt-2 dark:text-gray-300 text-sm">Gmail</p>
              </div>
              <div className="flex flex-col md:items-start items-center">
                <img
                  src="/images/icons/instagram.png"
                  alt="instagramIcon"
                  className="w-[30px]"
                />
                <p className="mt-2 dark:text-gray-300 text-sm">Instagram</p>
              </div>
              <div className="flex flex-col md:items-start items-center">
                <img
                  src="/images/icons/facebook.png"
                  alt="facebookIcon"
                  className="w-[30px]"
                />
                <p className="mt-2 dark:text-gray-300 text-sm">Facebook</p>
              </div>
            </div>
          </div>
          <hr className="my-5 dark:border-gray-800" />
          <p className="flex gap-3 items-center mt-5 text-gray-700 dark:text-gray-300 md:text-sm text-[12px] md:text-left text-center">
            <FaBell /> Mendapatkan notifikasi ketika ada berita baru.
          </p>
        </div>
        <div className="h-[450px] lg:flex hidden lg:justify-start gap-5">
          <div className="h-full w-[40%] -translate-y-10">
            <img
              src="/images/explore/2.jpg"
              alt=""
              className="h-full w-full object-cover"
              data-aos="fade-up"
              data-aos-once="true"
            />
          </div>
          <div className="h-full w-[40%] translate-y-10">
            <img
              src="/images/explore/1.jpg"
              alt=""
              className="h-full w-full object-cover"
              data-aos="fade-down"
              data-aos-once="true"
            />
          </div>
        </div>
      </header>
      <main className="grid lg:grid-cols-3 gap-10 md:px-20 px-5 mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-5 dark:text-gray-100">
            Frequently <br /> Asked Question
            <span className="text-red-500">.</span>
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-10">
            Jika ada pertanyaan lainnya, silahkan hubungi <br /> tim kami di
            support@warisannusantara.com
          </p>
          <button className="text-sm border-2 z-10 after:transition-all text-gray-50  px-5 py-3 border-red-500 after:content-[''] after:absolute relative after:inset-0 after:bg-red-500 after:-translate-x-1 after:-translate-y-1 after:-z-10 hover:after:translate-x-0 hover:after:translate-y-0">
            Lihat semua FAQ
          </button>
        </div>
        <div className="lg:col-span-2">
          <Accordion atomic={true}>
            <AccordionItem title="Apa benefit dari berlangganan?">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.benefit}
              </p>
            </AccordionItem>

            <AccordionItem title="Bagaimana Cara Berlangganan?">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.cara}
              </p>
            </AccordionItem>

            <AccordionItem title="Saya Ingin Berhenti Berlangganan">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.benefit}
              </p>
            </AccordionItem>
            <AccordionItem title="Bagaimana Caranya Agar Saya Mendapatkan Notifikasi Pembaharuan?">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.benefit}
              </p>
            </AccordionItem>
            <AccordionItem title="Bagaimana Cara Mengganti Email yang Sudah Terdaftar Subscription?">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.benefit}
              </p>
            </AccordionItem>
            <AccordionItem title="Apakah Subcription Itu Berbayar?">
              <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                {faqDescription.benefit}
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <br />
      <br />
      <br />
      <br />
      <br />

    </MainLayout>
  );
}

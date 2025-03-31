import { useEffect, useState } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";

import content from "./../data/content.json";
import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";
import { Link, usePage } from "@inertiajs/react";
import ShareButton from './../Components/ShareButton';
import { getRandomColor } from "../Utils/getRandomColor";
import { changeDate } from "../Utils/changeDate";
import { estimateReadingTime } from './../Utils/estimateReadingTime';

export interface Artikel {
  id: number;
  title: string;
  slug: string;
  views: number;
  user_id: number;
  kategori_id: number;
  image: string | null;
  excerpt: string;
  keyword: string;
  content: string;
  status_artikel: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  user?: User;
  kategori_artikel?: Kategori;
  komentar?: Komentar[];
}

export interface User {
  id: number;
  name: string;
  image: string;
  deskripsi: string;
}
export interface IUser {
  id: number;
  name: string;
}

export interface Kategori {
  id: number;
  nama: string;
}

export interface Komentar {
  id: number;
  nama: string;
  email: string;
  komentar: string;
}
export interface RekomendasiArtikel {
  title: string;
  views: string;
  slug: string;
  image: string;
  excerpt: string;
  published_at: string;
  user_id: string;
  kategori_id: string;
  user?: IUser;
  kategori_artikel?: Kategori;
}

interface PageProps {
  Artikel: Artikel;
  RekomendasiArtikel: RekomendasiArtikel;
  [key: string]: any;
}

export default function Detail() {
    const { artikel = {}, rekomendasiArtikel = [] } = usePage<PageProps>().props;
    const { user } = usePage().props;

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [komen, setKomen] = useState("");
    const [komenEror, setKomenEror] = useState("");
    const [loadingKomen, setLoadingKomen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [warnaProfile, setWarnaProfile] = useState(getRandomColor());

    const ArticleContent = ({ content }) => {
        return (
            <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            className="content-artikel"
            />
        );
    };

    const getInitials = (nama) => {
        const words = nama.split(" ");
        const initials = words.map((word) => word[0].toUpperCase()).join("");
        return initials.length > 2 ? initials.slice(0, 2) : initials; // Maksimal 2 huruf
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingKomen(true)

        try {
            // Validasi nama
            if (!nama.trim()) throw new Error("Nama tidak boleh kosong.");

            // Validasi email
            if (!email.trim()) throw new Error("Email tidak boleh kosong.");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Format email tidak valid.");

            // Validasi komentar
            if (!komen.trim()) throw new Error("Komentar tidak boleh kosong.");


            const response = await fetch('https://sanggar-nusantara.genbipurwokerto.com/api/komen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //@ts-ignore
                body: JSON.stringify({artikel_id:artikel.id, nama, email, komentar:komen}),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim komentar, coba lagi nanti.');
            }

            setSuccessMessage('Komentar Anda berhasil dikirim!');

            setNama("")
            setEmail("")
            setKomen("")

            window.location.reload();

        } catch (error) {
            setKomenEror(error.message);
        } finally {
            setLoadingKomen(false);
        }
    }

  return (
    <MainLayout title={`Detail ${artikel["title"]} | Sanggar Nusantara`} >
      <LightNavbar user={user} />

      <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative">
        <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-red-500/70 to-red-500/0"></span>
        <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 lg:text-left text-center">
          <p className="font-semibold mb-2 text-red-500 md:md:text-base text-[13px] text-sm">
            {artikel.kategori.nama.toUpperCase()}
          </p>
          <h1 className="font-bold md:text-3xl text-xl mb-8 text-gray-900 dark:text-gray-200">
            {artikel.title}
          </h1>
          <p className="mr-3 md:text-sm text-[12px] text-gray-800 dark:text-gray-300">
            Ditulis oleh{" "}
            <span className="text-red-500 font-semibold">{artikel.user.name}</span> |{" "}
            <span className="text-gray-500 dark:text-gray-400 italic">
              Diperbaharui pada {changeDate(new Date(artikel.updated_at))}
            </span>
          </p>
          <p className="mr-3 text-sm text-gray-800 dark:text-gray-300">
            Diterbitkan pada {changeDate(new Date(artikel.updated_at))} | {estimateReadingTime(artikel.content)} Menit Baca
          </p>
        </div>
        <div className="py-8 lg:col-span-2 relative z-10 lg:order-2 order-1">
          <img
            src={artikel.image !== null ? `../storage/${artikel.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
            className="w-full h-[350px] rounded object-cover"
            alt={`Image artikel ${artikel.title}`}
          />
        </div>
      </div>

      <main className="grid lg:grid-cols-3 md:px-20 px-5 gap-20 mt-20 mb-20">
        <div className="lg:col-span-2 text-gray-800 dark:text-gray-200">
            <ArticleContent content={
                        //@ts-ignore
                        artikel.content} />

            <ShareButton />
        </div>
        <div>
            <div className="bg-gray-50 dark:bg-gray-950 lg:p-10 p-5 rounded">
                <img
                src={
                    //@ts-ignore
                    artikel.user.image ? `../storage/${artikel.user.image}` : "../images/NO IMAGE AVAILABLE.jpg"}
                className="w-[70px] rounded"
                alt="avatar"
                />
                <h1 className="font-bold mt-4 text-gray-800 dark:text-gray-300">
                {//@ts-ignore
                artikel.user.name}
                </h1>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
                    {//@ts-ignore
                    artikel.user.deskripsi}
                </p>

            </div>
        </div>
      </main>

      <hr className="w-[90%] mx-auto border-slate-300" />

            <div className="grid grid-cols-1 lg:gap-10 gap-4 md:px-20 px-5 mb-8 items-center mt-10">
                <div className="mb-5">
                    <h2 className="text-2xl inline-block font-semibold transition-all hover:pr-3 border-b-4 border-red-500 dark:text-gray-200">
                        KOMENTAR
                    </h2>
                </div>

                {artikel.komentar.map((item, index) => (
                    <div className="" key={index}>
                        <div className="flex items-center mb-3">
                                <div className={`w-[50px] h-[50px] text-white flex items-center justify-center rounded-full mr-3 ${warnaProfile}`} >
                                <span className="font-bold">{getInitials(item.nama)}</span>
                            </div>
                            <div className="">
                                <h4 className="text-lg font-bold">{item.nama}</h4>
                                <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">{item.email}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] whitespace-pre-wrap">{item.komentar}</p>
                    </div>
                ))}

                {/* Form Komentar */}
                <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Nama */}
                        <div>
                            <label
                            htmlFor="nama"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                            Nama
                            </label>
                            <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={nama}
                            onChange={(e)=> setNama(e.target.value)}
                            placeholder="Masukkan nama Anda"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                            Email
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Komentar */}
                    <div className="mb-4">
                    <label
                        htmlFor="komentar"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                        Komentar
                    </label>
                    <textarea
                        id="komentar"
                        name="komentar"
                        value={komen}
                        onChange={(e)=> setKomen(e.target.value)}
                        placeholder="Tulis komentar Anda..."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    </div>

                    {/* Tombol Submit */}
                    <button
                        disabled={loadingKomen}
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                        {loadingKomen ? 'Mengirim...' : 'Kirim Komentar'}
                    </button>
                    {komenEror && <p className="text-red-500 mt-2">{komenEror}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>
            </div>

      <section className="lg:grid hidden grid-cols-3 gap-10 px-20 mt-10">
        <div className="col-span-3">
          <h3 className="text-2xl inline-block font-semibold transition-all hover:pr-3 border-b-4 border-red-500 dark:text-gray-200">
            BERITA LAINNYA
          </h3>
        </div>
        {rekomendasiArtikel.map((item, index) => (
            <Link href={`/artikel/${item.slug}`} key={index} className="mb-5 lg:mb-0">
                <img
                    src={item.image ? `../storage/${item.image}` : "../images/NO IMAGE AVAILABLE.jpg"}
                    alt={item.title}
                    className="h-[250px] object-cover w-full rounded"
                />
                <h3 className="mt-3 line-clamp-2 text-xl font-bold dark:text-gray-200">
                    {item.title}
                </h3>
                <div className="my-5 flex gap-5">
                    <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                    <FaUser />
                    <small>{item.user.name}</small>
                    </span>
                    <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                    <FaCalendar />
                    <small>{changeDate(new Date(item.published_at))}</small>
                    </span>
                </div>
                <p className="text-gray-700 line-clamp-4 dark:text-gray-300 mt-2 text-sm">
                    {item.excerpt}
                </p>
            </Link>
        ))}
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />

    </MainLayout>
  );
}

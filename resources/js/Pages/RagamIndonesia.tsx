import HeaderSlider from "../layouts/headerSlider";
import { useEffect, useRef, useState } from "react";

import { Link, usePage } from '@inertiajs/react';
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

// songs
import {
  FaHome,
  FaLanguage,
  FaPause,
  FaPlay,
  FaArrowRight,
  FaTimes,
  FaTheaterMasks,
} from "react-icons/fa";
import { FaBowlFood, FaMapLocation } from "react-icons/fa6";
import { GiHeartInside, GiMusicalScore } from "react-icons/gi";
import { MdOutlinePiano } from "react-icons/md";

import { Accordion, AccordionItem } from "react-light-accordion";
import "react-light-accordion/demo/css/index.css";

import songs from "./../data/songs.json";
import musics from "./../data/musics.json";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

import ReactCardSlider from "react-card-slider-component";
import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";

export default function RagamIndonesia() {
    const { user } = usePage().props;
  const [selectedSong, setSelectedSong] = useState({
    name: "Tokecang",
    lyric:
      "Tokecang tokecang bala gendir tosblong <br/> Angeun kacang angeun kacang sapependil kosong <br/> Aya listrik di masigit meuni caang <br/> katingalna <br/> Aya istri jangkung alit karangan dina pipina <br/> Tokecang tokecang bala gendir tosblong <br/> Angeun kacang angeun kacang sapependil kosong",
    from: "Jawa Barat",
    creator: "R.C Hardjosubroto",
    song: "tokecang.mp3",
    history:
      "Lagu Tokecang merupakan salah satu lagu tradisional dari Sunda, Jawa Barat, Indonesia. Meskipun tidak ada catatan yang pasti tentang sejarah lagu ini, lagu tradisional seperti Tokecang umumnya diwariskan secara lisan dari generasi ke generasi. Oleh karena itu, seringkali sulit untuk menentukan asal usul atau pencipta yang tepat untuk lagu-lagu tradisional seperti ini.<br /><br /> Lagu Tokecang biasanya dinyanyikan dalam bahasa Sunda, dan liriknya menggambarkan suasana yang riang dan ceria. Lagu ini sering diiringi oleh tarian tradisional atau disertai dengan alat musik tradisional Sunda seperti angklung. Meskipun mungkin sulit untuk menelusuri sejarah tepatnya, keberadaan lagu-lagu seperti Tokecang memainkan peran penting dalam memperkaya warisan budaya Indonesia.",
    mean: "Lagu Tokecang adalah anjuran agar manusia tidak berlebihan dalam mengambil makanan, hingga tidak menyisakan untuk orang lain. <br/> Hal ini menjadi pengingat agar manusia tidak serakah, supaya nantinya tidak merugikan diri sendiri dan orang di sekitar.<br/> Selain itu, manusia harus selalu berbagi dan peduli dan tidak terjebak dengan hanya memikirkan diri sendiri.",
  });

  const [musicPlayer, setMusicPlayer] = useState("tokecang.mp3");

  const changeMusic = (song: any) => {
    setMusicPlayer("");

    setTimeout(() => {
      setMusicPlayer(song);
    }, 500);
  };

  //
  const [selectedAlatMusik, setSelectedAlatMusik] = useState({
    name: "Angklung",
    from: "Jawa Barat",
    image: "angklung.jpg",
  });

  const [isPlaying, setIsPlaying] = useState(false);

  // Gunakan useRef untuk menyimpan referensi ke objek audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlatMusik = (alatMusik: string) => {
    // Hentikan musik sebelumnya jika sedang diputar
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }

    // Mulai pemutaran musik baru
    const audioAlatMusikBaru = new Audio(alatMusik);

    audioAlatMusikBaru.addEventListener("ended", () => {
      // Setelah musik selesai, atur state isPlaying ke false
      setIsPlaying(false);
    });

    audioAlatMusikBaru.play();
    setIsPlaying(true);

    // Simpan referensi objek audio ke useRef
    audioRef.current = audioAlatMusikBaru;
  };

  const pauseAlatMusik = () => {
    // Hentikan musik yang sedang diputar
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, [selectedAlatMusik]);

  //
  let rumahAdatName = document.getElementById("rumahAdatName") as HTMLElement;
  let rumahAdatDesc = document.getElementById("rumahAdatDesc") as HTMLElement;
  let rumahAdatImage = document.getElementById(
    "rumahAdatImage"
  ) as HTMLImageElement;

  useEffect(() => {
    rumahAdatName = document.getElementById("rumahAdatName") as HTMLElement;
    rumahAdatDesc = document.getElementById("rumahAdatDesc") as HTMLElement;
    rumahAdatImage = document.getElementById(
      "rumahAdatImage"
    ) as HTMLImageElement;
  }, []);

  const changeImage1 = () => {
    rumahAdatName.innerHTML = "RUMAH KRONG BADE";
    rumahAdatDesc.innerHTML =
      "Rumah Aceh atau yang lebih dikenal dengan nama 'Rumoh Aceh' merupakan rumah adat dari suku Aceh. Rumah ini bertipe rumah panggung dengan 3 bagan utama dan 1 bagian tambahan. Tiga bagian utama dari rumah Aceh yaitu seuramoë keuë, seuramoë teungoh dan seuramoë likôt. Sedangkan 1 bagian tambahannya yaitu rumoh dap";
    rumahAdatImage.src = "/images/rumahAdat/aceh.png";
  };
  const changeImage2 = () => {
    rumahAdatName.innerHTML = "RUMAH JOGLO";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/jogloJawaTimur.jpg";
  };
  const changeImage3 = () => {
    rumahAdatName.innerHTML = "RUMAH ADAT KASEPUH";
    rumahAdatDesc.innerHTML =
      "Rumah adat kasepuhan ini berasal dari Jawa Barat, tepatnya di kota Cirebon. <br/><br/> Rumah Adat Kasepuhan dianggap sebagai perluasan wilayah dari Keraton Pakungwati yang didirikan pada 1452. Dulunya, Keraton Kasepuhan Cirebon dibangun sebagai pusat pelatihan tentara kerajaan. Ditambah, fungsi dari keraton ini juga sebagai tempat pengadilan perkara hukum adat. <br/><br/> Diketahui, dalam keraton ini, terdapat beberapa ruangan khusus, seperti ruang pengadilan, ruang pendopo atau jinem, ruang Pringgodani yang ditempati sultan, dan ruang prabayasa untuk menerima tamu.";
    rumahAdatImage.src = "/images/rumahAdat/keratonJakarta.jpg";
  };
  const changeImage4 = () => {
    rumahAdatName.innerHTML = "SULAH NYANDA";
    rumahAdatDesc.innerHTML =
      "Rumah ini merupakan rumah adat suku Baduy di Provinsi Banten.  adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/badui.jpg";
  };
  const changeImage5 = () => {
    rumahAdatName.innerHTML = "GADANG";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/gadang.jpg";
  };
  const changeImage6 = () => {
    rumahAdatName.innerHTML = "HONAI";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/honai.jpg";
  };
  const changeImage7 = () => {
    rumahAdatName.innerHTML = "MUSALAKI";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/musalaki.webp";
  };
  const changeImage8 = () => {
    rumahAdatName.innerHTML = "RUMAH PANJANG";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/panjang.jpg";
  };
  const changeImage9 = () => {
    rumahAdatName.innerHTML = "RAKIT";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/rakit.jpg";
  };
  const changeImage10 = () => {
    rumahAdatName.innerHTML = "RUMAH SUNDA";
    rumahAdatDesc.innerHTML =
      "Rumah adat Joglo ini merupakan rumah adat dari Provinsi Jawa Timur, Jawa Tengah dan Yogyakarta. Walau termasuk budaya dari 3 daerah yang berbeda, tidak banyak perbedaan antara satu sama lainnya. <br /><br/> Dari rumah Joglo ini sendiri memilki fungsi dan bagian-bagian yang berbeda-beda. Ada yang digunakan sebagai tempat untuk bertamu bahkan untuk sekedar bersantai-santai. Terdapat bagian yang bernama pendapa, yaitu sebuah ruangan yang biasanya digunakan untuk acara-acara besar seperti wayang kulit, tari, gamelan dan lain-lain.";
    rumahAdatImage.src = "/images/rumahAdat/sunda.jpg";
  };

  const slides = [
    {
      image: "/images/rumahAdat/aceh.png",
      clickEvent: changeImage1,
    },
    {
      image: "/images/rumahAdat/jogloJawaTimur.jpg",
      clickEvent: changeImage2,
    },
    {
      image: "/images/rumahAdat/keratonJakarta.jpg",
      clickEvent: changeImage3,
    },
    {
      image: "/images/rumahAdat/badui.jpg",
      clickEvent: changeImage4,
    },
    {
      image: "/images/rumahAdat/gadang.jpg",
      clickEvent: changeImage5,
    },
    {
      image: "/images/rumahAdat/honai.jpg",
      clickEvent: changeImage6,
    },
    {
      image: "/images/rumahAdat/musalaki.webp",
      clickEvent: changeImage7,
    },
    {
      image: "/images/rumahAdat/panjang.jpg",
      clickEvent: changeImage8,
    },
    {
      image: "/images/rumahAdat/rakit.jpg",
      clickEvent: changeImage9,
    },
    {
      image: "/images/rumahAdat/sunda.jpg",
      clickEvent: changeImage10,
    },
  ];

  //
  const [modalDetail, setModalDetail] = useState(false);

  const [contentModal, setContentModal] = useState({
    title: "",
    body: "",
    resep: "",
    location: "",
    img: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Ragam Indonesia | Sanggar Nusantara">
        <LightNavbar user={user} />

      <header className="relative grid lg:grid-cols-2 pt-10 lg:px-10 px-5 lg:max-h-[830px] max-h-screen overflow-y-hidden after:absolute after:bg-gradient-to-t dark:after:from-black dark:after:to-black/10 after:from-white after:to-white/10 after:w-full after:h-[130px] after:bottom-0 container mx-auto">
        {/* <div className="grid lg:grid-cols-2 max-w-[1600px] 3xl:h-[60vh] h-full 3xl:max-w-[2000px] mx-auto px-4 3xl:px-10 after:absolute after:bg-gradient-to-t dark:after:from-black dark:after:to-black/10 after:from-white after:to-white/10 relative"> */}

            <div className="h-full flex-col justify-center items-center lg:pt-30">
            <h4 className="text-3xl font-semibold text-red-500 mb-5">
                Indonesia Kaya
            </h4>
            <h1 className="font-semibold dark:text-white text-[#111] lg:text-5xl text-4xl lg:leading-[60px] mb-10">
                Telusuri Pesona dan <br /> Keberagaman Budaya Indonesia <br /> yang
                Memukau
            </h1>
            <div className="flex gap-5 flex-wrap md:flex-nowrap ">
                <Link href="#jelajahi" className="bg-red-500 px-4 w-full md:w-auto py-3 rounded-lg border-2 border-red-500 text-white">
                    Jelajahi Sekarang
                </Link>
                <Link href="/peta-interaktif" className="bg-white w-full md:w-auto px-4 py-3 rounded-lg border-2 border-red-500 dark:bg-gray-950 dark:text-white dark:border-white text-red-500">
                    Peta Interaktif
                </Link>
            </div>

            </div>
            <div className="grid grid-cols-2 gap-5 lg:rotate-3 lg:-mt-20 mt-20 h-full overflow-hidden">
                <div className="grid grid-cols-1 gap-5 animate-scroll-to-t">
                    <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/1.jpg"
                        alt="image header 1"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/2.jpg"
                        alt="image header 2"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="row-span-2 h-[500px] rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/3.jpg"
                        alt="image header 3"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>

                <div className="animate-scroll-to-b">
                    <div className="h-[240px] -mt-52 rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/4.jpg"
                        alt="image header 4"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/5.jpg"
                        alt="image header 5"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/6.jpg"
                        alt="image header 6"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="h-[240px] mt-5 rounded-md overflow-hidden">
                    <img
                        src="./images/ragam-indonesia/7.jpg"
                        alt="image header 7"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
            </div>

        {/* </div> */}
      </header>

      <main id="jelajahi" className="lg:px-20 md:px-10 px-5 dark:bg-black">
        <div className="2xl:max-w-[2000px] mx-auto px-4 2xl:px-10">

            <section className="grid lg:grid-cols-2 gap-10 py-10 lg:py-27 place-items-center">
            <div>
                <h2 className="font-bold md:text-3xl text-xl mb-3 dark:text-gray-100">
                INDONESIA KAYA AKAN BUDAYA DAN KEBERAGAMAN-NYA
                </h2>
                <p className="dark:text-gray-300 text-gray-700 md:text-base text-[12px]">
                Indonesia adalah negara yang kaya akan budaya dan keberagaman.
                Dari Sabang sampai Merauke, setiap daerah memiliki warisan budaya
                yang unik dan beragam. Keberagaman ini mencakup bahasa, adat
                istiadat, seni, dan kuliner yang membuat Indonesia begitu
                istimewa.
                </p>
            </div>
            <div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-7">

                <Link href="/ragam-indonesia/bahasa-daerah" className="shadow py-4 px-2 text-center rounded border-b-4 border-red-500 hover:bg-red-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <FaLanguage className="mx-auto" size={30} />
                    <h6 className="mt-3 md:text-base text-sm">BAHASA</h6>
                </Link>

                <Link href="/ragam-indonesia/alat-musik" className="shadow py-4 px-2 text-center rounded border-b-4 border-indigo-500 hover:bg-indigo-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <MdOutlinePiano className="mx-auto" size={30} />
                    <h6 className="mt-3 md:text-base text-sm">ALAT MUSIK</h6>
                </Link>

                <Link href="/ragam-indonesia/rumah-adat" className="shadow py-4 px-2 text-center rounded border-b-4 border-emerald-500 hover:bg-emerald-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <FaHome className="mx-auto" size={30} />

                    <h6 className="mt-3 md:text-base text-sm">RUMAH ADAT</h6>
                </Link>

                <Link href="/ragam-indonesia/seni-tari" className="shadow py-4 px-2 text-center rounded border-b-4 border-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <FaTheaterMasks className="mx-auto" size={30} />
                    <h6 className="mt-3 md:text-base text-sm">SENI TARI</h6>
                </Link>

                <Link href="/ragam-indonesia/lagu-daerah" className="shadow py-4 px-2 text-center rounded border-b-4 border-purple-500 hover:bg-purple-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <GiMusicalScore className="mx-auto" size={30} />
                    <h6 className="mt-3 md:text-base text-sm">LAGU DAERAH</h6>
                </Link>

                <Link href="/ragam-indonesia/makanan-khas" className="shadow py-4 px-2 text-center rounded border-b-4 border-orange-500 hover:bg-orange-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200">
                    <FaBowlFood className="mx-auto" size={30} />
                    <h6 className="mt-3 md:text-base text-sm">MAKANAN KHAS</h6>
                </Link>

                </div>
            </div>
            </section>

            <section className="mt-5 lg:mt-20">
            <div className="flex justify-between items-center">
                <div className="md:flex gap-10 items-center mb-10">
                <div className="shadow py-4 w-[100px] text-center rounded bg-purple-500 text-white">
                    <GiMusicalScore className="mx-auto" size={30} />
                </div>
                <div className="flex justify-between items-center">
                    <div>
                    <h2 className="font-bold md:text-3xl text-3xl mb-3 md:mt-0 mt-5 dark:text-gray-100">
                        LAGU DAERAH INDONESIA
                    </h2>
                    <p className="xl:w-[700px] md:w-[500px] w-full dark:text-gray-300 text-gray-700 md:text-sm text-[12px]">
                        Indonesia punya lebih dari 439 lagu tradisional,
                        masing-masing menceritakan kisah unik sebagai simbol
                        keanekaragaman seni dan warisan budaya yang memperkaya
                        bangsa.
                    </p>
                    </div>
                </div>
                </div>
                <div className="lg:block hidden">
                <Link href="/ragam-indonesia/lagu-daerah" className="px-5 text-sm py-2 rounded border text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                    Lihat Lebih Lengkap
                </Link>
                </div>
            </div>
            <hr className="dark:border-purple-900" />
            <div className="md:grid xl:grid-cols-4 md:grid-cols-2 gap-10 mt-10">
                <div className="md:h-[500px] h-[200px] md:mb-0 mb-5 overflow-auto rounded shadow bg-gray-50 dark:bg-gray-950">
                {songs.map((song) => (
                    <div
                    className={
                        song.name === selectedSong.name
                        ? "bg-purple-500/20 px-5 py-3"
                        : "px-5 py-3 hover:bg-purple-500/10 cursor-pointer"
                    }
                    onClick={() => {
                        changeMusic(song.song);
                        setSelectedSong(song);
                    }}
                    >
                    <div>
                        <h6 className="text-xl font-semibold dark:text-gray-100">
                        {song.name}
                        </h6>
                        <small className="text-gray-500 block dark:text-gray-300">
                        Lagu Daerah {song.from}
                        </small>
                        <small className="text-gray-500 block dark:text-gray-300">
                        Cipt: {song.creator}
                        </small>
                    </div>
                    </div>
                ))}
                </div>
                <div className="md:mb-0 mb-5">
                <div className="mb-5">
                    <h5 className="font-semibold text-xl mb-3 uppercase dark:text-gray-200">
                    LAGU {selectedSong.name}
                    </h5>

                    {musicPlayer === "tokecang.mp3" ? (
                    <audio controls>
                        <source src={`/songs/tokecang.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "amparAmparPisang.mp3" ? (
                    <audio controls>
                        <source
                        src={`/songs/amparAmparPisang.mp3`}
                        type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "apuse.mp3" ? (
                    <audio controls>
                        <source src={`/songs/apuse.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "bungongJumpa.mp3" ? (
                    <audio controls>
                        <source src={`/songs/bungongJumpa.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "gundulGundulPacul.mp3" ? (
                    <audio controls>
                        <source
                        src={`/songs/gundulGundulPacul.mp3`}
                        type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "rasaSayange.mp3" ? (
                    <audio controls>
                        <source src={`/songs/rasaSayange.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "sajojo.mp3" ? (
                    <audio controls>
                        <source src={`/songs/sajojo.mp3`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : musicPlayer === "yamkoRambeYamko.mp3" ? (
                    <audio controls>
                        <source
                        src={`/songs/yamkoRambeYamko.mp3`}
                        type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                    ) : (
                    ""
                    )}

                    <small className="italic text-gray-700 dark:text-gray-400">
                    Pastikan koneksi stabil untuk memutar musik*
                    </small>
                </div>

                <h5 className="font-semibold text-xl dark:text-gray-200">
                    LIRIK
                </h5>
                <small className="dark:text-gray-300">
                    Ciptaan: {selectedSong.creator}
                </small>

                <p
                    className="mt-5 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: selectedSong.lyric }}
                ></p>
                </div>
                <div className="col-span-2">
                <h5 className="font-semibold text-xl mb-3 uppercase">
                    INFORMASI LAINNYA
                </h5>

                <Accordion atomic={true}>
                    <AccordionItem title="Makna Lagu" className="bg-gray-100 dark:bg-gray-800 rounded-md">
                    <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                        <p
                        dangerouslySetInnerHTML={{ __html: selectedSong.mean }}
                        ></p>
                    </p>
                    </AccordionItem>

                    <AccordionItem title="Sejarah" className="bg-gray-100 dark:bg-gray-800 rounded-md">
                    <p className="p-5 text-sm text-gray-800 dark:text-gray-200">
                        <p
                        dangerouslySetInnerHTML={{ __html: selectedSong.history }}
                        ></p>
                    </p>
                    </AccordionItem>
                </Accordion>
                </div>
            </div>
            </section>

            <section className="mt-20">
            <div className="flex items-center justify-between">
                <div className="md:flex gap-10 items-center mb-10">
                <div className="shadow py-4 w-[100px] text-center rounded bg-indigo-500 text-white">
                    <MdOutlinePiano className="mx-auto" size={30} />
                </div>
                <div className="flex justify-between">
                    <div>
                    <h2 className="font-bold md:text-3xl text-3xl mb-3 md:mt-0 mt-5 dark:text-gray-100">
                        ALAT MUSIK TRADISIONAL INDONESIA
                    </h2>
                    <p className="xl:w-[700px] md:w-[500px] w-full dark:text-gray-300 text-gray-700 md:text-sm text-[12px]">
                        Indonesia kaya budaya dengan 250 alat musik tradisional yang mencerminkan kekayaan budaya setiap daerah.
                        Setiap instrumen memiliki karakter unik yang memperkaya warisan seni musik Nusantara.
                    </p>
                    </div>
                </div>
                </div>
                <div className="lg:block hidden">
                <Link href="/ragam-indonesia/alat-musik" className="px-5 text-sm py-2 rounded border text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white">
                    Lihat Lebih Lengkap
                </Link>
                </div>
            </div>
            <hr className="mb-5 dark:border-indigo-900" />
            <div className="grid lg:grid-cols-5 gap-20 items-center">
                <div className="lg:col-span-2">
                <img
                    src={`/images/alatMusik/${selectedAlatMusik.image}`}
                    className="w-full lg:h-[400px] h-full object-cover rounded"
                    alt="gambarAlatMusik"
                />
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 lg:col-span-3 md:gap-5 gap-2">
                {musics.map((row) => (
                    <div
                    key={row.name} // Add a unique key for each item
                    className={
                        row.name === selectedAlatMusik.name
                        ? "bg-gradient-to-r from-indigo-500/70 to-indigo-200/20 dark:from-indigo-800/70 dark:to-gray-900  text-white shadow p-4 rounded flex justify-between items-center cursor-pointer"
                        : "shadow p-4 rounded flex justify-between items-center cursor-pointer dark:bg-gray-950"
                    }
                    onClick={() => setSelectedAlatMusik(row)}
                    >
                    <div>
                        <h3 className="dark:text-gray-100 md:text-base text-sm font-semibold">
                        {row.name}
                        </h3>
                        <small className="dark:text-gray-300 md:text-sm text-[12px]">
                        {row.from}
                        </small>
                    </div>
                    {selectedAlatMusik.name === row.name ? (
                        <BootstrapTooltip
                        title={isPlaying ? "Pause Music" : "Play Music"}
                        placement="top"
                        className="pr-2"
                        onClick={() => {
                            isPlaying
                            ? pauseAlatMusik()
                            : playAlatMusik(`/sounds/${row.sound}`);
                        }}
                        >
                        <span className="bg-white dark:bg-gray-800 shadow text-indigo-500 dark:text-white flex items-center justify-center w-[30px] h-[30px] rounded-full">
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </span>
                        </BootstrapTooltip>
                    ) : (
                        ""
                    )}
                    </div>
                ))}
                </div>
            </div>
            </section>

            <section className="mt-20">
            <div className="flex items-center justify-between">
                <div className="md:flex gap-10 items-center mb-10">
                <div className="shadow py-4 w-[100px] text-center rounded bg-emerald-500 text-white">
                    <FaHome className="mx-auto" size={30} />
                </div>
                <div className="flex justify-between">
                    <div>
                    <h2 className="font-bold md:text-3xl text-3xl mb-3 md:mt-0 mt-5 dark:text-gray-100">
                        RUMAH ADAT INDONESIA
                    </h2>
                    <p className="xl:w-[700px] md:w-[500px] w-full dark:text-gray-300 text-gray-700 md:text-sm text-[12px]">
                        Indonesia, dengan 34 rumah adat dari setiap provinsi,
                        memancarkan keberagaman budaya dan menjadi karya seni yang
                        memperkaya warisan tradisional.
                    </p>
                    </div>
                </div>
                </div>
                <div className="lg:block hidden">
                <Link href="/ragam-indonesia/rumah-adat" className="px-5 text-sm py-2 rounded border text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white">
                    Lihat Lebih Lengkap
                </Link>
                </div>
            </div>
            <hr className="dark:border-emerald-900" />
            <div className="grid lg:grid-cols-2 mt-5 items-center gap-5 lg:gap-20 mb-10">
                <div className="lg:order-1 order-2">
                <h4
                    id="rumahAdatName"
                    className="md:text-3xl text-xl font-bold dark:text-gray-200"
                >
                    RUMAH ADAT ACEH
                </h4>
                <p
                    id="rumahAdatDesc"
                    className="md:w-[90%] mt-3 dark:text-gray-300 text-gray-700 md:text-base text-sm"
                >
                    Rumah Aceh atau yang lebih dikenal dengan nama "Rumoh Aceh"
                    merupakan rumah adat dari suku Aceh. Rumah ini bertipe rumah
                    panggung dengan 3 bagan utama dan 1 bagian tambahan. Tiga bagian
                    utama dari rumah Aceh yaitu seuramoë keuë, seuramoë teungoh dan
                    seuramoë likôt. Sedangkan 1 bagian tambahannya yaitu rumoh dap
                </p>
                </div>
                <div className="lg:order-2 order-1">
                <img
                    id="rumahAdatImage"
                    src="/images/rumahAdat/aceh.png"
                    alt="rumah adat"
                    className="w-full h-[200px] md:h-[350px] lg:h-[400px] object-cover rounded"
                />
                </div>
            </div>

            <ReactCardSlider slides={slides} />
            </section>

            <section className="mt-20 pb-20">
            <div className="flex items-center justify-between">
                <div className="md:flex gap-10 items-center mb-10">
                <div className="shadow py-4 w-[100px] text-center rounded bg-orange-500 text-white">
                    <FaBowlFood className="mx-auto" size={30} />
                </div>
                <div className="flex justify-between">
                    <div>
                    <h2 className="font-bold md:text-3xl text-xl mb-3 md:mt-0 mt-5 dark:text-gray-100">
                        MAKANAN KHAS DAERAH INDONESIA
                    </h2>
                    <p className="xl:w-[700px] md:w-[500px] w-full dark:text-gray-300 text-gray-700 md:text-sm text-[12px]">
                        Indonesia menawarkan ragam makanan khas dari setiap daerah.
                        Keberagaman ini mencerminkan kekayaan kuliner yang unik di
                        Indonesia.
                    </p>
                    </div>
                </div>
                </div>
                <div className="lg:block hidden">
                <Link href="/ragam-indonesia/makanan-khas"
                    className="px-5 text-sm py-2 rounded border text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                    Lihat Lebih Lengkap
                </Link>
                </div>
            </div>
            <hr className="dark:border-orange-900" />
            <div className="mt-8 ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mr-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/gudeg.jpeg"
                    alt="Card 1"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Gudeg
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    DIY Yogyakarta
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Gudeg",
                        body: "Gudeg adalah hidangan khas Provinsi Daerah Istimewa Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan. Perlu waktu berjam-jam untuk membuat hidangan ini. Warna cokelat biasanya dihasilkan oleh daun jati yang dimasak bersamaan.",
                        resep:
                        "Nangka muda, santan, gula aren, cabai, aneka bumbu, ayam, telur, tempe (opsional)",
                        location: "DIY Yogyakarta",
                        img: "./images/makanan/gudeg.jpeg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/karedok.jpeg"
                    alt="Card 2"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Karedok
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    Jawa Barat
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Karedok",
                        body: "Karedok adalah salah satu makanan khas Sunda di Indonesia. Karedok sekilas mirip dengan lotek. Karedok dibuat dengan bahan-bahan sayuran mentah.",
                        resep:
                        "mentimun, taoge, kol, kacang panjang, ubi, labu siam daun kemangi, dan terong atau leunca.",
                        location: "Jawa Barat",
                        img: "./images/makanan/karedok.jpeg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/keraktelor.jpg"
                    alt="Card 3"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Kerak Telor
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    DKI Jakarta
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Kerak Telor",
                        body: "Kerak telur adalah makanan asli daerah Jakarta (Betawi). Anda bisa menemukan kerak telor di sekitar Kota Tua, Jakarta Barat. Menurut sejarah, Kerak Telor sudah ada dari zaman kolonial Belanda..",
                        resep:
                        "Beras ketan putih, telur ayam atau bebek, ebi (udang kering yang diasinkan) yang disangrai kering ditambah bawang merah goreng, lalu diberi bumbu yang dihaluskan berupa kelapa sangrai..",
                        location: "DKI Jakarta",
                        img: "./images/makanan/keraktelor.jpg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/mieaceh.jpg"
                    alt="Card 4"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Mie Aceh
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    Aceh Darrussalam
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Mie Aceh",
                        body: "Mi aceh adalah masakan mi pedas khas Aceh di Indonesia. Mi aceh biasanya ditaburi dengan bawang goreng dan disajikan bersama emping, potongan bawang merah, mentimun, dan jeruk nipis.",
                        resep:
                        "Mi kuning tebal dengan irisan daging sapi, daging kambing atau makanan laut (udang dan cumi) disajikan dalam sup sejenis kari yang gurih dan pedas.",
                        location: "Aceh Darussalam",
                        img: "./images/makanan/mieaceh.jpg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/papeda.jpg"
                    alt="Card 5"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Papeda
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    Papua
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Papeda",
                        body: "Papeda adalah makanan berupa bubur sagu khas Maluku dan Papua yang biasanya disajikan dengan ikan tongkol atau bubara yang dibumbui dengan kunyit. Papeda berwarna putih dan bertekstur lengket menyerupai lem dengan rasa yang tawar.",
                        resep:
                        "1/4 kg tepung tapioka, 15 sdm tepung terigu, 3 batang Bawang godong (iris cincang), 1 penyedap rasa, 1 garam secukupnya, secukupnya Air, 1 telor",
                        location: "Papua",
                        img: "./images/makanan/papeda.jpg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/pempek.jpg"
                    alt="Card 6"
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Pempek
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    Palembang
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Pempek",
                        body: "Pempek adalah makanan yang dibuat dari daging ikan yang digiling lembut yang dicampur tepung kanji atau tepung sagu, serta komposisi beberapa bahan lain seperti telur, bawang putih yang dihaluskan, penyedap rasa, dan garam.",
                        resep:
                        "daging ikan giling, tepung kanji atau tepung sagu, serta telur",
                        location: "Palembang",
                        img: "./images/makanan/pempek.jpg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900/80">
                <img
                    className="w-full h-48 object-cover"
                    src="./images/makanan/rendang.jpg"
                    alt="Card "
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl dark:text-gray-300">
                    Rendang
                    </div>
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                    <FaMapLocation />
                    Sumatra Barat
                    </p>
                </div>
                <button
                    onClick={() => {
                    setModalDetail(true);
                    setContentModal({
                        title: "Rendang",
                        body: "Rendang adalah hidangan berbahan dasar daging yang dihasilkan dari proses memasak suhu rendah dalam waktu lama dengan menggunakan aneka rempah-rempah dan santan. Proses memasaknya memakan waktu berjam-jam hingga yang tinggal hanyalah potongan daging berwarna hitam pekat dan dedak.",
                        resep: "Daging sapi, santan kelapa, cabai, bumbu",
                        location: "Sumatra Barat",
                        img: "./images/makanan/rendang.jpg",
                    });
                    }}
                    className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center py-2 px-4 mt-4"
                >
                    Detail
                </button>
                </div>
                <div className="max-w-sm rounded overflow-hidden !h-[325px]">
                <div className="grid grid-cols-2 gap-2">
                    <img
                    className="w-full h-[125px] object-cover"
                    src="./images/makanan/gudeg.jpeg"
                    alt="Card "
                    />
                    <img
                    className="w-full h-[125px] object-cover"
                    src="./images/makanan/papeda.jpg"
                    alt="Card "
                    />
                    <img
                    className="w-full h-[125px] object-cover"
                    src="./images/makanan/rendang.jpg"
                    alt="Card "
                    />
                    <img
                    className="w-full h-[125px] object-cover"
                    src="./images/makanan/pempek.jpg"
                    alt="Card "
                    />
                </div>
                <Link
                    href="/ragam-indonesia/makanan-khas"
                    className="block w-full border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white text-center py-2 px-4 mt-4 rounded"
                >
                    Lihat Lainnya
                </Link>
                </div>
            </div>
            </section>

            {modalDetail ? (
            <section className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-950 md:w-[500px] w-[95%] md:mx-0 mx-auto p-7 rounded relative">
                <button
                    className="absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-orange-500"
                    onClick={() => {
                    setModalDetail(false);
                    }}
                >
                    <FaTimes />
                </button>
                <h1 className="text-3xl font-bold dark:text-gray-200">
                    {" "}
                    {contentModal.title}
                </h1>
                <hr className="my-3 dark:border-gray-700" />
                <div>
                    <img
                    src={contentModal.img}
                    className="rounded h-[200px] object-cover w-full"
                    />
                    <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                    {contentModal.body}
                    </p>
                    <p className="md:text-sm text-[13px] mt-5 dark:text-gray-300">
                    <b className="text-orange-500">Bahan utama:</b>{" "}
                    {contentModal.resep}
                    </p>

                    <hr className="my-5 dark:border-gray-700" />
                    <div className="flex items-center justify-between">
                    <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                        <FaMapLocation />
                        {contentModal.location}
                    </p>
                    <button className="text-sm text-orange-500 flex items-center gap-2">
                        Detail Lainnya
                        <FaArrowRight />
                    </button>
                    </div>
                </div>
                </div>
            </section>
            ) : (
            ""
            )}

        </div>
      </main>
    </MainLayout>
  );
}

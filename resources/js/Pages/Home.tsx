import React, { useState, useEffect } from "react";
import { Link, router } from '@inertiajs/react';
import { usePage } from "@inertiajs/react";

import { toast } from 'react-toastify'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import content from "./../data/content.json";

// icons
import {
  FaCalendar,
  FaEye,
  FaMapMarkerAlt,
  FaUser,
  FaQuoteRight,
  FaMapMarkedAlt,
} from "react-icons/fa";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

//
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from './../Layouts/mainLayout';
import { changeDate } from './../Utils/changeDate';
import { BookOpen, Calendar, CheckCircle, MapPin } from "lucide-react";

interface Event {
    kategori_event_id:string;
    nama:string;
    slug:string;
    image:string;
    status_event:string;
    excerpt:string;
    tempat:string;
    tanggal:string;
}

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
    published_at: string; // Bisa dikonversi ke Date jika perlu
    user_id: number;
    kategori_id: number;
    status_artikel: string;
    kategori: Kategori;
    user: User;
}

interface PageProps {
    events: Event[];
    dataArtikel: Artikel[];
    [key: string]: any;
}


const Home = ({plans}) => {

    const { user, cartCount } = usePage().props;

  const [open, setOpen] = useState(false);
  const [tabActive, setTabActive] = useState("news");
  const tabs = ["Bulanan", "Triwulanan", "Tahunan"];
  const [tabActiveSubscription, setTabActiveSubscription] = useState("Bulanan");

  const { events = [], artikels = [] } = usePage<PageProps>().props;  // Ambil data dari Laravel

  const artikelPertama = artikels.length > 0 ? artikels[0] : null;
  const dataArtikel = artikels.length > 3 ? artikels.slice(1, 4) : [];

  const [isDark, setIsDark] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSelectPlan = async (plan, user) => {
    // Cek apakah user belum login
    if (!user || !user.id) {
        toast.info('🔒 Silakan login terlebih dahulu.')
        window.location.href = '/admin/login'
        return
    }

    if (plan.price === 0) {
      window.location.href = '/admin/login'
    } else {
      try {
        const response = await fetch('/api/addSubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            user_id: user.id,
            item_id: plan.id,
            item_type: 'subscription',
            jumlah: 1,
          }),
        })

        const result = await response.json()


        if (response.ok) {
          toast.success('Paket berhasil ditambahkan ke keranjang!')

            // Redirect ke /keranjang tanpa reload
            router.visit('/keranjang');
        }else if (response.status === 409) {
            toast.warning(result.message)
        }else {
          toast.error(result.message || 'Gagal menambahkan ke keranjang.')
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('⚠️ Terjadi kesalahan jaringan.')
      }
    }
  }



    const handleSubmit = async (e : any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');


        try {
            const response = await fetch('/api/kontak', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({nama, email, pesan}),
            });

            if (!response.ok) {
                throw new Error('Failed to send your message. Please try again later.');
            }

            setSuccessMessage('Pesan Anda berhasil dikirim!');
            setNama("")
            setEmail("")
            setPesan("")

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      setIsDark(e.matches);
    });
  }, []);

  const changeHeaderImg = (img: any) => {
    const headerImg = document.getElementById(
      "headerImg"
    ) as HTMLImageElement | null;

    if (headerImg) {
      headerImg.src = img;
    }
  };

  const [moreNews, setMoreNews] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    // Jika masih memuat data, tampilkan loading
    if (!events.length && !artikels.length) return (
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='/images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="./images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

  return (
    <MainLayout title="Sanggar Nusantara | Eksplorasi Budaya & Kekayaan Alam Indonesia">
      <LightNavbar user={user} cartCount={cartCount} />

      <section className="bg-white dark:bg-gray-950 max-h-[100vh]  relative z-10 overflow-hidden">
        <div className="grid lg:grid-cols-2 max-w-[1600px] h-full mx-auto px-4">
            {/* Background Gradient Circle */}
            <span
            className="w-[1000px] h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg] animate-spin-slow"
            style={{
                backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
            ></span>

            {/* Left Section */}
            <section className="md:pl-24 px-5 md:px-0 flex lg:flex-col sm:flex-row flex-col lg:items-start items-center lg:justify-center justify-between lg:order-1 order-2 lg:gap-0 gap-10 mb-10">

            {/* Big Title */}
            <div className="sm:hidden md:hidden flex mt-5 justify-center w-full sm:order-1 order-1 lg:mb-10">
                <h1
                className="lg:text-8xl md:text-5xl sm:text-7xl text-3xl text-center font-semibold text-red-500"
                data-aos="fade-right"
                >
                SANGGAR NUSANTARA
                </h1>
            </div>

            <div className="hidden lg:flex w-full sm:order-1 order-1 lg:mb-10">
                <h1
                className="lg:text-8xl md:text-5xl sm:text-7xl text-3xl font-semibold text-red-500"
                data-aos="fade-right"
                >
                SANGGAR <br /> NUSANTARA
                </h1>
            </div>

            {/* Description Text */}
            <div className="w-full sm:order-1 order-2 lg:mb-32">

                <p
                className="text-sm lg:text-[16px] text-gray-800 dark:text-gray-200 animate-slide-right leading-6"
                data-aos-delay="100"
                >
                {content.header.id}
                </p>
            </div>

            {/* Thumbnails Grid */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 lg:gap-5 gap-3 sm:order-2 order-1 md:mr-24 lg:mr-0">
                {[
                { img: "/images/header/subheader2_thumb.jpg", delay: 900 },
                { img: "/images/header/subheader1_thumb.jpg", delay: 600 },
                { img: "/images/header/subheader3_thumb.jpg", delay: 300 },
                { img: "/images/header/subheader4_thumb.jpg", delay: 200 },
                ].map((thumb, idx) => (
                <div
                    key={idx}
                    className="cursor-pointer transition-transform hover:scale-110 after:transition-all relative after:content-[''] after:inset-0 after:absolute after:bg-black/30 after:rounded-md hover:after:scale-0 after:scale-100 lg:col-span-1 sm:col-span-2"
                    onClick={() => setOpen(true)}
                    data-aos="fade-left"
                    data-aos-delay={thumb.delay}
                >
                    <img
                    src={thumb.img}
                    alt={`subheader${idx + 1}`}
                    className="lg:w-[120px] sm:w-[200px] w-full sm:h-[120px] h-[100%] rounded-md object-cover"
                    />
                </div>
                ))}
                <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                    { src: "/images/header/subheader1.jpg" },
                    { src: "/images/header/subheader2.jpg" },
                    { src: "/images/header/subheader3.jpg" },
                    { src: "/images/header/subheader4.jpg" },
                ]}
                />
            </div>

            </section>

            {/* Right Section with Image Background */}
            <section className="lg:h-[800px] text-center items-center flex justify-center flex-wrap w-full h-[300px] sm:h-full mt-12 lg:order-2 order-1">
            <img
                id="headerImg"
                src="/images/header/header.png"
                alt="headerImg"
                className="h-full w-full object-cover"
            />


            {/* Large Title */}
            {/* <div className="lg:hidden w-full mb-10 flex justify-center text-center z-10">
                <h1
                className="lg:text-8xl sm:text-7xl text-4xl font-semibold text-red-500"
                data-aos="fade-left"
                >SANGGAR NUSANTARA</h1>
            </div> */}

            </section>
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />

      <section className="overflow-hidden lg:px-20 md:px-14 sm:px-12 px-8 gap-28 items-center lg:mt-20 mt-10 relative">
        <div className="grid lg:grid-cols-2 max-w-[1600px] h-full mx-auto px-4 ">
            <span
            className="lg:w-[1000px] lg:h-[1000px] w-[500px] h-[500px] lg:rounded-full absolute lg:-right-[250px] lg:-top-[500px] lg:-rotate-[0deg] -right-[200px] rotate-90"
            style={{
                backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
            ></span>

            <img
            src="/images/plane.png"
            alt="plane"
            className="absolute w-[200px] lg:-top-[100px] -top-[150px]"
            />

            <div className="md:text-left text-center ">
            <h2
                className="font-bold md:text-3xl text-2xl mb-5 dark:text-gray-200"
                data-aos="fade-right"
                data-aos-once="true"
            >
                <span className="relative md:pe-32 pe-16 md:pl-0 pl-16">
                NUSANTARA
                <img
                    src="/images/Decore.png"
                    className="absolute bottom-[10px] h-[23px] left-[-25px] w-full -z-10 sm:block hidden"
                />
                </span>
            </h2>
            <p
                className="md:text-sm text-base text-gray-800 dark:text-gray-300 mb-10"
                data-aos="fade-right"
                data-aos-once="true"
                data-aos-delay="200"
            >
                {content.explore.body.id}
            </p>

            <span>
                <Link
                href="/ragam-indonesia"
                className="md:px-7 py-3 px-5 inline-flex gap-3 items-center bg-red-500 hover:bg-red-400 rounded-full text-white md:text-sm text-[12px]"
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-delay="500"
                >
                <FaMapMarkerAlt size={20} />
                Explorasi Sekarang
                </Link>
            </span>
            </div>
            <div className="h-[400px] lg:flex hidden lg:justify-start gap-5">
            <div className="h-full w-[40%] -translate-y-10">
                <img
                src="/images/explore/2.jpg"
                alt="image explore section 1"
                className="h-full w-full object-cover"
                data-aos="fade-up"
                data-aos-once="true"
                />
            </div>
            <div className="h-full w-[40%] translate-y-10">
                <img
                src="/images/explore/1.jpg"
                alt="image explore section 2"
                className="h-full w-full object-cover"
                data-aos="fade-down"
                data-aos-once="true"
                />
            </div>
            </div>

        </div>
      </section>

      <section className="lg:px-20 md:px-14 sm:px-12 px-8 mt-36 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-10 gap-5  max-w-[1600px] h-full mx-auto px-4">

            <span
            className="lg:w-[1200px] lg:h-[1200px] w-[500px] h-[500px] lg:rounded-full absolute lg:-left-[500px] lg:bottom-[-500px] lg:rotate-[-150deg] -left-[200px] rotate-90 lg:block hidden"
            style={{
                backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
            ></span>

            <div className="lg:col-span-4 md:col-span-2">
            <h3
                className="font-bold md:text-3xl text-2xl md:text-left text-center dark:text-gray-200"
                data-aos="fade-right"
                data-aos-once="true"
            >
                ASPEK BUDAYA DI
                <span className="text-red-500"> INDONESIA</span>
            </h3>
            <p
                className="text-gray-800 dark:text-gray-300 lg:w-2/3 md:w-3/4 w-full md:mx-0 mx-auto md:text-left text-center md:text-sm text-[13px] mt-5"
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-once="true"
            >
                {content.cultureAspect.id}
            </p>
            </div>
            <div data-aos="flip-left" data-aos-delay="250" data-aos-once="true">
            <div
                className="lg:h-[500px] md:h-[400px] h-[250px] rounded-md overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-black/40 bg-cover bg-center p-5 md:hover:scale-110 transition-all"
                style={{
                backgroundImage: "url(/images/card/musik.jpg)",
                }}
            >
                <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <p className="text-white flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <small>Bonang, Jawa Timur</small>
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-xl text-white md:mb-5 mb-2">
                    {"LAGU & MUSIK"}
                    </h4>
                    <p className="text-gray-200 md:text-sm text-[12px]">
                    Nikmati keindahan seni musik Bonang di Jawa Timur. Temukan
                    harmoni yang khas dan cerita yang tersembunyi di setiap
                    nadanya.
                    {/* Experience the beauty of Bonang music in East Java. Discover the distinctive harmony and hidden stories within each note. */}
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div data-aos="flip-left" data-aos-delay="500" data-aos-once="true">
            <div
                className="lg:h-[500px] md:h-[400px] h-[250px] rounded-md overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-black/40 bg-cover bg-center p-5 md:hover:scale-110 transition-all"
                style={{
                backgroundImage: "url(/images/card/arsitektur.jpg)",
                }}
            >
                <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <p className="text-white flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <small>Rumah Panggung, Sulawesi Selatan</small>
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-xl uppercase text-white md:mb-5 mb-2">
                    {"ARSITEKTUR BANGUNAN"}
                    </h4>
                    <p className="text-gray-200 md:text-sm text-[12px]">
                    Temukan keunikan dan harmoni arsitektur rumah panggung di
                    Sulawesi Selatan, simbol budaya yang kaya.
                    {/* Discover the uniqueness and harmony of the stilt house architecture in South Sulawesi, a symbol of rich cultural heritage. */}
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div data-aos-once="true" data-aos="flip-left" data-aos-delay="750">
            <div
                className="lg:h-[500px] md:h-[400px] h-[250px] rounded-md overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-black/40 bg-cover bg-center p-5 md:hover:scale-110 transition-all"
                style={{
                backgroundImage: "url(/images/card/upacara.jpg)",
                }}
            >
                <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <p className="text-white flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <small>Seren Taun, Jawa Barat</small>
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-xl text-white md:mb-5 mb-2">
                    UPACARA
                    </h4>
                    <p className="text-gray-200 md:text-sm text-[12px]">
                    Temukan ungkapan syukur atas pertanian setahun. Rasakan
                    keharmonisan manusia, Tuhan, dan alam dalam budaya unik.
                    {/* Discover the expression of gratitude for a year of agriculture. Feel the harmony between humans, God, and nature in a unique cultural context. */}
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div data-aos-once="true" data-aos="flip-left" data-aos-delay="1000">
            <div
                className="lg:h-[500px] md:h-[400px] h-[250px] rounded-md overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:bg-black/40 bg-cover bg-center p-5 md:hover:scale-110 transition-all"
                style={{
                backgroundImage: "url(/images/card/pakaian.jpg)",
                }}
            >
                <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <p className="text-white flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <small>Sunda, Jawa Barat</small>
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-xl text-white md:mb-5 mb-2">
                    PAKAIAN
                    </h4>
                    <p className="text-gray-200 md:text-sm text-[12px]">
                    Dengan desain dan corak yang beragam, busana tradisional Sunda
                    mencerminkan kekayaan budaya dan identitas khas masyarakatnya.
                    {/* With diverse designs and patterns, Sundanese traditional clothing reflects the cultural richness and distinctive identity of its community. */}
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div className="lg:col-span-4 md:col-span-2 text-center mt-8">
            <Link href="/ragam-indonesia" className="bg-red-500 hover:bg-red-400 text-white md:py-3 py-2 md:px-10 px-7 md:text-sm text-[12px] rounded-full">
                Lihat Lebih Banyak
            </Link>
            </div>

        </div>
      </section>

      <section className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2 relative mt-20">
        <div className="row-span-2 md:order-1 md:block hidden">
          <img
            src="/images/gallery/11.jpg"
            alt="gallery11"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="100"
          />
        </div>
        <div className="md:order-2 md:block hidden">
          <img
            src="/images/gallery/1.jpg"
            alt="gallery1"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="200"
          />
        </div>
        <div className="md:order-3 md:block hidden">
          <img
            src="/images/gallery/2.jpg"
            alt="gallery2"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="300"
          />
        </div>
        <div className="md:order-4 order-1">
          <img
            src="/images/gallery/3.jpg"
            alt="gallery3"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="400"
          />
        </div>
        <div className="lg:order-5 md:order-7 order-2">
          <img
            src="/images/gallery/4.jpg"
            alt="gallery4"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-down"
            data-aos-delay="500"
          />
        </div>

        {/*  */}

        <div className="lg:order-6 md:order-8 md:block hidden">
          <img
            src="/images/gallery/5.jpg"
            alt="gallery5"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-right"
            data-aos-delay="800"
          />
        </div>
        <div
          className="border-2 border-red-500 border-dashed p-5 flex flex-col justify-center lg:order-7 md:order-5  order-3  lg:col-span-1 md:col-span-2"
          data-aos-once="true"
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          <h2 className="font-semibold text-xl dark:text-gray-200">
            {content.gallery.id}
          </h2>
          <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">
            {content.gallery.body.id}
          </p>
        </div>
        <div className="lg:order-8  order-5 lg:block md:hidden">
          <img
            src="/images/gallery/6.jpg"
            alt="gallery6"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-right"
            data-aos-delay="700"
          />
        </div>
        <div className="row-span-2 lg:order-9 md:order-6  order-4">
          <img
            src="/images/gallery/12.jpg"
            alt="gallery12"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-right"
            data-aos-delay="600"
          />
        </div>

        {/*  */}

        <div className="lg:order-10 md:block hidden order-9">
          <img
            src="/images/gallery/7.jpg"
            alt="gallery7"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="300"
          />
        </div>
        <div className="lg:order-11 lg:block hidden">
          <img
            src="/images/gallery/8.jpg"
            alt="gallery8"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="400"
          />
        </div>
        <div className="lg:order-12 lg:block hidden">
          <img
            src="/images/gallery/9.jpg"
            alt="gallery9"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="500"
          />
        </div>
        <div className="lg:order-last lg:block hidden">
          <img
            src="/images/gallery/10.jpg"
            alt="gallery10"
            className="w-full h-full object-cover"
            data-aos-once="true"
            data-aos="flip-left"
            data-aos-delay="600"
          />
        </div>
      </section>

      <section className="mt-20 dark:bg-gray-950 pt-20">
        <h3
          className="text-center md:text-4xl text-2xl font-bold dark:text-gray-100"
          data-aos-once="true"
          data-aos="fade-down"
        >
          {"GALERI KERAGAMAN INDONESIA"}
        </h3>
        <p
          className="lg:w-[900px] w-[90%] text-center mx-auto md:text-lg mt-5 mb-10 dark:text-gray-300 text-gray-700"
          data-aos-once="true"
          data-aos="fade-up"
        >
          {content.slider.id}
        </p>
        <div
          className="slider md:h-[500px] h-[350px] overflow-x-hidden py-10 relative"
          data-aos-once="true"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className="slide-track flex md:gap-20 gap-10 items-center">
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/1.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 1"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/8.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 2"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/3.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 3"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/4.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 4"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/5.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 5"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/10.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 6"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/6.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 7"
              />
            </div>
            <div className="md:w-[500px] w-[200px] slide">
              <img
                src="/images/gallery/7.jpg"
                className="md:w-[500px] w-[200px] md:h-[300px] h-[150px] object-cover rounded-lg"
                alt="image galeri 8"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="lg:px-20 md:px-10 px-3"
        data-aos-once="true"
        data-aos="zoom-in"
      >
        <div className="bg-red-200 dark:bg-red-400 py-12 text-center rounded-md md:px-20 px-5">
          <h4 className="text-gray-800 dark:text-gray-300">
            {"INDONESIA DIMATA DUNIA"}
          </h4>
          <h3 className="font-bold md:text-3xl text-xl mt-5 dark:text-gray-200">
            {content.indonesiaAndWorld.id}
          </h3>
        </div>
      </section>

      <section className="lg:px-4 mt-10">
        <div className="mx-auto flex max-w-[1350px] space-x-[1px] lg:justify-center lg:space-x-6">

          <button
            className={[ tabActive === "news" ? "bg-red-500 flex-1 text-white" : "bg-red-50 text-red-500 hover:bg-red-100"  ," flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base cursor-pointer lg:rounded-t-xl lg:px-6  lg:flex-[unset]"].join("")}
            onClick={() => {
                setTabActive("news");
            }}
          >
            <div className="relative h-6 w-6 lg:h-9 lg:w-9">
              <BookOpen className="w-[30px] h-[30px]" />
            </div>
            <span className="ml-3 lg:ml-4 inline">Berita</span>
          </button>

          <button
            className={[ tabActive !== "news" ? "bg-red-500 flex-1 text-white" : "bg-red-50 text-red-500 hover:bg-red-100"  ," flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base cursor-pointer lg:rounded-t-xl lg:px-6  lg:flex-[unset]"].join("")}
            onClick={() => {
              setTabActive("event");
            }}
          >
            <div className="relative h-6 w-6 lg:h-9 lg:w-9">
              <Calendar className="w-[30px] h-[30px]" />
            </div>
            <span className="ml-3 lg:ml-4 inline">Event</span>
          </button>

        </div>
      </section>


      <section className="lg:mb-20 mb-10 bg-red-500">
        <div className="max-w-[1600px] h-full mx-auto px-4">

            {tabActive == "news" ? (
                <>
                    <Link href={`/artikel/${artikelPertama.slug}`} className="grid lg:grid-cols-5 gap-10 items-center lg:px-20 md:px-10 px-5 pt-10">
                        <div className="h-[200px] md:h-[350px] w-full rounded-md overflow-hidden lg:col-span-2 relative">
                            <img
                                src={artikelPertama.image ? `./storage/${artikelPertama.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                alt={`image artikel ${artikelPertama.nama}`}
                                className="object-cover h-full w-full"
                                data-aos-once="true"
                                data-aos="fade-left"
                            />

                            {artikelPertama.status_artikel === "premium" && (
                                <span
                                data-aos-once="true"
                                data-aos="fade-right"
                                className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    Premium
                                </span>
                            )}
                        </div>

                        <div
                        className="lg:col-span-3"
                        data-aos-once="true"
                        data-aos="fade-right"
                        >

                        {artikelPertama && (
                            <>
                            <h5 className="text-white font-semibold md:mb-5 mb-3 md:text-base text-sm">
                                {artikelPertama.kategori.nama}
                            </h5>

                            <h2 className="font-bold md:text-3xl text-xl text-white ">
                                {artikelPertama.title}
                            </h2>

                            <p className="mt-5 md:text-base text-[12px] text-white">
                                {artikelPertama.excerpt}
                            </p>

                            <div className="flex gap-5 mt-10 text-slate-200 md:text-base text-sm">
                                <span className="flex gap-2 items-center">
                                <FaEye />
                                <small>{artikelPertama.views.toLocaleString()} views</small>
                                </span>
                                <span className="flex gap-2 items-center">
                                    <FaCalendar />
                                    <small>{changeDate(new Date(artikelPertama.published_at))}</small>
                                </span>
                                <span className="flex gap-2 artikelPertamas-center">
                                    <FaUser />
                                    <small>Penulis : {artikelPertama.user.name}</small>
                                </span>

                            </div>

                            </>
                        )}
                        </div>

                    </Link>
                    {moreNews ? (
                    <>
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 md:px-20 px-4 mt-10">
                        {dataArtikel.length > 0 && dataArtikel.map((artikel) => (
                            <Link key={artikel.slug} href={`/artikel/${artikel.slug}`} className="mt-5">

                                <div className="h-[200px] sm:h-[250px] relative">
                                    {artikel.status_artikel === "premium" && (
                                        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            Premium
                                        </span>
                                    )}
                                    <img
                                        src={`./storage/${artikel.image}`} // Menggunakan gambar dari API
                                        alt={artikel.title}
                                        className="h-full object-cover w-full rounded"
                                    />
                                </div>

                                <h3 className="mt-3 text-xl font-bold text-white">
                                {artikel.title} {/* Menampilkan judul artikel */}
                                </h3>

                                <div className="my-3 md:my-5 flex gap-5">
                                <span className="flex gap-2 items-center text-white">
                                    <FaUser />
                                    <small>{artikel.user.name}</small> {/* Menampilkan nama penulis */}
                                </span>
                                <span className="flex gap-2 items-center text-white">
                                    <FaCalendar />
                                    <small>{new Date(artikel.published_at).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                    })}</small> {/* Menampilkan tanggal terbit dalam format lokal */}
                                </span>
                                </div>
                                <p className="text-white mt-2 text-sm">
                                {artikel.excerpt} {/* Menampilkan ringkasan artikel */}
                                </p>
                            </Link>
                        ))}
                        </section>

                        <div className="flex flex-wrap justify-center text-center pb-10 ">
                        <button
                            className="w-full sm:w-[unset] mx-3 sm:mx-0 bg-white border-2 border-white hover:bg-slate-200 hover:border-red-400 text-red-500 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center justify-center sm:gap-2 cursor-pointer "
                            onClick={() => {
                            setMoreNews(false);
                            }}
                        >
                            {"Lebih Sedikit"}
                            <MdKeyboardDoubleArrowUp className="ml-5" />
                        </button>
                        <Link
                            href={"/artikel"}
                            className="w-full sm:w-[unset] mx-3 sm:mx-0 border-2 border-white hover:bg-white text-white hover:text-red-500 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center sm:gap-2 justify-center md:ml-5"
                        >
                            {"Semua Berita"}
                            <MdKeyboardDoubleArrowRight className="ml-5" />
                        </Link>
                        </div>
                    </>
                    ) : (
                    <div className="text-center pb-10 lg:block">
                        <button
                        className="bg-white hover:bg-red-400 text-red-500 mx-auto text-sm px-5 py-2 mt-10 rounded-full cursor-pointer inline-flex items-center gap-2"
                        onClick={() => {
                            setMoreNews(true);
                        }}
                        >
                        {"Lihat Lainnya"}
                        <MdKeyboardDoubleArrowDown />
                        </button>
                    </div>
                    )}
                </>
            ) : (
                <div className="max-w-[1700px] py-10 lg:px-10 px-3 grid lg:grid-cols-3 grid-cols-1 gap-0 md:gap-10 items-center">
                    {events.length > 0 && events.map((event, index) => (
                        <Link key={index} href={`/event/${event.slug}`} className="bg-white rounded-lg shadow-sm mb-5 md:mb-0 dark:bg-gray-950">

                            <div className="h-[200px] md:h-[270px] relative mb-5">

                                {event.status_event === "premium" && (
                                    <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Premium
                                    </span>
                                )}
                                <img
                                src={event.image ? `./storage/${event.image}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                alt={event.nama}
                                className="w-full h-full object-cover rounded-lg"
                                />

                            </div>
                            <h2 className={`px-4 text-lg font-bold mb-2 line-clamp-2 dark:text-gray-200`}>{event.nama}</h2>

                            <p className="px-4 text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{event.excerpt}</p>

                            <div className="mt-5 md:flex gap-5 px-4 pb-4">
                                <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 w-[60%] items-center">
                                    <MapPin className="w-[25px] h-[25px]" />
                                    <span className="line-clamp-2 text-sm">{event.tempat}</span>
                                </p>
                                <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                    <FaCalendar />
                                    <span className="line-clamp-2 text-sm">{changeDate(new Date(event.tanggal))}</span>
                                </p>
                            </div>

                            <div
                                className={`p-5 rounded-b-lg text-center
                                    ${new Date(event.tanggal) >= new Date() ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}
                                `}
                            >
                                <p className="lg:text-base md:text-sm text-[12px] font-semibold">
                                    {new Date(event.tanggal) >= new Date() ? "Pendaftaran Masih Dibuka" : "Event Sudah Berakhir"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

        </div>
        </section>

        <section id="map" className="px-4"
            style={{
                background: isDark
                ? "#000" // dark mode background
                : "linear-gradient(180deg, #FFF, #F4F6F6 100.03%)", // light mode gradient
            }}
        >
            <div className="max-w-[1350px] mx-auto md:pt-12 lg:pt-16">
                <img src="/images/indonesian-map.gif" className="w-full" />
                <div className="text-center max-w-5xl mx-auto mt-5">
                    <h2 className="text-gray-1000 !leading-tight text-3xl lg:text-4xl font-bold tracking-tight dark:text-gray-200">
                        Sanggar Nusantara Telah Menjangkau Hampir ke Seluruh Indonesia
                    </h2>
                    <p className="text-gray-800 md:text-lg mt-4 dark:text-gray-400">
                        Sanggar Nusantara berkomitmen untuk melestarikan dan memperkenalkan kekayaan budaya serta alam Indonesia. Mari bersama-sama, kita lestarikan warisan nusantara dan wujudkan impian akan Indonesia yang kaya akan seni, tradisi, dan keindahan alamnya.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 py-12 lg:pb-16 gap-5 w-full max-w-[1350px]">
                    <div className="dark:bg-gray-950 bg-white shadow-[0px_25px_50px_0px_rgba(34,39,39,0.07)] rounded-2xl p-4 lg:p-6 flex-1 flex-shrink-0">
                        <h5 className="font-bold text-red-500 text-3xl lg:text-5xl mb-2">34+</h5>
                        <span className="text-gray-700 dark:text-gray-500 lg:text-lg">Provinsi Terjangkau</span>
                    </div>
                    <div className="dark:bg-gray-950 bg-white shadow-[0px_25px_50px_0px_rgba(34,39,39,0.07)] rounded-2xl p-4 lg:p-6 flex-1 flex-shrink-0">
                        <h5 className="font-bold text-red-500 text-3xl lg:text-5xl mb-2">995+</h5>
                        <span className="text-gray-700 dark:text-gray-500 lg:text-lg">Sanggar & Komunitas Budaya Berpartisipasi</span>
                    </div>
                    <div className="dark:bg-gray-950 bg-white shadow-[0px_25px_50px_0px_rgba(34,39,39,0.07)] rounded-2xl p-4 lg:p-6 flex-1 flex-shrink-0">
                        <h5 className="font-bold text-red-500 text-3xl lg:text-5xl mb-2">1200+</h5>
                        <span className="text-gray-700 dark:text-gray-500 lg:text-lg">Sekolah & Perguruan Tinggi Terlibat</span>
                    </div>
                    <div className="dark:bg-gray-950 bg-white shadow-[0px_25px_50px_0px_rgba(34,39,39,0.07)] rounded-2xl p-4 lg:p-6 flex-1 flex-shrink-0">
                        <h5 className="font-bold text-red-500 text-3xl lg:text-5xl mb-2">190+</h5>
                        <span className="text-gray-700 dark:text-gray-500 lg:text-lg">Mitra & Lembaga Pendukung</span>
                    </div>
                </div>
            </div>
        </section>

      <div className="mx-auto my-12 max-w-[1350px] space-y-16 px-4">
        <div className="py-8">
          <div>
            <h2 className="text-red-500 text-center text-3xl font-bold">Apa Kata Nusantarawan Tentang Sanggar Nusantara?</h2>
            <p className="mx-auto mt-4 md:text-lg text-center lg:max-w-[50%] dark:text-white">Total
              <span className="font-semibold "> 136K+ Cendekiawan Digital Nusantara</span>, Simak keseruan dan manfaat yang dirasakan para Cendekiawan Nusantara. Apakah kamu yang selanjutnya mewarisi semangat dan inovasi budaya kita?
            </p>
          </div>
          <div className="no-scrollbar mt-8 flex snap-x snap-mandatory flex-col px-5 sm:flex-row items-stretch lg:justify-between gap-8  scroll-smooth max-lg:-mx-4 md:flex-wrap justify-center">

            <div className="flex w-[100%] md:w-[calc(100%/2-theme(spacing.6))] flex-shrink-0 snap-start flex-col gap-6 lg:w-[calc(100%/3-theme(spacing.6))]">
              <div className="flex-1 space-y-6">
                <FaQuoteRight className="fi fi-sr-quote-right rotate-180 leading-none text-[#22282B] dark:text-white"/>
                <p className="text-base md:text-lg font-medium text-[#1F2021] dark:text-white">Sanggar Nusantara merupakan langkah maju dalam upaya global melestarikan Sanggar budaya. Platform ini menggabungkan kekuatan teknologi dan tradisi, menciptakan ruang yang memungkinkan Sanggar leluhur kita tetap hidup di era digital.</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="/images/people/Irina_Bokova_UNESCO.jpg" className="h-12 w-12 rounded-full object-cover"/>
                <div>
                  <h4 className="text-lg font-semibold dark:text-white">Irina Bokova</h4>
                  <p className="dark:text-white">Mantan Direktur Jenderal UNESCO</p>
                </div>
              </div>
            </div>

            <div className="flex w-[100%] md:w-[calc(100%/2-theme(spacing.6))] flex-shrink-0 snap-start flex-col gap-6 lg:w-[calc(100%/3-theme(spacing.6))]">
              <div className="flex-1 space-y-6">
                <FaQuoteRight className="fi fi-sr-quote-right rotate-180 leading-none text-[#22282B] dark:text-white"/>
                <p className="text-base md:text-lg font-medium text-[#1F2021] dark:text-white">Sanggar Nusantara memungkinkan saya untuk memahami lebih dalam tentang sanggar leluhur. Melalui program ini, saya bisa mengaplikasikan keterampilan digital sambil tetap menghargai dan menjaga kekayaan budaya kita.</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="/images/people/img1.jpg" className="h-12 w-12 rounded-full object-cover"/>
                <div>
                  <h4 className="text-lg font-semibold dark:text-white">Dewi Lestari</h4>
                  <p className="dark:text-white">Cultural Researcher</p>
                </div>
              </div>
            </div>

            <div className="flex w-[100%] md:w-[calc(100%/2-theme(spacing.6))] flex-shrink-0 snap-start flex-col gap-6 lg:w-[calc(100%/3-theme(spacing.6))]">
              <div className="flex-1 space-y-6">
                <FaQuoteRight className="fi fi-sr-quote-right rotate-180 leading-none text-[#22282B] dark:text-white"/>
                <p className="text-base md:text-lg font-medium text-[#1F2021] dark:text-white">Sebagai seseorang yang mencintai sejarah dan teknologi, Sanggar Nusantara memberi saya kesempatan untuk menjembatani keduanya. Ini bukan hanya platform budaya, tetapi juga tempat inovasi untuk generasi masa depan.</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="/images/people/img2.jpg" className="h-12 w-12 rounded-full object-cover"/>
                <div>
                  <h4 className="text-lg font-semibold dark:text-white">Rina Santoso</h4>
                  <p className="dark:text-white">Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
            <div>
                <h2 className="text-red-500 text-center text-3xl font-bold">Pilih Paket Budaya Terbaik untuk Kamu</h2>
                <p className="mx-auto mt-4 md:text-lg text-center lg:max-w-[50%] dark:text-white mb-7 md:mb-4">Gabung bersama Sanggar Nusantara dan dapatkan pengalaman budaya yang menginspirasi. Garansi 30 hari uang kembali jika kamu berubah pikiran.
                </p>

                {/* Mobile Tabs */}
                <div className="md:hidden flex justify-around w-full border-b border-gray-300 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setTabActiveSubscription(tab)}
                            className={` font-semibold cursor-pointer px-4 py-2 ${tabActiveSubscription === tab ? "text-blue-600" : "text-gray-500" }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex justify-start md:justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setTabActiveSubscription(tab)}
                            className={`cursor-pointer px-4 py-2 mx-2 rounded-lg ${tabActiveSubscription === tab ? "bg-red-600 text-white" : "active:bg-gray-300 bg-gray-200 hover:bg-gray-300"}`}
                        >
                            <span className="font-semibold">{tab}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mt-10 mt-5">
                {plans.filter((plan) => plan.durasi === tabActiveSubscription ).map((plan, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl p-6 shadow-md transition-transform transform lg:hover:scale-105 ${
                        plan.highlight
                            ? "border-yellow-500 bg-yellow-50 lg:scale-105"
                            : "border-gray-200 bg-white"
                        }`}
                    >
                        {plan.specialTag && (
                            <div className="mb-5 md:mb-3 text-sm font-medium text-white bg-indigo-400 inline-block px-3 py-1 rounded-full">
                                {plan.specialTag}
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {plan.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                        {plan.specialNote && (
                            <p className="text-xs text-gray-500 italic mb-2">{plan.specialNote}</p>
                        )}
                        {/* Harga */}
                        {plan.price === 0 ? (
                            <p className="text-2xl font-bold text-indigo-700 mb-1">Gratis</p>
                        ) :  (
                            <>
                                <div className="text-2xl font-bold text-indigo-700 mb-3">
                                    Rp{plan.price.toLocaleString()}/{plan.durasi}
                                </div>

                                <div className="flex gap-5 mb-5 items-center">
                                    {plan.price < plan.originalPrice && (
                                        <div className="text-sm text-gray-500 line-through">
                                            Rp{plan.originalPrice.toLocaleString()}/{plan.durasi}
                                        </div>
                                    )}
                                    <p className="text-sm font-medium text-white bg-emerald-600 inline-block px-3 py-1 rounded-full">
                                        Hemat {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                                    </p>
                                </div>
                            </>
                        )}

                        <button
                            onClick={() => handleSelectPlan(plan, user)}
                            className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition mb-4
                                ${plan.highlight
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                }`}
                        >
                            {plan.highlight ? "Pilih Paket Favorit" : "Langganan Sekarang"}
                        </button>
                        <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            {feature}
                            </li>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div>
          <div className="bg-red-500 flex flex-col overflow-hidden rounded-xl lg:h-80 lg:flex-row">
            <div className="flex-1 self-center p-8 px-6 text-center lg:px-8 lg:text-left">
              <h2 className="text-3xl font-bold text-white">Tertarik untuk Berkolaborasi &amp; Memberi Dampak Positif?</h2>
              <p className="text-white mt-4">Lebih dari <span className="font-bold">100+ perusahaan</span> telah bekerja sama dengan Sanggar Nusantara untuk melestarikan dan memajukan kekayaan budaya Indonesia.</p>

              <div className="mt-8 flex flex-col items-center gap-6 lg:flex-row">
                <a href="https://wa.me/+6282133320489" className="flex items-center justify-center font-medium disabled:opacity-80 gap-2 h-12 min-w-[theme(spacing.36)] px-5 rounded-lg disabled:bg-white disabled:text-white-600 disabled:cursor-not-allowed text-red-500 bg-white hover:bg-white-200 w-full lg:w-fit outline outline-white" type="button">Gabung Jadi Partner</a>
                <a href="/" className="flex items-center justify-center font-medium disabled:opacity-80 gap-2 h-12 min-w-[theme(spacing.36)] px-5 rounded-lg disabled:bg-white disabled:text-white disabled:cursor-not-allowed bg-red-500 outline outline-white hover:bg-red-600 text-white w-full lg:w-fit" type="button">Pelajari Lebih Lanjut <i className="fi fi-sr-arrow-right text-white-50 h-4 w-4"></i></a>
              </div>
            </div>

            <div className="relative flex max-h-60 w-full flex-1 items-start gap-3 overflow-hidden px-4 lg:max-h-[unset] lg:gap-4 lg:px-8">
              <div className="marquee-vertical flex-1 [animation-duration:30s] lg:[animation-duration:50s]">

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/1.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/2.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/3.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/4.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/5.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/6.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/1.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/2.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/3.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/4.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/5.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/6.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>
              </div>

              <div className="marquee-down-vertical flex-1 self-end [animation-duration:30s] lg:[animation-duration:50s]">
                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/7.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/8.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/9.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/10.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/11.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/7.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/8.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/9.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/10.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/11.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>
              </div>

              <div className="marquee-vertical flex-1 [animation-duration:30s] lg:[animation-duration:50s]">
                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/12.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/13.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/14.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/15.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/16.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/17.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/12.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/13.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/14.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/15.png" className="pointer-events-none h-full w-full select-none object-contain" />
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/16.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>

                <div className="mt-3 h-16 w-full rounded-lg bg-white p-3 lg:mt-4 lg:h-20">
                  <img src="/images/partners/17.png" className="pointer-events-none h-full w-full select-none object-contain"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section id="contact">
        <div className="my-14 flex flex-row justify-center flex-wrap lg:flex-nowrap">
          <div
              className="w-full lg:w-[30%] px-5 lg:px-0 py-10 lg:pl-20 bg-[#0f172a] lg:rounded-tr-xl lg:rounded-br-xl lg:mr-3">
                <h2 className="font-bold text-3xl mb-3 lg:text-4xl text-white">Kontak</h2>
                <div className="w-40 h-1 lg:h-2 rounded-full mb-5 lg:mb-10 bg-red-500"></div>
                <p className="text-base text-white lg:text-lg">
                    Ada pertanyaan atau komentar? Tuliskan saja pesan untuk kami
                </p>
          </div>

          <div className="w-full lg:w-[70%] pl-5 pr-5 lg:pl-0 lg:px-0 lg:pr-20">

            <form onSubmit={handleSubmit} className="mt-10 lg:mt-0 ">
                <label htmlFor="name" className="w-full text-red-500 font-semibold">Nama</label>
                <input type="text" id="name"
                    value={nama}
                    onChange={(e)=> setNama(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 focus:outline-red-500 p-3 outline-2 outline-gray-200 focus:outline-secondary my-3 bg-slate-200 text-dark"
                    required
                    placeholder="Masukkan nama anda..."/>

                <label htmlFor="email" className="w-full text-red-500 font-semibold">Email</label>
                <input type="email" id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 focus:outline-red-500 p-3 outline-2 outline-gray-200 focus:outline-secondary my-3 bg-slate-200 text-dark"
                    required
                    placeholder="Masukkan email anda..."/>

                <label htmlFor="message" className="w-full text-red-500 font-semibold">Pesan</label>
                <textarea id="message" rows={5}
                    value={pesan}
                    onChange={(e)=> setPesan(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 focus:outline-red-500 p-3 outline-2 outline-gray-200 focus:outline-secondary my-3 bg-slate-200 text-dark"
                    required
                    placeholder="Masukkan pesan anda..."></textarea>

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className="px-10 py-3 bg-red-500 focus:outline-secondary focus:outline-blue-500 cursor-pointer rounded-lg shadow-md text-white font-semibold">
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

            </form>

          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

import React, {useState } from 'react'

// component
import DarkNavbar from "../layouts/darkNavbar";
// import {
//   IconCalendar,
//   IconListBullets,
//   IconLocation,
//   IconMap,
//   IconTicket,
//   IconX,
// } from "@irsyadadl/paranoid";
import LightNavbar from '../layouts/lightNavbar';
import MainLayout from '../Layouts/mainLayout';

export default function DetailEvent() {
    const [isOpen, setIsOpen] = useState(false);
    const [jumlahTiket, setJumlahTiket] = useState(1);
    const [jenisTiket, setJenisTiket] = useState<"umum" | "premium" | "vip" | "vvip">("umum");
    const [hargaTiket, setHargaTiket] = useState(50000);

    // Harga tiket berdasarkan jenis tiket
    const hargaTiketMap: { [key in "umum" | "premium" | "vip" | "vvip"]: number } = {
        umum: 50000,
        premium: 100000,
        vip: 150000,
        vvip: 200000,
    };

    // Menghitung total tagihan
    const totalTagihan = jumlahTiket * hargaTiket;

    // Menutup modal
    const closeModal = () => setIsOpen(false);

    // Membuka modal
    const openModal = () => setIsOpen(true);

    // Mengupdate harga ketika jenis tiket berubah
    const handleJenisTiketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTiket = e.target.value as "umum" | "premium" | "vip" | "vvip";
        setJenisTiket(selectedTiket);
        setHargaTiket(hargaTiketMap[selectedTiket]);
    };

    return (
        <MainLayout title="Detail EVENT" >
              <LightNavbar />

            <div className="bg-gray-100 dark:bg-black leading-normal tracking-normal">
                <div className="bg-gray-900 flex-wrap-reverse lg:flex-nowrap flex items-center text-white py-6 h-full lg:h-[70vh] md:pt-28 pt-20 lg:px-24 md:px-12 px-5">
                    <div className="container">
                        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">FESTIVAL GUNUNG SLAMET</h1>
                        <p className="md:mt-5 mt-3 md:text-base text-[12px] text-slate-200">
                            Acara ini akan menjadi salah satu festival budaya terbesar di Jawa Tengah, menghadirkan berbagai kegiatan seperti pentas seni, pameran kerajinan lokal, dan kuliner tradisional. Setiap pengunjung akan mendapatkan pengalaman unik dan mendalam tentang kebudayaan masyarakat sekitar Gunung Slamet. Ayo, jangan lewatkan kesempatan ini untuk merasakan kekayaan budaya Nusantara dan menjadi bagian dari sejarah!
                        </p>
                        {/* <div className="flex gap-5 mt-5 mb-10 md:text-base text-sm text-slate-200">
                            <span className="flex gap-2 items-center">
                                <IconTicket />
                                <small><b>Rp 5.000</b></small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconCalendar />
                                <small><b>12-14 Juli Des 2024</b></small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconLocation />
                                <small><b>Purbalingga</b></small>
                            </span>
                        </div> */}
                    </div>
                    <div className="flex justify-center w-full md:ml-3">
                        <img src="./images/events/FGS.jpeg" className='h-[200px] md:h-[300px] mb-5 w-[500px] lg:h-[400px] lg:max-w-[700px] rounded-md lg:w-full bg-cover' alt="Image event" />
                    </div>
                </div>

                <div className="container sm:px-6 px-2 md:justify-center flex-wrap lg:flex-nowrap relative mx-auto mt-10 flex justify-between">

                    <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 dark:border-gray-950 lg:mr-10 shadow-lg rounded-lg border-2">
                        <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Tentang Event</h2>
                        <div className="flex justify-center">
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9863932054423!2d109.28861627532027!3d-7.242386592763998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff3d3ffffffff%3A0x83d8dc79ac5a6a66!2sD&#39;Las%20Lembah%20Asri%20Serang%20Purbalingga!5e0!3m2!1sen!2sid!4v1727587481001!5m2!1sen!2sid"
                            loading="lazy"
                            className="bg-gray-300 w-[95%] sm:w-[90%] h-[250px] mt-5 rounded-md sm:h-[400px]"
                            ></iframe>
                        </div>

                        <div className="sm:text-base dark:text-white text-sm deskripsiFull leading-6 sm:leading-7 font-normal md:p-8 p-3">
                            <p>Festival Gunung Slamet 2024 menampilkan berbagai prosesi tradisi masyarakat sebagai bentuk rasa syukur terhadap melimpahnya hasil bumi. Acara ini diramaikan oleh penampilan musisi Aftershine dan Fiersa Besari. Selain keindahan alam, wisata budaya di Gunung Slamet menjadi daya tarik bagi pengunjung.</p>

                            <p>Festival ini diselenggarakan rutin oleh Dinas Pariwisata Purbalingga. Pada tahun ke-7 ini, acara digelar di D'Las Lembah Sari, Purbalingga, pada tanggal 12-14 Juli 2024. Festival ini juga menjadi salah satu dari 110 Karisma Event Nusantara (KEN) yang bertujuan mempromosikan pariwisata daerah dan mengenalkan ‘Seven Beauty’ Purbalingga.</p>

                            <p>Berbagai kegiatan menarik turut dihadirkan selama penyelenggaraan Festival Gunung Slamet 2024. Berikut beberapa rangkaian acara yang diadakan:</p>

                            <ol>
                                <li>
                                    <p><strong>Tradisi Pengambilan Air Tuk Sikopyah:</strong> Festival dimulai dengan prosesi pengambilan air dari mata air Tuk Sikopyah sebagai simbol kehidupan masyarakat di kaki Gunung Slamet. Air ini diambil menggunakan wadah bambu, didoakan oleh sesepuh desa, lalu dibawa ke balai desa dan kawasan wisata Lembah Asri.</p>
                                </li>
                                <li>
                                    <p><strong>Perang Tomat dan Gunungan Hasil Bumi:</strong> Sekitar 3 kuintal tomat disediakan untuk kegiatan perang tomat yang meriah. Selain itu, pengunjung juga dapat melihat gunungan hasil bumi yang melambangkan rasa syukur atas panen yang melimpah.</p>
                                </li>
                                <li>
                                    <p><strong>Gelar Kesenian Lingkar Gunung Slamet:</strong> Ajang bagi pelaku kesenian lokal dari daerah seperti Pemalang, Tegal, Brebes, dan Banyumas untuk menampilkan karya terbaiknya di hadapan wisatawan.</p>
                                </li>
                                <li>
                                    <p><strong>Pentas Seni Musik Kabut Lembut Gunung:</strong> Di hari ketiga festival, pengunjung dapat menikmati penampilan dari Dion Idol, Malaka Band, Fiersa Besari, Aftershine, Novi Sasmita, dan Rizki Mbambot.</p>
                                </li>
                                <li>
                                    <p><strong>Pameran UMKM dan Kuliner Lokal:</strong> Berbagai produk lokal seperti keripik daun strawberry, keripik daun waluh, dodol parijata, dan gula aren ditawarkan di stand UMKM, serta kerajinan tangan yang bisa dijadikan oleh-oleh.</p>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="w-full lg:w-[30%]  lg:sticky mt-10 lg:mt-0 lg:top-20">
                        <div className="bg-white dark:bg-gray-800 dark:border-gray-950 shadow-lg rounded-lg border-2">
                            <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Detail Tiket</h2>
                            <ul className="mb-4 sm:px-6 px-3 py-4">
                                <li className='flex mt-3 dark:text-white sm:mt-4 justify-between font-semibold'><span>Umum</span>Rp 50.000</li>
                                <li className='flex mt-3 dark:text-white sm:mt-4 justify-between font-semibold'><span>Premium</span>Rp 100.000</li>
                                <li className='flex mt-3 dark:text-white sm:mt-4 justify-between font-semibold'><span>VIP</span>Rp 150.000</li>
                                <li className='flex mt-3 dark:text-white sm:mt-4 justify-between font-semibold'><span>VVIP</span>Rp 200.000</li>
                            </ul>

                        </div>

                        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded" onClick={openModal}>Daftar</button>
                    </div>

                </div>


                <div className="container mx-auto mt-10 pb-10 px-6">
                    <h3 className="text-xl sm:text-2xl font-semibold sm:mb-4">Rekomendasi Event</h3>
                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/FGS.jpeg"
                            alt="image event"
                            className="object-cover h-full w-full"
                            data-aos-once="true"
                            data-aos="fade-left"
                            />
                        </div>
                        <div
                            className="lg:col-span-3"
                            data-aos-once="true"
                            data-aos="fade-right"
                        >
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"FESTIVAL GUNUNG SLAMET"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Acara ini akan menjadi salah satu festival budaya terbesar di Jawa Tengah, menghadirkan berbagai kegiatan seperti pentas seni, pameran kerajinan lokal, dan kuliner tradisional. Setiap pengunjung akan mendapatkan pengalaman unik dan mendalam tentang kebudayaan masyarakat sekitar Gunung Slamet. Ayo, jangan lewatkan kesempatan ini untuk merasakan kekayaan budaya Nusantara dan menjadi bagian dari sejarah!
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                <IconTicket />
                                <small>Rp 5.000</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconCalendar />
                                <small>12-14 Juli Des 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconLocation />
                                <small>Purbalingga</small>
                            </span>
                            </div>
                        </div>
                    </a>

                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10 ">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/KKS.jpg"
                            alt="image event"
                            className="object-cover h-full w-full"
                            data-aos-once="true"
                            data-aos="fade-left"
                            />
                        </div>
                        <div
                            className="lg:col-span-3"
                            data-aos-once="true"
                            data-aos="fade-right"
                        >
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"KARYA KREATIVE SERAYU 2024"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Karya Kreative Serayu 2024 akan menampilkan berbagai hasil karya kreatif dari seniman lokal dan nasional. Acara ini bertujuan untuk memperkenalkan seni dan budaya yang berkembang di sekitar wilayah Serayu, memberikan wadah bagi generasi muda untuk mengekspresikan kreativitas mereka. Jadilah bagian dari perayaan seni dan budaya ini, dengan berbagai kegiatan menarik seperti pameran seni, workshop, dan pertunjukan musik yang akan memanjakan para pengunjung.
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                <IconTicket />
                                <small>Gratis</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconCalendar />
                                <small>20-21 Juli 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconLocation />
                                <small>Kompleks Menara Pandang Teratai Purwokerto</small>
                            </span>
                            </div>
                        </div>
                    </a>


                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg shadow-lg w-[90%] md:w-1/2">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                                Daftar Event
                            </h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {/* Input Jumlah Tiket */}
                            <div className="mb-4">
                                <label
                                htmlFor="jumlahTiket"
                                className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                                Jumlah Tiket
                                </label>
                                <input
                                type="number"
                                id="jumlahTiket"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={jumlahTiket}
                                onChange={(e) => setJumlahTiket(Number(e.target.value))}
                                min="1"
                                />
                            </div>

                            {/* Select Jenis Tiket */}
                            <div className="mb-4">
                                <label
                                htmlFor="jenisTiket"
                                className="block text-gray-600 font-medium mb-2 text-sm sm:text-base">
                                Pilih Tiket
                                </label>

                                <select
                                id="jenisTiket"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={jenisTiket}
                                onChange={handleJenisTiketChange}
                                >
                                    <option value="umum">Umum - Rp 50.000</option>
                                    <option value="premium">Premium - Rp 100.000</option>
                                    <option value="vip">VIP - Rp 150.000</option>
                                    <option value="vvip">VVIP - Rp 200.000</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            {/* Jumlah Tagihan */}
                            <div className="text-base md:text-lg font-semibold text-gray-700">
                            Total Tagihan: Rp {totalTagihan.toLocaleString("id-ID")}
                            </div>

                            {/* Tombol Bayar */}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Bayar
                            </button>
                        </div>
                        </div>

                        {/* Close button */}
                        <button
                        className="absolute top-0 right-0 mt-4 mr-4"
                        onClick={closeModal}
                        >
                            <IconX className='text-gray-500 hover:text-gray-700'/>
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

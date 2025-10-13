import React from "react";
import MainLayout from "../Layouts/mainLayout";
import LightNavbar from "../layouts/lightNavbar";

const leaders = [
  {
    name: "Rifki Romadhan",
    title: "Pendiri & Pimpinan Sanggar",
    image: "/images/tentang kami/rifki.jpg",
    bio: "Dengan semangat pelestarian budaya, Mas Rifki mendirikan Sanggar Nusantara sebagai wadah bagi generasi muda untuk mencintai seni dan tradisi Indonesia.",
  },
  {
    name: "Ahmad Rian Syaifullah",
    title: "CTO",
    image: "/images/tentang kami/rian.jpg",
    bio: "Sebagai Chief Technology Officer, Rian berperan dalam mengembangkan dan mengimplementasikan solusi teknologi untuk mendukung kegiatan seni dan budaya di Sanggar Nusantara.",
  },
  {
    name: "Hermanto",
    title: "Koordinator Program Budaya",
    image: "/images/tentang kami/hermanto.webp",
    bio: "Berpengalaman dalam manajemen seni pertunjukan, Mas Hermanto berperan penting dalam menyusun program-program edukatif dan pertunjukan budaya.",
  },
  {
    name: "Muhammad Afif Taufiqulhakim",
    title: "Koordinator Divisi Pendidikan & Pelatihan",
    image: "/images/tentang kami/hakim.jpg",
    bio: "Fokus pada pengembangan kapasitas dan peningkatan kualitas sumber daya manusia, beliau berperan dalam merancang serta mengoordinasikan program pendidikan dan pelatihan yang berdampak nyata.",
  }
];


export default function TentangKami({user, cartCount}) {
  return (
    <MainLayout title="Tentang Kami | Sanggar Nusantara">
        <LightNavbar user={user} cartCount={cartCount} />

        <div className="lg:px-20 md:px-10 px-5 container mx-auto py-10 lg:py-28">
            <h1 className="text-4xl font-bold mb-4 text-center text-red-800">Tentang Kami</h1>
            <p className="text-lg text-gray-700 text-center mb-10">
                <strong>Sanggar Nusantara</strong> adalah sebuah komunitas seni yang berdedikasi untuk menjaga, mempromosikan, dan melestarikan kebudayaan Indonesia.
                Melalui seni tari, musik tradisional, pameran budaya, dan pelatihan generasi muda, kami berkomitmen menghidupkan kembali warisan budaya di tengah arus modernisasi.
            </p>

            <h2 className="text-2xl font-semibold text-center mb-6 text-red-700">Pimpinan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leaders.map((leader, idx) => (
                    <div
                    key={idx}
                    className={`bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center
                        ${idx === 3 ? "md:col-start-2" : ""}`}
                    >
                    <img
                        alt={leader.name}
                        src={leader.image ? `${leader.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                        onError={e => (e.currentTarget.src = "/images/NO IMAGE AVAILABLE.jpg")}
                        className="w-32 h-32 object-cover rounded-full mb-4 shadow-lg"
                    />
                    <h3 className="text-xl font-semibold text-red-800">{leader.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{leader.title}</p>
                    <p className="text-gray-600 text-sm">{leader.bio}</p>
                    </div>
                ))}
            </div>

        </div>
    </MainLayout>
  );
}

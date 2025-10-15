import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";

interface Challenge {
  id: number;
  title: string;
  slug: string;
  status: "premium" | "gratis";
  description: string;
  image: string | null;
  duration_days: number;
  nusantara_points: number;
}

interface Participant {
  id: number;
  status: "in_progres" | "completed" | "failed" | "rejected";
  uuid:string;
}

interface PageProps {
  user: any;
  cartCount: number;
  challenge: Challenge;
  participant: Participant | null;

}

export default function DetailChallenge() {
  const { user, cartCount, challenge, participant } = usePage<PageProps>().props;
  const { post } = useForm();

  const handleJoin = () => {
    post(`/ragam-challenge/${challenge.id}/join`);
  };

  const handleStop = () => {
    post(`/ragam-challenge/${challenge.id}/stop`);
  };


  const canJoin =
    user && (challenge.status === "gratis" || ["admin", "premium"].includes(user.role));

  const alreadyJoined = participant && participant.status === "in_progres";
  const completed = participant && participant.status === "completed";

  return (
    <MainLayout title={`${challenge.title} | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={cartCount} />

      <div className="py-20 px-4 lg:py-24 relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
          {/* Gambar */}
          <div className="relative">
            <img
              src={
                challenge.image
                  ? `/storage/${challenge.image}`
                  : "/images/NO IMAGE AVAILABLE.jpg"
              }
              alt={challenge.title}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
            />
            <span
              className={`absolute top-4 left-4 px-4 py-1 text-sm font-semibold rounded-full shadow-md ${
                challenge.status === "premium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {challenge.status.toUpperCase()}
            </span>
          </div>

          {/* Konten */}
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
              {challenge.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-justify">
              {challenge.description}
            </p>

            {/* Info Card */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 text-center">
                <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                  🪙 {challenge.nusantara_points}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Poin Nusantara</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
                <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                  ⏱️ {challenge.duration_days} Hari
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Durasi Challenge</p>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-10">
              {/* Kiri: tombol aksi utama */}
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                {!user ? (
                  <Link
                    href="/masuk"
                    className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all w-full sm:w-auto text-center"
                  >
                    Masuk untuk Ikuti Challenge
                  </Link>
                ) : alreadyJoined ? (
                  <>
                    <Link
                      href={`/ragam-challenge/${challenge.slug}/progres/${participant.uuid}`}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all w-full sm:w-auto text-center"
                    >
                      Lihat Progres
                    </Link>
                    <button
                      onClick={handleStop}
                      className="bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-700 transition-all w-full sm:w-auto"
                    >
                      Hentikan Challenge
                    </button>
                  </>
                ) : completed ? (
                  <>
                    <Link
                      href={`/ragam-challenge/${challenge.slug}/progres/${participant.uuid}`}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all w-full sm:w-auto text-center"
                    >
                      Lihat Progres
                    </Link>

                    <button
                        onClick={handleJoin}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all w-full sm:w-auto cursor-pointer"
                    >
                        Ikuti Challenge Lagi
                    </button>
                  </>
                ) : canJoin ? (
                  <button
                    onClick={handleJoin}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all w-full sm:w-auto cursor-pointer"
                  >
                    Ikuti Challenge
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg font-semibold cursor-not-allowed w-full sm:w-auto"
                  >
                    Hanya untuk Member Premium
                  </button>
                )}
              </div>

              {/* Kanan: tombol kembali */}
              <div className="flex justify-end w-full md:w-auto">
                <Link
                  href="/ragam-challenge"
                  className="inline-block bg-gray-100 dark:bg-gray-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center w-full md:w-auto"
                >
                  ← Kembali ke Daftar Challenge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

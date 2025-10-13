import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "../../Layouts/mainLayout";
import LightNavbar from "../../layouts/lightNavbar";

interface Progres {
  id: number;
  day_number: number;
  image_bukti: string | null;
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  created_at: string;
}

interface PageProps {
  user: any;
  participant: any;
  progres: Progres[];
  uploadedToday: boolean;
  expired: boolean;
}

export default function ChallengeProgres({
  user,
  participant,
  progres,
  uploadedToday,
  expired,
}: PageProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image_bukti", imageFile);
    formData.append("challenge_participant_id", participant.id.toString());

    router.post(`/ragam-challenge/${participant.id}/progres`, formData, {
      onFinish: () => setIsUploading(false),
      onSuccess: () => {
        setPreview(null);
        setImageFile(null);
      },
    });
  };

  return (
    <MainLayout title={`Progres ${participant.challenge.title} | Sanggar Nusantara`}>
      <LightNavbar user={user} cartCount={0} />

      <div className="px-4 py-20 lg:pt-28 lg:pb-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 transition-all duration-300">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Progres Challenge: {participant.challenge.title}
          </h1>

          {/* Kondisi challenge aktif */}
          {participant.status === "in_progres" ? (
            <div className="mb-8">
              {expired ? (
                <div className="p-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg mb-5">
                  Challenge sudah berakhir. Kamu tidak bisa mengunggah progres lagi.
                </div>
              ) : uploadedToday ? (
                <div className="p-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg mb-5">
                  Kamu sudah mengunggah progres hari ini. Silakan lanjutkan besok.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileChange(e.dataTransfer.files[0]);
                    }
                  }}
                  className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                >
                  <label
                    htmlFor="dropzone"
                    className="flex flex-col items-center justify-center w-full h-48 cursor-pointer"
                    onClick={() => document.getElementById("dropzone")?.click()}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-contain h-full rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                        <svg
                          className="w-10 h-10 mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115 8h1a3 3 0 110 6h-1"
                          />
                        </svg>
                        <p className="text-sm">Klik atau seret foto ke sini</p>
                      </div>
                    )}
                  </label>

                  <input
                    id="dropzone"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  <button
                    type="submit"
                    disabled={isUploading || !imageFile}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                  >
                    {isUploading ? "Mengunggah..." : "Kirim Bukti Hari Ini"}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg mb-10">
              Challenge sudah selesai atau tidak aktif.
            </div>
          )}

          {/* Daftar progres */}
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Progres Challenge ({progres.length}/{participant.challenge.duration_days})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {Array.from({ length: participant.challenge.duration_days }).map((_, index) => {
              const dayNumber = index + 1;
              const today = new Date();
              const startDate = new Date(participant.started_at);
              const currentDay =
                Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

              const progresItem = progres.find(
                (p) => Number(p.day_number) === Number(dayNumber)
              );
              const isToday = currentDay === dayNumber;
              const isFuture = dayNumber > currentDay;

              // Warna dasar card
              let cardColor =
                "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600";
              if (progresItem) {
                cardColor =
                  progresItem.status === "approved"
                    ? "bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-700"
                    : progresItem.status === "pending"
                    ? "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-700"
                    : "bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-700";
              } else if (isToday) {
                cardColor =
                  "bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-700";
              } else if (isFuture) {
                cardColor =
                  "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70";
              } else {
                cardColor =
                  "bg-red-50 dark:bg-red-900/40 border-red-300 dark:border-red-700";
              }

              return (
                <div
                  key={dayNumber}
                  className={`border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ${cardColor}`}
                >
                  {/* Gambar atau Placeholder */}
                  {progresItem ? (
                    <img
                      src={
                        progresItem.image_bukti
                          ? `/storage/${progresItem.image_bukti}`
                          : "/images/NO IMAGE AVAILABLE.jpg"
                      }
                      alt={`Hari ${dayNumber}`}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex flex-col justify-center items-center h-48 ${
                        isFuture
                          ? "text-gray-400"
                          : isToday
                          ? "text-blue-500"
                          : "text-red-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {isFuture ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        ) : isToday ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        )}
                      </svg>
                      <p className="text-sm font-medium">
                        {isFuture
                          ? "Belum waktunya"
                          : isToday
                          ? "Hari ini"
                          : "Terlewat"}
                      </p>
                    </div>
                  )}

                  {/* Detail */}
                  <div className="p-3 text-sm">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      Hari ke-{dayNumber}
                    </p>
                    {progresItem ? (
                      <>
                        <p
                          className={`mt-1 text-xs font-medium ${
                            progresItem.status === "approved"
                              ? "text-green-600 dark:text-green-400"
                              : progresItem.status === "pending"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          Status: {progresItem.status}
                        </p>
                        {progresItem.admin_note && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Catatan Admin: {progresItem.admin_note}
                          </p>
                        )}
                      </>
                    ) : isToday ? (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                        Belum ada unggahan hari ini
                      </p>
                    ) : isFuture ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Belum waktunya
                      </p>
                    ) : (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        Tidak diunggah
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all w-full md:w-auto"
          >
            ← Kembali
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

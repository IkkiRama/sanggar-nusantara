import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ProfileLayout from '../../Layouts/profileLayout';
import { Clock, Award, CalendarCheck, Lock } from 'lucide-react';
import formatTanggal from '../../Utils/formatTanggal';
import { toast } from 'react-toastify';
import LightNavbar from '../../layouts/lightNavbar';
import UserProfile from '../../Components/userProfile';

export default function KuisNusantara({ user, role, nusantaraPoints, cartCount, quizzes }) {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!user) {
            window.location.href = '/masuk';
        } else {
            setIsChecking(false);
        }
    }, [user]);

    if (isChecking) {
        return (
            <div className="flex justify-center h-screen items-center text-center text-red-500 text-xl font-semibold">
                Memeriksa akses...
            </div>
        );
    }

    // =======================
    // HANDLER BUTTON TERPISAH
    // =======================
    const handleStartQuiz = (uuid) => {
        router.visit(`/kuis-nusantara/mulai/${uuid}`);
    };

    const handleViewResult = (quizUUID, attemptUUID) => {
        router.visit(`/kuis-nusantara/lihat/${quizUUID}/${attemptUUID}`);
    };

    const handlePremiumLocked = () => {
        toast.error("Kuis ini hanya tersedia untuk member premium!");
    };

    const handleUnavailable = () => {
        toast.info("Kuis ini belum aktif atau sudah berakhir.");
    };

    const renderActionButton = (quiz, isAvailable) => {
        const hasAttempt = !!quiz.attempt;
        const attemptUUID = quiz.attempt?.uuid || '';

        // PREMIUM LOCK
        if (quiz.is_premium && role !== 'premium' && role !== 'super_admin') {
            return (
                <button
                    onClick={handlePremiumLocked}
                    className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md font-semibold cursor-not-allowed flex items-center gap-2"
                >
                    <Lock className="w-4 h-4" /> Premium
                </button>
            );
        }

        // SUDAH PERNAH COBA
        if (hasAttempt) {
            return (
                <button
                    onClick={() => handleViewResult(quiz.uuid, attemptUUID)}
                    className="px-4 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white text-sm rounded-md font-semibold"
                >
                    Lihat Hasil
                </button>
            );
        }

        // BELUM MULAI / SUDAH BERAKHIR
        if (!isAvailable) {
            return (
                <button
                    onClick={handleUnavailable}
                    className="px-4 py-2 bg-gray-400 text-white text-sm rounded-md font-semibold cursor-not-allowed"
                    disabled
                >
                    Belum Tersedia
                </button>
            );
        }

        // SIAP DIMAINKAN
        return (
            <button
                onClick={() => handleStartQuiz(quiz.uuid)}
                className="px-4 py-2 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-md font-semibold"
            >
                Mulai Kuis
            </button>
        );
    };

    return (
        <ProfileLayout title={`Kuis Nusantara | Sanggar Nusantara`}>
            <Head title="Kuis Nusantara" />

            <LightNavbar user={user} cartCount={cartCount} />
            <div className="bg-blue-500 h-[30vh]"></div>

            <div className="lg:-mt-[10vh] -mt-[30vh] pb-20 px-4 min-h-screen">
                <div className="flex flex-wrap gap-5 lg:flex-nowrap container mx-auto">

                    <UserProfile isActive="kuis-nusantara" user={user} role={role} nusantaraPoints={nusantaraPoints} />

                    <div className="p-5 md:mt-0 mt-40 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%] table-scroll">
                        <div className="bg-amber-500 text-white p-4 rounded-lg mb-4">
                            <h2 className="text-lg lg:text-2xl mb-2 font-semibold">Kuis Nusantara</h2>
                            <p className="lg:text-md">
                                Uji pengetahuanmu tentang budaya, sejarah, dan warisan Nusantara. Kumpulkan poin dan jadilah Sang Penjaga Budaya!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz, index) => {
                                    const now = new Date();
                                    const start = quiz.start_at ? new Date(quiz.start_at) : null;
                                    const end = quiz.end_at ? new Date(quiz.end_at) : null;
                                    const isAvailable =
                                        (!start || now >= start) && (!end || now <= end);

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                        >
                                            <div className="flex gap-4 w-full">

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg line-clamp-2">{quiz.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                        {quiz.description}
                                                    </p>

                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{quiz.duration_minutes} menit</span>
                                                        </div>

                                                        {quiz.start_at && (
                                                            <div className="flex items-center gap-1">
                                                                <CalendarCheck className="w-4 h-4" />
                                                                <span>
                                                                    {formatTanggal(quiz.start_at)} - {formatTanggal(quiz.end_at)}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {quiz.is_premium && (
                                                            <div className="flex items-center gap-1 text-yellow-500 font-medium">
                                                                <Lock className="w-4 h-4" />
                                                                <span>Premium</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {quiz.attempt && (
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <Award className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm text-green-700 font-semibold">
                                                                Skor: {quiz.attempt.score}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-2 md:mt-0">
                                                {renderActionButton(quiz, isAvailable)}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="mt-16 flex justify-center items-center flex-col">
                                    <img
                                        src="/images/kosong.svg"
                                        className="lg:w-[10%] w-[25%] h-[30%]"
                                        alt="kosong"
                                    />
                                    <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500">
                                        Belum Ada Kuis
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}

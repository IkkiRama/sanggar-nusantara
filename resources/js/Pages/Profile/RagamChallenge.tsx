import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ProfileLayout from '../../Layouts/profileLayout';
import { LucideCalendarDays, CheckCircle, Clock, Award } from 'lucide-react';
import formatTanggal from '../../Utils/formatTanggal';
import { toast } from 'react-toastify';
import toCapitalize from '../../Utils/toCapitalize';
import LightNavbar from '../../layouts/lightNavbar';
import UserProfile from '../../Components/userProfile';

export default function RagamChallenge({ user, role, nusantaraPoints, cartCount, challenges }) {
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

    const handleAction = (slug, uuid) => {
        router.visit(`/ragam-challenge/${slug}/progres/${uuid}`);
    };

    return (
        <ProfileLayout title={`Ragam Challenge | Sanggar Nusantara`}>
            <Head title="Ragam Challenge" />

            <LightNavbar user={user} cartCount={cartCount} />
            <div className="bg-blue-500 h-[30vh]"></div>

            <div className="lg:-mt-[10vh] -mt-[30vh] pb-20 px-4 min-h-screen">
                <div className="flex flex-wrap gap-5 lg:flex-nowrap container mx-auto">

                    <UserProfile isActive="ragam-challenge" user={user} role={role} nusantaraPoints={nusantaraPoints} />

                    <div className="p-5 md:mt-0 mt-40 relative overflow-x-auto bg-white shadow-[0_0.6rem_1.3rem_rgba(0,0,0,0.1)] rounded-xl w-full lg:w-[75%] table-scroll">
                        <div className="bg-indigo-500 text-white p-4 rounded-lg mb-4">
                            <h2 className="text-lg lg:text-2xl mb-2 font-semibold">Ragam Challenge Nusantara</h2>
                            <p className="lg:text-md">Ikuti berbagai tantangan budaya Nusantara, kumpulkan poin, dan buktikan konsistensimu menjaga tradisi!</p>
                        </div>

                        <div className="space-y-4">
                            {challenges.length > 0 ? (
                                challenges.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex gap-4 w-full">
                                            <img
                                                src={item.image ? `/storage/${item.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                                                alt={item.title}
                                                className="w-28 h-28 object-cover rounded-md border border-gray-300 flex-shrink-0"
                                            />

                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>

                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <LucideCalendarDays className="w-4 h-4" />
                                                        <span>{item.duration_days} Hari</span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <Award className="w-4 h-4 text-amber-500" />
                                                        <span>{item.nusantara_points} Poin</span>
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs md:text-sm font-semibold ${
                                                            item.status === 'completed'
                                                                ? 'bg-green-200 text-green-600'
                                                                : item.status === 'in_progres'
                                                                ? 'bg-blue-200 text-blue-600'
                                                                : item.status === 'failed' ||
                                                                    item.status === 'rejected'
                                                                ? 'bg-red-200 text-red-600'
                                                                : 'bg-gray-200 text-gray-600'
                                                        }`}
                                                    >
                                                        {toCapitalize(
                                                            item.status === "in_progres" ?
                                                            "In Progres" : item.status
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-2 md:mt-0">
                                            {item.status === 'in_progres' ? (
                                                <Link
                                                    href={`/ragam-challenge/${item.slug}/progres/${item.uuid}`}
                                                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md font-semibold hover:bg-blue-600 cursor-pointer text-center"
                                                >
                                                    Lanjutkan
                                                </Link>
                                            ) : item.status === 'completed' ? (
                                                <Link
                                                    href={`/ragam-challenge/${item.slug}/progres/${item.uuid} `}
                                                    className="px-4 py-2 bg-green-500 text-white text-sm rounded-md font-semibold cursor-pointer text-center"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            ) : item.status === 'failed' || item.status === 'rejected' ? (
                                                <Link
                                                    href={`/ragam-challenge/${item.slug}/progres/${item.uuid}`}
                                                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-md font-semibold cursor-pointer text-center"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/ragam-challenge/${item.slug}/progres/${item.uuid}`}
                                                    className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-md font-semibold hover:bg-yellow-600 cursor-pointer text-center"
                                                >
                                                    Mulai Challenge
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="mt-16 flex justify-center items-center flex-col">
                                    <img src="/images/kosong.svg" className="lg:w-[10%] w-[25%] h-[30%]" alt="kosong" />
                                    <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-5 lg:mt-8 text-red-500">Belum Ada Challenge</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}

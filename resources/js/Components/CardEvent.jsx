import { Link } from '@inertiajs/react'
import { MapPin } from 'lucide-react'
import React from 'react'
import { FaCalendar } from 'react-icons/fa';

const CardEvent = (event) => {
  return (
    <Link href={`/event/${event.slug}`} className="bg-white rounded-lg shadow-sm">
        <img
        src={event.image ? `./storage/${event.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
        alt={event.nama}
        className="w-full h-[200px] md:h-[300px] object-cover rounded-lg mb-8"
        />
        <h2 className="px-4 text-lg font-bold mb-2 text-slate-800">{event.nama}</h2>

        <p className="px-4 text-gray-700 lg:text-base md:text-sm text-[12px] line-clamp-3">{event.excerpt}</p>

        <h3 className="px-4 text-lg font-bold mt-2 text-red-500 blinker z-1">
            {event.harga_terendah ? `Rp ${event.harga_terendah.toLocaleString('id-ID')}` : 'Gratis'}
        </h3>

        <div className="mt-3 md:flex gap-5 px-4 pb-4">
            <p className="w-[70%] flex md:mb-0 mb-2 gap-2 text-gray-600 items-center">
                <MapPin className="w-[25px] h-[25px]" />
                <span className="line-clamp-2 text-sm">{event.tempat}</span>
            </p>
            <p className="w-[30%] flex gap-2 text-sm text-gray-600 items-center">
                <FaCalendar className="w-[20px] h-[20px]" />
                <span className="line-clamp-2 text-sm">{changeDate(new Date(event.tanggal))}</span>
            </p>
        </div>
        <div className={`p-5 rounded-b-lg text-center ${event.status === "Event Sudah Berakhir" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}`}>
        <p className="text-capitalize lg:text-base md:text-sm text-[12px] font-semibold">{event.status}</p>
        </div>
    </Link>
  )
}

export default CardEvent

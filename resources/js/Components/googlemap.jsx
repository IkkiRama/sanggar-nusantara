import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { FaHome, FaLanguage, FaTheaterMasks, FaTimes } from 'react-icons/fa';
import { MdOutlinePiano } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";
import { FaBowlFood, FaMapLocation } from "react-icons/fa6";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: -0.7893,
  lng: 113.9213,
};

function MyComponent({foods, alatMusik, rumahAdat, laguDaerah, bahasaDaerah, seniTari}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBKDtW47ZKzT5JPduQvi3gUFNHNZmXk-FU",
  });

  const [selectedMarker, setSelectedMarker] = useState("");
  const [jenis, setJenis] = useState("bahasa");
  const [modalOpen, setModalOpen] = useState(false);

  return isLoaded ? (
    <>
    {/* <div className="flex justify-center items-center mb-5 overflow-x-auto">
      <div onClick={()=> setJenis("Tarian")} className={`font-semibold text-sm sm:text-base py-2 px-8 cursor-pointer flex justify-center items-center sm:py-2 sm:px-12 rounded-md hover:text-white hover:bg-indigo-500 ${jenis === "Tarian" ? 'bg-indigo-500 text-white' : 'bg-slate-300'} `}>
        <p>Tarian</p>
      </div>

      <div onClick={()=> setJenis("Makanan")} className={`font-semibold text-sm sm:text-base py-2 px-8 cursor-pointer ml-5 flex justify-center items-center sm:py-2 sm:px-12 rounded-md hover:text-white hover:bg-indigo-500 ${jenis === "Makanan" ? 'bg-indigo-500 text-white' : 'bg-slate-300'} `}>
        <p>Makanan</p>
      </div>
    </div> */}

        <div className="grid md:grid-cols-3 grid-cols-2 gap-7 px-4 lg:px-10 pb-10">
            <button onClick={()=> setJenis("bahasa")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-red-500 hover:bg-red-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "bahasa" ? 'bg-red-500 text-white' : ''}`}>
                <FaLanguage className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">BAHASA</h6>
            </button>

            <button onClick={()=> setJenis("alat musik")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-indigo-500 hover:bg-indigo-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "alat musik" ? 'bg-indigo-500 text-white' : ''}`}>
                <MdOutlinePiano className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">ALAT MUSIK</h6>
            </button>

            <button onClick={()=> setJenis("rumah adat")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-emerald-500 hover:bg-emerald-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "rumah adat" ? 'bg-emerald-500 text-white' : ''}`}>
                <FaHome className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">RUMAH ADAT</h6>
            </button>

            <button onClick={()=> setJenis("seni tari")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-yellow-500 hover:bg-yellow-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "seni tari" ? 'bg-yellow-500 text-white' : ''}`}>
                <FaTheaterMasks className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">SENI TARI</h6>
            </button>

            <button onClick={()=> setJenis("lagu daerah")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-purple-500 hover:bg-purple-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "lagu daerah" ? 'bg-purple-500 text-white' : ''}`}>
                <GiMusicalScore className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">LAGU DAERAH</h6>
            </button>

            <button onClick={()=> setJenis("makanan")} className={`shadow py-4 px-2 text-center rounded border-b-4 border-orange-500 hover:bg-orange-500 hover:text-white duration-500 cursor-pointer dark:text-gray-200 ${jenis === "makanan" ? 'bg-orange-500 text-white' : ''}`}>
                <FaBowlFood className="mx-auto" size={30} />
                <h6 className="mt-3 md:text-base text-sm">MAKANAN KHAS</h6>
            </button>
        </div>

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={{
                disableDefaultUI: true,
                keyboardShortcuts: false,
            }}
            zoom={6}
        >
        <>
            {jenis === "bahasa" && (
                bahasaDaerah.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            //   url: `./images/mapMarker/${marker.image}`,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {jenis === "alat musik" && (
                alatMusik.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            //   url: `./images/mapMarker/${marker.image}`,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {jenis === "rumah adat" && (
                rumahAdat.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            //   url: `./images/mapMarker/${marker.image}`,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {jenis === "seni tari" && (
                seniTari.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            //   url: `./images/mapMarker/${marker.image}`,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {jenis === "lagu daerah" && (
                laguDaerah.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            //   url: `./images/mapMarker/${marker.image}`,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {jenis === "makanan" && (
                foods.map((marker, i) => (
                    <Marker
                        key={i}
                        position={{
                            lat: parseFloat(marker.lat),
                            lng: parseFloat(marker.lng),
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: marker.image ? `./storage/${marker.image}` : "/images/NO IMAGE AVAILABLE.jpg",
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
                        }}
                        animation={"BOUNCE"}
                    />
                ))
            )}

            {selectedMarker ? (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedMarker.lat),
                        lng: parseFloat(selectedMarker.lng),
                    }}
                    clickable={true}
                    onCloseClick={() => setSelectedMarker("")}
                >
                    <div className="bg-white rounded text-center">
                    <img
                        src={(selectedMarker.image ? `./storage/${selectedMarker.image}` : "/images/NO IMAGE AVAILABLE.jpg")}
                        width={200}
                        height={200}
                        className="object-cover"
                    />
                    <h1 className="font-bold text-xl text-gray-800 mt-3">
                        {selectedMarker.nama}
                    </h1>
                    <small className="text-gray-600">{selectedMarker.asal}</small>
                    <br />

                    {jenis == "bahasa" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-red-500 inline-block cursor-pointer text-white hover:bg-red-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    {jenis == "makanan" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-orange-500 inline-block cursor-pointer text-white hover:bg-orange-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    {jenis == "lagu daerah" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-purple-500 inline-block cursor-pointer text-white hover:bg-purple-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    {jenis == "alat musik" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-indigo-500 inline-block cursor-pointer text-white hover:bg-indigo-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    {jenis == "rumah adat" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-emerald-500 inline-block cursor-pointer text-white hover:bg-emerald-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    {jenis == "seni tari" && (
                        <button
                            onClick={()=> setModalOpen(true)}
                            className="bg-yellow-500 inline-block cursor-pointer text-white hover:bg-yellow-400 rounded px-8 py-2 mt-5"
                        >
                        Lihat Detail
                        </button>
                    )}

                    </div>
                </InfoWindow>
            ) : (
            ""
            )}
        </>
        </GoogleMap>

        {modalOpen && jenis === "bahasa" && (
            <section className="fixed inset-0 bg-black/40 backdrop-blur-lg z-9999999999 flex items-center justify-center lg:py-[10%]">
                <div className="bg-white overflow-y-auto max-h-screen lg:p-6 p-4 dark:bg-gray-950 md:w-[60%] w-[95%] md:mx-0 mx-auto rounded relative">
                {/* Tombol Tutup Modal */}
                    <button
                        className="cursor-pointer absolute right-0 top-0 m-5 dark:text-gray-200 hover:!text-red-500"
                        onClick={() => setModalOpen(false)}
                    >
                        <FaTimes />
                    </button>


                    {/* Konten Modal */}
                    <h1 className="text-2xl font-bold dark:text-gray-200">{selectedMarker.nama}</h1>
                    <p className="text-sm dark:text-gray-400">Kategori: {selectedMarker.kategori}</p>
                    <hr className="my-3 border-gray-400" />

                    <img
                        src={selectedMarker.image ? `../storage/${selectedMarker.image}` : "/images/NO IMAGE AVAILABLE.jpg"}
                        className="rounded h-[200px] lg:h-[400px] object-cover w-full bg-gray-300"
                        alt={selectedMarker.nama}
                    />

                    <div>
                        {/* Deskripsi */}
                        <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                            <b>Deskripsi:</b> <br />
                            <span className="text-base text-slate-600">
                                {selectedMarker.deskripsi}
                            </span>
                        </p>

                        <p className="md:text-lg text-slate-700 text-[13px] mt-5 dark:text-gray-300">
                            <b>Jumlah Penutur:</b> {selectedMarker.jumlah_penutur.toLocaleString("id-ID")}
                        </p>

                        <hr className="my-5 border-gray-400" />
                        <p className="flex gap-2 items-center text-gray-700 dark:text-gray-400 text-sm">
                            <FaMapLocation />
                            {selectedMarker.asal}
                        </p>
                    </div>
                </div>
            </section>
        )}
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: -0.7893,
  lng: 113.9213,
};

const dataMarkerTarian = [
  {
    title: "Tari Saman",
    from: "Nanggoroe Aceh Darussalam",
    image: "tariSaman.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(4.571568),
      lng: parseFloat(96.357198),
    },
  },
  {
    title: "Tari Tor-tor",
    from: "Sumatra Utara",
    image: "tariTorTor.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(2.5960115),
      lng: parseFloat(98.7263639),
    },
  },
  {
    title: "Tari Erai-erai",
    from: "Sumatra Selatan",
    image: "tariEraiErai.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-3.1328995),
      lng: parseFloat(104.0944384),
    },
  },
  {
    title: "Tari Tempurung",
    from: "Sumatra Barat",
    image: "tariTempurung.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-0.8301458),
      lng: parseFloat(100.5752503),
    },
  },
  {
    title: "Tari Andun",
    from: "Bengkulu",
    image: "tariAndun.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-3.8251707),
      lng: parseFloat(102.2221773),
    },
  },
  {
    title: "Tari Persembahan",
    from: "Riau",
    image: "tariPersembahan.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(0.9009377),
      lng: parseFloat(100.5995738),
    },
  },
  {
    title: "Tari Malemang",
    from: "Kepulauan Riau",
    image: "tariMalemang.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(0.7473033),
      lng: parseFloat(104.2145685),
    },
  },
  {
    title: "Tari Sekapur Sirih",
    from: "Jambi",
    image: "tariSekapurSirih.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-1.61035),
      lng: parseFloat(103.5683288),
    },
  },
  {
    title: "Tari Bedana",
    from: "Lampung",
    image: "tariBedana.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-5.4284031),
      lng: parseFloat(105.1850741),
    },
  },
  {
    title: "Tari Campak",
    from: "Bangka Belitung",
    image: "tariCampak.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-2.5312357),
      lng: parseFloat(105.9405545),
    },
  },

  //
  {
    title: "Tari Zapin",
    from: "Kalimantan Barat",
    image: "tariZapin.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-0.1026843),
      lng: parseFloat(110.7818359),
    },
  },
  {
    title: "Tari Jepen",
    from: "Kalimantan Timur",
    image: "tariJepen.jpeg",
    type: "tarian",
    longlat: {
      lat: parseFloat(0.8000546),
      lng: parseFloat(116.4736797),
    },
  },
  {
    title: "Tari Dadap",
    from: "Kalimantan Selatan",
    image: "tariDadap.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-2.9251287),
      lng: parseFloat(115.3370722),
    },
  },
  {
    title: "Tari Manasai",
    from: "Kalimantan Tengah",
    image: "tariManasai.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-1.4829035),
      lng: parseFloat(113.474118),
    },
  },
  {
    title: "Tari Lalatip",
    from: "Kalimantan Utara",
    image: "tariLalatip.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(3.1091935),
      lng: parseFloat(116.1271644),
    },
  },

  {
    title: "Tari Jaipong",
    from: "Jawa Barat",
    image: "tariJaipong.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-6.661622),
      lng: parseFloat(108.3667111),
    },
  },
  {
    title: "Tari Topeng Betawi",
    from: "DKI Jakarta",
    image: "taritopengbetawi.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-6.1416449),
      lng: parseFloat(106.7519056),
    },
  },
  {
    title: "Tari Serimpi Banten",
    from: "Banten",
    image: "tariSerimpibanten.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-6.425414),
      lng: parseFloat(106.0808663),
    },
  },
  {
    title: "Tari Bedhaya",
    from: "Jawa Tengah",
    image: "tariBedhaya.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-7.1620738),
      lng: parseFloat(110.0656186),
    },
  },
  {
    title: "Tari Legong",
    from: "Bali",
    image: "tariLegong.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-8.3540217),
      lng: parseFloat(115.0805652),
    },
  },
  {
    title: "Tari Pasola",
    from: "Nusa Tenggara Timur",
    image: "tariPasola.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-8.4987155),
      lng: parseFloat(120.7508291),
    },
  },
  {
    title: "Tari Kabasaran",
    from: "Gorontalo",
    image: "tariKabasaran.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(0.5428127),
      lng: parseFloat(123.0555312),
    },
  },
  {
    title: "Tari Saman",
    from: "Sulawesi Selatan",
    image: "tariSaman.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-3.7430496),
      lng: parseFloat(119.9004764),
    },
  },
  {
    title: "Tari Tifa",
    from: "Maluku",
    image: "tariTifa.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-3.0270832),
      lng: parseFloat(128.6400625),
    },
  },
  {
    title: "Tari Yamko Rambe",
    from: "Papua Barat",
    image: "tariYamkorambe.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-1.3525803),
      lng: parseFloat(133.2311857),
    },
  },
  {
    title: "Tari Sajojo",
    from: "Papua",
    image: "tariSajojo.jpg",
    type: "tarian",
    longlat: {
      lat: parseFloat(-3.5510786),
      lng: parseFloat(138.2541689),
    },
  },
];

const dataMarkerMakanan = [
  {
    title: "Makanan Sagu Lempeng",
    from: "Papua",
    image: "makananSagulempeng.jpg",
    type: "makanan",
    longlat: {
      lat: parseFloat(-3.1770942),
      lng: parseFloat(136.2786475),
    },
  },
  {
    title: "Makanan Karedok",
    from: "Jawa Barat",
    image: "makananKaredok.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-7.087537156984174),
      lng: parseFloat(107.67009018624591),
    },
  },
  {
    title: "Makanan Ketan Srikaya",
    from: "Balikpapan",
    image: "makananKetansrikayabalikpapan.jpeg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-1.2372341494899792),
      lng: parseFloat(116.85161721484499),
    },
  },
  {
    title: "Makanan Lontong Balap",
    from: "Surabaya",
    image: "makananLontongbalap.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-7.257562045119448),
      lng: parseFloat(112.75731155670935),
    },
  },
  {
    title: "Makanan Pallu Basa",
    from: "Makasar",
    image: "makananPallubasa.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-5.161835488233071),
      lng: parseFloat(119.43635484207643),
    },
  },
  {
    title: "Makanan Papeda",
    from: "Papua, Maluku",
    image: "makananPapeda.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-3.238299001467056),
      lng: parseFloat(130.14514758957023),
    },
  },
  {
    title: "Makanan Papeda",
    from: "Papua, Maluku",
    image: "makananPapeda.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-4.24561954044678),
      lng: parseFloat(138.0125807044555),
    },
  },
  {
    title: "Makanan Pempek",
    from: "Palembang",
    image: "makananPempek.jpeg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-2.975537283507079),
      lng: parseFloat(104.76742356634045),
    },
  },
  {
    title: "Makanan Sate Padang",
    from: "Padang Panjang",
    image: "makananSatepadang.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-0.46633632626849936),
      lng: parseFloat(100.39887560896155),
    },
  },
  {
    title: "Makanan Tinutuan",
    from: "Manado",
    image: "makananTinutuan.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(1.4748650368589118),
      lng: parseFloat(124.8427728562918),
    },
  },
  {
    title: "Makanan Mie Aceh",
    from: "Aceh",
    image: "mieaceh.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(4.6953884249521),
      lng: parseFloat(96.74980796240025),
    },
  },
  {
    title: "Makanan Bika Ambon",
    from: "Medan",
    image: "BikaAmbon.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(3.5929315093427716),
      lng: parseFloat(98.6626102293373),
    },
  },
  {
    title: "Makanan Rendang",
    from: "Minangkabau",
    image: "Rendang.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-0.7292205429411924),
      lng: parseFloat(100.74622656118805),
    },
  },
  {
    title: "Makanan Gulai Belacan",
    from: "Riau",
    image: "GulaiBelacan.jpeg",
    type: "makanan",
    longlat: {

      lat: parseFloat(0.29557080532370605),
      lng: parseFloat(101.70492929401004),
    },
  },
  {
    title: "Makanan Rujak Cingur",
    from: "Surabaya",
    image: "RujakCingur.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-7.272546970145737),
      lng: parseFloat(112.69517014062417),
    },
  },
  {
    title: "Makanan Sate Bandeng",
    from: "Banten",
    image: "SateBandeng.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-6.4019851311123706),
      lng: parseFloat(106.0605861097671),
    },
  },
  {
    title: "Makanan Tempoyak Ikan Patin",
    from: "Jambi",
    image: "TempoyakIkanPatin.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-1.461415412895813),
      lng: parseFloat(102.48971264530955),
    },
  },
  {
    title: "Makanan Pendap",
    from: "Bengkulu",
    image: "Pendap.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-3.7910854885699496),
      lng: parseFloat(102.26165923126008),
    },
  },
  {
    title: "Makanan Seruit",
    from: "Lampung",
    image: "Seruit.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-4.561686966037032),
      lng: parseFloat(105.37428588867719),
    },
  },
  {
    title: "Makanan Mie Bangka",
    from: "Bangka Belitung",
    image: "MieBangka.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-2.7235223593352296),
      lng: parseFloat(106.38234439322473),
    },
  },
  {
    title: "Makanan Mie Lendir",
    from: "Kepulauan Riau",
    image: "MieLendir.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(1.1306097275647806),
      lng: parseFloat(104.05253236952767),
    },
  },
  {
    title: "Makanan Nasi Gudeg",
    from: "Daerah Istimewa Yogyakarta",
    image: "NasiGudeg.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-7.799453051532465),
      lng: parseFloat(110.37478137966524),
    },
  },
  {
    title: "Makanan Ayam Taliwang",
    from: "Nusa Tenggara Barat",
    image: "AyamTaliwang.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-8.636189315517225),
      lng: parseFloat(117.37402522510114),
    },
  },
  {
    title: "Makanan Jagung Bose",
    from: "Nusa Tenggara Timur",
    image: "JagungBose.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-8.625153089790473),
      lng: parseFloat(121.12090567730348),
    },
  },
  {
    title: "Makanan Bubur Pedas",
    from: "Kalimantan Barat",
    image: "BuburPedas.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-0.24062458961357744),
      lng: parseFloat(111.49589294413269),
    },
  },
  {
    title: "Makanan Kalumpe",
    from: "Kalimantan Tengah",
    image: "Kalumpe.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-1.635441838175342),
      lng: parseFloat(113.40608856370724),
    },
  },
  {
    title: "Makanan Soto Banjar",
    from: "Kalimantan Selatan",
    image: "SotoBanjar.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-3.138827107519263),
      lng: parseFloat(115.25197650331218),
    },
  },
  {
    title: "Makanan Kepiting Soka",
    from: "Kalimantan Utara",
    image: "KepitingSoka.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(3.0382978630719957),
      lng: parseFloat(116.06005269142723),
    },
  },
  {
    title: "Makanan Palumara",
    from: "Sulawesi Tengah",
    image: "Palumara.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-1.4281482950858255),
      lng: parseFloat(121.44697683174707),
    },
  },
  {
    title: "Makanan Sop Konro",
    from: "Sulawesi Selatan",
    image: "SopKonro.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-3.6825682934971096),
      lng: parseFloat(119.93954631109294),
    },
  },
  {
    title: "Makanan Lapa-Lapa",
    from: "Sulawesi Tenggara",
    image: "LapaLapa.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-4.13865240480068),
      lng: parseFloat(122.24379608365871),
    },
  },
  {
    title: "Makanan Bolu Paranggi",
    from: "Sulawesi Barat",
    image: "BoluParanggi.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(-2.8242697335608797),
      lng: parseFloat(119.10802133965353),
    },
  },
  {
    title: "Makanan Binte Biluhuta",
    from: "Gorontalo",
    image: "binte-biluhuta.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(0.5324432000377385),
      lng: parseFloat(123.05924563069142),
    },
  },
  {
    title: "Makanan Gohu Ikan",
    from: "Maluku Utara",
    image: "Gohu Ikan.jpg",
    type: "makanan",
    longlat: {

      lat: parseFloat(1.6105619385613243),
      lng: parseFloat(127.42648304628523),
    },
  },
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBKDtW47ZKzT5JPduQvi3gUFNHNZmXk-FU",
  });

  const [selectedMarker, setSelectedMarker] = useState("");
  const [jenis, setJenis] = useState("Tarian");

  return isLoaded ? (
    <>
    <div className="flex justify-center items-center mb-5 overflow-x-auto  ">
      <div onClick={()=> setJenis("Tarian")} className={`font-semibold text-sm sm:text-base py-2 px-8 cursor-pointer flex justify-center items-center sm:py-2 sm:px-12 rounded-md hover:text-white hover:bg-indigo-500 ${jenis === "Tarian" ? 'bg-indigo-500 text-white' : 'bg-slate-300'} `}>
        <p>Tarian</p>
      </div>

      <div onClick={()=> setJenis("Makanan")} className={`font-semibold text-sm sm:text-base py-2 px-8 cursor-pointer ml-5 flex justify-center items-center sm:py-2 sm:px-12 rounded-md hover:text-white hover:bg-indigo-500 ${jenis === "Makanan" ? 'bg-indigo-500 text-white' : 'bg-slate-300'} `}>
        <p>Makanan</p>
      </div>
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
      {(jenis === "Tarian") ? (
        dataMarkerTarian.map((marker, i) => (
          <Marker
            key={i}
            position={{
              lat: marker.longlat.lat,
              lng: marker.longlat.lng,
            }}
            onClick={() => {
              setSelectedMarker(marker);
            }}
            icon={{
              url: `./images/mapMarker/${marker.image}`,
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
            }}
            animation={"BOUNCE"}
          />
        ))
      ) : (
        dataMarkerMakanan.map((marker, i) => (
          <Marker
            key={i}
            position={{
              lat: marker.longlat.lat,
              lng: marker.longlat.lng,
            }}
            onClick={() => {
              setSelectedMarker(marker);
            }}
            icon={{
              url: `./images/mapMarker/Makanan/${marker.image}`,
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
            }}
            animation={"BOUNCE"}
          />
        ))
      )
      }
        

        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker.longlat.lat),
              lng: parseFloat(selectedMarker.longlat.lng),
            }}
            clickable={true}
            onCloseClick={() => setSelectedMarker("")}
          >
            <div className="bg-white rounded text-center">
              <img
                src={(jenis === "Makanan" ? `./images/mapMarker/Makanan/${selectedMarker.image}` : `./images/mapMarker/${selectedMarker.image}`)}
                width={200}
                height={200}
                className="object-cover"
              />
              <h1 className="font-bold text-xl text-gray-800 mt-3">
                {selectedMarker.title}
              </h1>
              <small className="text-gray-600">{selectedMarker.from}</small>
              <br />
              {selectedMarker.type == "makanan" ? (
                <Link
                  to={"/ragam-indonesia/makanan/detail"}
                  className="bg-orange-500 inline-block text-white hover:bg-orange-400 rounded px-8 py-2 mt-5"
                >
                  Baca Selengkapnya
                </Link>
              ) : (
                <Link
                  to={"/ragam-indonesia/tarian/detail"}
                  className="bg-purple-500 inline-block text-white hover:bg-purple-400 rounded px-8 py-2 mt-5"
                >
                  Baca Selengkapnya
                </Link>
              )}
            </div>
          </InfoWindow>
        ) : (
          ""
        )}
      </>
    </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

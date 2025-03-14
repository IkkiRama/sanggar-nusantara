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

function MyComponent({foods, alatMusik, rumahAdat, laguDaerah, bahasaDaerah, seniTari}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBKDtW47ZKzT5JPduQvi3gUFNHNZmXk-FU",
  });

  console.log('====================================');
  console.log(foods);
  console.log('====================================');

  const [selectedMarker, setSelectedMarker] = useState("");
  const [jenis, setJenis] = useState("Tarian");

  return isLoaded ? (
    <>
    <div className="flex justify-center items-center mb-5 overflow-x-auto">
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
              url: `./images/mapMarker/${marker.image}`,
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
            }}
            animation={"BOUNCE"}
          />
        ))
      ) : (
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

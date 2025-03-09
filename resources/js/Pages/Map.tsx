import { useEffect, useState } from "react";
import GoogleMapComponent from "../components/googlemap";
import { FaMapLocation } from "react-icons/fa6";
import DarkNavbar from "../layouts/darkNavbar";
import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

export default function Map() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Peta Interaktif | Sanggar Nusantara">
        <LightNavbar />

      <br />
      <br />
      <br />
      <br />
      <br />

      <h1 className="flex dark:text-white gap-3 justify-center items-center font-bold text-3xl">
        <span className="bg-indigo-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full">
          <FaMapLocation size={30} />
        </span>
        Peta Interaktif
      </h1>


      <br />
      <GoogleMapComponent />
      <br />
      <br />
      <br />
      <br />
      <br />
    </MainLayout>
  );
}

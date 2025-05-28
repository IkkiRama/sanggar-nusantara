import { useEffect, useState } from "react";
import GoogleMapComponent from "../components/googlemap";
import { FaMapLocation } from "react-icons/fa6";
import React from "react";
import LightNavbar from "../layouts/lightNavbar";
import MainLayout from "../Layouts/mainLayout";

export default function Map({user, foods, alatMusik, rumahAdat, laguDaerah, bahasaDaerah, seniTari, cartCount}) {

  return (
    <MainLayout title="Peta Interaktif | Sanggar Nusantara">
        <LightNavbar user={user} cartCount={cartCount} />

      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="2xl:max-w-[2000px] mx-auto px-4 2xl:px-10">

        <h1 className="flex dark:text-white gap-3 justify-center items-center font-bold text-3xl">
            <span className="bg-indigo-500 w-[50px] h-[50px] flex items-center justify-center text-white rounded-full">
            <FaMapLocation size={30} />
            </span>
            Peta Interaktif
        </h1>


        <br />
        <div className="px-7 ">
            <GoogleMapComponent foods={foods} alatMusik={alatMusik} rumahAdat={rumahAdat} laguDaerah={laguDaerah} bahasaDaerah={bahasaDaerah} seniTari={seniTari} />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>

    </MainLayout>
  );
}

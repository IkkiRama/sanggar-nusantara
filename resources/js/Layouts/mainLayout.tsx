import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from './../Pages/Home';
import RagamIndonesia from './../Pages/RagamIndonesia';
import RagamMakanan from './../Pages/RagamMakanan';
import DetailRagamMakanan from './../Pages/DetailRagamMakanan';
import DetailRagamTarian from './../Pages/DetailRagamTarian';
import News from '../Pages/Artikel';
import Subscription from './../Pages/Subscription';
import Map from './../Pages/Map';
import Event from './../Pages/Event';
import DetailEvent from './../Pages/DetailEvent';
import Detail from "../Pages/Detail";


// components
import Footer from './footer';
import Switcher from "../components/swicher";

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from './../Components/ScrollToTop';
import { Head } from "@inertiajs/react";

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title = 'Home' }: MainLayoutProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full">
        <Head title={title}>
        </Head>
        {/* Content */}
        <div className="relative z-10">
            <main className="transition-colors duration-300">
                {children}
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    </div>
  );
}

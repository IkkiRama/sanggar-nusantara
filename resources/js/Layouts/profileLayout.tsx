import React, { useState, useEffect } from "react";

// components
import Footer from './footer';

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from './../Components/ScrollToTop';
import { Head } from "@inertiajs/react";

interface ProfileLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function ProfileLayout({ children, title = 'Profile | Sanggar Nusantara' }: ProfileLayoutProps) {
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
            <ScrollToTop />
        </div>
    </div>
  );
}

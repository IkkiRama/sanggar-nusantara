import React, { useState, useEffect } from "react";

// components
import Footer from './footer';

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollToTop } from './../Components/ScrollToTop';
import { Head } from "@inertiajs/react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AuthLayout({ children, title = 'Masuk | Sanggar Nusantara' }: AuthLayoutProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full">
        <Head title={title}>
        </Head>

        <div className="min-h-screen relative transition-colors duration-300">
            <div className="fixed inset-0 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />

                {/* Optional: Add subtle texture */}
                <div className="absolute inset-0 bg-pattern opacity-[0.02] pointer-events-none" />
            </div>
            <div className="relative overflow-x-clip z-10 dark:bg-gray-950">
                <main className="transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
        {/* Content */}
    </div>
  );
}

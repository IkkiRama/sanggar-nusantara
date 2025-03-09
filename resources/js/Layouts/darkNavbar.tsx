import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Switcher from "./../components/swicher";
// icons
import { FaBars, FaBell, FaGlobe, FaHome, FaNewspaper } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { Link } from '@inertiajs/react';

const DarkNavbar = () => {
  const location = useLocation();

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  let navOpen: boolean = false;

  const toggleNavigation = () => {
    document.getElementById("navigation")?.classList.toggle("hidden");
    document.querySelector("nav")?.classList.add("!bg-black");
    document.querySelector("nav section div h2")?.classList.add("!text-white");

    navOpen = !navOpen;
  };

  useEffect(() => {
    const nav = document.querySelector("nav") as HTMLElement;
    const modeToggle = document.querySelector("#changeMode") as HTMLElement;
    const h2Nav = document.querySelector("nav section div h2") as HTMLElement;

    const handleScroll = () => {
      nav.classList.toggle("!py-5", window.scrollY > 200);
      nav.classList.toggle("!px-5", window.scrollY > 200);
      nav.classList.toggle("lg:!px-20", window.scrollY > 200);
      nav.classList.toggle("md:!px-16", window.scrollY > 200);

      if (!navOpen) {
        nav.classList.toggle("!bg-black", window.scrollY > 200);
        nav.classList.toggle("!text-white", window.scrollY > 200);
        h2Nav.classList.toggle("!text-white", window.scrollY > 200);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-red-500 relative font-semibold after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-[70%] after:h-[3px] after:bg-red-500 after:rounded-full gap-8 "
      : "text-white ";

  return (
    <>
      <nav className="fixed left-0 right-0 bg-black z-50 lg:text-black text-white lg:py-7 md:py-6 py-5 lg:px-24 md:px-12 px-5 transition-all duration-500">
        <section className="flex justify-between">
          <div className="w-3/4 lg:w-1/4">
            <h2
              className="text-white font-semibold md:text-xl text-base"
            >
              <Link href={"/"}>Warisan Nusantara</Link>
            </h2>
          </div>
          <div className="lg:flex gap-10 hidden items-center justify-end w-1/4 lg:w-1/2 ">
            <div className="text-right text-white flex">
              <Link
                href="/"
              >
                <span className={[getLinkClass("/"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                  Beranda
                </span>
              </Link>
              <Link
                href="/event"
              >
                <span className={[getLinkClass("/event"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                  Event
                </span>
              </Link>

              <Link
                href="/ragam-indonesia"
              >
                <span className={[getLinkClass("/ragam-indonesia"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                  Ragam Indonesia
                </span>
              </Link>
              <Link
                href="/news"
              >
                <span className={[getLinkClass("/news"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                  Berita
                </span>
              </Link>
            </div>

            <BootstrapTooltip
              title={"Ganti Mode"}
              placement="bottom"
              className="pr-2"
            >
              <span
                id="changeMode"
                className="text-white dark:bg-gray-900 dark:text-gray-100 hover:text-white hover:bg-red-500 transition-all cursor-pointer min-w-[30px] h-[30px] flex items-center justify-center rounded-full"
              >
                <Switcher />
              </span>
            </BootstrapTooltip>


          </div>
          <div className="lg:hidden flex gap-10 items-center justify-end w-1/4">
            <div className="w-1/4 text-right text-white">
              <button
                onClick={() => {
                  toggleNavigation();
                }}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </section>
        <section id="navigation" className="hidden md:gap-20 gap-12">
          <hr className="my-5 border-gray-800" />
          <div className="flex overflow-x-auto ">
            <Link
              href="/"
              onClick={() => {
                toggleNavigation();
              }}
            >
              <span className={[getLinkClass("/"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                <FaHome className="md:inline-block hidden" />
                Beranda
              </span>
            </Link>
            <Link
              href="/event"
              onClick={() => {
                toggleNavigation();
              }}
            >
              <span className={[getLinkClass("/event"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                <FaBell className="md:inline-block hidden" />
                Event
              </span>
            </Link>
            <Link
              href="/ragam-indonesia"
              onClick={() => {
                toggleNavigation();
              }}
            >
              <span className={[getLinkClass("/ragam-indonesia"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                <FaGlobe className="md:inline-block hidden" />
                Ragam Indonesia
              </span>
            </Link>
            <Link
              href="/news"
              onClick={() => {
                toggleNavigation();
              }}
            >
              <span className={[getLinkClass("/news"), "lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3"].join("")}>
                <FaNewspaper className="md:inline-block hidden" />
                Berita
              </span>
            </Link>
          </div>
        </section>
      </nav>
    </>
  );
};

export default DarkNavbar;

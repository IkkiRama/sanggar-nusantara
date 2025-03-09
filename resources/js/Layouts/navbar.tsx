import { Link } from '@inertiajs/react';
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import Switcher from "./../components/swicher";
import { FaBars, FaBell, FaGlobe, FaHome, FaNewspaper } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";

const LightNavbar = () => {
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

  const [language, setLanguage] = useState("ID");
  let navOpen: boolean = false;

  const toggleNavigation = () => {
    document.getElementById("navigation")?.classList.toggle("hidden");
    document.querySelector("nav")?.classList.add("!bg-black");
    document.querySelector("nav section div h2")?.classList.add("!text-white");
    document.querySelector("#FaBars")?.classList.add("!text-white");
    const menuHP = document.querySelectorAll("#navigation span");
    menuHP.forEach(menu => menu?.classList.add("!text-white"))

    navOpen = !navOpen;
  };

  const switchLanguage = () => {
    if (language == "ID") {
      setLanguage("EN");
    } else {
      setLanguage("ID");
    }
  };

  useEffect(() => {
    const nav = document.querySelector("nav") as HTMLElement;
    const modeToggle = document.querySelector("#changeMode") as HTMLElement;
    // const changeLanguage = document.querySelector(
    //   "#changeLanguage"
    // ) as HTMLElement;
    const h2Nav = document.querySelector("nav section div h2") as HTMLElement;
    const FaBars = document.querySelector("#FaBars") as HTMLElement;
    const menus =  document.querySelectorAll("#LaptopNavigation div .isNotActive") as NodeListOf<HTMLElement>;
    // const menus =  Array.from(ArrMenus)

    const handleScroll = () => {
      nav.classList.toggle("!py-5", window.scrollY > 200);
      nav.classList.toggle("!px-5", window.scrollY > 200);
      nav.classList.toggle("lg:!px-20", window.scrollY > 200);
      nav.classList.toggle("md:!px-16", window.scrollY > 200);

      if (!navOpen) {
        nav.classList.toggle("!bg-black", window.scrollY > 200);
        nav.classList.toggle("!text-white", window.scrollY > 200);
        //
        modeToggle.classList.toggle("bg-white", window.scrollY < 200);
        modeToggle.classList.toggle("!text-white", window.scrollY > 200);
        //
        // changeLanguage.classList.toggle("bg-white", window.scrollY < 200);
        // changeLanguage.classList.toggle("!text-white", window.scrollY > 200);

        h2Nav.classList.toggle("!text-white", window.scrollY > 200);
        FaBars.classList.toggle("!text-white", window.scrollY > 200);

        menus.forEach( menu => {
          menu.classList.toggle("!text-white", window.scrollY > 200);
        });

      }
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="fixed left-0 right-0 bg-transparent z-50 lg:text-black text-white lg:py-10 md:py-8 py-6 lg:px-24 md:px-12 px-5 transition-all duration-500">
        <section className="flex justify-between">
          <div className="w-3/4 lg:w-1/4">
            <h2
              className="text-[#111] font-semibold md:text-xl dark:text-white text-base"
            >
              <Link href={"/"}>Sanggar Nusantara</Link>
            </h2>
          </div>
          <div id="LaptopNavigation" className="lg:flex gap-10 hidden items-center justify-end w-1/4 lg:w-1/2 ">
            <div className="text-right text-white flex">
              <Link
                href="/"
              >
                <span className="lg:text-[14px] text-[12px] cursor-pointer flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3 text-red-500 relative font-semibold after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-[3px] after:bg-red-500 after:rounded-full">
                  Beranda
                </span>
              </Link>
              <Link
                href="/event"
              >
                <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white isNotActive flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
                  Event
                </span>
              </Link>

              <Link
                href="/ragam-indonesia"
              >
                <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white isNotActive flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
                  Ragam Indonesia
                </span>
              </Link>
              <Link
                href="/news"
              >
                <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white isNotActive flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
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
                className="text-red-500 bg-white dark:bg-gray-900 dark:text-gray-100 hover:text-white hover:bg-red-500 transition-all cursor-pointer min-w-[30px] h-[30px] flex items-center justify-center rounded-full"
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
                id="FaBars"
                className="text-black dark:text-white"
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
              <span className="  lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
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
              <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
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
              <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
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
              <span className=" lg:text-[14px] text-[12px] cursor-pointer text-black dark:text-white flex gap-4 items-center justify-center rounded-full hover:text-red-500 md:px-3 px-3">
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

export default LightNavbar;

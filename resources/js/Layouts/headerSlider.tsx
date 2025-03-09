import ChevronLeftIcon from "../components/icons/chevronLeftIcon";
import ChevronRightIcon from "../components/icons/chevronRight";

const sliderControlCondition = () => {
  const dot1 = document.querySelector("#dot1");
  const dot2 = document.querySelector("#dot2");
  dot1?.classList.toggle("bg-white/80");
  dot1?.classList.toggle("bg-white/50");
  dot2?.classList.toggle("bg-white/80");
  dot2?.classList.toggle("bg-white/50");

  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  next?.classList.toggle("hidden");
  prev?.classList.toggle("hidden");
};

const nextSlider = () => {
  const slider1 = document.querySelector("#slider1");
  const slider2 = document.querySelector("#slider2");

  slider1?.classList.toggle("!-left-[100vw]");
  setTimeout(() => {
    slider1?.classList.toggle("hidden");
    slider1?.classList.toggle("flex");
  }, 400);

  slider2?.classList.toggle("-right-[100vw]");
  slider2?.classList.toggle("-right-0");
  setTimeout(() => {
    slider2?.classList.toggle("hidden");
    slider2?.classList.toggle("flex");
  }, 400);

  sliderControlCondition();
};

const prevSlider = () => {
  const slider1 = document.querySelector("#slider1");
  const slider2 = document.querySelector("#slider2");

  slider1?.classList.toggle("!-left-[100vw]");
  setTimeout(() => {
    slider1?.classList.toggle("hidden");
    slider1?.classList.toggle("flex");
  }, 400);

  slider2?.classList.toggle("-right-[100vw]");
  slider2?.classList.toggle("-right-0");
  setTimeout(() => {
    slider2?.classList.toggle("hidden");
    slider2?.classList.toggle("flex");
  }, 400);

  sliderControlCondition();
};

export default function HeaderSlider() {
  return (
    <>
      <header className="h-[700px] relative">
        <section
          id="slider1"
          className="transition-all duration-500 left-0 h-full flex justify-between bg-cover md:bg-center relative text-white after:content-[''] after:bg-black/50 after:absolute after:inset-0 bg-[-200px]"
        >
          <div className="flex justify-between items-center left-0 right-0 absolute top-1/2 -translate-y-1/2 lg:ml-40 md:ml-10 z-10 md:px-0 px-5 md:text-left text-center">
            <div>
              <h1 className="md:text-4xl text-2xl font-bold uppercase">
                TARI Jaipong
              </h1>
              <p className="md:max-w-[600px] md:text-base text-[12px] max-w-full">
                Tari Jaipong merupakan sebuah tarian tradisional yang berasal
                dari daerah Karawang, Jawa Barat. Awalnya tari ini dikenal
                masyarakat dengan nama Tari Banjet. Tarian jaipong adalah sebuah
                inovasi yang dibuat oleh seorang seniman yang berasal dari
                daerah Karawang bernama H. Suanda.
              </p>
              <div className="md:flex md:items-center mt-10">
                <button className="border-2 border-red-500 px-5 py-2 rounded mr-5 inline-flex items-center gap-2 hover:bg-red-500 md:text-base text-sm">
                  Lihat Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <button className="inline-flex gap-2 border-2 border-red-500 bg-red-500 hover:bg-red-400 px-5 py-2 rounded md:mt-0 mt-3 md:text-base text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Video
                </button>
              </div>
            </div>
            <div className="mr-40 lg:block hidden">
              <div className="font-bold text-xl mb-4  relative">
                <h4 className="flex gap-2 items-center relative z-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Video Dokumentasi
                </h4>
                <span className="block w-[100px] h-[8px] rounded bg-red-500 absolute left-[40px] bottom-1"></span>
              </div>
              <iframe
                width="450"
                height="255"
                src="https://www.youtube.com/embed/fV0aVmWWRuk?si=_PUcR32HtHlMO7b5"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section
          id="slider2"
          className="transition-all duration-500 -right-[100vw] hidden h-full justify-between bg-cover bg-center relative text-white after:content-[''] after:bg-black/50 after:absolute after:inset-0"
        >
          <div className="flex justify-between items-center left-0 right-0 absolute top-1/2 -translate-y-1/2 lg:ml-40 lg:px-0 md:px-10 px-5 z-10 md:text-left text-center">
            <div>
              <h1 className="md:text-4xl text-2xl font-bold uppercase">
                ANGKLUNG
              </h1>
              <p className="md:max-w-[700px] md:text-base text-[12px]">
                Alat musik angklung berasal dari Jawa Barat ini terbuat dari
                bambu dan dimainkan dengan cara digoyangkan. Angklung terdiri
                dari dua hingga empat tabung bambu yang digantung dalam bingkai
                bambu pula. Keduanya diikat dengan tali rotan, lalu dipangkas
                atau dipotong sampai menghasilkan nada tertentu.
              </p>
              <div className="md:flex md:items-center mt-10">
                <button className="border-2 border-red-500 px-5 py-2 rounded mr-5 inline-flex items-center gap-2 hover:bg-red-500 md:text-base text-sm">
                  Lihat Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <button className="inline-flex gap-2 border-2 border-red-500 bg-red-500 hover:bg-red-400 px-5 py-2 rounded md:text-base text-sm md:mt-0 mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dengarkan
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="absolute bottom-0 lg:ml-40 ml-10 mb-5 md:flex hidden gap-2">
          <span
            id="dot1"
            className="w-[15px] h-[15px] bg-white/80 block rounded-full"
          ></span>
          <span
            id="dot2"
            className="w-[15px] h-[15px] bg-white/50 block rounded-full"
          ></span>
        </section>

        <section id="sliderControlArrow" className="md:block hidden">
          <button
            id="next"
            className="absolute top-1/2 -right-[20px] duration-300 -translate-y-1/2 opacity-0 cursor-pointer z-10"
            onClick={() => nextSlider()}
          >
            <ChevronRightIcon />
          </button>
          <button
            id="prev"
            className="hidden absolute top-1/2 -left-[20px] duration-300 -translate-y-1/2 opacity-0 cursor-pointer"
            onClick={() => prevSlider()}
          >
            <ChevronLeftIcon />
          </button>
        </section>
      </header>
    </>
  );
}

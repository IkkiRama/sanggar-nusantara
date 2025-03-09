import React from "react";

export default function Kenali() {
  return (
    <>
      <div className="mt-24 px-16 my-8 items-center bg-gray-100">
        <div className="w-[80%] mx-auto">
          <h1 className="mb-6 text-2xl font-bold">ABOUT US</h1>
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            adipisci labore non fugit voluptatem voluptatum. Eligendi nostrum,
            eveniet vitae debitis perferendis, perspiciatis quo eaque, mollitia
            officia cum quis alias dignissimos.
          </p>
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum libero
            praesentium id, fuga explicabo cupiditate eveniet maiores,
            distinctio quam magnam aperiam porro, beatae velit adipisci corrupti
            laudantium error fugit inventore.
          </p>
          <p className="font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            dolorum.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 m-14 gap-4 px-56">
        <div
          className="h-[250px] rounded-md overflow-hidden relative bg-cover bg-center p-5 after:content-[''] after:absolute after:inset-0 after:bg-black/30 z-10 after:-z-10"
          style={{
            backgroundImage: "url(/images/card/musik.jpg)",
          }}
        >
          <p className="relative z-10 text-white text-center m-14 font-semibold text-lg mb-3">
            Lorem ipsum
          </p>
          <p className="text-sm text-white mx-16 text-center">
            Lorem ipsum dolor, sit amet c onsectetur adipisicing elit. Iure,
            earum.
          </p>
          <p className="text-white text-center text-sm font-medium mt-2">
            Read more...
          </p>
        </div>
        <div
          className="h-[250px] rounded-md overflow-hidden relative bg-cover bg-center p-5 after:content-[''] after:absolute after:inset-0 after:bg-black/30 z-10 after:-z-10"
          style={{
            backgroundImage: "url(/images/card/musik.jpg)",
          }}
        >
          <p className="z-10 text-white text-center m-14 font-semibold text-lg mb-3">
            Lorem ipsum
          </p>
          <p className="text-sm text-white mx-16 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
            earum.
          </p>
          <p className="text-white text-center text-sm font-medium mt-2">
            Read more...
          </p>
        </div>
        <div
          className="h-[250px] rounded-md overflow-hidden relative bg-cover bg-center p-5 after:content-[''] after:absolute after:inset-0 after:bg-black/30 z-10 after:-z-10"
          style={{
            backgroundImage: "url(/images/card/musik.jpg)",
          }}
        >
          <p className="z-10 text-white text-center m-14 font-semibold text-lg mb-3">
            Lorem ipsum
          </p>
          <p className="text-sm text-white mx-16 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
            earum.
          </p>
          <p className="text-white text-center text-sm font-medium mt-2">
            Read more...
          </p>
        </div>
      </div>
    </>
  );
}

'use client'

import React from "react";
import Link from "next/link"; // ✅ Đúng: Link của Next.js, không phải lucide-react

const NodePagevi = () => {
  const tips = [
    {
      img: "/images/node1.jpg", // ✅ Đặt file này trong thư mục public/images/
      title: "THỊ THỰC",
      link: "vi/blog/29",
    },
    {
      img: "/images/History white_0.jpg",
      title: "LỊCH SỬ",
      link: "vi/blog/30",
    },
    {
      img: "/images/Transport_1.jpg",
      title: "Phương Tiện",
      link: "vi/blog/31",
    },
    {
      img: "/images/Visas_1.jpg",
      title: "SỰ AN TOÀN",
      link: "vi/blog/32",
    },
    {
      img: "/images/Weather white_1.jpg",
      title: "Thời Tiết",
      link: "vi/blog/33",
    },
  ];

  return (
    <div className="bg-white mt-[-80px] py-14 px-8 text-center">
      {/* Tiêu đề */}
      <h1 className="relative mr-[40%] inline-block mb-6 select-none transition-transform  duration-300 ease-out hover:scale-105">
              <span
                className="relative z-10 block px-10 py-3 
                  text-2xl sm:text-2xl lg:text-2xl font-bold
                  text-[#176734] text-center
                  bg-gradient-to-r from-stone-200 via-amber-300 to-stone-500
                  rounded-xl 
                  shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                  transition-all duration-300 ease-out
                  hover:text-red-500 hover:shadow-[0_12px_25px_rgba(0,0,0,0.45)]
                  hover:from-gray-300 hover:to-gray-500"
              >
                 
                   MẸO DU LỊCH
              </span>
            </h1>
      

      {/* Danh sách các mục */}
      <div className="flex flex-wrap justify-center gap-30">
        {tips.map((tip, index) => (
          <Link
            key={index}
            href={tip.link}
            className="flex flex-col items-center space-y-3 transition-transform hover:scale-110 hover:opacity-90"
          >
            <img
              src={tip.img}
              alt={tip.title}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-gray-700 font-medium tracking-wide">
              {tip.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NodePagevi;

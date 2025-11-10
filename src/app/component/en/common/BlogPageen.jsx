"use client"
import React from "react";
import Link from "next/link"; 

const BlogPageen = () => {
    const tips = [
    {
      img: "/images/vector-01.png", 
      title: "VISA",
      link: "en/blog/29",
    },
    {
      img: "/images/vector-05.png",
      title: "HISTORY",
      link: "en/blog/30",
    },
    {
      img: "/images/vector-03.png",
      title: "Vehicle",
      link: "en/blog/31",
    },
    {
      img: "/images/vector-02.png",
      title: "SAFETY",
      link: "en/blog/32",
    },
    {
      img: "/images/vector-04.png",
      title: "Weather",
      link: "en/blog/33",
    },
  ];

  return (
    <div className=" mb-[40px]  py-16 px-8 ">
      {/* Tiêu đề */}
       <div className="relative max-w-6xl mt-[-40px] mb-[40px] mx-auto overflow-hidden">
    <h1 className="relative inline-block ml-[10px] mb-6 select-none transition-transform duration-300 ease-out hover:scale-105">
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
                 
                   TRAVEL TIP
              </span>
            </h1>
       </div>
      
      

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
              className="w-36 h-46 object-contain mb-2"
            />
            <p className="text-[#176734] font-bold hover:text-red-500 tracking-wide">
              {tip.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogPageen
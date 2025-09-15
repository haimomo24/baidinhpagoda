"use client";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const places = [
  { name: "# Giới Thiệu Về Chùa Bái Đính #", link: "/vi/visit/45", image: '/images/DJI_0033.jpg' },
  { name: "1. Cổng Tam Quan", link: "http://qr.chuabaidinh.com.vn/locations/3", image: '/images/tamquan.jpg' },
  { name: "2. Hành lang La Hán", link: "http://qr.chuabaidinh.com.vn/locations/4", image: '/images/hanhlanglahan.png' },
  { name: "3. Điện Quán Âm", link: "http://qr.chuabaidinh.com.vn/locations/11", image: '/images/dienquanam1.jpg' },
  { name: "4. Điện Giáo Chủ", link: "http://qr.chuabaidinh.com.vn/locations/10", image: '/images/diengiaochu.jpg' },
  { name: "5. Chuông gió", link: "http://qr.chuabaidinh.com.vn/locations/26", image: '/images/gac-chuong.jpg' },
  { name: "6. Điện Tam Thế", link: "http://qr.chuabaidinh.com.vn/locations/12", image: '/images/tamthe1.JPG' },
  { name: "7. Chùa cổ", link: "http://qr.chuabaidinh.com.vn/locations/17", image: '/images/chuaco.png' },
  { name: "8. Bảo Tháp", link: "http://qr.chuabaidinh.com.vn/locations/6", image: '/images/baothap2.JPG' },
  { name: "9. Bát chính đạo", link: "http://qr.chuabaidinh.com.vn/locations/16", image: '/images/batchinhdao.jpg'},
];

const FamousPlaces = () => {
  return (
    <div
      className="w-full relative lg:mt-[-100px]"
      
    >
      <div className="bg-[#F1EBE5]/40  w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">

          {/* Tiêu đề */}
          <h1
  className="
    inline-block px-6 py-3
    text-3xl sm:text-4xl lg:text-4xl font-bold
    text-[#0F7F3E]
    bg-gradient-to-r from-amber-200 to-stone-300
    rounded-xl shadow-md
    transition-all duration-300 ease-out
    hover:text-red-600 hover:scale-105 hover:shadow-amber-500/50 hover:shadow-lg hover-shake
  "
>
  LỘ TRÌNH THAM QUAN
</h1>



          {/* Hình ảnh các địa điểm (full 10) */}
          <div className="flex flex-col lg:flex-row gap-4">
            {places[0] && (
              <Link href={places[0].link} target="_blank" className="flex-1 relative overflow-hidden rounded-lg w-full lg:h-[400px]">
                <img
                  src={places[0].image}
                  alt={places[0].name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
                  {places[0].name}
                </div>
              </Link>
            )}

            <div className="flex-1 grid grid-cols-2 gap-2">
              {places.slice(1, 5).map((place, idx) => (
                <Link key={idx} href={place.link} target="_blank" className="relative overflow-hidden rounded-lg w-full h-40 sm:h-48 md:h-48">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                    {place.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="flex-1 grid grid-cols-2 gap-2">
              {places.slice(5, 9).map((place, idx) => (
                <Link key={idx} href={place.link} target="_blank" className="relative overflow-hidden rounded-lg w-full h-40 sm:h-48 md:h-48">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                    {place.name}
                  </div>
                </Link>
              ))}
            </div>

            {places[9] && (
              <Link href={places[9].link} target="_blank" className="flex-1 relative overflow-hidden rounded-lg w-full lg:h-[400px]">
                <img
                  src={places[9].image}
                  alt={places[9].name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
                  {places[9].name}
                </div>
              </Link>
            )}
          </div>

          {/* Sơ đồ tham quan (bỏ địa điểm đầu tiên) */}
          <div className="py-6">
            <h2 className="text-xl hover:text-red-600 sm:text-2xl font-bold mb-4 text-center lg:text-left">
              Sơ Đồ Lộ Trình Tham Quan
            </h2>
            <div className="relative">
              {/* Line ngang desktop */}
              <div className="hidden sm:block absolute top-5 left-0 w-full h-1 bg-[#356D3D]"></div>

              {/* Grid responsive: mobile 3 cột, desktop flex */}
              <div className="grid grid-cols-3 sm:flex sm:flex-row justify-between items-center gap-4 sm:gap-0 relative">
                {places.slice(1, 10).map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Link href={step.link} target="_blank">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-4 border-[#356D3D] group-hover:border-[#E7000B] z-10 group-hover:scale-110 transition-transform">
                          <FaMapMarkerAlt className="text-[#356D3D]" />
                        </div>
                        <p
                          className="mt-2 text-xs sm:text-sm md:text-sm font-semibold text-center truncate max-w-[100px] group-hover:whitespace-normal group-hover:scale-110 group-hover:text-[#E7000B] group-hover:overflow-visible group-hover:max-w-[200px]"
                          title={step.name}
                        >
                          {step.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FamousPlaces;

"use client";
import React, { useState } from "react";
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
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="w-full relative mt-[-60px] lg:mt-[-150px]">
      <div className="bg-[#F1EBE5]/40 w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">

          {/* Tiêu đề */}
          <h1 className="inline-block px-6 py-3 text-2xl font-bold w-full sm:w-[30%] text-[#0F7F3E] bg-gradient-to-r from-amber-200 to-stone-300 rounded-xl shadow-md">
            LỘ TRÌNH THAM QUAN
          </h1>

          {/* Hàng 1 */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* ảnh lớn */}
            {places[0] && (
              <Link
                href={places[0].link}
                target="_blank"
                onMouseEnter={() => setHoverIndex(0)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`flex-1 relative overflow-hidden rounded-lg w-full lg:h-[400px] transition-all duration-300 ${
                  hoverIndex === 0 ? "ring-4 ring-red-500 scale-[1.02]" : ""
                }`}
              >
                <img src={places[0].image} alt={places[0].name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
                  {places[0].name}
                </div>
              </Link>
            )}

            {/* 4 ảnh nhỏ */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              {places.slice(1, 5).map((place, idx) => (
                <Link
                  key={idx}
                  href={place.link}
                  target="_blank"
                  onMouseEnter={() => setHoverIndex(idx+1)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`relative overflow-hidden rounded-lg w-full h-40 sm:h-48 md:h-48 transition-all duration-300 ${
                    hoverIndex === idx+1 ? "ring-4 ring-red-500 scale-[1.02]" : ""
                  }`}
                >
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                    {place.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Hàng 2 */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {/* 4 ảnh nhỏ */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              {places.slice(5, 9).map((place, idx) => (
                <Link
                  key={idx}
                  href={place.link}
                  target="_blank"
                  onMouseEnter={() => setHoverIndex(idx+5)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`relative overflow-hidden rounded-lg w-full h-40 sm:h-48 md:h-48 transition-all duration-300 ${
                    hoverIndex === idx+5 ? "ring-4 ring-red-500 scale-[1.02]" : ""
                  }`}
                >
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                    {place.name}
                  </div>
                </Link>
              ))}
            </div>

            {/* ảnh lớn */}
            {places[9] && (
              <Link
                href={places[9].link}
                target="_blank"
                onMouseEnter={() => setHoverIndex(9)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`flex-1 relative overflow-hidden rounded-lg w-full lg:h-[400px] transition-all duration-300 ${
                  hoverIndex === 9 ? "ring-4 ring-red-500 scale-[1.02]" : ""
                }`}
              >
                <img src={places[9].image} alt={places[9].name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
                  {places[9].name}
                </div>
              </Link>
            )}
          </div>

          {/* Timeline sơ đồ */}
          <div className="py-6">
            <h2 className="inline-block px-6 py-3 text-xl sm:text-2xl lg:text-2xl font-bold w-full sm:w-[38%] text-[#0F7F3E] bg-gradient-to-r from-amber-200 to-stone-300 rounded-xl shadow-md mb-[3%]">
              SƠ ĐỒ LỘ TRÌNH THAM QUAN
            </h2>

            <div className="relative">
              <div className="hidden sm:block absolute top-5 left-0 w-full h-1 bg-[#356D3D]"></div>

              <div className="grid grid-cols-3 sm:flex sm:flex-row justify-between items-center gap-4 sm:gap-0 relative">
                {places.slice(1, 10).map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    onMouseEnter={() => setHoverIndex(index+1)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <Link href={step.link} target="_blank">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div
                          className={`flex items-center justify-center w-10 h-10 bg-white rounded-full border-4 z-10 transition-transform ${
                            hoverIndex === index+1
                              ? "border-red-500 scale-125"
                              : "border-[#356D3D] group-hover:border-[#E7000B]"
                          }`}
                        >
                          <FaMapMarkerAlt className="text-[#356D3D]" />
                        </div>
                        <p
                          className={`mt-2 text-xs sm:text-sm md:text-sm font-semibold text-center truncate max-w-[100px] transition-all ${
                            hoverIndex === index+1
                              ? "text-[#E7000B] scale-110 max-w-[200px]"
                              : "group-hover:text-[#E7000B]"
                          }`}
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

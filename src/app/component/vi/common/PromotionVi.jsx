'use client'
import React, { useState } from "react";

const PromotionVi = () => {
  // 🟢 Dữ liệu 12 tháng, mỗi tháng có 5 ảnh riêng
  const events = [
    {
      month: "T1",
      title: "Lễ Khai hội chùa Bái Đính",
      images: [
        "/images/skthang/skth1_1.JPG",
         "/images/skthang/skthang1_2.JPG",
          "/images/skthang/sktha1_3.JPG",
           "/images/skthang/skthg1_4.JPG",
            ],
      link: "/vi/blog/20",
    },
    {
      month: "T2",
      title: "Lễ Ngũ Bách Danh",
      images: [
        "/images/skthang/skth2_1.JPG",
         "/images/skthang/skth2_2.JPG",
          "/images/skthang/skth2_3.JPG",
           "/images/skthang/skth2_4.JPG",
           ],
      link: "/vi/blog/23",
    },
    {
      month: "T3",
      title: "Flower Fair",
      images: [
        "https://cdn.nhandan.vn/images/cb7e630123585f7e41144ef894e164898a40de23027349cd0f484f27969649ec7fd81905a0745e27ff21dfc24fd8bf1c/img-1773-5499.jpg",
         "https://cdn.nbtv.vn/upload/news/8_2024/9_19042611082024.jpg",
          "https://cdn.nhandan.vn/images/cb7e630123585f7e41144ef894e164898a40de23027349cd0f484f27969649ec7a34c7f6eef0aa63a166f42359355956/img-1951-4421.jpg", 
          "https://cdn.nbtv.vn/upload/news/4_2024/_14294515042024.jpg", 
         ],
      link: "/vi/blog/24",
    },
    {
      month: "T4",
      title: "Đại lễ Phật Đản",
      images: [
        "/images/skthang/skth4_1.jpg",
         "/images/skthang/skth4_2.jpg",
          "/images/skthang/skth4_3.jpg",
           "/images/skthang/skth4_4.jpg", ],
      link: "/vi/blog/21",
    },
    {
      month: "T5",
      title: "Lễ mồng Một, ngày Rằm",
      images: [
        "/images/skthang/m1_1.JPG",
         "/images/skthang/m1_2.JPG",
          "/images/skthang/m1_3.JPG",
           "/images/skthang/m1_4.JPG",
      ],
      link: "/vi/blog/24",
    },
    {
      month: "T6",
      title: " Khoá tu mùa hè",
      images: [
        "https://cdn.nbtv.vn/upload/news/6_2023/1_15374514062023.jpg",
         "https://cdn.nbtv.vn/upload/news/6_2024/448976675_1036279037862405_8804307667957224360_n_16395024062024.jpg",
          "https://cdn.nbtv.vn/upload/news/6_2024/yen_khanh_dien_tap_pclb__tkcn_nam_2024_hong_nam_00_02_30_08_still009_16345524062024.jpg",
           "https://lh3.googleusercontent.com/abl-_HUrwQenzm4l0FBk6OACbVd3dnWDY2gbEVr1FRuOAi1r74R_tnQlgZvnqgn-1lsgTpgj1Iu3Z6RF5vLQvqXnd2y5CWEBlvcPc4LmOPZnTIYEEyekfrNGnic0PqLdjUW_Pgt02Cs=w450-h300-no",],
      link: "/vi/blog/25",
    },
    {
      month: "T7",
      title: "  Pháp hội Vu Lan báo hiếu",
      images: [
        "/images/skthang/skth7_1.jpg",
         "/images/skthang/skth7_2.jpg",
          "/images/skthang/skth7_3.jpg", 
          "/images/skthang/skth7_4.jpg",],
      link: "/vi/blog/26",
    },
    {
      month: "T8",
      title: "Lễ mồng Một, ngày Rằm",
      images: [
        "/images/skthang/m1_1.JPG",
         "/images/skthang/m1_2.JPG",
          "/images/skthang/m1_3.JPG",
           "/images/skthang/m1_4.JPG",
       ],
      link: "/vi/blog/24",
    },
    {
      month: "T9",
      title: "Lễ mồng Một, ngày Rằm",
      images: [
        "/images/skthang/m1_1.JPG",
         "/images/skthang/m1_2.JPG",
          "/images/skthang/m1_3.JPG",
           "/images/skthang/m1_4.JPG",
       ],
      link: "/vi/blog/24",
    },
    {
      month: "T10",
      title: "Huý kỵ Quốc sư Nguyễn Minh Không",
      images: [
        "/images/skthang/skth10_1.JPG",
         "/images/skthang/skth10_2.JPG",
         "/images/skthang/skth10_3.JPG",
         "/images/skthang/skth10_4.JPG",
         
         
          
       ],
      link: "/vi/blog/27",
    },
    {
      month: "T11",
      title: "Huý kỵ Cố Hoà thượng Thích Thanh Tứ",
      images: [
        "/images/skthang/skth11_1.JPG",
         "/images/skthang/skth11_2.JPG",
          "/images/skthang/skth11_3.JPG",
           "/images/skthang/skth11_4.JPG",
       ],
      link: "/vi/blog/28",
    },
    {
      month: "T12",
      title: "Lễ mồng Một, ngày Rằm",
      images: [
        
        "/images/skthang/m1_1.JPG",
         "/images/skthang/m1_2.JPG",
          "/images/skthang/m1_3.JPG",
           "/images/skthang/m1_4.JPG",
       ],
      link: "/vi/blog/24",
    },
  ];

  // 🟢 Ban đầu hiển thị tháng 1
  const [activeMonth, setActiveMonth] = useState(0);
  const handleMonthClick = (index) => setActiveMonth(index);

  const currentEvent = events[activeMonth];

  return (
    <div className="py-14 mt-[-60px] text-center">
      {/* Tiêu đề */}
      <h1 className="relative inline-block mr-[37%] mb-6  select-none transition-transform duration-300 ease-out hover:scale-105">
        <span
          className="relative z-10 block px-10 py-3 
            text-2xl font-bold
            text-[#176734] text-center
            bg-gradient-to-r from-stone-200 via-amber-300 to-stone-500
            rounded-xl 
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            transition-all duration-300 ease-out
            hover:text-red-500 hover:shadow-[0_12px_25px_rgba(0,0,0,0.45)]
            hover:from-gray-300 hover:to-gray-500"
        >
          SỰ KIỆN HÀNG THÁNG
        </span>
      </h1>
     

      {/* 🟢 Hiển thị 5 ảnh của tháng được chọn */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="flex justify-center gap-6 transition-all duration-500">
          {currentEvent.images.map((img, index) => (
            <a
              key={index}
              href={currentEvent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-2/5 block rounded-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`${currentEvent.title} ${index + 1}`}
                className="w-full h-58 object-cover transition-all duration-500 group-hover:brightness-110"
              />
              <div className="bg-black/50 text-white py-2 text-sm">
                
                <p className="text-xs">{currentEvent.title}</p>
              </div>
            </a>
          ))}
        </div>
         <div className="bg-[#176734] py-6 mt-10 overflow-x-auto scrollbar-hide">
        <div className="flex justify-center gap-9 min-w-max px-4">
          {events.map((event, index) => (
            <div
              key={event.month}
              onClick={() => handleMonthClick(index)}
              className={`cursor-pointer px-4 py-1 border-2 text-sm font-semibold rounded-md transition-all duration-300 whitespace-nowrap ${
                activeMonth === index
                  ? "bg-[#B43620] border-[#f4b01b] text-white"
                  : "border-[#f4b01b] text-[#f4b01b] hover:bg-[#f4b01b]/80 hover:text-white"
              }`}
            >
              {event.month}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* 🟢 Thanh chọn tháng */}
     
    </div>
  );
};

export default PromotionVi;

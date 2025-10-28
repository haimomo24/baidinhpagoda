'use client'
import React, { useState } from "react";

const PromotionVi = () => {
  // 🟢 Dữ liệu 12 tháng, mỗi tháng có 5 ảnh riêng
  const events = [
    {
      month: "Tháng 1",
      title: "New Year Celebration",
      images: ["data:image/jpeg;base64,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",
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAKSsliFKL2kekFXxqxHAVoIQMzJDRPiJ8aQ&s",
           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEngqxN3Y_4vX8Znsyt2gi6H3lgfPiaFGRw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2b2lyqyGkLVboFI9eYUH6xTWuYRY9rafw3w&s"],
      link: "/vi/visit/61",
    },
    {
      month: "Tháng 2",
      title: "Spring Festival",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s",
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s",
           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s", 
           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGL1l_6HwhBcPfAG-RyRVDkQzL-7fpqJPYnA&s"],
      link: "/vi/visit/62",
    },
    {
      month: "Tháng 3",
      title: "Flower Fair",
      images: [
        "/images/mar1.jpg",
         "/images/mar2.jpg",
          "/images/mar3.jpg", 
          "/images/mar4.jpg", 
          "/images/mar5.jpg"],
      link: "/vi/visit/63",
    },
    {
      month: "Tháng 4",
      title: "Water Festival",
      images: ["/images/apr1.jpg", "/images/apr2.jpg", "/images/apr3.jpg", "/images/apr4.jpg", "/images/apr5.jpg"],
      link: "/vi/visit/36",
    },
    {
      month: "Tháng 5",
      title: "Sea Tourism Week",
      images: ["/images/may1.jpg", "/images/may2.jpg", "/images/may3.jpg", "/images/may4.jpg", "/images/may5.jpg"],
      link: "/vi/visit/38",
    },
    {
      month: "Tháng 6",
      title: "Summer Vibes",
      images: ["/images/jun1.jpg", "/images/jun2.jpg", "/images/jun3.jpg", "/images/jun4.jpg", "/images/jun5.jpg"],
      link: "/vi/visit/39",
    },
    {
      month: "Tháng 7",
      title: "Mid-Year Celebration",
      images: ["/images/jul1.jpg", "/images/jul2.jpg", "/images/jul3.jpg", "/images/jul4.jpg", "/images/jul5.jpg"],
      link: "/vi/visit/40",
    },
    {
      month: "Tháng 8",
      title: "Cultural Festival",
      images: ["/images/aug1.jpg", "/images/aug2.jpg", "/images/aug3.jpg", "/images/aug4.jpg", "/images/aug5.jpg"],
      link: "/vi/visit/42",
    },
    {
      month: "Tháng 9",
      title: "Moon Festival",
      images: ["/images/sep1.jpg", "/images/sep2.jpg", "/images/sep3.jpg", "/images/sep4.jpg", "/images/sep5.jpg"],
      link: "/vi/visit/43",
    },
    {
      month: "Tháng 10",
      title: "Autumn Days",
      images: ["/images/oct1.jpg", "/images/oct2.jpg", "/images/oct3.jpg", "/images/oct4.jpg", "/images/oct5.jpg"],
      link: "/vi/visit/44",
    },
    {
      month: "Tháng 11",
      title: "Loy Krathong",
      images: ["/images/nov1.jpg", "/images/nov2.jpg", "/images/nov3.jpg", "/images/nov4.jpg", "/images/nov5.jpg"],
      link: "/vi/visit/56",
    },
    {
      month: "Tháng 12",
      title: "Christmas Celebration",
      images: ["/images/dec1.jpg", "/images/dec2.jpg", "/images/dec3.jpg", "/images/dec4.jpg", "/images/dec5.jpg"],
      link: "/vi/visit/57",
    },
  ];

  // 🟢 Ban đầu hiển thị tháng 1
  const [activeMonth, setActiveMonth] = useState(0);
  const handleMonthClick = (index) => setActiveMonth(index);

  const currentEvent = events[activeMonth];

  return (
    <div className="py-14 text-center">
      {/* Tiêu đề */}
      <h1 className="relative inline-block mb-6 select-none transition-transform duration-300 ease-out hover:scale-105">
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
      <p className="text-gray-600 mb-10">
        Kiểm tra các sự kiện sắp tới tại chùa Bái Đính
      </p>

      {/* 🟢 Hiển thị 5 ảnh của tháng được chọn */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="flex justify-center gap-5 transition-all duration-500">
          {currentEvent.images.map((img, index) => (
            <a
              key={index}
              href={currentEvent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-1/5 block rounded-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`${currentEvent.title} ${index + 1}`}
                className="w-full h-48 object-cover transition-all duration-500 group-hover:brightness-110"
              />
              <div className="bg-black/50 text-white py-2 text-sm">
                <p className="font-semibold">{currentEvent.month}</p>
                <p className="text-xs">{currentEvent.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 🟢 Thanh chọn tháng */}
      <div className="bg-[#b52025] py-6 mt-10 overflow-x-auto scrollbar-hide">
        <div className="flex justify-center gap-3 min-w-max px-4">
          {events.map((event, index) => (
            <div
              key={event.month}
              onClick={() => handleMonthClick(index)}
              className={`cursor-pointer px-4 py-1 border-2 text-sm font-semibold rounded-md transition-all duration-300 whitespace-nowrap ${
                activeMonth === index
                  ? "bg-[#f4b01b] border-[#f4b01b] text-white"
                  : "border-[#f4b01b] text-[#f4b01b] hover:bg-[#f4b01b]/80 hover:text-white"
              }`}
            >
              {event.month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionVi;

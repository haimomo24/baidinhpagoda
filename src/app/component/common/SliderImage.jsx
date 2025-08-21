// SliderImage.jsx
'use client'

import React, { useState, useEffect } from "react";

const slidesData = [
  {
    id: 1,
    image: "https://mia.vn/media/uploads/blog-du-lich/tong-hop-cac-kinh-nghiem-hanh-huong-chua-bai-dinh-huu-ich-1-1641327672.jpg",
    text: "BLOG\nChinh phục Hokkaido: Khám phá biển băng trời và vùng đất của bộ tộc Ainu",
  },
  {
    id: 2,
    image: "https://mia.vn/media/uploads/blog-du-lich/tong-hop-cac-kinh-nghiem-hanh-huong-chua-bai-dinh-huu-ich-2-1641327672.jpg",
    text: "BLOG\nKhám phá Tokyo sầm uất và nét văn hóa truyền thống",
  },
  {
    id: 3,
    image: "https://mia.vn/media/uploads/blog-du-lich/tong-hop-cac-kinh-nghiem-hanh-huong-chua-bai-dinh-huu-ich-2-1641327672.jpg",
    text: "BLOG\nKyoto: Vùng đất của những ngôi chùa cổ kính",
  },
];

const SliderImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showSlide = (index) => {
    if (index >= slidesData.length) setCurrentIndex(0);
    else if (index < 0) setCurrentIndex(slidesData.length - 1);
    else setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div className="min-w-full relative h-full" key={slide.id}>
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-20 left-10 text-white text-3xl md:text-5xl leading-snug drop-shadow-lg">
              {slide.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dots nằm đè lên ảnh */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => showSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderImage;

// SliderImage.jsx
'use client'

import React, { useState, useEffect } from "react";

const slidesData = [
  { id: 1, image: "/images/123.jpg", text: "" },
  { id: 2, image: "/images/DJI_0162.JPG", text: "" },
  { id: 3, image: "/images/DSC03101.JPG", text: "" },
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
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out`}
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
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

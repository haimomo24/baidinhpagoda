"use client";
import React, { useState, useEffect } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://113.160.202.187:1989";

const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ImageMapvi = () => {
  const [regions, setRegions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/visit`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi load dữ liệu visit:", err);
        setLoading(false);
      });
  }, []);

  const goToPrevious = () => setCurrentIndex(currentIndex === 0 ? regions.length - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === regions.length - 1 ? 0 : currentIndex + 1);

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (!regions || regions.length === 0) return <p className="text-center mt-10">Chưa có điểm checkin nào</p>;

  const currentRegion = regions[currentIndex];
  const images = [
    currentRegion.images_1 && `${API_URL}${currentRegion.images_1}`,
    currentRegion.images_2 && `${API_URL}${currentRegion.images_2}`,
    currentRegion.image_3 && `${API_URL}${currentRegion.image_3}`,
    currentRegion.images_4 && `${API_URL}${currentRegion.images_4}`,
    currentRegion.images_5 && `${API_URL}${currentRegion.images_5}`,
  ].filter(Boolean);
  const displayImages = images.slice(0, 4);

  return (
    <div className="w-full  lg:mt-[-150px] relative">
      <div className="bg-[#F1EBE5]/60 min-h-screen w-full flex justify-center items-center font-sans">
        <main className="container mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start gap-6 md:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8">
          {/* === Cột bên trái: Slider === */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col">
            <h1
  className="hover-shake text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center md:text-left"
>
  Các Điểm Check-in
</h1>

            <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 relative flex-1 flex flex-col">
              {/* Nút điều hướng */}
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Lưới hình ảnh */}
              <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3 sm:mb-4 flex-1">
                {displayImages.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-md h-24 sm:h-28 md:h-32">
                    <img
                      src={img}
                      alt={`${currentRegion.name} - ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Nội dung text */}
              <div className="px-1 sm:px-2 mt-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center md:text-left">
                  {currentRegion.name}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-1 sm:mt-2 text-center md:text-left">
                  {truncateText(
                    currentRegion.title_1 || currentRegion.title_2 || currentRegion.title_3 || "Chưa có mô tả",
                    100
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* === Cột bên phải: Bản đồ === */}
          <div className="w-full md:w-1/2 lg:w-2/3 flex justify-center mt-6 md:mt-0">
            <img
              src="https://viettourist.vn/upload/u23569/5/2017-01-09/so-do-bd-chuan_b-n-xe-trung-tam.jpg"
              alt="Bản đồ các điểm checkin"
              className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[550px] object-cover border-0 rounded-none shadow-none"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageMapvi;

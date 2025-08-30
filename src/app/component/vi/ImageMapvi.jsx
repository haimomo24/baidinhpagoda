'use client'
import React, { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// Hàm rút gọn text
const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ImageMapvi = () => {
  const [regions, setRegions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // gọi API lấy dữ liệu
  useEffect(() => {
    fetch(`${API_URL}/api/visit`)
      .then(res => res.json())
      .then(data => {
        setRegions(data.slice(0, 10)); // lấy tối đa 10 record mới nhất
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi load dữ liệu visit:", err);
        setLoading(false);
      });
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? regions.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === regions.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (!regions || regions.length === 0) return <p className="text-center">Chưa có điểm checkin nào</p>;

  const currentRegion = regions[currentIndex];

  // chuẩn bị mảng ảnh (chỉ push những ảnh nào có)
  const images = [];
  if (currentRegion.images_1) images.push(`${API_URL}${currentRegion.images_1}`);
  if (currentRegion.images_2) images.push(`${API_URL}${currentRegion.images_2}`);
  if (currentRegion.image_3) images.push(`${API_URL}${currentRegion.image_3}`);
  if (currentRegion.images_4) images.push(`${API_URL}${currentRegion.images_4}`);
if (currentRegion.images_5) images.push(`${API_URL}${currentRegion.images_5}`);
const displayImages = images.slice(0, 4);
 

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full mt-[-100px] flex justify-center items-center font-sans">
      <main className="container mx-auto flex flex-col lg:flex-row items-stretch gap-12 p-8">
  
  {/* === Cột bên trái: Slider === */}
  <div className="w-full lg:w-1/3 flex flex-col">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Các Điểm checkin</h1>
    
    <div className="bg-white rounded-lg shadow-xl p-4 relative flex-1 flex flex-col">
      {/* Nút điều hướng */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/3 -translate-y-1/2 -left-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
      >
        <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/3 -translate-y-1/2 -right-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
      >
        <ArrowRightIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Lưới hình ảnh */}
      <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
  {displayImages.map((img, index) => (
    <div key={index} className="overflow-hidden rounded-md h-32">
      <img 
        src={img} 
        alt={`${currentRegion.name} - ${index + 1}`} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
  ))}
</div>

      {/* Nội dung text */}
      <div className="px-2">
        <h2 className="text-2xl font-semibold text-gray-900">{currentRegion.name}</h2>
        <p className="text-gray-700 text-base leading-relaxed mt-2">
          {truncateText(
            currentRegion.title_1 || currentRegion.title_2 || currentRegion.title_3 || "Chưa có mô tả",
            100
          )}
        </p>
      </div>
    </div>
  </div>

  {/* === Cột bên phải: Bản đồ === */}
  <div className="w-full lg:w-2/3 flex justify-center">
    <img 
      src="https://viettourist.vn/upload/u23569/5/2017-01-09/so-do-bd-chuan_b-n-xe-trung-tam.jpg"
      alt="Bản đồ các điểm checkin" 
      className="w-full h-[550px] object-cover border-0 rounded-none shadow-none"
    />
  </div>

</main>

    </div>
  );
}

export default ImageMapvi;

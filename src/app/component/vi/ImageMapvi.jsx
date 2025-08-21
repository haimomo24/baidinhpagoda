// src/ImageMapen.jsx
'use client'
import React, { useState } from 'react';


const regionsData = [
  {
    name: 'Bảo Tháp',
    prefectures: ['Kyoto', 'Osaka', 'Shiga', 'Hyogo', 'Nara', 'Wakayama'],
    description: 'Một vùng Kansai ẩn chứa những sự tương phản, từ khung cảnh những ngọn đèn lấp lánh của Osaka đến kho tàng văn hóa của Kyoto và Nara.',
    images: [
      '/images/baothap/baothap.jpg', 
      '/images/baothap/baothap2.JPG', 
      '/images/baothap/baothap3.JPG', 
      '/images/baothap/baothap4.JPG', 
    ]
  },
  {
    name: 'Điện Tam Thế ',
    prefectures: ['Tokyo', 'Kanagawa', 'Saitama', 'Chiba', 'Gunma', 'Tochigi', 'Ibaraki'],
    description: 'Vùng Kanto là trung tâm chính trị, kinh tế và văn hóa của Nhật Bản, nổi bật với sự sôi động của thủ đô Tokyo và vẻ đẹp thiên nhiên xung quanh.',
    images: [
      '/images/tamthe/tamthe1.JPG', 
      '/images/tamthe/tamthe2.JPG', 
      '/images/tamthe/tamthe3.JPG', 
      '/images/tamthe/tamthe4.JPG', 
    ]
  },
   {
    name: 'Hokkaido',
    prefectures: ['Sapporo', 'Hakodate', 'Asahikawa', 'Otaru'],
    description: 'Hokkaido, hòn đảo phía bắc, nổi tiếng với thiên nhiên hoang sơ, mùa đông phủ đầy tuyết trắng và các lễ hội tuyết ngoạn mục.',
    images: [
      'https://images.unsplash.com/photo-1522775279809-b4722a578c77?q=80&w=1974&auto=format&fit=crop', // Lavender fields
      'https://images.unsplash.com/photo-1560982523-b1c411a30b63?q=80&w=2070&auto=format&fit=crop', // Sapporo Snow Festival
      'https://images.unsplash.com/photo-1613589613148-18e11e51b6a1?q=80&w=2070&auto=format&fit=crop', // Otaru Canal
      'https://images.unsplash.com/photo-1603140223595-b210f8373b88?q=80&w=2070&auto=format&fit=crop', // Winter landscape
    ]
  }
];

// SVG Icon cho các nút
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


const ImageMapen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? regionsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === regionsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentRegion = regionsData[currentIndex];

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full mt-[-150px] flex justify-center items-center font-sans">
      <main className="container mx-auto flex flex-col lg:flex-row items-center gap-12 p-8">
        
        {/* === Cột bên trái: Slider === */}
        <div className="w-full lg:w-2/5">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Địa Điểm checkin </h1>
          
          <div className="bg-white rounded-lg shadow-xl p-4 relative">
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
            <div className="grid grid-cols-2 gap-2 mb-4">
              {currentRegion.images.map((img, index) => (
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
              <p className="text-sm text-gray-500 my-2 font-medium">
                {currentRegion.prefectures.join(' | ')}
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                {currentRegion.description}
              </p>
            </div>
          </div>
        </div>

        {/* === Cột bên phải: Bản đồ === */}
        <div className="w-full lg:w-3/5">
          {/* !!! QUAN TRỌNG:
            Thay thế src="..." bằng đường dẫn đến file ảnh bản đồ của bạn.
            Bạn có thể đặt ảnh trong thư mục `public` và gọi nó trực tiếp.
            Ví dụ: nếu ảnh là `public/map.png`, src sẽ là "/map.png"
          */}
          <img 
            src="/images/Ban do Lo trinh Bai Dinh - Thung Ui-01.jpg" // <-- THAY THẾ BẰNG ẢNH CỦA BẠN
            alt="Bản đồ các vùng của Nhật Bản" 
            className="w-auto ml-[100px] h-[500px] object-contain"
          />
        </div>

      </main>
    </div>
  );
}

export default ImageMapen;
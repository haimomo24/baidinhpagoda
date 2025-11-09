"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MapPage from "../MapPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
  </svg>
);

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ImageMapen = () => {
  const [regions, setRegions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/visit`);
        const data = await res.json();

        // Chỉ lấy trường _en
        const formatted = data.slice(0, 10).map(region => ({
          id: region.id,
          name_en: region.name_en || region.name,
          title_1_en: region.title_1_en || region.title_1,
          title_2_en: region.title_2_en || region.title_2,
          title_3_en: region.title_3_en || region.title_3,
          title_4_en: region.title_4_en || region.title_4,
          title_5_en: region.title_5_en || region.title_5,
          images_1: region.images_1,
          images_2: region.images_2,
          image_3: region.image_3,
          images_4: region.images_4,
          images_5: region.images_5,
        }));

        setRegions(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi load dữ liệu visit:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToPrevious = () =>
    setCurrentIndex(currentIndex === 0 ? regions.length - 1 : currentIndex - 1);
  const goToNext = () =>
    setCurrentIndex(currentIndex === regions.length - 1 ? 0 : currentIndex + 1);

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (!regions || regions.length === 0)
    return <p className="text-center mt-10">Chưa có điểm checkin nào</p>;

  const currentRegion = regions[currentIndex];
  const images = [
    currentRegion.images_1 && `${API_URL}${currentRegion.images_1}`,
    currentRegion.images_2 && `${API_URL}${currentRegion.images_2}`,
    currentRegion.image_3 && `${API_URL}${currentRegion.image_3}`,
    currentRegion.images_4 && `${API_URL}${currentRegion.images_4}`,
    currentRegion.images_5 && `${API_URL}${currentRegion.images_5}`,
  ].filter(Boolean);
  const displayImages = images.slice(0, 4);

  const titleEn = [
    currentRegion.title_1_en,
    currentRegion.title_2_en,
    currentRegion.title_3_en,
    currentRegion.title_4_en,
    currentRegion.title_5_en
  ].find(Boolean) || "No description";

  return (
    <div className="w-full mt-[-50px] lg:mt-[-150px] relative">
      <div className="bg-[#F1EBE5]/60 min-h-screen w-full flex justify-center items-center font-sans">
        <main className="container mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start gap-6 md:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8">
          
          {/* Slider */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col">
            <h1 className="relative inline-block mb-6 select-none transition-transform duration-300 ease-out hover:scale-105">
              <span
                className="relative z-10 block px-10 py-3 text-2xl font-bold
                  text-[#176734] text-center
                  bg-gradient-to-r from-stone-200 via-amber-300 to-stone-500
                  rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                  transition-all duration-300 ease-out
                  hover:text-red-500 hover:shadow-[0_12px_25px_rgba(0,0,0,0.45)]
                  hover:from-gray-300 hover:to-gray-500"
              >
                CHECK-IN POINTS
              </span>
            </h1>

            <div
              onClick={() => router.push(`/en/visit/${currentRegion.id}`)} 
              className="bg-white rounded-lg shadow-xl p-3 sm:p-4 relative flex-1 flex flex-col cursor-pointer hover:shadow-2xl transition"
            >
              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3 sm:mb-4 flex-1">
                {displayImages.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-md h-24 sm:h-28 md:h-32 relative">
                    <Image
                      src={img}
                      alt={`${currentRegion.name_en} - ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Text */}
              <div className="px-1 sm:px-2 mt-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center md:text-left">
                  {currentRegion.name_en}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-1 sm:mt-2 text-center md:text-left">
                  {truncateText(titleEn, 100)}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <MapPage 
            regions={regions} 
            currentIndex={currentIndex} 
            setCurrentIndex={setCurrentIndex} 
          />
        </main>
      </div>
    </div>
  );
};

export default ImageMapen;

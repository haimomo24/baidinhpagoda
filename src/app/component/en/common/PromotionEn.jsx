"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PromotionEn = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const router = useRouter();

  // Cập nhật số lượng items theo kích thước màn hình
  const handleResize = () => {
    if (window.innerWidth < 768) setItemsPerSlide(1); // Mobile
    else if (window.innerWidth < 1024) setItemsPerSlide(2); // Tablet
    else setItemsPerSlide(4); // Desktop
  };

  useEffect(() => {
    handleResize(); // set lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lấy dữ liệu promotion tiếng Anh
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch("http://113.160.202.187:1989/api/promotion/en");
        const data = await res.json();
        setPromotions(data);
      } catch (err) {
        console.error("Lỗi khi load promotions:", err);
      }
    };
    fetchPromotions();
  }, []);

  const nextSlide = () => {
    if (currentIndex < promotions.length - itemsPerSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClick = (id) => {
    router.push(`/vi/khuyenmai/${id}`);
  };

  if (promotions.length === 0)
    return <p className="text-center py-10">Chưa có khuyến mãi nào</p>;

  return (
    <div className="bg-[#F1EBE5]/70 py-10">
      <div className="relative max-w-6xl mx-auto px-4">
        <h2
          className="
            relative inline-block px-10 py-3 mb-6
            text-2xl sm:text-3xl font-bold
            text-[#0F7F3E] text-center md:text-left
            bg-gradient-to-r from-stone-200 via-amber-200 to-stone-300
            rounded-xl shadow-2xl
            transition-all duration-300 ease-out
            hover:text-red-600 hover:scale-105 hover:shadow-xl
          "
        >
          FEATURED EVENTS
        </h2>

        {/* Nút trái */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-20 hover:bg-red-700 transition-colors"
          >
            <FaChevronLeft className="text-white" />
          </button>
        )}

        {/* Slide container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
            }}
          >
            {promotions.map((item) => (
              <div
                key={item.id}
                className={`px-2 shrink-0 w-full ${
                  itemsPerSlide === 4
                    ? "md:w-1/2 lg:w-1/4"
                    : itemsPerSlide === 2
                    ? "w-1/2"
                    : "w-full"
                }`}
                onClick={() => handleClick(item.id)}
              >
                <div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md">
                  <img
                    src={item.image}
                    alt={item.title_en || item.title}
                    className="w-full h-48 object-cover rounded-md transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-sm line-clamp-2">
                      {item.description_en || item.description || "No description"}
                    </p>
                  </div>
                </div>
                <h3 className="text-black text-base font-bold mt-2 line-clamp-1">
                  {item.title_en || item.title || "No title"}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Nút phải */}
        {currentIndex < promotions.length - itemsPerSlide && (
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-20 hover:bg-red-700 transition-colors"
          >
            <FaChevronRight className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PromotionEn;

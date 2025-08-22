// src/BlogPage.jsx
'use client'
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BlogPage = () => {
  const blogs = [
    {
      img: "https://img.baoninhbinh.org.vn//DATA/ARTICLES/2023/6/18/khoa-tu-mua-he-chua-bai-dinh-to-chuc-le-hoa-dang-cau-nguyen-b1c42.jpg",
      title: "Khoá Tu Mùa hè ",
    },
    {
      img: "https://media.vietnamplus.vn/images/ed1918d4cf848798286fdbd286ae25b406b95d2478e886d3f52ca07765bf691af594862dfc25ea3ffa4fe0d18c2da40987d5ccfc80f5147adb64a46c0c470127a333567bea3ce0aab61d0e875c1bdfe8ec9eef6a4146d0cc91025123fd1a0d38ff4fee10717dc99dc36b5fb5c8254a5a967e4317c60b3acfbb2a3ffed867c5b2/ttxvn-dong-dao-nguoi-dan-va-tin-do-phat-tu-chiem-bai-xa-loi-duc-phat-tai-chua-bai-dinh-8045339-7.jpg",
      title: "Xá Lợi Đức Phật",
    },
    {
      img: "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2024/8/12/98179a30-a574-42b7-941d-41101371e292/Anh%20tin%20tuc%20%2812%29.png",
      title: "Lễ Vu Lan Báo hiếu",
    },
    {
      img: "https://cdn-i.doisongphapluat.com.vn/resize/th/upload/2024/08/09/ngay-le-vu-lan-bao-hieu-la-ngay-gi-nguon-goc-va-y-nghia-dspl-1-10102027.jpg",
      title: "Lễ Hội Hoa Đăng",
    },
    {
      img: "https://bizweb.dktcdn.net/100/349/716/files/bai-dinh-03.jpg?v=1565173213556",
      title: "Bái Đính Về Đêm  ",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4; // hiển thị 4 ảnh/lượt

  const nextSlide = () => {
    if (currentIndex < blogs.length - itemsPerSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-[#FFFFFF] py-10">
      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6"> Sự Kiện </h2>

        {/* Nút trái */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 -translate-y-1/2 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            <FaChevronLeft className="text-white" />
          </button>
        )}

        {/* Slide container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)` }}
          >
            {blogs.map((item, index) => (
              <div
                key={index}
                className="w-1/4 px-2 shrink-0"
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút phải */}
        {currentIndex < blogs.length - itemsPerSlide && (
          <button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
          >
            <FaChevronRight className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

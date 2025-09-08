// src/BlogPage.jsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BlogPage = () => {
  const blogs = [
    { img: "https://vissaihotel.vn/photo/khu-du-lich-trang-an-ninh-binh-co-gi-2.jpg", title: "Tràng An", link: "https://trangandanhthang.vn/" },
    { img: "https://bizweb.dktcdn.net/100/366/377/files/tam-coc-ninh-binh-31a3e3c7-0fa2-446a-b1b1-3a1e4f1bbe7e.jpg?v=1698027951505", title: "Tam Cốc", link: "https://tamcocbichdong.vn/" },
    { img: "https://disantrangan.vn/wp-content/uploads/2021/09/san_golf_trang_an_09.jpg", title: "Sân golf Tràng An", link: "https://trangangolfandresort.com/" },
    { img: "https://bizweb.dktcdn.net/100/366/377/files/anh-chup-o-pho-co-hoa-lu.jpg?v=1669954575118", title: "Phố cổ Hoa Lư", link: "https://www.phocohoalu.com/" },
    { img: "/images/DSC00002.JPG", title: "Bái Đính" },
    { img: "https://mia.vn/media/uploads/blog-du-lich/tuyet-tinh-coc-ninh-binh-1-1690702331.jpg", title: "Tuyệt Tình Cốc", link: "https://chuabaidinhnbinh.com/" },
    { img: "/images/tamchuc.jpg", title: "Chùa Tam Chúc", link: "https://tamchuc.com.vn/" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const visibleBlogs = [
    blogs[(current - 1 + blogs.length) % blogs.length],
    blogs[current],
    blogs[(current + 1) % blogs.length],
    blogs[(current + 2) % blogs.length],
    blogs[(current + 3) % blogs.length],
    blogs[(current + 4) % blogs.length],
  ];

  return (
    <div className="w-full bg-[#F1EBE5]/70 py-12">
      {/* TIÊU ĐỀ TRANG */}
      <div className="max-w-6xl mx-auto flex justify-start mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Điểm Du Lịch Hấp Dẫn 
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative flex items-center justify-center overflow-hidden">
        {/* Nút trái */}
        <button
          onClick={prevSlide}
          className="absolute left-40 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-200"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Danh sách ảnh */}
        <div className="flex space-x-6 transition-transform duration-500 group-hover:scale-110">
          {visibleBlogs.map((blog, index) => {
            const isCenter = index >= 1 && index <= 4;

            const content = (
              <div
                className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:scale-80 ${
                  isCenter
                    ? "w-72 h-96 opacity-100 scale-100"
                    : "w-60 h-80 opacity-50 scale-90"
                }`}
              >
                <img
                  src={blog.img}
                  alt={blog.title || `Blog ${index}`}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                {/* Chữ minh họa */}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p className="text-white text-xl font-bold hover:scale-110 ">
                      {blog.title}
                    </p>
                  </div>
                )}
              </div>
            );

            
            return blog.link ? (
              <Link
                key={index}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>

        {/* Nút phải */}
        <button
          onClick={nextSlide}
          className="absolute right-40 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-200"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BlogPage;

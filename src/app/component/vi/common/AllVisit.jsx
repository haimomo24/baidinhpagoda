"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const blogs = [
  {
    img: "https://vissaihotel.vn/photo/khu-du-lich-trang-an-ninh-binh-co-gi-2.jpg",
    title: "Tràng An",
    link: "https://trangandanhthang.vn/",
  },
  {
    img: "https://bizweb.dktcdn.net/100/366/377/files/tam-coc-ninh-binh-31a3e3c7-0fa2-446a-b1b1-3a1e4f1bbe7e.jpg?v=1698027951505",
    title: "Tam Cốc",
    link: "https://tamcocbichdong.vn/",
  },
  {
    img: "https://disantrangan.vn/wp-content/uploads/2021/09/san_golf_trang_an_09.jpg",
    title: "Sân golf Tràng An",
    link: "https://trangangolfandresort.com/",
  },
  {
    img: "https://bizweb.dktcdn.net/100/366/377/files/anh-chup-o-pho-co-hoa-lu.jpg?v=1669954575118",
    title: "Phố cổ Hoa Lư",
    link: "https://www.phocohoalu.com/",
  },
  { img: "/images/DSC00002.JPG", title: "Bái Đính" },
  {
    img: "https://mia.vn/media/uploads/blog-du-lich/tuyet-tinh-coc-ninh-binh-1-1690702331.jpg",
    title: "Tuyệt Tình Cốc",
    link: "https://chuabaidinhnbinh.com/",
  },
  {
    img: "/images/tamchuc.jpg",
    title: "Chùa Tam Chúc",
    link: "https://tamchuc.com.vn/",
  },
];

// ========== MOBILE SLIDER ==========
const MobileSlider = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) {
      setCurrent((prev) => (prev - 1 + blogs.length) % blogs.length);
    } else if (diff < -50) {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }
  };

  const blog = blogs[current];

  return (
    <div
      className="relative w-full px-4 block sm:hidden" // chỉ hiện mobile
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg relative">
        <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="text-white text-xl font-bold">{blog.title}</p>
        </div>
      </div>
    </div>
  );
};

// ========== DESKTOP/TABLET SLIDER ==========
const DesktopSlider = () => {
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 1024);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % blogs.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + blogs.length) % blogs.length);

  const slidesToShow = windowWidth < 1024 ? 2 : 4;
  let visibleBlogs = [];
  const total = slidesToShow + 2;
  for (let i = 0; i < total; i++) {
    visibleBlogs.push(blogs[(current + i) % blogs.length]);
  }
  const offset = windowWidth < 1024 ? 20 : 40;

  return (
    <div className="relative flex items-center justify-center overflow-hidden px-4 hidden sm:flex">
      {/* left button */}
      <button
        onClick={prevSlide}
        className="absolute z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-200"
        style={{ left: `${offset}px` }}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* slides */}
      <div className="flex transition-transform duration-500 space-x-4 w-full justify-center">
        {visibleBlogs.map((blog, index) => {
          const isCenter = index >= 1 && index <= slidesToShow;
          const classNames = isCenter
            ? "w-72 h-96 opacity-100 scale-100"
            : "w-60 h-80 opacity-50 scale-90";

          const content = (
            <div
              key={index}
              className={`relative rounded-xl hover:scale-110 overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${classNames}`}
            >
              <img
                src={blog.img}
                alt={blog.title || `Blog ${index}`}
                className="w-full h-full object-cover group-hover:scale-110 hover:scale-110 transform transition-transform duration-500 "
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-white text-xl font-bold">{blog.title}</p>
              </div>
            </div>
          );

          return blog.link ? (
            <Link key={index} href={blog.link} target="_blank" rel="noopener noreferrer">
              {content}
            </Link>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      {/* right button */}
      <button
        onClick={nextSlide}
        className="absolute z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-200"
        style={{ right: `${offset}px` }}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

// ========== MAIN ==========
const BlogPage = () => {
  return (
    <div className="w-full bg-[#F1EBE5]/70 py-12">
      <div className="max-w-6xl mx-auto flex justify-start mb-10 px-4">
        <h2 className="hover-shake hover:text-red-600 text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">ĐIỂM DU LỊCH HẤP DẪN</h2>
      </div>

      <MobileSlider />
      <DesktopSlider />
    </div>
  );
};

export default BlogPage;

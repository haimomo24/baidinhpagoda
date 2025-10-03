"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

const BlogPageen = () => {
     const [blogs, setBlogs] = useState([]);
      const [loading, setLoading] = useState(true);
    
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 9;
    
      useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const res = await fetch("http://113.160.202.187:1989/api/blog");
            const data = await res.json();
            setBlogs(data);
          } catch (error) {
            console.error("Lỗi khi fetch blogs:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchBlogs();
      }, []);
    
      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
      const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
    
      const totalPages = Math.ceil(blogs.length / itemsPerPage);
    
      if (loading) {
        return <div className="text-center py-10">Đang tải dữ liệu...</div>;
      }
  return (
    <div
      className="w-full min-h-screen mt-[-40px] bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")`,
        backgroundSize: "100% 100%",
      }}
    >
      {/* lớp phủ mờ */}
      <div className="bg-[#F1EBE5]/60 min-h-screen">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <h2  className="
    relative inline-block px-10 py-3 mb-6
    text-2xl sm:text-2xl lg:text-2xl font-bold
    text-[#0F7F3E] text-center md:text-left
    bg-gradient-to-r from-stone-200 via-amber-200 to-stone-300
    rounded-xl shadow-2xl
    transition-all duration-300 ease-out

    hover:text-red-600 hover:scale-105 hover:shadow-amber-500/50 hover:shadow-xl hover-shake
  "
>GENERAL NEWS</h2>

          {/* Grid 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentBlogs.map((item) => (
              <Link key={item.id} href={`/vi/blog/${item.id}`}>
                <div className="rounded-lg overflow-hidden group cursor-pointer shadow-md bg-white">
                  <img
                    src={item.images_1 ? item.images_1 : "/default.jpg"}
                    alt={item.title_1 || item.name}
                    className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-lg hover-shake font-bold mb-2 truncate">{item.title_1}</h3>
                    <p className="text-gray-600 hover-shake text-sm line-clamp-2">{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex justify-end mt-6 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-[#005F5A] text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPageen
'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
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
    <div className="bg-[#FFFFFF] py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Bai Dinh complex</h2>

        {/* Grid 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentBlogs.map((item) => (
            <Link key={item.id} href={`/vi/blog/${item.id}`}>
              <div className="rounded-lg overflow-hidden group cursor-pointer shadow-md">
                <img
                  src={item.images_1 ? `/uploads/${item.images_1}` : "/default.jpg"} 
                  alt={item.title_1}
                  className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-4 bg-white">
                  {/* Title ngắn gọn */}
                  <h3 className="text-lg font-bold mb-2 truncate">{item.title_1}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.name}</p>
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
                currentPage === i + 1 ? "bg-[#005F5A] text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

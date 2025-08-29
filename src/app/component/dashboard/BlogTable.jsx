"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blog từ backend Node.js
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/blog");
      const data = await res.json();
      setBlogs(data); // lưu dữ liệu vào state
    } catch (error) {
      console.error("Lỗi khi fetch blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Xoá blog
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xoá blog này?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/blog/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Xoá thành công!");
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Xoá thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  // Hiển thị title rút gọn với nút xem thêm/thu gọn
  const renderTitle = (blogId, field, text) => {
    const key = `${blogId}-${field}`;
    const isExpanded = expanded[key];
    if (!text) return "Không có dữ liệu";

    return (
      <div>
        {isExpanded ? text : text.length > 50 ? text.substring(0, 50) + "..." : text}
        {text.length > 50 && (
          <button
            onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isExpanded }))}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };

  if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/blog/addblog"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Thêm Blog
        </Link>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Title 1</th>
            <th className="px-6 py-3">Title 2</th>
            <th className="px-6 py-3">Title 3</th>
            <th className="px-6 py-3">Image 1</th>
            <th className="px-6 py-3">Image 2</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog.id} className="bg-white border-b">
                <td className="px-6 py-4">{blog.id}</td>
                <td className="px-6 py-4">{blog.name}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_1", blog.title_1)}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_2", blog.title_2)}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_3", blog.title_3)}</td>
                <td className="px-6 py-4">
                  {blog.images_1 ? (
                    <img
                      src={blog.images_1}
                      alt="image1"
                      className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedBlog(blog)}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="px-6 py-4">
                  {blog.images_2 ? (
                    <img
                      src={blog.images_2}
                      alt="image2"
                      className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedBlog(blog)}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link
                    href={`/blog/edit/${blog.id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal xem ảnh */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedBlog(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedBlog.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {selectedBlog.images_1 && (
                <img src={selectedBlog.images_1} alt="Ảnh 1" className="w-full h-60 object-cover rounded" />
              )}
              {selectedBlog.images_2 && (
                <img src={selectedBlog.images_2} alt="Ảnh 2" className="w-full h-60 object-cover rounded" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;

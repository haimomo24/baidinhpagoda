"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Lưu trạng thái mở/đóng theo blogId + fieldName

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Lỗi khi lấy blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xoá blog này?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Xoá thành công!");
        fetchBlogs();
      } else {
        alert("Xoá thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  // Hàm hiển thị rút gọn nội dung
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

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr key={blog.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{blog.id}</td>
                <td className="px-6 py-4">{blog.name}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_1", blog.title_1)}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_2", blog.title_2)}</td>
                <td className="px-6 py-4">{renderTitle(blog.id, "title_3", blog.title_3)}</td>
                <td className="px-6 py-4">
                  {blog.images_1 ? (
                    <img src={`/uploads/${blog.images_1}`} alt="image1" className="w-16 h-16 object-cover rounded" />
                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="px-6 py-4">
                  {blog.images_2 ? (
                    <img src={`/uploads/${blog.images_2}`} alt="image2" className="w-16 h-16 object-cover rounded" />
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
    </div>
  );
};

export default BlogTable;

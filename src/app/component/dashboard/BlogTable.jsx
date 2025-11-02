"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadFiles, setUploadFiles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const API_URL = "http://113.160.202.187:1989/api/blog";

  // 📌 Fetch blog
  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Lỗi khi fetch blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🗑 Xoá blog
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xoá blog này?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Xoá thành công!");
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else alert("Xoá thất bại!");
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  // ✂️ Hiển thị tiêu đề rút gọn
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

  // 📝 Mở modal sửa
  const openEditModal = (blog) => {
    setEditBlog(blog);
    setFormData({
      name: blog.name || "",
      title_1: blog.title_1 || "",
      title_2: blog.title_2 || "",
      title_3: blog.title_3 || "",
      name_en: blog.name_en || "",
      title_1_en: blog.title_1_en || "",
      title_2_en: blog.title_2_en || "",
      title_3_en: blog.title_3_en || "",
    });
    setUploadFiles({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUploadFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editBlog) return;

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
      Object.keys(uploadFiles).forEach((key) => fd.append(key, uploadFiles[key]));

      const res = await fetch(`${API_URL}/${editBlog.id}`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        alert("Cập nhật thành công!");
        fetchBlogs();
        setEditBlog(null);
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;

  // 🔍 Lọc danh sách theo tên
  const filteredBlogs = blogs.filter((blog) =>
    blog.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Phân trang
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative overflow-x-auto">
      {/* Thanh tìm kiếm và thêm mới */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded w-1/3"
        />
        <Link
          href="/dashboard/blog/addblog"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Thêm Blog
        </Link>
      </div>

      {/* Bảng danh sách blog */}
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
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
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
                  <button
                    onClick={() => openEditModal(blog)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
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

      {/* 🔹 Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            « Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Sau »
          </button>
        </div>
      )}

      {/* Modal sửa blog */}
      {editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[90%] h-[90%] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setEditBlog(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-6">Sửa Blog: {editBlog.name}</h2>

            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <h3 className="text-lg font-semibold text-blue-600">🌐 Tiếng Việt</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên Blog</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>

              <textarea
                name="title_1"
                value={formData.title_1 || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 1"
                className="border rounded px-3 py-2 w-full resize-y"
              />
              <textarea
                name="title_2"
                value={formData.title_2 || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 2"
                className="border rounded px-3 py-2 w-full resize-y"
              />
              <textarea
                name="title_3"
                value={formData.title_3 || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 3"
                className="border rounded px-3 py-2 w-full resize-y"
              />

              <h3 className="text-lg font-semibold text-green-600 mt-6">🇬🇧 English</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Name (EN)
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en || ""}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <textarea
                name="title_1_en"
                value={formData.title_1_en || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 1 (EN)"
                className="border rounded px-3 py-2 w-full resize-y"
              />
              <textarea
                name="title_2_en"
                value={formData.title_2_en || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 2 (EN)"
                className="border rounded px-3 py-2 w-full resize-y"
              />
              <textarea
                name="title_3_en"
                value={formData.title_3_en || ""}
                onChange={handleInputChange}
                rows={4}
                placeholder="Title 3 (EN)"
                className="border rounded px-3 py-2 w-full resize-y"
              />

              {/* 4 ảnh */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh 1</label>
                  <input type="file" name="images_1" onChange={handleFileChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh 2</label>
                  <input type="file" name="images_2" onChange={handleFileChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh 3</label>
                  <input type="file" name="images_3" onChange={handleFileChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh 4</label>
                  <input type="file" name="images_4" onChange={handleFileChange} className="w-full" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditBlog(null)}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;

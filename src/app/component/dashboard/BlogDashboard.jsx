"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BlogDashboard = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    title_1: "",
    images_1: null,
    images_1Preview: null,
    title_2: "",
    images_2: null,
    images_2Preview: null,
    title_3: "",
    title_4: "",
    images_3: null,
    images_3Preview: null,
    title_5: "",
    images_4: null,
    images_4Preview: null,
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: file,
      [`${name}Preview`]: file ? URL.createObjectURL(file) : null,
    });
  };

  // Xóa ảnh
  const handleRemoveImage = (name) => {
    setFormData({
      ...formData,
      [name]: null,
      [`${name}Preview`]: null,
    });
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formToSend = new FormData();
      formToSend.append("name", formData.name);
      formToSend.append("title_1", formData.title_1);
      formToSend.append("title_2", formData.title_2);
      formToSend.append("title_3", formData.title_3);
      formToSend.append("title_4", formData.title_4);
      formToSend.append("title_5", formData.title_5);

      if (formData.images_1) formToSend.append("images_1", formData.images_1);
      if (formData.images_2) formToSend.append("images_2", formData.images_2);
      if (formData.images_3) formToSend.append("images_3", formData.images_3);
      if (formData.images_4) formToSend.append("images_4", formData.images_4);

      const res = await fetch("http://113.160.202.187:1985/api/blog", {
        method: "POST",
        body: formToSend,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Đăng blog thành công!");
        router.push("/dashboard/blog");
      } else {
        alert("❌ Lỗi: " + data.error);
      }
    } catch (err) {
      console.error("Lỗi upload:", err);
      alert("❌ Có lỗi xảy ra khi đăng bài.");
    }
  };

  // Hàm hiển thị vùng chọn ảnh
  const renderImageUpload = (label, name, preview) => (
    <div>
      <label className="block font-semibold mb-2 text-lg">{label}</label>
      {!preview ? (
        <label className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700">
          Chọn ảnh
          <input type="file" name={name} onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="relative inline-block mt-4">
          <img
            src={preview}
            alt={name}
            className="max-h-80 rounded-xl shadow-md border"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(name)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-10 min-h-screen text-black">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tiêu đề chính */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Tên tiêu đề chính:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên tiêu đề chính..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>

        {/* --- Mở bài --- */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Mở bài</label>
          <textarea
            name="title_1"
            value={formData.title_1}
            onChange={handleChange}
            rows="4"
            placeholder="Nhập nội dung mở bài..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
        {renderImageUpload("Ảnh 1:", "images_1", formData.images_1Preview)}

        {/* --- Thân bài 1 --- */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Thân bài 1</label>
          <textarea
            name="title_2"
            value={formData.title_2}
            onChange={handleChange}
            rows="4"
            placeholder="Nhập nội dung thân bài 1..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
        {renderImageUpload("Ảnh 2:", "images_2", formData.images_2Preview)}

        {/* --- Thân bài 2 --- */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Thân bài 2</label>
          <textarea
            name="title_4"
            value={formData.title_4}
            onChange={handleChange}
            rows="4"
            placeholder="Nhập nội dung thân bài 2..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
        {renderImageUpload("Ảnh 3:", "images_3", formData.images_3Preview)}

        {/* --- Kết bài --- */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Kết bài</label>
          <textarea
            name="title_5"
            value={formData.title_5}
            onChange={handleChange}
            rows="3"
            placeholder="Nhập nội dung kết bài..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>
        {renderImageUpload("Ảnh 4:", "images_4", formData.images_4Preview)}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 text-white px-10 py-4 text-xl rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogDashboard;

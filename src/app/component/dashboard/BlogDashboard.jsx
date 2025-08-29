"use client";

import React, { useState } from "react";

const BlogDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    title_1: "",
    images_1: null,
    images_1Preview: null,
    title_2: "",
    images_2: null,
    images_2Preview: null,
    title_3: "",
  });

  // Thay đổi input text / textarea
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: file,
      [`${name}Preview`]: file ? URL.createObjectURL(file) : null,
    });
  };

  // Xóa ảnh đã chọn
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
      if (formData.images_1) formToSend.append("images_1", formData.images_1);
      if (formData.images_2) formToSend.append("images_2", formData.images_2);

      const res = await fetch("http://localhost:4000/api/blog", {
        method: "POST",
        body: formToSend,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng blog thành công!");
        setFormData({
          name: "",
          title_1: "",
          images_1: null,
          images_1Preview: null,
          title_2: "",
          images_2: null,
          images_2Preview: null,
          title_3: "",
        });
      } else {
        alert("Lỗi: " + data.error);
      }
    } catch (err) {
      console.error("Lỗi upload:", err);
      alert("Có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <div className="p-10 min-h-screen text-black">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tên tiêu đề chính */}
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

        {/* Title 1 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Mở bài</label>
          <textarea
            name="title_1"
            value={formData.title_1}
            onChange={handleChange}
            rows="4"
            placeholder="Nhập nội dung mở bài..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
            required
          />
        </div>

        {/* Ảnh 1 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Ảnh 1:</label>
          {!formData.images_1Preview ? (
            <label className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700">
              Chọn ảnh
              <input type="file" name="images_1" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="relative inline-block mt-4">
              <img
                src={formData.images_1Preview}
                alt="Preview 1"
                className="max-h-80 rounded-xl shadow-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("images_1")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Title 2 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Thân bài</label>
          <textarea
            name="title_2"
            value={formData.title_2}
            onChange={handleChange}
            rows="5"
            placeholder="Nhập nội dung thân bài..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
            required
          />
        </div>

        {/* Ảnh 2 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Ảnh 2:</label>
          {!formData.images_2Preview ? (
            <label className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700">
              Chọn ảnh
              <input type="file" name="images_2" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="relative inline-block mt-4">
              <img
                src={formData.images_2Preview}
                alt="Preview 2"
                className="max-h-80 rounded-xl shadow-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage("images_2")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Title 3 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Kết bài</label>
          <textarea
            name="title_3"
            value={formData.title_3}
            onChange={handleChange}
            rows="3"
            placeholder="Nhập nội dung kết bài..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-blue-400 resize-none"
            required
          />
        </div>

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

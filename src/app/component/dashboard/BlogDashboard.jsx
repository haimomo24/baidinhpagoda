"use client";

import React, { useState } from "react";

const BlogDashboard = () => {
  const [formData, setFormData] = useState({
    name: "", // mainTitle -> name
    title_1: "",
    images_1: null,
    images_1Preview: null,
    title_2: "",
    images_2: null,
    images_2Preview: null,
    title_3: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: file,
      [`${name}Preview`]: file ? URL.createObjectURL(file) : null,
    });
  };

  const handleRemoveImage = (name) => {
    setFormData({
      ...formData,
      [name]: null,
      [`${name}Preview`]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("title_1", formData.title_1);
      formDataToSend.append("title_2", formData.title_2);
      formDataToSend.append("title_3", formData.title_3);
      if (formData.images_1) formDataToSend.append("images_1", formData.images_1);
      if (formData.images_2) formDataToSend.append("images_2", formData.images_2);

      const res = await fetch("/api/blog", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng bài thành công!");
        console.log("Kết quả:", data);
      } else {
        alert("Lỗi: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <div className="p-10 min-h-screen text-black ">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tiêu đề chính */}
        <div>
          <label className="block font-semibold mb-2 text-lg">
            Tên tiêu đề chính:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập tên tiêu đề chính..."
          />
        </div>

        {/* Mở bài */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Mở bài</label>
          <textarea
            name="title_1"
            value={formData.title_1}
            onChange={handleChange}
            rows="4"
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Nhập nội dung mở bài..."
          />
        </div>

        {/* Ảnh 1 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Ảnh 1:</label>
          {!formData.images_1Preview ? (
            <label className="inline-block bg-[#E7000B] text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700 shadow-md">
              Chọn ảnh
              <input
                type="file"
                name="images_1"
                onChange={handleFileChange}
                className="hidden"
              />
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

        {/* Thân bài */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Thân bài</label>
          <textarea
            name="title_2"
            value={formData.title_2}
            onChange={handleChange}
            rows="5"
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Nhập nội dung thân bài..."
          />
        </div>

        {/* Ảnh 2 */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Ảnh 2:</label>
          {!formData.images_2Preview ? (
            <label className="inline-block bg-[#E7000B] text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700 shadow-md">
              Chọn ảnh
              <input
                type="file"
                name="images_2"
                onChange={handleFileChange}
                className="hidden"
              />
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

        {/* Kết bài */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Kết bài</label>
          <textarea
            name="title_3"
            value={formData.title_3}
            onChange={handleChange}
            rows="3"
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Nhập nội dung kết bài..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-red-500 text-white px-10 py-4 text-xl rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogDashboard;

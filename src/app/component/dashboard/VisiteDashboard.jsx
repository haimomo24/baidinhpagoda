"use client";
import React, { useState } from "react";

// URL backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const VisiteDashboard = () => {
  const [formData, setFormData] = useState({
    mainTitle: "",
    title1: "",
    image1: null,
    image1Preview: null,
    title2: "",
    image2: null,
    image2Preview: null,
    title3: "",
    image3: null,
    image3Preview: null,
    title4: "",
    image4: null,
    image4Preview: null,
    title5: "",
    image5: null,
    image5Preview: null,
  });

  // Thay đổi input text
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Upload ảnh
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

  // Submit form -> Gửi dữ liệu lên API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.mainTitle);
      data.append("title_1", formData.title1);
      data.append("title_2", formData.title2);
      data.append("title_3", formData.title3);
      data.append("title_4", formData.title4);
      data.append("title_5", formData.title5);

      if (formData.image1) data.append("images_1", formData.image1);
      if (formData.image2) data.append("images_2", formData.image2);
      if (formData.image3) data.append("image_3", formData.image3);
      if (formData.image4) data.append("images_4", formData.image4);
      if (formData.image5) data.append("images_5", formData.image5);

      const res = await fetch(`${API_URL}/api/visit/`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Bài review đã được tạo!");
        setFormData({
          mainTitle: "",
          title1: "",
          image1: null,
          image1Preview: null,
          title2: "",
          image2: null,
          image2Preview: null,
          title3: "",
          image3: null,
          image3Preview: null,
          title4: "",
          image4: null,
          image4Preview: null,
          title5: "",
          image5: null,
          image5Preview: null,
        });
      } else {
        alert("❌ Lỗi: " + result.error);
      }
    } catch (err) {
      console.error("Lỗi submit:", err);
      alert("❌ Có lỗi khi gửi dữ liệu!");
    }
  };

  // Render khối nhập text + ảnh
  const renderSection = (titleLabel, titleName, imageName, previewKey) => (
    <div>
      <label className="block font-semibold mb-2 text-lg">{titleLabel}</label>
      <textarea
        name={titleName}
        value={formData[titleName]}
        onChange={handleChange}
        rows="3"
        className="w-full bg-transparent border-b-2 border-gray-500 p-3 text-lg focus:outline-none focus:border-blue-400 resize-none"
        placeholder={`Nhập nội dung ${titleLabel.toLowerCase()}...`}
      />
      <label className="block font-semibold mt-4 mb-2 text-lg">Ảnh:</label>
      {!formData[previewKey] ? (
        <label className="inline-block bg-red-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 shadow-md">
          Chọn ảnh
          <input
            type="file"
            name={imageName}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative inline-block mt-4">
          <img
            src={formData[previewKey]}
            alt={`Preview ${titleLabel}`}
            className="max-h-60 rounded-xl shadow-md border"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(imageName)}
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
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Tiêu đề chính */}
        <div>
          <label className="block font-semibold mb-2 text-lg">
            Tiêu đề chính:
          </label>
          <input
            type="text"
            name="mainTitle"
            value={formData.mainTitle}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-3 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập tiêu đề bài viết..."
          />
        </div>

        {/* Các đoạn + ảnh */}
        {renderSection("Nội dung 1", "title1", "image1", "image1Preview")}
        {renderSection("Nội dung 2", "title2", "image2", "image2Preview")}
        {renderSection("Nội dung 3", "title3", "image3", "image3Preview")}
        {renderSection("Nội dung 4", "title4", "image4", "image4Preview")}
        {renderSection("Nội dung 5", "title5", "image5", "image5Preview")}

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 text-white px-10 py-4 text-xl rounded-2xl hover:bg-green-700 transition-all shadow-lg"
          >
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisiteDashboard;

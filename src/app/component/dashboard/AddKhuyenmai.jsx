"use client";

import React, { useState } from "react";

const toDigits = (v) => (v || "").replace(/[^\d]/g, ""); 
const fmt = (v) => (v ? Number(v).toLocaleString("vi-VN") : ""); 

const AddKhuyenmai = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit: "",
    price_1: "",    
    price_2: "",
    title: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // nếu là giá -> lọc về digits
    if (name === "price_1" || name === "price_2") {
      setFormData((p) => ({ ...p, [name]: toDigits(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData((p) => ({
      ...p,
      image: file || null,
      imagePreview: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((p) => ({ ...p, image: null, imagePreview: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formToSend = new FormData();
      formToSend.append("name", formData.name);
      formToSend.append("description", formData.description);
      formToSend.append("unit", formData.unit);
      // GỬI CHUỖI SỐ THUẦN, KHÔNG DẤU
      if (formData.price_1) formToSend.append("price_1", formData.price_1);
      if (formData.price_2) formToSend.append("price_2", formData.price_2);
      formToSend.append("title", formData.title);
      if (formData.image) formToSend.append("image", formData.image);

      const res = await fetch("http://113.160.202.187:1985/api/promotion", {
        method: "POST",
        body: formToSend,
      });

      const data = await res.json();
      if (!res.ok) {
        alert("Lỗi: " + (data?.error || "Không xác định"));
        return;
      }

      alert("Thêm promotion thành công!");
      setFormData({
        name: "",
        description: "",
        unit: "",
        price_1: "",
        price_2: "",
        title: "",
        image: null,
        imagePreview: null,
      });
    } catch (err) {
      console.error("Lỗi upload:", err);
      alert("Có lỗi xảy ra khi thêm promotion.");
    }
  };

  return (
    <div className="p-10 min-h-screen text-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên sản phẩm..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Mô tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Nhập mô tả..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500 resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Đơn vị:</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Ví dụ: hộp, cái..."
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Giá công bố */}
        <div>
          <label className="block font-semibold mb-2">Giá công bố:</label>
          <input
            type="text"
            inputMode="numeric"
            name="price_1"
            value={fmt(formData.price_1)}
            onChange={handleChange}
            placeholder="VD: 400000 hoặc 400.000"
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Giá bán */}
        <div>
          <label className="block font-semibold mb-2">Giá bán:</label>
          <input
            type="text"
            inputMode="numeric"
            name="price_2"
            value={fmt(formData.price_2)}
            onChange={handleChange}
            placeholder="VD: 350000 hoặc 350.000"
            className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-green-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">* Hệ thống tự bỏ dấu khi gửi lên server.</p>
        </div>

        <div>
          <label className="block font-semibold mb-2">Hình ảnh:</label>
          {!formData.imagePreview ? (
            <label className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-green-700">
              Chọn ảnh
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative inline-block mt-4">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="max-h-80 rounded-xl shadow-md border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-10 py-4 text-xl rounded-2xl hover:bg-green-700 transition-all shadow-lg"
          >
            Thêm khuyến mãi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddKhuyenmai;

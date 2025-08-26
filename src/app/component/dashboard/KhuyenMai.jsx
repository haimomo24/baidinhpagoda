"use client";

import React, { useState } from "react";

const KhuyenMai = () => {
  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    tenSanPham: "",
    donVi: "",
    giaCongBo: "",
    giaBan: "",
    dienGiai: "",
  });

  // Xử lý thay đổi input text
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý upload ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      imagePreview: file ? URL.createObjectURL(file) : null,
    });
  };

  // Xóa ảnh
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu khuyến mãi:", formData);
    alert("Đã thêm khuyến mãi!");
  };

  return (
    <div className="p-10 min-h-screen  text-black">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload ảnh */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Hình ảnh:</label>
          {!formData.imagePreview ? (
            <label className="inline-block bg-red-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 shadow-md">
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative inline-block mt-4">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="max-h-60 rounded-xl shadow-md border"
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

        {/* Tên sản phẩm */}
        <div>
          <label className="block font-semibold mb-2 text-lg">
            Tên sản phẩm:
          </label>
          <input
            type="text"
            name="tenSanPham"
            value={formData.tenSanPham}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        {/* chú thích */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Chú Thích:</label>
          <input
            type="text"
            name="donVi"
            value={formData.donVi}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập chú thích"
          />
        </div>

        {/* Đơn vị */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Đơn vị:</label>
          <input
            type="text"
            name="donVi"
            value={formData.donVi}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập đơn vị (VD: Khách)..."
          />
        </div>

        {/* Giá công bố */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Giá công bố:</label>
          <input
            type="number"
            name="giaCongBo"
            value={formData.giaCongBo}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập giá công bố..."
          />
        </div>

        {/* Giá bán */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Giá bán:</label>
          <input
            type="number"
            name="giaBan"
            value={formData.giaBan}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400"
            placeholder="Nhập giá bán..."
          />
        </div>

        {/* Diễn giải */}
        <div>
          <label className="block font-semibold mb-2 text-lg">Diễn giải:</label>
          <textarea
            name="dienGiai"
            value={formData.dienGiai}
            onChange={handleChange}
            rows="4"
            className="w-full bg-transparent border-b-2 border-gray-500 p-2 text-lg focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Nhập nội dung diễn giải..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 text-white px-10 py-4 text-xl rounded-2xl hover:bg-green-700 transition-all shadow-lg"
          >
            Lưu 
          </button>
        </div>
      </form>
    </div>
  );
};

export default KhuyenMai;

"use client";
import React, { useState } from "react";

const HotelRoomPage = () => {
  const images = [
    "https://www.baidinhhotel.com/vn/baidinhhotel-images/product/img1/QNOX6Q1742_Deluxe-room.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwgH14GpNgUdWMR695-EtGu0AVaCvu8i5Uv7RDkPf2u7H_d8x5hUrNwFO5zxMhxNC3KBg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeJ2zwP0-gpGZLMNkjedu6u43JlwQu1fgcbJfFR1_AhKRwxYBsC6Fk_qOaxUsN2v7s0s&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArtxAsPYMmaIka7oPT7PwZ-UjP-Rl_PvtKCNrldQJxgWqUef6m2GytmObfU2g0md5fts&usqp=CAU",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt phòng thành công cho ${formData.name}!`);
    setShowBookingForm(false);
    setFormData({ name: "", email: "", phone: "", roomType: "" });
  };

  return (
    <section className="py-8 bg-white mb-[100px] md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* --- Cột trái: Ảnh --- */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              src={selectedImage}
              alt="Room"
              className="w-full h-96 object-cover rounded-lg shadow-md transition duration-300"
            />
            <div className="flex gap-3 justify-center mt-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`room ${idx}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
                    selectedImage === img
                      ? "border-emerald-600 scale-105"
                      : "border-gray-300 hover:border-emerald-400"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* --- Cột phải: Thông tin --- */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              Phòng Deluxe Hướng Vườn
            </h1>

            <div className="mt-3">
              <p className="text-3xl font-bold text-emerald-700">1.200.000₫ / đêm</p>
              <p className="text-gray-600 mt-2">
                Phòng rộng rãi, có ban công nhìn ra vườn, trang bị đầy đủ tiện nghi hiện đại.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition"
              >
                {showBookingForm ? "Huỷ" : "Đặt phòng"}
              </button>
             
            </div>

            {/* --- Form đặt phòng --- */}
            {showBookingForm && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 p-5 border border-gray-200 rounded-lg shadow-sm space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Nhập thông tin đặt phòng
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loại phòng
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">-- Chọn loại phòng --</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-800 transition"
                >
                  Xác nhận đặt phòng
                </button>
              </form>
            )}

            <hr className="my-6 border-gray-200" />

            <p className="text-gray-500">
              Bao gồm ăn sáng, wifi miễn phí và dịch vụ dọn phòng hằng ngày.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelRoomPage;

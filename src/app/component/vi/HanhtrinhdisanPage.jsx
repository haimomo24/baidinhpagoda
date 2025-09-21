// src/pages/HanhtrinhdisanPage.jsx
'use client'
import React, { useState } from "react";

const combos = [
  {
    id: 1,
    title: "Vé tham quan Tràng An - Bái Đính",
    description: "Khám phá khu du lịch sinh thái Tràng An và Chùa Bái Đính nổi tiếng.",
    adultPrice: "650,000đ",
    childPrice: "420,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-dJob1xgnWDh0Xav7.png",
  },
  {
    id: 2,
    title: "Vé tham quan Tràng An - Bái Đính - Phố cổ Hoa Lư",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
 {
    id: 3,
    title: "Vé tham quan Tràng An - Bái Đính - Hồ Đồng Chương",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 4,
    title: "Vé tham quan Tràng An - Tam Chúc",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 5,
    title: "Vé tham quan Bái Đính - Tam Cốc - Phố cổ Hoa Lư",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 6,
    title: "Vé tham quan Tam Cốc - Bái Đính - Hồ Đồng Chương",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 7,
    title: "Vé tham quan Tam Chúc - Tam Cốc - Phố cổ Hoa Lư",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 8,
    title: "Vé tham quan Tam Chúc - Hồ Đồng Chương",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 9,
    title: "Vé tham quan Tam Cốc - Tam Chúc",
    description: "Hành trình đặc biệt tham quan Tràng An, Bái Đính và Phố cổ Hoa Lư.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },

];

const HanhtrinhdisanPage = () => {
  const [selectedCombo, setSelectedCombo] = useState(null);

  const handleSelectCombo = (comboId) => {
    setSelectedCombo(comboId);

    // Scroll xuống form
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#256F3D]">
        Hành Trình Di Sản
      </h1>
      <p className="text-center text-gray-600 ">
        Tận hưởng hành trình tham quan các danh lam thắng cảnh và di sản nổi bật Ninh Bình.
      </p>

      {/* Danh sách combo */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-[#FBE6D1] border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              className="rounded-t-lg w-full h-58 object-cover"
              src={combo.image}
              alt={combo.title}
            />
            <div className="p-4">
              <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
                {combo.title}
              </h5>
              <p className="mb-2 text-sm text-gray-700">{combo.description}</p>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="font-medium text-gray-600">
                  Người lớn: <span className="text-red-600">{combo.adultPrice}</span>
                </span>
                <span className="font-medium text-gray-600">
                  Trẻ em: <span className="text-green-600">{combo.childPrice}</span>
                </span>
              </div>
              <button
                onClick={() => handleSelectCombo(combo.id)}
                className="w-full px-3 py-1.5 text-sm font-medium text-white bg-[#256F3D] rounded-lg hover:bg-[#E7000B] focus:ring-2 focus:ring-blue-300"
              >
                Chọn vé
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form đặt vé */}
      <div
        id="booking-form"
        className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#256F3D]">
          Đặt vé Hành Trình Di Sản
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Họ và tên*</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số điện thoại*</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium"> Lựa chọn*</label>
            <div className="space-y-2">
              {combos.map((combo) => (
                <label key={combo.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="combo"
                    value={combo.id}
                    checked={selectedCombo === combo.id}
                    onChange={() => setSelectedCombo(combo.id)}
                  />
                  <span>{combo.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Ngày tham quan*</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng người tham quan*</label>
            <input
              type="number"
              min="1"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Lời nhắn/Ghi chú</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#256F3D] text-white rounded-lg hover:bg-[#E7000B]"
          >
            Gửi đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default HanhtrinhdisanPage;

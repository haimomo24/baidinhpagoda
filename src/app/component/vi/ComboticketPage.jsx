'use client'
import React, { useState } from "react";

const combos = [
  {
    id: 1,
    title: "Hoan Hỉ",
    description: "Lưu trú 01 đêm tại Khách xá Bái Đính (tối thiểu 2-3 khách/phòng ).",
    description_1: "01 Set ăn trưa hoặc tối.",
    description_2: "01 vé Tour Bái Đính Đêm.",
    adultPrice: "1.025.000đ",
    childPrice: "900.000đ",
    image: "/images/3f25682c-aed9-4707-bc0f-ed7824732f78.jpg",
  },
  {
    id: 2,
    title: "Tịnh Tâm",
    description: "Lưu trú 01 đêm tại Khách xá Bái Đính (tối thiểu 2-3 khách/phòng ).",
    description_1: "01 Set ăn trưa hoặc tối.",
    description_2: "01 Tham quan Bảo Tháp.",
    adultPrice: "825.000đ",
    childPrice: "700.000đ",
    image: "/images/d95320a0-e8bf-469e-a8f5-9bb077ad7eb1.jpg",
  },
];

const ComboticketPage = () => {
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [expandedCombo, setExpandedCombo] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    visit_date: "",
    people_count: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSelectCombo = (comboId) => {
    setSelectedCombo(comboId);
    const formElement = document.getElementById("booking-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.fullname ||
    !formData.phone ||
    !formData.email ||
    !selectedCombo ||
    !formData.visit_date ||
    !formData.people_count
  ) {
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  const selectedComboTitle =
    combos.find((c) => c.id === selectedCombo)?.title || "Không rõ";

  const dataToSend = {
    name: formData.fullname,
    phone: formData.phone,
    email: formData.email,
    combo_choice: selectedComboTitle,
    visit_date: formData.visit_date,
    quantity: parseInt(formData.people_count),
    note: formData.message,
  };

  try {
    setLoading(true);
    const res = await fetch("http://113.160.202.187:1989/api/combo-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const result = await res.json();
    if (res.ok) {
      alert("✅ Gửi thông tin đặt vé thành công!");
      setFormData({
        fullname: "",
        phone: "",
        email: "",
        visit_date: "",
        people_count: "",
        message: "",
      });
      setSelectedCombo(null);
    } else {
      alert("❌ Lỗi: " + (result.error || "Không thể gửi thông tin"));
    }
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi kết nối đến server.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#256F3D]">
        Vé Combo
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Tận hưởng hành trình tham quan các danh lam thắng cảnh và di sản nổi bật Ninh Bình.
      </p>

      {/* Danh sách combo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="relative bg-[#FBE6D1] border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Ảnh combo */}
            <img
              onClick={() =>
                setExpandedCombo(expandedCombo === combo.id ? null : combo.id)
              }
              className="rounded-lg w-full h-full object-cover cursor-pointer"
              src={combo.image}
              alt={combo.title}
            />

            {/* Hiển thị chi tiết bên phải khi click */}
            {expandedCombo === combo.id && (
              <div className="absolute inset-y-0 right-0 w-[60%] bg-white bg-opacity-95 p-4 rounded-l-lg shadow-lg border-l border-gray-300 animate-slideIn">
                <h3 className="text-lg font-bold text-[#256F3D] mb-2">{combo.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>- {combo.description}</li>
                  <li>- {combo.description_1}</li>
                  <li>- {combo.description_2}</li>
                </ul>
                <p className="mt-2 text-sm text-gray-700">
                  💰 Giá gốc: <b>{combo.adultPrice}</b> <br></br> Khuyến mãi: <b>{combo.childPrice}</b>
                </p>
                <button
                  onClick={() => handleSelectCombo(combo.id)}
                  className="mt-4 w-full bg-[#256F3D] text-white py-2 rounded-lg hover:bg-[#E7000B]"
                >
                  Đặt vé ngay
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form đặt vé */}
      <div
        id="booking-form"
        className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#256F3D]">
          Đặt vé Combo
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Họ và tên*</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số điện thoại*</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Lựa chọn vé*</label>
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
              value={formData.visit_date}
              onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số lượng vé*</label>
            <input
              type="number"
              min="1"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.people_count}
              onChange={(e) => setFormData({ ...formData, people_count: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Lời nhắn/Ghi chú</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg"
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#256F3D] text-white rounded-lg hover:bg-[#E7000B]"
          >
            {loading ? "Đang gửi..." : "Gửi đăng ký"}
          </button>
        </form>
      </div>

      {/* Hiệu ứng CSS nhỏ */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ComboticketPage;

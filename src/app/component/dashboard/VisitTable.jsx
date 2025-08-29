"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const VisitTable = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null); // visit được click

  // Hàm rút gọn text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Gọi API lấy dữ liệu
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch("/api/visit");
        const data = await res.json();
        setVisits(data);
      } catch (error) {
        console.error("Lỗi khi fetch visit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  // Hàm xoá điểm đến
  const deleteVisit = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá điểm đến này?")) return;
    try {
      const res = await fetch(`/api/visit/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVisits((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert("❌ Xoá thất bại!");
      }
    } catch (err) {
      console.error("Lỗi xoá:", err);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto mt-[20px]">
        <div className="flex justify-end mb-4">
          <Link
            href="/dashboard/diemden/add"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Thêm điểm đến
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-600 bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
    <tr>
      <th scope="col" className="px-6 py-3">Tên điểm đến</th>
      <th scope="col" className="px-6 py-3">Tiêu đề 1</th>
      <th scope="col" className="px-6 py-3">Tiêu đề 2</th>
      <th scope="col" className="px-6 py-3">Tiêu đề 3</th>
      <th scope="col" className="px-6 py-3">Ảnh</th>
      <th scope="col" className="px-6 py-3 text-center">Hành động</th>
    </tr>
  </thead>
  <tbody>
    {visits.map((item) => (
      <tr
        key={item.id}
        className="border-b hover:bg-gray-50 transition"
      >
        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
        <td className="px-6 py-4" title={item.title_1}>
          {truncateText(item.title_1, 50)}
        </td>
        <td className="px-6 py-4" title={item.title_2}>
          {truncateText(item.title_2, 50)}
        </td>
        <td className="px-6 py-4" title={item.title_3}>
          {truncateText(item.title_3, 50)}
        </td>
        <td className="px-6 py-4">
          {item.images_1 && (
            <img
              src={item.images_1}
              alt="visit"
              className="w-20 h-16 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedVisit(item)}
            />
          )}
        </td>
        <td className="px-6 py-4 text-center flex justify-center gap-2">
          {/* Nút sửa */}
          <Link
            href={`/dashboard/diemden/edit/${item.id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition"
          >
            ✏️ <span className="ml-1"></span>
          </Link>

          {/* Nút xoá */}
          <button
            onClick={() => deleteVisit(item.id)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 hover:text-red-800 transition"
          >
            🗑️ <span className="ml-1"></span>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>

      {/* Modal hiển thị ảnh */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            {/* Nút đóng */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedVisit(null)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">{selectedVisit.name}</h2>

            <div className="grid grid-cols-3 gap-4">
              {selectedVisit.images_1 && (
                <img
                  src={selectedVisit.images_1}
                  alt="Ảnh 1"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              {selectedVisit.images_2 && (
                <img
                  src={selectedVisit.images_2}
                  alt="Ảnh 2"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              {selectedVisit.image_3 && (
                <img
                  src={selectedVisit.image_3}
                  alt="Ảnh 3"
                  className="w-full h-40 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitTable;

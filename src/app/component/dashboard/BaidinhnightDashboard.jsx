'use client'

import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const RestaurantDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // mỗi trang 10 hàng

  // Lấy dữ liệu từ API
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/baidinhnight`);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm cập nhật trạng thái
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/api/contact/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Cập nhật lại state ngay lập tức
      setContacts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
    }
  };

  // Tính toán dữ liệu phân trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = contacts.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(contacts.length / rowsPerPage);

  // Hàm xử lý hiển thị thời gian VN (UTC+7)
  const formatVietnamTime = (dateString) => {
    if (!dateString) return "";
    const utcDate = new Date(dateString);
    // trừ đi 7 tiếng để khớp giờ Việt Nam
    const vnDate = new Date(utcDate.getTime() - 7 * 60 * 60 * 1000);
    return vnDate.toLocaleString("vi-VN", { hour12: false });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Tour Bái Đính về đêm
      </h1>

      {loading ? (
        <p className="text-center">⏳ Đang tải dữ liệu...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Message</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((c, idx) => (
                    <tr
                      key={c.id || idx}
                      className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-4 py-2 border text-center">{c.id}</td>
                      <td className="px-4 py-2 border">{c.name}</td>
                      <td className="px-4 py-2 border">{c.phone}</td>
                      <td className="px-4 py-2 border">{c.email}</td>
                      <td className="px-4 py-2 border">{c.message}</td>
                      <td className="px-4 py-2 border text-center">
                        {formatVietnamTime(c.created_at)}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {c.status === 1 ? (
                          <span className="text-green-600 font-bold">
                            Đã xác nhận
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold">
                            Chưa xác nhận
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() =>
                            handleUpdateStatus(c.id, c.status === 1 ? 0 : 1)
                          }
                          className={`px-3 py-1 rounded ${
                            c.status === 1
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {c.status === 1 ? "Huỷ " : "Xác nhận"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅
            </button>

            <span>
              Trang {currentPage} / {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDashboard;

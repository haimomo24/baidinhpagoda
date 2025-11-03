"use client";

import React, { useEffect, useState } from "react";

const ComboTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 📡 Lấy dữ liệu từ API combo ticket
  const fetchData = async () => {
    try {
      const res = await fetch("http://113.160.202.187:1985/api/combo-ticket");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy dữ liệu combo ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📝 Hàm cập nhật trạng thái
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://113.160.202.187:1985/api/combo-ticket/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setTickets((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
    }
  };

  // ⏳ Phân trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tickets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tickets.length / rowsPerPage);

  // 🕒 Format thời gian VN
  const formatVietnamTime = (dateString) => {
    if (!dateString) return "";
    const utcDate = new Date(dateString);
    const vnDate = new Date(utcDate.getTime() - 7 * 60 * 60 * 1000);
    return vnDate.toLocaleString("vi-VN", { hour12: false });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-emerald-900 text-center">
        🎟️ Danh sách đặt vé Combo
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
                  <th className="px-4 py-2 border">Họ và tên</th>
                  <th className="px-4 py-2 border">Số điện thoại</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Combo</th>
                  <th className="px-4 py-2 border">Ngày tham quan</th>
                  <th className="px-4 py-2 border">Số lượng</th>
                  <th className="px-4 py-2 border">Ghi chú</th>
                 
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
                      <td className="px-4 py-2 border">{c.combo_choice}</td>
                      <td className="px-4 py-2 border text-center">
                        {new Date(c.visit_date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-4 py-2 border text-center">{c.quantity}</td>
                      <td className="px-4 py-2 border">{c.note || "-"}</td>
                     
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
                          {c.status === 1 ? "Huỷ" : "Xác nhận"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔄 Phân trang */}
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

export default ComboTicket;

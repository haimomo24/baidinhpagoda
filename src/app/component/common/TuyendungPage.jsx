"use client";

import React, { useEffect, useState } from "react";

const TuyendungPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 📌 Lấy danh sách ứng viên
  const fetchData = async () => {
    try {
      const res = await fetch("http://113.160.202.187:1989/api/recruitment");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy dữ liệu:", err);
      alert("Không thể tải danh sách ứng viên!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📌 Xóa ứng viên
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa ứng viên này?")) return;
    try {
      const res = await fetch(`http://113.160.202.187:1989/api/recruitment/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        alert("🗑️ Đã xóa ứng viên thành công!");
        fetchData();
      } else {
        alert("❌ Lỗi khi xóa ứng viên!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Lỗi kết nối đến server!");
    }
  };

  // 📌 Tải CV
  const handleDownloadCV = (filename) => {
    if (!filename) return alert("Ứng viên chưa tải lên CV!");
    const link = document.createElement("a");
    link.href = `http://113.160.202.187:1989/uploads/${filename}`;
    link.download = filename;
    link.click();
  };

  // 📌 Phân trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = candidates.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(candidates.length / rowsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Danh sách ứng viên tuyển dụng</h1>

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
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Số điện thoại</th>
                  <th className="px-4 py-2 border">Vị trí</th>
                  <th className="px-4 py-2 border">Tin nhắn</th>
                  <th className="px-4 py-2 border text-center">CV</th>
                  <th className="px-4 py-2 border text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-4 py-2 border text-center">{item.id}</td>
                      <td className="px-4 py-2 border">{item.fullname}</td>
                      <td className="px-4 py-2 border">{item.email}</td>
                      <td className="px-4 py-2 border">{item.phone}</td>
                      <td className="px-4 py-2 border">{item.position}</td>
                      <td className="px-4 py-2 border">{item.message || "-"}</td>
                      <td className="px-4 py-2 border text-center">
                        {item.cv_file ? (
                          <button
                            onClick={() => handleDownloadCV(item.cv_file)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                          >
                            📄 Tải CV
                          </button>
                        ) : (
                          <span className="text-gray-500">Không có</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Không có dữ liệu ứng viên.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 📌 Pagination */}
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

export default TuyendungPage;

"use client";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://113.160.202.187:1989";

const VisitTable = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [editVisit, setEditVisit] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadFiles, setUploadFiles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(`${API_URL}/api/visit`);
        const data = await res.json();
        setVisits(data);
      } catch (err) {
        console.error("Lỗi fetch visit:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  const deleteVisit = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá điểm đến này?")) return;
    try {
      const res = await fetch(`${API_URL}/api/visit/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVisits((prev) => prev.filter((v) => v.id !== id));
        alert("Xoá thành công!");
      } else alert("❌ Xoá thất bại!");
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (visit) => {
    setEditVisit(visit);
    setFormData({
      name: visit.name || "",
      name_en: visit.name_en || "",
      title_1: visit.title_1 || "",
      title_1_en: visit.title_1_en || "",
      title_2: visit.title_2 || "",
      title_2_en: visit.title_2_en || "",
      title_3: visit.title_3 || "",
      title_3_en: visit.title_3_en || "",
      title_4: visit.title_4 || "",
      title_4_en: visit.title_4_en || "",
      title_5: visit.title_5 || "",
      title_5_en: visit.title_5_en || "",
    });
    setUploadFiles({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUploadFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editVisit) return;

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
      Object.keys(uploadFiles).forEach((key) => fd.append(key, uploadFiles[key]));

      const res = await fetch(`${API_URL}/api/visit/${editVisit.id}`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        const res2 = await fetch(`${API_URL}/api/visit`);
        const data = await res2.json();
        setVisits(data);
        setEditVisit(null);
        alert("Cập nhật thành công!");
      } else {
        alert("❌ Cập nhật thất bại!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVisits = visits.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.title_1?.toLowerCase().includes(term) ||
      item.title_2?.toLowerCase().includes(term) ||
      item.title_3?.toLowerCase().includes(term)
    );
  });

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm điểm đến..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <a
          href="/dashboard/diemden/add"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Thêm điểm đến
        </a>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Tên điểm đến</th>
              <th className="px-6 py-3">Tiêu đề 1</th>
              <th className="px-6 py-3">Tiêu đề 2</th>
              <th className="px-6 py-3">Tiêu đề 3</th>
              <th className="px-6 py-3">Ảnh</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.length > 0 ? (
              filteredVisits.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4" title={item.title_1}>{truncateText(item.title_1)}</td>
                  <td className="px-6 py-4" title={item.title_2}>{truncateText(item.title_2)}</td>
                  <td className="px-6 py-4" title={item.title_3}>{truncateText(item.title_3)}</td>
                  <td className="px-6 py-4">
                    {item.images_1 && (
                      <img
                        src={`${API_URL}${item.images_1}`}
                        alt="visit"
                        className="w-20 h-16 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                        onClick={() => setSelectedVisit(item)}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteVisit(item.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 hover:text-red-800 transition"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Không tìm thấy kết quả phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem ảnh */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedVisit(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedVisit.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {["images_1", "images_2", "image_3", "images_4", "images_5"].map(
                (field, key) =>
                  selectedVisit[field] && (
                    <img
                      key={key}
                      src={`${API_URL}${selectedVisit[field]}`}
                      alt={field}
                      className="w-full h-40 object-cover rounded"
                    />
                  )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa (FULL màn hình) */}
      {editVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full overflow-y-auto relative p-8">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl"
              onClick={() => setEditVisit(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Sửa điểm đến: <span className="text-blue-600">{editVisit.name}</span>
            </h2>

            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Các ô input name */}
              <div>
                <label className="block font-semibold mb-1">Tên điểm đến (VN)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tên điểm đến (EN)</label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en || ""}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              {/* Các ô textarea cho title */}
              {[
                "title_1",
                "title_1_en",
                "title_2",
                "title_2_en",
                "title_3",
                "title_3_en",
                "title_4",
                "title_4_en",
                "title_5",
                "title_5_en",
              ].map((field) => (
                <div key={field} className="col-span-1 md:col-span-2">
                  <label className="block font-semibold mb-1">{field}</label>
                  <textarea
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleInputChange}
                    className="border rounded px-3 py-2 w-full h-24 resize-y"
                  />
                </div>
              ))}

              {/* Upload ảnh */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {["images_1", "images_2", "image_3", "images_4", "images_5"].map((field) => (
                  <div key={field}>
                    <label className="block font-semibold mb-1">{field}</label>
                    <input
                      type="file"
                      name={field}
                      onChange={handleFileChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Nút lưu & huỷ */}
              <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditVisit(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitTable;

"use client";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://113.160.202.187:1989";

const VisitTable = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null); // Modal xem ảnh
  const [editVisit, setEditVisit] = useState(null); // Modal edit
  const [formData, setFormData] = useState({});
  const [uploadFiles, setUploadFiles] = useState({});

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
      title_1: visit.title_1 || "",
      title_2: visit.title_2 || "",
      title_3: visit.title_3 || "",
      title_4: visit.title_4 || "",
      title_5: visit.title_5 || "",
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
        // reload data
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

  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="mt-5">
      <div className="flex justify-end mb-4">
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
            {visits.map((item) => (
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
                      onClick={() => setSelectedVisit(item)} // chỉ show ảnh
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(item)} // mở modal edit
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
            ))}
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
              {selectedVisit.images_1 && <img src={`${API_URL}${selectedVisit.images_1}`} alt="1" className="w-full h-40 object-cover rounded" />}
              {selectedVisit.images_2 && <img src={`${API_URL}${selectedVisit.images_2}`} alt="2" className="w-full h-40 object-cover rounded" />}
              {selectedVisit.image_3 && <img src={`${API_URL}${selectedVisit.image_3}`} alt="3" className="w-full h-40 object-cover rounded" />}
              {selectedVisit.images_4 && <img src={`${API_URL}${selectedVisit.images_4}`} alt="4" className="w-full h-40 object-cover rounded" />}
              {selectedVisit.images_5 && <img src={`${API_URL}${selectedVisit.images_5}`} alt="5" className="w-full h-40 object-cover rounded" />}
            </div>
          </div>
        </div>
      )}

      {/* Modal edit */}
      {editVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setEditVisit(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Sửa điểm đến: {editVisit.name}</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Tên điểm đến"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                name="title_1"
                placeholder="Tiêu đề 1"
                value={formData.title_1 || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="title_2"
                placeholder="Tiêu đề 2"
                value={formData.title_2 || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="title_3"
                placeholder="Tiêu đề 3"
                value={formData.title_3 || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="title_4"
                placeholder="Tiêu đề 4"
                value={formData.title_4 || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="title_5"
                placeholder="Tiêu đề 5"
                value={formData.title_5 || ""}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
              />

              {/* File Upload */}
              <div className="grid grid-cols-2 gap-4">
                <input type="file" name="images_1" onChange={handleFileChange} />
                <input type="file" name="images_2" onChange={handleFileChange} />
                <input type="file" name="image_3" onChange={handleFileChange} />
                <input type="file" name="images_4" onChange={handleFileChange} />
                <input type="file" name="images_5" onChange={handleFileChange} />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditVisit(null)}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
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

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const KhuyenMai = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // dữ liệu sau khi lọc
  const [searchTerm, setSearchTerm] = useState(""); // từ khóa tìm kiếm
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch dữ liệu
  const fetchData = async () => {
    try {
      const res = await fetch("http://113.160.202.187:1985/api/promotion");
      const result = await res.json();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredData(
        data.filter(
          (item) =>
            item.name?.toLowerCase().includes(lower) ||
            item.description?.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, data]);

  // Xoá item
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xoá mục này?")) return;
    try {
      const res = await fetch(`http://113.160.202.187:1985/api/promotion/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Xoá thành công!");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Xoá thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  // Cập nhật dữ liệu
  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("unit", formData.unit || "");
      formDataToSend.append("price_1", formData.price_1 || "");
      formDataToSend.append("price_2", formData.price_2 || "");
      formDataToSend.append("name_en", formData.name_en || "");
      formDataToSend.append("description_en", formData.description_en || "");
      formDataToSend.append("title_en", formData.title_en || "");

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const res = await fetch(
        `http://113.160.202.187:1989/api/promotion/${editItem.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (res.ok) {
        alert("Cập nhật thành công!");
        fetchData();
        setEditItem(null);
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const renderText = (id, field, text) => {
    const key = `${id}-${field}`;
    const isExpanded = expanded[key];
    if (!text) return "Không có dữ liệu";

    return (
      <div>
        {isExpanded ? text : text.length > 40 ? text.substring(0, 40) + "..." : text}
        {text.length > 40 && (
          <button
            onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isExpanded }))}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };

  if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc chú thích..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href="/dashboard/khuyenmai/add"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Thêm khuyến mãi
        </Link>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Tên sản phẩm (VN)</th>
            <th className="px-6 py-3">Chú thích (VN)</th>
            <th className="px-6 py-3">Đơn vị</th>
            <th className="px-6 py-3">Giá công bố</th>
            <th className="px-6 py-3">Giá bán</th>
            <th className="px-6 py-3">Diễn giải (VN)</th>
            <th className="px-6 py-3">Hình ảnh</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id} className="bg-white border-b">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{renderText(item.id, "description", item.description)}</td>
                <td className="px-6 py-4">{item.unit}</td>
                <td className="px-6 py-4">{item.price_1} đ</td>
                <td className="px-6 py-4 text-red-600 font-semibold">{item.price_2} vnđ</td>
                <td className="px-6 py-4">{renderText(item.id, "title", item.title)}</td>
                <td className="px-6 py-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Hình ảnh"
                      className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedItem(item)}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditItem(item);
                      setFormData(item);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal xem ảnh */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedItem.name}</h2>
            {selectedItem.image && (
              <img src={selectedItem.image} alt="Ảnh" className="w-full h-80 object-cover rounded" />
            )}
          </div>
        </div>
      )}

      {/* Modal edit */}
     {editItem && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white w-full h-full overflow-y-auto p-10 relative rounded-none">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-3xl"
        onClick={() => setEditItem(null)}
      >
        ✕
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ✏️ Sửa thông tin khuyến mãi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Tên sản phẩm (VN)</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nhập tên sản phẩm (VN)"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Chú thích (VN)</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Nhập chú thích (VN)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Diễn giải (VN)</label>
          <textarea
            className="w-full border p-3 rounded h-32 resize-none"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nhập diễn giải tiếng Việt..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tên sản phẩm (EN)</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={formData.name_en || ""}
            onChange={(e) =>
              setFormData({ ...formData, name_en: e.target.value })
            }
            placeholder="Product name (EN)"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Chú thích (EN)</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={formData.description_en || ""}
            onChange={(e) =>
              setFormData({ ...formData, description_en: e.target.value })
            }
            placeholder="Description (EN)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Diễn giải (EN)</label>
          <textarea
            className="w-full border p-3 rounded h-32 resize-none"
            value={formData.title_en || ""}
            onChange={(e) =>
              setFormData({ ...formData, title_en: e.target.value })
            }
            placeholder="Enter English description..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Đơn vị</label>
          <input
            type="text"
            className="w-full border p-3 rounded"
            value={formData.unit || ""}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Nhập đơn vị (VD: cái, kg, vé...)"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Giá công bố</label>
          <input
            type="number"
            className="w-full border p-3 rounded"
            value={formData.price_1 || ""}
            onChange={(e) =>
              setFormData({ ...formData, price_1: e.target.value })
            }
            placeholder="Nhập giá công bố"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Giá bán</label>
          <input
            type="number"
            className="w-full border p-3 rounded"
            value={formData.price_2 || ""}
            onChange={(e) =>
              setFormData({ ...formData, price_2: e.target.value })
            }
            placeholder="Nhập giá bán"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Ảnh hiện tại</label>
          {formData.image && !(formData.image instanceof File) ? (
            <img
              src={formData.image}
              alt="Ảnh hiện tại"
              className="w-40 h-40 object-cover mb-2 rounded border"
            />
          ) : (
            <p className="text-gray-500 italic">Chưa có ảnh</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded mt-2"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleUpdate}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-700 transition"
        >
          💾 Cập nhật khuyến mãi
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default KhuyenMai;

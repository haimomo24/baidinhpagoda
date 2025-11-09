"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HotelList = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState({
    room_name: "",
    total_rooms: "",
    price: "",
  });
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // 🟢 Trạng thái sửa
  const [editRoom, setEditRoom] = useState(null);
  const [editImages, setEditImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* 🛡️ Kiểm tra quyền truy cập */
 useEffect(() => {
  const authData = localStorage.getItem("auth");
  if (!authData) {
    alert("⚠️ Bạn cần đăng nhập để truy cập trang này!");
    router.push("/login");
    return;
  }

  const parsedAuth = JSON.parse(authData);
  const user = parsedAuth.user;

  if (!user || user.level !== "admin") {
    alert("🚫 Bạn không có quyền truy cập trang quản lý này!");
    router.push("/dashboard");
    return;
  }
}, [router]);


  // 🟢 Lấy danh sách phòng
  const fetchRooms = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách phòng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 🟩 Chọn ảnh
  const handleImageChange = (e, isEdit = false) => {
    const { name, files } = e.target;
    if (isEdit) {
      setEditImages((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setImages((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // 🟩 Thêm phòng
  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!newRoom.room_name || !newRoom.total_rooms || !newRoom.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("room_name", newRoom.room_name);
    formData.append("total_rooms", newRoom.total_rooms);
    formData.append("price", newRoom.price);

    Object.keys(images).forEach((key) => {
      if (images[key]) formData.append(key, images[key]);
    });

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (res.ok) {
        alert("✅ Thêm phòng thành công!");
        setNewRoom({ room_name: "", total_rooms: "", price: "" });
        setImages({ image1: null, image2: null, image3: null, image4: null });
        fetchRooms();
      } else {
        alert("❌ Thêm thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi thêm phòng:", error);
    }
  };

  // 🟥 Xóa phòng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này không?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchRooms();
    } catch (error) {
      console.error("❌ Lỗi xóa phòng:", error);
    }
  };

  // ✏️ Mở form sửa
  const openEditForm = (room) => {
    setEditRoom(room);
    setEditImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
  };

  // 💾 Lưu sửa phòng
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    if (!editRoom.room_name || !editRoom.total_rooms || !editRoom.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("room_name", editRoom.room_name);
    formData.append("total_rooms", editRoom.total_rooms);
    formData.append("price", editRoom.price);

    Object.keys(editImages).forEach((key) => {
      if (editImages[key]) {
        formData.append(key, editImages[key]);
      } else {
        formData.append(`old_${key}`, editRoom[key]);
      }
    });

    try {
      const res = await fetch(`${API_URL}/${editRoom.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        alert("✅ Cập nhật phòng thành công!");
        setEditRoom(null);
        fetchRooms();
      } else {
        alert("❌ Sửa thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi sửa phòng:", error);
    }
  };

  return (
    <div className="p-6">
      {/* 🔝 Tiêu đề + nút điều hướng */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏨 Danh sách phòng khách sạn</h2>
        <button
          onClick={() => router.push("/dashboard/list")}
          className="bg-emerald-700 text-white px-5 py-2 rounded hover:bg-emerald-800"
        >
          📋 Xem danh sách đặt phòng
        </button>
      </div>

      {/* Form thêm phòng */}
      <form
        onSubmit={handleAddRoom}
        className="border p-4 rounded-lg bg-gray-50 mb-8"
      >
        <h3 className="font-semibold mb-3">➕ Thêm phòng mới</h3>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Tên phòng"
            className="border p-2 rounded"
            value={newRoom.room_name}
            onChange={(e) =>
              setNewRoom({ ...newRoom, room_name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Tổng số phòng"
            className="border p-2 rounded"
            value={newRoom.total_rooms}
            onChange={(e) =>
              setNewRoom({ ...newRoom, total_rooms: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Giá tiền (VNĐ)"
            className="border p-2 rounded"
            value={newRoom.price}
            onChange={(e) =>
              setNewRoom({ ...newRoom, price: e.target.value })
            }
          />
        </div>

        {/* Upload ảnh */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {["image1", "image2", "image3", "image4"].map((imgKey, i) => (
            <div key={i} className="flex flex-col items-center">
              <label
                htmlFor={imgKey}
                className="bg-emerald-600 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-emerald-700"
              >
                + Ảnh
              </label>
              <input
                id={imgKey}
                type="file"
                name={imgKey}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {images[imgKey] && (
                <img
                  src={URL.createObjectURL(images[imgKey])}
                  alt={imgKey}
                  className="w-20 h-20 mt-2 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Thêm phòng
        </button>
      </form>

      {/* Danh sách phòng */}
      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-emerald-900 text-white">
              <tr>
                <th className="px-3 py-2 border">Tên phòng</th>
                <th className="px-3 py-2 border">Số lượng</th>
                <th className="px-3 py-2 border">Giá (VNĐ)</th>
                <th className="px-3 py-2 border">Ảnh</th>
                <th className="px-3 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-3 py-2 border text-center">
                      {r.room_name}
                    </td>
                    <td className="px-3 py-2 border text-center">
                      {r.total_rooms}
                    </td>
                    <td className="px-3 py-2 border text-center">
                      {r.price} đ
                    </td>
                    <td className="px-3 py-2 border text-center">
                      <div className="flex justify-center gap-1">
                        {[r.image1, r.image2, r.image3, r.image4].map(
                          (img, i) =>
                            img && (
                              <img
                                key={i}
                                src={`http://113.160.202.187:1989${img}`}
                                alt={`room-${i}`}
                                className="w-14 h-14 object-cover rounded"
                              />
                            )
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 border text-center space-x-2">
                      <button
                        onClick={() => openEditForm(r)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup sửa phòng */}
      {editRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] h-[90%] rounded-lg overflow-auto p-6 relative">
            <button
              onClick={() => setEditRoom(null)}
              className="absolute top-3 right-4 text-2xl text-red-600 font-bold"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">
              ✏️ Sửa thông tin phòng
            </h3>

            <form onSubmit={handleUpdateRoom}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  className="border p-2 rounded"
                  value={editRoom.room_name}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, room_name: e.target.value })
                  }
                  placeholder="Tên phòng"
                />
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={editRoom.total_rooms}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, total_rooms: e.target.value })
                  }
                  placeholder="Tổng số phòng"
                />
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={editRoom.price}
                  onChange={(e) =>
                    setEditRoom({ ...editRoom, price: e.target.value })
                  }
                  placeholder="Giá tiền"
                />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {["image1", "image2", "image3", "image4"].map((imgKey, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <label
                      htmlFor={`edit-${imgKey}`}
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-blue-700"
                    >
                      Sửa ảnh
                    </label>
                    <input
                      id={`edit-${imgKey}`}
                      type="file"
                      name={imgKey}
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="hidden"
                    />
                    <img
                      src={
                        editImages[imgKey]
                          ? URL.createObjectURL(editImages[imgKey])
                          : `http://113.160.202.187:1989${editRoom[imgKey]}`
                      }
                      alt={imgKey}
                      className="w-24 h-24 mt-2 object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;

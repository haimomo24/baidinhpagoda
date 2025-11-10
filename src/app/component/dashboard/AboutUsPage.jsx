"use client";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AboutUsPage = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    title2: "",
    title3: "",
    title4: "",
    description: "",
  });
  const [files, setFiles] = useState({
    image_url: null,
    image_url2: null,
    image_url3: null,
  });
  const [editId, setEditId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({
    username: "",
    email: "",
    comment: "",
    rating: 5,
  });

  // 🟢 Lấy danh sách ảnh
  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/photo-review`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Lỗi khi tải ảnh:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 🟢 Lấy bình luận theo ảnh
  const fetchComments = async (photoId) => {
    try {
      const res = await fetch(`${API_URL}/api/photo-review/${photoId}/comments`);
      const data = await res.json();
      setComments((prev) => ({ ...prev, [photoId]: data }));
    } catch (err) {
      console.error("Lỗi khi tải bình luận:", err);
    }
  };

  // 🟡 Thêm / Sửa ảnh
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    if (files.image_url) uploadData.append("image_url", files.image_url);
    if (files.image_url2) uploadData.append("image_url2", files.image_url2);
    if (files.image_url3) uploadData.append("image_url3", files.image_url3);

    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });

    try {
      const res = await fetch(
        editId
          ? `${API_URL}/api/photo-review/${editId}`
          : `${API_URL}/api/photo-review`,
        {
          method: editId ? "PUT" : "POST",
          body: uploadData,
        }
      );

      if (res.ok) {
        alert(editId ? "✅ Cập nhật thành công!" : "✅ Thêm ảnh thành công!");
        setFormData({ title: "", title2: "", title3: "", title4: "", description: "" });
        setFiles({ image_url: null, image_url2: null, image_url3: null });
        setEditId(null);
        fetchImages();
      } else {
        alert("❌ Lỗi khi lưu ảnh!");
      }
    } catch (err) {
      console.error("Lỗi khi thêm/cập nhật ảnh:", err);
    }
  };

  // 🔴 Xóa ảnh
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa ảnh này không?")) return;
    try {
      const res = await fetch(`${API_URL}/api/photo-review/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("🗑️ Đã xóa ảnh!");
        fetchImages();
      } else {
        alert("❌ Lỗi khi xóa ảnh!");
      }
    } catch (err) {
      console.error("Lỗi khi xóa ảnh:", err);
    }
  };

  // ✏️ Sửa ảnh
  const handleEdit = (img) => {
    setEditId(img.id);
    setFormData({
      title: img.title || "",
      title2: img.title2 || "",
      title3: img.title3 || "",
      title4: img.title4 || "",
      description: img.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 💬 Gửi bình luận
  const handleAddComment = async (photoId) => {
    try {
      const res = await fetch(`${API_URL}/api/photo-review/${photoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        alert("✅ Bình luận đã được gửi!");
        setNewComment({ username: "", email: "", comment: "", rating: 5 });
        fetchComments(photoId);
      } else {
        alert("❌ Gửi bình luận thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Quản lý Ảnh & Bình luận - Về Chúng Tôi
      </h2>

      {/* Form Thêm / Sửa Ảnh */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid sm:grid-cols-3 gap-4">
          {["Ảnh 1", "Ảnh 2", "Ảnh 3"].map((label, i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1">{label}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFiles({ ...files, [`image_url${i === 0 ? "" : i + 1}`]: e.target.files[0] })
                }
              />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {["title", "title2", "title3", "title4"].map((t, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Tiêu đề ${i + 1}`}
              value={formData[t]}
              onChange={(e) => setFormData({ ...formData, [t]: e.target.value })}
              className="border border-gray-300 rounded-lg p-2"
            />
          ))}
        </div>

        <textarea
          placeholder="Mô tả..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 min-h-[80px]"
        ></textarea>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition w-fit"
        >
          {editId ? "Lưu thay đổi" : "Thêm ảnh"}
        </button>
      </form>

      {/* Danh sách ảnh */}
      {images.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <img
                src={`${API_URL}${img.image_url}`}
                alt={img.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{img.title}</h3>
                <p className="text-gray-600 text-sm">{img.description}</p>
                <p className="text-gray-400 text-xs mt-2">
                  📅 {new Date(img.created_at).toLocaleString()}
                </p>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(img)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Sửa</button>
                  <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Xóa</button>
                  <button onClick={() => fetchComments(img.id)} className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm">
                    Bình luận ({img.comment_count})
                  </button>
                </div>

                {/* Bình luận */}
                {comments[img.id] && (
                  <div className="mt-4 border-t pt-3">
                    {comments[img.id].length > 0 ? (
                      comments[img.id].map((c) => (
                        <div key={c.id} className="mb-2">
                          <p className="text-sm font-semibold">{c.username} - ⭐{c.rating}</p>
                          <p className="text-sm">{c.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">Chưa có bình luận nào.</p>
                    )}

                    {/* Form thêm bình luận */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Tên..."
                        value={newComment.username}
                        onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <input
                        type="email"
                        placeholder="Email..."
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <textarea
                        placeholder="Bình luận..."
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        className="border p-1 rounded w-full mb-2"
                      />
                      <select
                        value={newComment.rating}
                        onChange={(e) => setNewComment({ ...newComment, rating: Number(e.target.value) })}
                        className="border p-1 rounded w-full mb-2"
                      >
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>{r} sao</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAddComment(img.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md w-full"
                      >
                        Gửi bình luận
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chưa có ảnh nào.</p>
      )}
    </div>
  );
};

export default AboutUsPage;

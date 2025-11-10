"use client";
import React, { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

const CommentPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách ảnh
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/photo-review`, { cache: "no-store" });
        console.log("FETCH STATUS:", res.status);
        const data = await res.json();
        console.log("DATA FROM API:", data);
        setImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi tải ảnh:", err);
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  // Lấy bình luận của ảnh
  const fetchComments = async (photoId) => {
    try {
      const res = await fetch(`${API_URL}/api/photo-review/${photoId}/comments`, { cache: "no-store" });
      const data = await res.json();
      setSelectedImage((prev) => ({ ...prev, comments: data || [] }));
    } catch (err) {
      console.error("Lỗi khi tải bình luận:", err);
      setSelectedImage((prev) => ({ ...prev, comments: [] }));
    }
  };

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    fetchComments(img.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim() || rating === 0) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin và chọn số sao!");
      return;
    }

    const newComment = {
      username: name.trim(),
      email: email.trim(),
      comment: comment.trim(),
      rating,
    };

    try {
      const res = await fetch(`${API_URL}/api/photo-review/${selectedImage.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi bình luận");

      alert("✅ Bình luận đã được gửi!");
      setComment("");
      setRating(0);
      setName("");
      setEmail("");
      fetchComments(selectedImage.id);
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
      alert("❌ Gửi bình luận thất bại!");
    }
  };

  const maskEmail = (email) => {
    if (!email || !email.includes("@")) return email;
    const [namePart, domain] = email.split("@");
    return namePart.length > 3
      ? `${namePart.slice(0, 3)}***@${domain}`
      : `${namePart[0]}***@${domain}`;
  };

  // Tạo mảng xen kẽ ảnh + tiêu đề + mô tả
  const buildInterleaved = (img) => {
    const items = [];
    if (img.title) items.push({ type: "title", text: img.title });
    if (img.image_url) items.push({ type: "image", src: `${API_URL}${img.image_url}` });
    if (img.title2) items.push({ type: "title", text: img.title2 });
    if (img.image_url2) items.push({ type: "image", src: `${API_URL}${img.image_url2}` });
    if (img.title3) items.push({ type: "title", text: img.title3 });
    if (img.image_url3) items.push({ type: "image", src: `${API_URL}${img.image_url3}` });
    if (img.title4) items.push({ type: "title", text: img.title4 });
    if (img.description) items.push({ type: "desc", text: img.description });
    return items;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="relative inline-block mb-6 text-2xl font-bold text-[#176734] px-8 py-2 bg-gradient-to-r from-stone-200 via-amber-200 to-stone-400 rounded-lg shadow-lg hover:scale-105 transition-all">
        VỀ CHÚNG TÔI
      </h2>

      {/* DANH SÁCH ẢNH */}
      {!selectedImage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {images.length > 0 ? (
            images.map((img) => (
              <div
                key={img.id}
                onClick={() => handleSelectImage(img)}
                className="overflow-hidden rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`${API_URL}${img.image_url}`}
                  alt={`Ảnh ${img.id}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">Chưa có hình ảnh nào.</p>
          )}
        </div>
      )}

      {/* CHI TIẾT ẢNH */}
      {selectedImage && (
        <div className="bg-white shadow-md rounded-2xl p-6">
          <button
            className="text-sm text-gray-500 mb-4 hover:text-red-500"
            onClick={() => setSelectedImage(null)}
          >
            ← Quay lại
          </button>

          {/* Interleaved layout */}
          <div className="grid gap-4 mb-6">
            {buildInterleaved(selectedImage).map((it, idx) => {
              if (it.type === "image") {
                return (
                  <div key={idx} className="w-full overflow-hidden rounded-lg shadow-sm">
                    <img src={it.src} alt={`img-${idx}`} className="w-full object-cover" style={{ maxHeight: 420 }} />
                  </div>
                );
              }
              if (it.type === "title") {
                return (
                  <div key={idx} className="px-2">
                    <p className="text-lg font-semibold text-[#176734] mb-1">{it.text}</p>
                  </div>
                );
              }
              if (it.type === "desc") {
                return (
                  <div key={idx} className="px-2">
                    <p className="text-gray-600 italic">{it.text}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Form đánh giá */}
          <h3 className="text-lg font-semibold mb-4">Đánh giá của bạn</h3>
          <div className="flex items-center mb-4 space-x-1">
            {[...Array(5)].map((_, i) => {
              const current = i + 1;
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(current)}
                  onMouseEnter={() => setHover(current)}
                  onMouseLeave={() => setHover(rating)}
                  className="text-3xl transition-colors"
                >
                  <span style={{ color: current <= (hover || rating) ? "#facc15" : "#d1d5db" }}>★</span>
                </button>
              );
            })}
          </div>

          {/* Form bình luận */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nhập tên của bạn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <textarea
              placeholder="Nhập bình luận của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition"
            >
              Gửi bình luận
            </button>
          </form>

          {/* Danh sách bình luận */}
          {selectedImage.comments?.length > 0 ? (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold mb-3">Bình luận gần đây</h3>
              {selectedImage.comments.map((cmt) => (
                <div key={cmt.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-semibold text-[#176734]">{cmt.username}</span>
                      <p className="text-sm text-gray-500">{maskEmail(cmt.email)}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < cmt.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{cmt.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500 italic">Chưa có bình luận nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentPage;

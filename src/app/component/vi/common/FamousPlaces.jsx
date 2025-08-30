"use client";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const FamousPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${API_URL}/api/visit`)
    .then((res) => res.json())
    .then((data) => {
      // chỉ lấy 10 dữ liệu mới nhất
      setPlaces(data.slice(0, 10));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Lỗi khi load dữ liệu visit:", err);
      setLoading(false);
    });
}, []);
  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (!places || places.length === 0) return <p className="text-center">Chưa có địa điểm nào</p>;

  return (
    <div className="max-w-[1200px] bg-[#FFFFFF] mt-[-100px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Địa Điểm Tham Quan</h1>

      {/* Hàng 1 */}
      <div className="flex gap-4 mb-4">
        {/* Ô lớn bên trái */}
        {places[0] && (
          <div className="flex-1 relative overflow-hidden rounded-lg" style={{ height: "400px" }}>
            <img
              src={`${API_URL}${places[0].images_1 || places[0].images_2 || places[0].image_3}`}
              alt={places[0].name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
              {places[0].name}
            </div>
          </div>
        )}

        {/* 4 ô nhỏ bên phải */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {places.slice(1, 5).map((place, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg" style={{ height: "195px" }}>
              <img
                src={`${API_URL}${place.images_1 || place.images_2 || place.image_3}`}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                {place.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hàng 2 */}
      <div className="flex gap-4">
        {/* 4 ô nhỏ bên trái */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {places.slice(5, 9).map((place, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg" style={{ height: "195px" }}>
              <img
                src={`${API_URL}${place.images_1 || place.images_2 || place.image_3}`}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-1 text-white text-sm font-semibold">
                {place.name}
              </div>
            </div>
          ))}
        </div>

        {/* Ô lớn bên phải */}
        {places[9] && (
          <div className="flex-1 relative overflow-hidden rounded-lg" style={{ height: "400px" }}>
            <img
              src={`${API_URL}${places[9].images_1 || places[9].images_2 || places[9].image_3}`}
              alt={places[9].name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black p-2 text-white font-semibold">
              {places[9].name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamousPlaces;

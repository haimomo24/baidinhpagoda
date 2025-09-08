"use client";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://113.160.202.187:1989";

const FamousPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const steps = [
    { name: "1.Cổng Tam Quan", link: "http://qr.chuabaidinh.com.vn/locations/3" },
    { name: "2.Hành lang La Hán", link: "/http://qr.chuabaidinh.com.vn/locations/4" },
    { name: "3.Điện Quán Âm", link: "/http://qr.chuabaidinh.com.vn/locations/11" },
    { name: "4.Điện Giáo Chủ", link: "/http://qr.chuabaidinh.com.vn/locations/10" },
    { name: "5.Chuông gió", link: "/http://qr.chuabaidinh.com.vn/locations/26" },
    { name: "6.Điện Tam Thế", link: "http://qr.chuabaidinh.com.vn/locations/12" },
    { name: "7.Chùa cổ", link: "http://qr.chuabaidinh.com.vn/locations/17" },
    { name: "8.Bảo Tháp", link: "/bao-thap" },
    { name: "9.Bát chính đạo", link: "http://qr.chuabaidinh.com.vn/locations/16" },
  ];

  useEffect(() => {
    fetch(`${API_URL}/api/visit`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi load dữ liệu visit:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (!places || places.length === 0)
    return <p className="text-center">Chưa có địa điểm nào</p>;

  return (
    <div
      className="w-full min-h-screen bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")`,
         backgroundSize: "100% 100%",
      }}
    >
      {/* Lớp phủ mờ để dễ nhìn chữ */}
      <div className=" bg-[#F1EBE5]/40">
        <div className="max-w-[1200px] mt-[-100px] mx-auto px-4 py-8 ">
          <h1 className="text-3xl font-bold mb-8">Lộ Trình Tham Quan</h1>

          {/* Hàng 1 */}
          <div className="flex gap-4 mb-4">
            {/* Ô lớn bên trái */}
            {places[0] && (
              <div
                className="flex-1 relative overflow-hidden rounded-lg"
                style={{ height: "400px" }}
              >
                <img
                  src={`${API_URL}${
                    places[0].images_1 || places[0].images_2 || places[0].image_3
                  }`}
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
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg"
                  style={{ height: "195px" }}
                >
                  <img
                    src={`${API_URL}${
                      place.images_1 || place.images_2 || place.image_3
                    }`}
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
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg"
                  style={{ height: "195px" }}
                >
                  <img
                    src={`${API_URL}${
                      place.images_1 || place.images_2 || place.image_3
                    }`}
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
              <div
                className="flex-1 relative overflow-hidden rounded-lg"
                style={{ height: "400px" }}
              >
                <img
                  src={`${API_URL}${
                    places[9].images_1 || places[9].images_2 || places[9].image_3
                  }`}
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

        {/* sơ đồ tham quan */}
        <div className="py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Sơ Đồ Lộ Trình Tham Quan</h2>
            <div className="relative">
              <div className="absolute top-5 left-0 w-full h-1 bg-[#356D3D]"></div>
              <div className="flex justify-between relative">
                {steps.map((step, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <Link href={step.link}>
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-4 border-[#356D3D] group-hover:border-[#E7000B] z-10 group-hover:scale-110 transition-transform">
                          <FaMapMarkerAlt className="text-[#356D3D]" />
                        </div>
                        <p
                          className="mt-5 text-sm font-semibold text-center truncate max-w-[100px] group-hover:whitespace-normal group-hover:scale-110 group-hover:text-[#E7000B] group-hover:overflow-visible group-hover:max-w-[200px]"
                          title={step.name}
                        >
                          {step.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamousPlaces;

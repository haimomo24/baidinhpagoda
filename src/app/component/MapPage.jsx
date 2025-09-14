import React from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapPage = () => {
  const router = useRouter();

  // Các điểm checkin (tọa độ tính theo % so với ảnh)
  const points = [
    { id: 4, top: "70%", left: "25%", link: "/checkin/4", name: "Cổng Tam Quan" },
    { id: 7, top: "59%", left: "32%", link: "/checkin/7", name: "Tam Quan Nội" },
    { id: 9, top: "47%", left: "39%", link: "/checkin/9", name: "Tháp Chuông" },
    { id: 10, top: "25%", left: "44%", link: "/checkin/12", name: "Cầu Chuông Gió" },
    { id: 11, top: "29%", left: "51%", link: "/checkin/12", name: "Điện Pháp Chủ" },
    { id: 12, top: "37%", left: "46%", link: "/checkin/12", name: "Hồ tiên" },
    { id: 34, top: "50%", left: "59%", link: "/checkin/34", name: "Lăng Diệu Niên" },
    { id: 36, top: "60%", left: "54%", link: "/checkin/36", name: "Hồ Thuỷ Đình" },
    { id: 37, top: "68%", left: "45%", link: "/checkin/37", name: "Bát Chính Đạo" },
  ];

  return (
    <div className="relative w-full md:w-1/2 lg:w-2/3 flex justify-center mt-6 md:mt-0">
      {/* Ảnh bản đồ */}
      <img
        src="/images/8654b14192ef19b140fe.jpg"
        alt="Bản đồ các điểm checkin"
        className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[550px] object-cover border-0 rounded-none shadow-none"
      />

      {/* Các icon checkin */}
      {points.map((p) => (
        <FaMapMarkerAlt
          key={p.id}
          onClick={() => router.push(p.link)}
          className="absolute hidden md:block text-[#EC3C3F] hover:text-[#FFD843] cursor-pointer hover:scale-145 transition-transform drop-shadow-lg"
          style={{ top: p.top, left: p.left, fontSize: "35px" }}
          title={p.name}
        />
      ))}
    </div>
  );
};

export default MapPage;

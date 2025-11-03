'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import VideoPage from "../common/VideoPage";

const ShowKhuyenmai = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [relatedPromotions, setRelatedPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch chi tiết khuyến mãi
  useEffect(() => {
    if (!id) return;
    const fetchPromotion = async () => {
      try {
        const res = await fetch(`http://113.160.202.187:1985/api/promotion/${id}`);
        const data = await res.json();
        setPromotion(data);
      } catch (err) {
        console.error("Lỗi khi load chi tiết promotion:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotion();
  }, [id]);

  // Fetch khuyến mãi liên quan
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch("http://113.160.202.187:1985/api/promotion");
        const data = await res.json();
        if (Array.isArray(data)) {
          const filtered = data
            .filter((item) => item.id !== parseInt(id))
            .slice(0, 3);
          setRelatedPromotions(filtered);
        }
      } catch (error) {
        console.error("Lỗi khi load related promotions:", error);
      }
    };
    if (id) fetchRelated();
  }, [id]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (!promotion) return <div className="text-center py-10">Không tìm thấy khuyến mãi</div>;

  // Format tiền VND
  const formatVND = (value) =>
    value ? `${Number(value).toLocaleString("vi-VN")} VND` : "Liên hệ";

  return (
    <div className="max-w-6xl mt-12 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Nội dung chính */}
    <article className="lg:col-span-2 grid gap-4">
  <h1 className="text-4xl font-bold leading-tight">{promotion.name}</h1>

  {promotion.image && (
    <img
      src={promotion.image}
      alt={promotion.title}
      className="w-full h-auto rounded-lg"
    />
  )}

  {/* Thêm hiển thị đầy đủ thông tin */}
    <p className="mt-2 text-gray-600"> {promotion.title}</p>
  <p className="text-lg leading-7 text-justify whitespace-pre-line">
  {promotion.description?.split(",").join("\n")}
</p>

  <p className="mt-2 text-gray-600">/ {promotion.unit}</p>
  <p className="mt-1 font-semibold">Giá Gốc : {formatVND(promotion.price_1)}</p>
  <p className="mt-1 font-semibold">Khuyến mại: {formatVND(promotion.price_2)}</p>
</article>

      {/* Khuyến mãi liên quan */}
      <aside className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Khuyến mãi liên quan
        </h2>
        <ul className="space-y-4">
          {relatedPromotions.map((item) => (
            <li key={item.id}>
              <Link
                href={`/vi/khuyenmai/${item.id}`}
                className="flex gap-3 items-stretch"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {formatVND(item.price_1)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      
    </div>
  );
};

export default ShowKhuyenmai;

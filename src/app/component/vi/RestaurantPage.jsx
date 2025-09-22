"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RestaurantPage() {
  // lightbox: null hoặc { images: [...], index: number }
  const [lightbox, setLightbox] = useState(null);

 
  const heroImages = ["/images/3fab96ee3296b8c8e187.jpg"];
  const buffetImages = [
    "/images/397cd5a83dd8b786eec9.jpg",
    "/images/8ef54698a4e82eb677f9.jpg",
    "/images/518ad8073f77b529ec66.jpg",
  ];
  const dessertImages = [
    "/images/518ad8073f77b529ec66.jpg",
    "/images/518ad8073f77b529ec66.jpg"
    
  ];
  const lauImages = [
    "/images/e5810ef0ec8066de3f91.jpg",
    "/images/e5810ef0ec8066de3f91.jpg"
    
  ];
  const mamComImages = [
    "/images/5b9a212ec95e43001a4f.jpg",
    "/images/e5810ef0ec8066de3f91.jpg"
    
  ];


  const ZoomableImage = ({ src, alt, className, images = [src], idx = 0 }) => (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-pointer hover:scale-105 transition`}
      onClick={() => {
        // mở lightbox chứa đúng mảng images, bắt đầu từ idx
        setLightbox({ images, index: idx });
      }}
    />
  );

  // ----- Điều khiển prev / next trong lightbox -----
  const showPrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length || 1;
      return { ...prev, index: (prev.index - 1 + len) % len };
    });
  };
  const showNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length || 1;
      return { ...prev, index: (prev.index + 1) % len };
    });
  };

  // ----- Hỗ trợ phím ← → Esc -----
  useEffect(() => {
    const handler = (ev) => {
      if (!lightbox) return;
      if (ev.key === "ArrowLeft") showPrev();
      else if (ev.key === "ArrowRight") showNext();
      else if (ev.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  // ------------------------- LAYOUT (GIỮ NGUYÊN) -------------------------
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative">
        <ZoomableImage
          src={heroImages[0]}
          alt="Hero"
          className="w-full h-[90vh] object-cover"
          images={heroImages}
          idx={0}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            NHÀ HÀNG CÁT TƯỜNG
          </motion.h1>
          <motion.p
            className="text-xl mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            CAT TUONG RESTAURANT
          </motion.p>
        </div>
      </section>

      {/* Buffet Chay */}
      <motion.section
        className="bg-[#FAE6CC] py-16 text-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">BUFFET CHAY – NGÀY XANH LÁ</h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg leading-relaxed">
          Nhà hàng Cát Tường với mong muốn lan tỏa văn hóa chay tới thực khách...
        </p>
        <div className="grid grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {buffetImages.map((img, idx) => (
            <ZoomableImage
              key={idx}
              src={img}
              alt={`Buffet ${idx}`}
              className="rounded-lg"
              images={buffetImages}
              idx={idx}
            />
          ))}
        </div>
      </motion.section>

      {/* Tráng miệng */}
      <motion.section
        className="text-emerald-900 py-16 flex flex-wrap items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 px-10 flex justify-center">
          <ZoomableImage
            src={dessertImages[0]}
            alt="Tráng miệng"
            className="max-w-md w-full object-cover rounded-2xl"
            images={dessertImages}
            idx={0}
          />
        </div>
        <div className="w-full md:w-1/2 px-10">
          <h2 className="text-4xl font-bold mb-6">TRÁNG MIỆNG & THỨC UỐNG</h2>
          <p className="text-lg leading-relaxed">
            “Thức quả” gợi nhớ tuổi thơ, đong đầy “hương vị vượt thời gian”...
          </p>
        </div>
      </motion.section>

      {/* Lẩu */}
      <motion.section
        className="bg-[#FAE6CC] py-16 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-8 max-w-6xl w-full px-6">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">LẨU</h2>
            <ul className="space-y-6 text-lg">
              <li>
                <span className="font-semibold">• Lẩu chay</span> <br />
                Nấm các loại, rau củ các loại, đậu phụ, váng đậu, bún miến.
              </li>
              <li>
                <span className="font-semibold">• Lẩu riêu cua bắp bò</span> <br />
                Bắp bò, sườn non, đậu phụ, nấm, rau củ, váng đậu, bún.
              </li>
              <li>
                <span className="font-semibold">• Lẩu Thái hải sản thập cẩm</span> <br />
                Tôm, mực, cá, nấm, rau củ, đậu phụ, váng đậu, bún.
              </li>
            </ul>
          </div>
          <div className="flex-shrink-0">
            <ZoomableImage
              src={lauImages[0]}
              alt="Lẩu"
              className="rounded-l-[80px] max-w-md object-cover"
              images={lauImages}
              idx={0}
            />
          </div>
        </div>
      </motion.section>

      {/* Mâm cơm */}
      <motion.section
        className="py-16 flex flex-wrap items-center justify-center text-emerald-900"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 px-10 flex justify-center">
          <ZoomableImage
            src={mamComImages[0]}
            alt="Mâm cơm đãi khách"
            className="rounded-2xl max-w-md w-full object-cover"
            images={mamComImages}
            idx={0}
          />
        </div>
        <div className="w-full md:w-1/2 px-10">
          <h2 className="text-4xl font-bold mb-6">MÂM CƠM ĐÃI KHÁCH</h2>
          <p className="text-lg leading-relaxed">
            Trong miền kí ức mỗi người sẽ có định nghĩa mâm cơm tuổi thơ khác nhau...
          </p>
        </div>
      </motion.section>

      {/* Thực đơn */}
      <motion.section
        className="bg-[#FAE6CC] text-emerald-900 py-16 text-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">THỰC ĐƠN</h2>
        <p className="mt-4 mb-[50px] text-lg">
          Chỉ từ <span className="text-3xl">50.000 VND</span>
        </p>
        <a
          href="https://heyzine.com/flip-book/b84f7cb6c2.html#page/1"
          className="border bg-emerald-900 text-white px-6 py-2 rounded-lg hover:bg-[#E7000B] mt-[20px] hover:text-white transition"
          target="_blank"
        >
          MENU BOOK
        </a>
      </motion.section>

      {/* Liên hệ */}
      <motion.section
        className="bg-gray-200 py-12 px-6 flex justify-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap w-full max-w-5xl">
          <div className="w-full md:w-1/2 md:pr-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">LIÊN HỆ ĐẶT BÀN</h2>
            <p className="mb-2">Hotline: 0916 138 692</p>
            <p className="mb-2">Địa chỉ: Phường Tây hoa Lư , Ninh Bình </p>
          </div>
          <div className="w-full md:w-1/2">
            <form className="grid gap-3">
              <input type="text" placeholder="Your name" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Your phone" className="p-3 border rounded-lg" />
              <input type="email" placeholder="Your email" className="p-3 border rounded-lg" />
              <textarea placeholder="Message" className="p-3 border rounded-lg h-28" />
              <button className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition">
                Đặt ngay
              </button>
            </form>
          </div>
        </div>
      </motion.section>

     
      <AnimatePresence>
  {lightbox && lightbox.images && lightbox.images.length > 0 && (
    <motion.div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setLightbox(null)}
    >
      <div
        className="relative flex items-center w-full h-full justify-center px-6"
        onClick={(e) => e.stopPropagation()} // tránh click ảnh làm đóng
      >
        {/* Nút đóng */}
        <button
          className="absolute top-5 right-5 text-white text-3xl font-bold z-50"
          onClick={() => setLightbox(null)}
        >
          ✕
        </button>

        {/* Prev */}
        {lightbox.images.length > 1 && (
          <button
            className="absolute left-5 md:left-10 text-white text-4xl z-50"
            onClick={showPrev}
            aria-label="previous"
          >
            ❮
          </button>
        )}

        {/* Ảnh chính */}
        <motion.img
          key={`${lightbox.index}-${lightbox.images[lightbox.index]}`}
          src={lightbox.images[lightbox.index]}
          className="max-h-[90%] max-w-[90%] rounded-xl shadow-lg mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        {lightbox.images.length > 1 && (
          <button
            className="absolute right-5 md:right-10 text-white text-4xl z-50"
            onClick={showNext}
            aria-label="next"
          >
            ❯
          </button>
        )}
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-5 text-white text-lg">
        {lightbox.index + 1} / {lightbox.images.length}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

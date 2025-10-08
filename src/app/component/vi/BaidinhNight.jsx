"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BaidinhNight = () => {
  const [lightbox, setLightbox] = useState(null);
  const [formData, setFormData] = useState({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        const [loading, setLoading] = useState(false);
  const heroImages = ["/images/IMG_6855.JPG"];
  const nightImages = [
    "/images/DSC05320.JPG",
    "/images/DSC05501.JPG",
    "/images/DSC05490.jpg",
  ];
  const templeImages = ["/images/DSC05322.JPG", "/images/baidinh-temple2.jpg"];
  const foodImages = ["/images/DSC05320.JPG", "/images/baidinh-food2.jpg"];
  const souvenirImages = [
    "/images/DSC05320.JPG",
    "/images/baidinh-souvenir2.jpg",
  ];

  // Zoomable Image
  const ZoomableImage = ({ src, alt, className, images = [src], idx = 0 }) => (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-pointer hover:scale-105 transition`}
      onClick={() => setLightbox({ images, index: idx })}
    />
  );

  // Prev/Next Lightbox
  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length;
      return { ...prev, index: (prev.index - 1 + len) % len };
    });
  };
  const showNext = (e) => {
    if (e) e.stopPropagation();
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length;
      return { ...prev, index: (prev.index + 1) % len };
    });
  };

  // Keyboard
  useEffect(() => {
    const handler = (ev) => {
      if (!lightbox) return;
      if (ev.key === "ArrowLeft") showPrev();
      else if (ev.key === "ArrowRight") showNext();
      else if (ev.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://113.160.202.187:1989/api/baidinhnight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Booking successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Error booking, please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error!");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative">
        <ZoomableImage
          src={heroImages[0]}
          alt="Bái Đính về đêm"
          className="w-full h-[70vh] md:h-[90vh] object-cover"
          images={heroImages}
          idx={0}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 px-4 text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            BÁI ĐÍNH VỀ ĐÊM
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            BAIDINH NIGHT TOUR
          </motion.p>
        </div>
      </section>

      {/* Section 1: Đêm lung linh */}
      <motion.section
        className="bg-[#FAE6CC] py-12 md:py-16 text-center px-4"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-bold">ĐÊM LUNG LINH</h2>
        <p className="max-w-3xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
          Ngắm nhìn chùa Bái Đính khi ánh sáng rực rỡ lên đèn, một khung cảnh
          huyền ảo đầy kỳ bí...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {nightImages.map((img, idx) => (
            <ZoomableImage
              key={idx}
              src={img}
              alt={`Night ${idx}`}
              className="rounded-lg w-full object-cover"
              images={nightImages}
              idx={idx}
            />
          ))}
        </div>
      </motion.section>

      {/* Section 2: Điện chùa */}
      <motion.section
        className="text-emerald-900 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center px-4"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <ZoomableImage
            src={templeImages[0]}
            alt="Điện chùa"
            className="max-w-md w-full object-cover rounded-2xl"
            images={templeImages}
            idx={0}
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">ĐIỆN CHÙA</h2>
          <p className="text-base md:text-lg leading-relaxed">
            Khám phá vẻ đẹp uy nghi, tôn kính trong không gian thanh tịnh...
          </p>
        </div>
      </motion.section>

      {/* Section 3: Ẩm thực */}
      <motion.section
        className="bg-[#FAE6CC] py-12 md:py-16 flex justify-center px-4"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full px-6">
          <div className="max-w-lg w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">ẨM THỰC</h2>
            <ul className="space-y-4 md:space-y-6 text-base md:text-lg">
              <li>
                <span className="font-semibold">• Cơm chay</span> <br />
                Đậm hương vị quê hương, thanh đạm và tinh khiết.
              </li>
              <li>
                <span className="font-semibold">• Đặc sản Ninh Bình</span>{" "}
                <br />
                Cơm cháy, dê núi, nem chua...
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <ZoomableImage
              src={foodImages[0]}
              alt="Ẩm thực"
              className="rounded-l-[40px] md:rounded-l-[80px] w-full max-w-md object-cover"
              images={foodImages}
              idx={0}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 4: Quà lưu niệm */}
      <motion.section
        className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-center text-emerald-900 px-4"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <ZoomableImage
            src={souvenirImages[0]}
            alt="Quà lưu niệm"
            className="rounded-2xl w-full max-w-md object-cover"
            images={souvenirImages}
            idx={0}
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">QUÀ LƯU NIỆM</h2>
          <p className="text-base md:text-lg leading-relaxed">
            Lưu giữ ký ức với những món quà nhỏ xinh, mang đậm dấu ấn vùng đất
            Ninh Bình...
          </p>
        </div>
      </motion.section>

      {/* Liên hệ */}
      <motion.section
        className="bg-gray-200 py-12 px-4 md:px-6 flex justify-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              LIÊN HỆ ĐẶT TOUR
            </h2>
            <p className="mb-2">Hotline: 0916 138 692</p>
            <p className="mb-2">Địa chỉ: Xã Gia Sinh, Gia Viễn, Ninh Bình</p>
          </div>
          <div className="w-full md:w-1/2">
           <form className="grid gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border rounded-lg h-28 w-full"
              />
              <button
                type="submit"
                disabled={loading}
                className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Booking Now"}
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
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
              onClick={(e) => e.stopPropagation()}
            >
              {/* Đóng */}
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
                >
                  ❮
                </button>
              )}
              {/* Ảnh */}
              <motion.img
                key={`${lightbox.index}-${lightbox.images[lightbox.index]}`}
                src={lightbox.images[lightbox.index]}
                className="max-h-[90%] max-w-[90%] rounded-xl shadow-lg mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
              />
              {/* Next */}
              {lightbox.images.length > 1 && (
                <button
                  className="absolute right-5 md:right-10 text-white text-4xl z-50"
                  onClick={showNext}
                >
                  ❯
                </button>
              )}
            </div>
            <div className="absolute bottom-5 text-white text-lg">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BaidinhNight;

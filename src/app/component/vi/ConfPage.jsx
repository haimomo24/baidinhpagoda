"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfPage = () => {
  const [lightbox, setLightbox] = useState(null);
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    const [loading, setLoading] = useState(false);
  const imagesA = [
    "/images/phonga.jpg",
    "/images/phonga.jpg",
    "/images/phonga.jpg",
  ];
  const imagesB = [
    "/images/phonga.jpg",
    "/images/8ef54698a4e82eb677f9.jpg",
    "/images/vsack.jpg",
  ];
  const imagesC = [
    "/images/vsack.jpg",
    "/images/397cd5a83dd8b786eec9.jpg",
    "/images/phonga.jpg",
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

  // Lightbox navigation
  const showPrev = () => {
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length;
      return { ...prev, index: (prev.index - 1 + len) % len };
    });
  };
  const showNext = () => {
    setLightbox((prev) => {
      if (!prev) return null;
      const len = prev.images.length;
      return { ...prev, index: (prev.index + 1) % len };
    });
  };

  // Keyboard support
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
  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://113.160.202.187:1985/api/conference", {
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
          src="/images/vsack.jpg"
          alt="Phòng hội nghị"
          className="w-full h-[70vh] md:h-[90vh] object-cover"
          images={["/images/vsack.jpg"]}
          idx={0}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 px-4 text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            PHÒNG HỘI NGHỊ
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            CONFERENCE ROOM
          </motion.p>
        </div>
      </section>

      {/* Hội Trường A */}
      <motion.section
        className="bg-[#FAE6CC] py-12 md:py-16 text-center px-4"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-bold">Hội Trường A</h2>
        <p className="max-w-3xl mx-auto mt-4 text-base md:text-lg">
          Diện tích: ​​460m²
        </p>
        <p className="mt-2 italic text-sm md:text-base">
          Sức chứa lên đến 200 người
        </p>
        <div className="mt-6 font-bold">
          Hotline: <span>1900.966.909</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {imagesA.map((src, i) => (
            <ZoomableImage
              key={i}
              src={src}
              alt={`Hội Trường A ${i}`}
              className="rounded-lg w-full object-cover"
              images={imagesA}
              idx={i}
            />
          ))}
        </div>
      </motion.section>

      {/* Hội Trường B */}
      <motion.section
        className="text-emerald-900 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center px-4"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <ZoomableImage
            src="/images/phonga.jpg"
            alt="Hội Trường B"
            className="max-w-md w-full object-cover rounded-2xl"
            images={imagesB}
            idx={0}
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Hội Trường B</h2>
          <p className="text-base md:text-lg leading-relaxed">Diện tích: ​​120m²</p>
          <p className="text-base md:text-lg leading-relaxed">
            Sức chứa lên đến 50 người
          </p>
        </div>
      </motion.section>

      {/* Trung tâm Hội nghị Quốc tế */}
      <motion.section
        className="bg-[#FAE6CC] py-12 md:py-16 flex flex-col md:flex-row justify-center items-center px-4"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-lg w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Trung tâm Hội nghị Quốc tế
          </h2>
          <ul className="space-y-4 md:space-y-6 text-base md:text-lg">
            <li>
              <span className="font-semibold">• Diện tích: 5.000m²</span> <br />
              Sức chứa lên đến 3500 người
            </li>
            <li>
              <span className="font-semibold">• Thích hợp tổ chức</span> <br />
              các sự kiện quốc tế, lễ hội và hội nghị cấp cao
            </li>
            <li>
              <span className="font-semibold">• Trang thiết bị</span> <br />
              Tối tân, phục vụ chuyên nghiệp
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <ZoomableImage
            src="/images/vsack.jpg"
            alt="Trung tâm Hội nghị"
            className="rounded-l-[40px] md:rounded-l-[80px] max-w-md w-full object-cover"
            images={imagesC}
            idx={0}
          />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">LIÊN HỆ ĐẶT</h2>
            <p className="mb-2">Hotline: 0916 138 692</p>
            <p className="mb-2">Địa chỉ: Phường Tây hoa Lư, Ninh Bình</p>
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
              <button
                className="absolute top-5 right-5 text-white text-3xl font-bold z-50"
                onClick={() => setLightbox(null)}
              >
                ✕
              </button>
              {lightbox.images.length > 1 && (
                <button
                  className="absolute left-5 md:left-10 text-white text-4xl z-50"
                  onClick={showPrev}
                >
                  ❮
                </button>
              )}
              <motion.img
                key={`${lightbox.index}-${lightbox.images[lightbox.index]}`}
                src={lightbox.images[lightbox.index]}
                className="max-h-[90%] max-w-[90%] rounded-xl shadow-lg mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
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

export default ConfPage;

"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ConfPage = () => {
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const openLightbox = (images, index) => {
    setLightbox({ open: true, images, index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, open: false });
  };

  const nextSlide = () => {
    setLightbox({
      ...lightbox,
      index: (lightbox.index + 1) % lightbox.images.length,
    });
  };

  const prevSlide = () => {
    setLightbox({
      ...lightbox,
      index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length,
    });
  };

  // Ảnh riêng cho từng section
  const imagesA = [
    "/images/397cd5a83dd8b786eec9.jpg",
    "/images/8ef54698a4e82eb677f9.jpg",
    "/images/518ad8073f77b529ec66.jpg",
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

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative">
        <img src="/images/vsack.jpg" alt="" className="w-full h-[90vh] object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            PHÒNG HỘI NGHỊ
          </motion.h1>
          <motion.p
            className="text-xl mt-2"
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
        className="bg-[#FAE6CC] py-16 text-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold">Hội Trường A</h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg leading-relaxed">Diện tích: ​​460m²</p>
        <p className="mt-4 italic">Sức chứa lên đến 200 người</p>
        <div className="mt-6 font-bold">
          Hotline: <span className="">1900.966.909</span>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {imagesA.map((src, i) => (
            <img
              key={i}
              src={src}
              className="rounded-lg cursor-pointer hover:opacity-80 transition"
              onClick={() => openLightbox(imagesA, i)}
            />
          ))}
        </div>
      </motion.section>

      {/* Hội Trường B */}
      <motion.section
        className="text-emerald-900 py-16 flex flex-wrap items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full md:w-1/2 px-10 flex justify-center">
          <img
            src="/images/phonga.jpg"
            className="max-w-md w-full object-cover rounded-2xl cursor-pointer"
            alt="Hội Trường B"
            onClick={() => openLightbox(imagesB, 0)}
          />
        </div>
        <div className="w-full md:w-1/2 px-10">
          <h2 className="text-4xl font-bold mb-6">Hội Trường B</h2>
          <p className="text-lg leading-relaxed">Diện tích: ​​120m²</p>
          <p className="text-lg leading-relaxed">Sức chứa lên đến 50 người</p>
        </div>
      </motion.section>

      {/* Trung tâm Hội nghị Quốc tế */}
      <motion.section
        className="bg-[#FAE6CC] py-16 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-8 max-w-6xl w-full px-6">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Trung tâm Hội nghị Quốc tế</h2>
            <ul className="space-y-6 text-lg">
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
          <div className="flex-shrink-0">
            <img
              src="/images/vsack.jpg"
              className="rounded-l-[80px] max-w-md object-cover cursor-pointer"
              alt="Trung tâm Hội nghị"
              onClick={() => openLightbox(imagesC, 0)}
            />
          </div>
        </div>
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
          {/* Cột trái */}
          <div className="w-full md:w-1/2 md:pr-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">LIÊN HỆ ĐẶT</h2>
            <p className="mb-2">Hotline: 0916 138 692</p>
            <p className="mb-2">Địa chỉ: Phường Tây hoa Lư, Ninh Bình</p>
          </div>

          {/* Cột phải */}
          <div className="w-full md:w-1/2">
            <form className="grid gap-3">
              <input type="text" placeholder="Your name" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Your phone" className="p-3 border rounded-lg" />
              <input type="email" placeholder="Your email" className="p-3 border rounded-lg" />

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" /> Hội nghị A
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" /> Hội nghị B
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" /> Vesak
                </label>
              </div>

              <textarea placeholder="Message" className="p-3 border rounded-lg h-28" />
              <button className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition">
                Đặt ngay
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white text-3xl">
            <X size={32} />
          </button>
          <button onClick={prevSlide} className="absolute left-5 text-white text-4xl">
            ❮
          </button>
          <img
            src={lightbox.images[lightbox.index]}
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />
          <button onClick={nextSlide} className="absolute right-5 text-white text-4xl">
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfPage;

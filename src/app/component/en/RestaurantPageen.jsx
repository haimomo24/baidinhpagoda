"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const RestaurantPageen = () => {
     const [lightbox, setLightbox] = useState(null);
    
      const heroImages = ["/images/3fab96ee3296b8c8e187.jpg"];
      const buffetImages = [
        "/images/397cd5a83dd8b786eec9.jpg",
        "/images/8ef54698a4e82eb677f9.jpg",
        "/images/518ad8073f77b529ec66.jpg",
      ];
      const dessertImages = [
        "/images/518ad8073f77b529ec66.jpg",
        "/images/518ad8073f77b529ec66.jpg",
      ];
      const lauImages = [
        "/images/e5810ef0ec8066de3f91.jpg",
        "/images/e5810ef0ec8066de3f91.jpg",
      ];
      const mamComImages = [
        "/images/5b9a212ec95e43001a4f.jpg",
        "/images/e5810ef0ec8066de3f91.jpg",
      ];
    
      const ZoomableImage = ({ src, alt, className, images = [src], idx = 0 }) => (
        <img
          src={src}
          alt={alt}
          className={`${className} cursor-pointer hover:scale-105 transition`}
          onClick={() => setLightbox({ images, index: idx })}
        />
      );
    
      const showPrev = (e) => {
        if (e?.stopPropagation) e.stopPropagation();
        setLightbox((prev) => {
          if (!prev) return null;
          const len = prev.images.length || 1;
          return { ...prev, index: (prev.index - 1 + len) % len };
        });
      };
      const showNext = (e) => {
        if (e?.stopPropagation) e.stopPropagation();
        setLightbox((prev) => {
          if (!prev) return null;
          const len = prev.images.length || 1;
          return { ...prev, index: (prev.index + 1) % len };
        });
      };
    
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
  return (
    <div className="w-full">
          {/* Hero */}
          <section className="relative">
            <ZoomableImage
              src={heroImages[0]}
              alt="Hero"
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
                 CAT TUONG RESTAURANT
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                NHÀ HÀNG CÁT TƯỜNG
              </motion.p>
            </div>
          </section>
    
          {/* Buffet */}
          <motion.section
            className="bg-[#FAE6CC] py-12 md:py-16 text-center px-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold">VEGETARIAN BUFFET – GREEN DAY</h2>
            <p className="max-w-3xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
              Cat Tuong Restaurant with the desire to spread vegetarian culture to diners...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
              {buffetImages.map((img, idx) => (
                <ZoomableImage
                  key={idx}
                  src={img}
                  alt={`Buffet ${idx}`}
                  className="rounded-lg w-full object-cover"
                  images={buffetImages}
                  idx={idx}
                />
              ))}
            </div>
          </motion.section>
    
          {/* Tráng miệng */}
          <motion.section
            className="text-emerald-900 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center px-4"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
              <ZoomableImage
                src={dessertImages[0]}
                alt="Tráng miệng"
                className="w-full max-w-md object-cover rounded-2xl"
                images={dessertImages}
                idx={0}
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left md:px-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
DESSERTS & DRINKS</h2>
              <p className="text-base md:text-lg leading-relaxed">
                “Fruit” evokes childhood memories, filled with “timeless flavor...
              </p>
            </div>
          </motion.section>
    
          {/* Lẩu (ĐÃ FIX) */}
          <motion.section
            className="bg-[#FAE6CC] py-12 md:py-16 flex justify-center px-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Bao bọc để giới hạn width và căn giữa */}
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full px-6">
              {/* Text - giới hạn chiều rộng để không kéo xa ảnh */}
              <div className="max-w-lg w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">HOT POT</h2>
                <ul className="space-y-4 md:space-y-6 text-base md:text-lg">
                  <li>
                    <span className="font-semibold">• Vegetarian hot pot</span> <br />
                    Mushrooms, vegetables, tofu, bean curd, vermicelli
                  </li>
                  <li>
                    <span className="font-semibold">•Crab and beef hotpot </span> <br />
                    Beef, spare ribs, tofu, mushrooms, vegetables, tofu skin, vermicell
                  </li>
                  <li>
                    <span className="font-semibold">• Thai hot pot with mixed seafood</span> <br />
                    
                    Shrimp, squid, fish, mushrooms, vegetables, tofu, bean curd, vermicelli. 
                  </li>
                </ul>
              </div>
    
              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <ZoomableImage
                  src={lauImages[0]}
                  alt="Lẩu"
                  className="rounded-l-[40px] md:rounded-l-[80px] w-full max-w-md object-cover"
                  images={lauImages}
                  idx={0}
                />
              </div>
            </div>
          </motion.section>
    
          {/* Mâm cơm */}
          <motion.section
            className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-center text-emerald-900 px-4"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
              <ZoomableImage
                src={mamComImages[0]}
                alt="Mâm cơm"
                className="rounded-2xl w-full max-w-md object-cover"
                images={mamComImages}
                idx={0}
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left md:px-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">MEAL FOR GUESTS</h2>
              <p className="text-base md:text-lg leading-relaxed">
                In each person's memory, there will be a different definition of childhood meals...
              </p>
            </div>
          </motion.section>
    
          {/* Thực đơn */}
          <motion.section
            className="bg-[#FAE6CC] text-emerald-900 py-12 md:py-16 text-center px-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold">MENU</h2>
            <p className="mt-4 mb-8 text-base md:text-lg">
              Just words <span className="text-xl md:text-3xl">50.000 VND</span>
            </p>
            <a
              href="https://heyzine.com/flip-book/b84f7cb6c2.html#page/1"
              className="border bg-emerald-900 text-white px-6 py-2 rounded-lg hover:bg-[#E7000B] hover:text-white transition"
              target="_blank"
            >
              MENU BOOK
            </a>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">CONTACT TO RESERVE A TABLE</h2>
                <p className="mb-2">Hotline: 0916 138 692</p>
                <p className="mb-2">Address:Tay Hoa Lu Ward, Ninh Binh </p>
              </div>
              <div className="w-full md:w-1/2">
                <form className="grid gap-3">
                  <input type="text" placeholder="Your name" className="p-3 border rounded-lg w-full" />
                  <input type="text" placeholder="Your phone" className="p-3 border rounded-lg w-full" />
                  <input type="email" placeholder="Your email" className="p-3 border rounded-lg w-full" />
                  <textarea placeholder="Message" className="p-3 border rounded-lg h-28 w-full" />
                  <button className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition">
                    Booking now
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
    
          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && lightbox.images?.length > 0 && (
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
                      aria-label="previous"
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
                    transition={{ duration: 0.18 }}
                  />
    
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
                <div className="absolute bottom-5 text-white text-lg">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  )
}

export default RestaurantPageen
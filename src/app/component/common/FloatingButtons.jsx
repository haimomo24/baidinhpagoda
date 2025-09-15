// app/component/common/FloatingButtons.jsx
"use client";

import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-20 z-50 transition-opacity duration-500 ${
        isScrolling ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex flex-col space-y-3">
        {/* Hotline (Có sóng lan tỏa) */}
        <div className="group relative">
          <a
            href="tel:1900966909"
            className="relative flex items-center justify-center w-10 h-10 
                     bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg 
                     transition-all duration-300 hover:scale-110"
          >
            {/* Sóng lan tỏa */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <svg
              className="w-6 h-6 relative z-10"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hotline: 1900966909
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-500"></div>
          </div>
        </div>

        {/* Zalo (Không sóng) */}
        <div className="group relative">
          <a
            href="https://zalo.me/0913899135"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 
                       bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg 
                       transition-all duration-300 hover:scale-110"
          >
            <span className="text-white text-lg font-bold">Z</span>
          </a>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chat Zalo
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-500"></div>
          </div>
        </div>

        {/* Messenger (Không sóng) */}
        <div className="group relative">
          <a
            href="https://www.facebook.com/chuabaidinh35"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10
                       bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg 
                       transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.9 1.309 5.49 3.375 7.31V22l3.31-1.82c.88.24 1.82.37 2.815.37 5.523 0 10-4.145 10-9.25S17.523 2 12 2zm1.09 12.44l-2.54-2.71L6.77 14.44l4.95-5.25 2.54 2.71 3.78-2.71-4.95 5.25z" />
            </svg>
          </a>
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Facebook Messenger
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

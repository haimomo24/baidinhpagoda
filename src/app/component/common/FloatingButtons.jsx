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
                      text-white rounded-full shadow-lg 
                     transition-all duration-300 hover:scale-110"
          >
            {/* Sóng lan tỏa */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
           <img
                src="/images/phone-call.png"
                alt="Logo Front"
                className=" w-8 h-8 object-contain backface-hidden"
              />
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
                         rounded-full shadow-lg 
                       transition-all duration-300 hover:scale-110"
          >
              <img
                src="/images/7044033_zalo_icon.png"
                alt="Logo Front"
                className=" w-6 h-6 object-contain backface-hidden"
              />
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
                        text-white rounded-full shadow-lg 
                       transition-all duration-300 hover:scale-110"
          >
           <img
                src="/images/messenger.png"
                alt="Logo Front"
                className=" w-6 h-6 object-contain backface-hidden"
              />
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

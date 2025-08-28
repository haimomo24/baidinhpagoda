"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Libre_Baskerville } from "next/font/google";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeaderPageVi() {
  const lang = "vi";

  const menuItems = [
    { name: "Trang Chủ", link: "#" },
    { name: "Dịch vụ",
       link: "#" ,
       subMenu: [
        { name: "Xe Điện", link: "#" },
        { name: "Khách sạn", link: "/vi/hotel" },
        
      ],
      
      },
    { name: "Sự kiện", link: "#" },
    {
      name: "Điểm đến",
      link: "#",
      subMenu: [
        { name: "Tràng An", link: "#" },
        { name: "Tam Chúc", link: "#" },
        { name: "Phố cổ", link: "#" },
        { name: "Sân Golf", link: "#" },
         { name: "Tam cốc ", link: "#" },
      ],
    },
    { name: "Liên hệ",
       link: "#" ,
      subMenu: [
        { name: "Tuyển Dụng ", link: "#" },
        { name: "Liên hệ ngay ", link: "/vi/contact" },
        
      ],},
  ];

  const languages = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ];

  const changeLang = (newLang) => {
    if (newLang !== lang) window.location.href = `/${newLang}`;
  };

  return (
    <header className={`w-full  bg-white ${libre.className}`}>
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <img
            src="/images/logo-bai-dinh.png"
            alt="Trang An Group"
            className="h-[70px] w-[70px]"
          />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-base font-semibold text-gray-900 relative">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Menu item */}
              <a
                href={item.link}
                className="cursor-pointer hover:text-red-600 transition-colors"
              >
                {item.name}
              </a>

              {/* Submenu */}
              {item.subMenu && (
                <div
                  className="absolute left-0 top-full  hidden group-hover:block
                             bg-white rounded shadow-lg min-w-[180px] z-50"
                >
                  {item.subMenu.map((sub, i) => (
                    <a
                      key={i}
                      href={sub.link}
                      className="block px-4 py-2 text-sm text-gray-700 
                                 hover:bg-gray-100 hover:text-red-600"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icon + Ngôn ngữ */}
        <div className="flex items-center gap-4">
          <FaFacebookF className="w-4 h-4 cursor-pointer hover:text-blue-600" />
          <FaInstagram className="w-4 h-4 cursor-pointer hover:text-pink-600" />
          <FaYoutube className="w-4 h-4 cursor-pointer hover:text-red-600" />
          <Heart className="w-5 h-5 cursor-pointer hover:text-red-600" />
          <select
            value={lang}
            onChange={(e) => changeLang(e.target.value)}
            className="border rounded px-2 py-1 text-sm cursor-pointer bg-transparent"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

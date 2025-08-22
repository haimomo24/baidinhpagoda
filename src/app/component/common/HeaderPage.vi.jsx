"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Libre_Baskerville } from "next/font/google";  // ✅ NHỚ import

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeaderPageVi() {
  const lang = "vi";

  const menuItems = [
    { name: "Trang Chủ", link: "#" },
    { name: "Dịch vụ", link: "#" },
    { name: "Sự kiện", link: "#" },
    { name: "Điểm đến  ", link: "#" },
    { name: "Liên hệ", link: "#" },
  ];

  const languages = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ];

  const changeLang = (newLang) => {
    if (newLang !== lang) window.location.href = `/${newLang}`;
  };

  return (
    <header className={`w-full border-b shadow-sm bg-white ${libre.className}`}>
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <img src="/images/logo-bai-dinh.png" alt="Trang An Group" className="h-[70px] w-[70px]" />
        </div>

        <nav className="hidden md:flex gap-6 text-base font-semibold text-gray-900">
          {menuItems.map((item, idx) => (
            <a key={idx} href={item.link} className="hover:text-red-600 transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

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

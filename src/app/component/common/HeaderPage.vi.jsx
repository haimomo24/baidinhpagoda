"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Heart } from "lucide-react"; // Không cần icon Search nữa

export default function HeaderPageVi() {
  const lang = "vi";

  const menuItems = [
    { name: "Điểm đến", link: "#" },
    { name: "Trải nghiệm", link: "#" },
    { name: "Lên kế hoạch", link: "#" },
    { name: "Tin tức", link: "#" },
    { name: "Blog", link: "#" },
  ];

  const languages = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ];

  const changeLang = (newLang) => {
    if (newLang !== lang) {
      window.location.href = `/${newLang}`;
    }
  };

  return (
    <header className="w-full border-b shadow-sm font-sans bg-white">
      {/* --- Main Navigation --- */}
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <img
            src="data:image/png;base64,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"
            alt="Trang An Group"
            className="h-[70px] w-[70px]"
          />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-base font-semibold text-gray-900">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="hover:text-red-600 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Icons và Language Selector thay thế cho ô tìm kiếm */}
        <div className="flex items-center gap-4">
          <FaFacebookF className="w-4 h-4 cursor-pointer hover:text-blue-600" />
          <FaInstagram className="w-4 h-4 cursor-pointer hover:text-pink-600" />
          <FaYoutube className="w-4 h-4 cursor-pointer hover:text-red-600" />

          <Heart className="w-5 h-5 cursor-pointer hover:text-red-600" />

          {/* Language dropdown */}
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
"use client";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { ChevronDown, Check, Menu, X } from "lucide-react";
import { Inter, Merriweather } from "next/font/google";
import { SiZalo } from "react-icons/si";
import { useState } from "react";

// Font Inter: body
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Font Merriweather: menu & heading
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeaderPageVi() {
  const [lang, setLang] = useState("vi");
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const menuItems = [
    { name: "Trang Chủ", link: "/vi" },
    { name: "Tin Tức", link: "#blog" },
    {
      name: "Dịch vụ",
      link: "#",
      subMenu: [
        { name: "Xe Điện", link: "/vi/car" },
        { name: "Lưu trú", link: "/vi/hotel" },
        { name: "Nhà hàng", link: "/vi/hotel" },
        { name: "Hội nghị", link: "/vi/hotel" },
      ],
    },
    { isLogo: true }, // logo ở giữa
    {
      name: "Sự kiện",
      subMenu: [
        { name: "Khóa tu", link: "https://chuabaidinhninhbinh.com" },
        { name: "Sự kiện khác", link: "#sk" },
      ],
    },
    {
      name: "Điểm đến",
      link: "#",
      subMenu: [
        { name: "Tràng An", link: "https://trangandanhthang.vn/" },
        { name: "Tam Chúc", link: "https://tamchuc.com.vn/" },
        { name: "Phố cổ", link: "https://www.phocohoalu.com/" },
        { name: "Sân Golf", link: "https://trangangolfandresort.com/" },
        { name: "Tam Cốc", link: "https://tamcocbichdong.vn/" },
        { name: "Thung Ui", link: "https://chuabaidinhninhbinh.com/" },
        { name: "Tuyệt Tịnh Cốc", link: "https://chuabaidinhninhbinh.com/" },
      ],
    },
    {
      name: "Liên hệ",
      link: "#",
      subMenu: [
        { name: "Tuyển Dụng", link: "/vi/recruitment" },
        { name: "Liên hệ ngay", link: "/vi/contact" },
      ],
    },
  ];

  const languages = [
    { code: "vi", label: "Vi" },
    { code: "en", label: "Eng" },
  ];

  const changeLang = (newLang) => {
    setLang(newLang);
    setOpenLang(false);
    window.location.href = `/${newLang}`;
  };

  return (
    <header className={`w-full bg-white bg-[#F1EBE5]/60 ${inter.className}`}>
      <div className="flex flex-col px-6 py-3 max-w-7xl mx-auto">
        {/* Menu desktop */}
        <nav
          className={`hidden md:flex justify-center gap-12 text-[18px] font-semibold text-gray-900 relative ${merriweather.className}`}
        >
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group flex items-center">
              {item.isLogo ? (
                <div className="flex items-center justify-center gap-6 px-6">
                  <img
                    src="/images/e14e901b-87a0-4313-8cfd-0854c8d8e9de.svg"
                    alt="Logo 1"
                    className="h-[70px] w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300"
                  />
                  <img
                    src="/images/log di san the gioi-01.svg"
                    alt="Logo 2"
                    className="h-[70px] w-auto object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : (
                <>
                  <a
                    href={item.link}
                    className="inline-block cursor-pointer transition-all duration-300 transform hover:text-red-600 hover:scale-110"
                  >
                    {item.name}
                  </a>
                  {item.subMenu && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white rounded-xl shadow-lg min-w-[200px] z-50 animate-fadeIn">
                      {item.subMenu.map((sub, i) => (
                        <a
                          key={i}
                          href={sub.link}
                          className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile: nút mở menu */}
        <div className="flex md:hidden justify-between items-center">
          <button onClick={() => setOpenMenu(!openMenu)} className="p-2">
            {openMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
          {/* Logo giữa */}
          <img
            src="/images/e14e901b-87a0-4313-8cfd-0854c8d8e9de.svg"
            alt="Logo"
            className="h-[50px] ml-[150px] w-auto object-contain"
          />
          <img
            src="/images/log di san the gioi-01.svg"
            alt="Logo"
            className="h-[50px] w-auto object-contain"
          />
        </div>

        {/* Menu mobile */}
        {openMenu && (
          <div className="md:hidden mt-4 space-y-2 text-gray-800 font-medium">
            {menuItems.map((item, idx) =>
              item.isLogo ? null : (
                <div key={idx}>
                  <a
                    href={item.link}
                    className="block px-3 py-2 rounded hover:bg-red-50 hover:text-red-600"
                  >
                    {item.name}
                  </a>
                  {item.subMenu && (
                    <div className="ml-4 space-y-1">
                      {item.subMenu.map((sub, i) => (
                        <a
                          key={i}
                          href={sub.link}
                          className="block px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-50 hover:text-red-600"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Icon + ngôn ngữ (desktop và mobile đều hiển thị) */}
        <div className="flex justify-end items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <a href="#" className="p-2 rounded-full border border-gray-200">
              <FaFacebookF className="w-4 h-4 text-blue-600" />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-200">
              <FaInstagram className="w-4 h-4 text-pink-600" />
            </a>
            <button className="p-2 rounded-full border border-gray-200">
              <SiZalo className="w-5 h-5 text-blue-600" />
            </button>
            <a href="#" className="p-2 rounded-full border border-gray-200">
              <FaYoutube className="w-4 h-4 text-red-600" />
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700"
            >
              {languages.find((l) => l.code === lang)?.label}
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  openLang ? "rotate-180" : ""
                }`}
              />
            </button>
            {openLang && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                {languages.map((l) => (
                  <div
                    key={l.code}
                    onClick={() => changeLang(l.code)}
                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between rounded-md hover:bg-red-50 hover:text-red-600 ${
                      lang === l.code
                        ? "text-red-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {l.label}
                    {lang === l.code && <Check className="w-4 h-4" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

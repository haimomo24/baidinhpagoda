"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { ChevronDown, Check, Menu, X } from "lucide-react";
import { Inter, Merriweather } from "next/font/google";
import { SiZalo } from "react-icons/si";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function HeaderPageEn() {
  const router = useRouter();
  const [lang, setLang] = useState("vi"); 
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const menuItems = [
    { name: "HOME", link: "/en" },
    { name: "NEWS", link: "#blogen" },
    {
      name: "SERVICE",
      link: "#",
      subMenu: [
        { name: "Heritage journey", link: "/en/heritage-journey" },
        { name: "Electric Cars", link: "/en/electric-car" },
        { name: "Bai Dinh Night Tour", link: "/en/bai-dinh-night" },
        { name: "Hotel", link: "/en/hotel" },
        { name: "Restaurant", link: "/en/restaurant" },
        { name: "Conference", link: "/en/conference" },
      ],
    },
    { isLogo: true },
    {
      name: "EVENT",
      subMenu: [
        { name: "Retreat", link: "https://chuabaidinhninhbinh.com" },
        { name: "Other events", link: "#sken" },
      ],
    },
    {
      name: "DESTINATION",
      link: "#",
      subMenu: [
        { name: "Trang An", link: "https://trangandanhthang.vn/" },
        { name: "Tam Chuc", link: "https://tamchuc.com.vn/" },
        { name: "Hoa Lu Ancient Town", link: "https://www.phocohoalu.com/" },
        { name: "Tramg An Golf and resort", link: "https://trangangolfandresort.com/" },
        { name: "Tam Coc", link: "https://tamcocbichdong.vn/" },
      ],
    },
    {
      name: "CONTACT",
      link: "/en/contact",
      
    },
  ];

  const languages = [
    { code: "vi", label: "Vi" },
    { code: "en", label: "Eng" },
  ];

  // ✅ Sửa: chuyển ngôn ngữ
  const changeLang = (newLang) => {
    setLang(newLang);
    setOpenLang(false);
    if (newLang === "vi") {
      router.push("/vi");
    } else {
      router.push("/en");
    }
  };

  return (
    <header
      style={{
        backgroundImage:
          'url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")',
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      className={`w-full h-[100px] ${inter.className} md:sticky md:top-0 md:z-50`}
    >
      <div className="flex flex-col px-4 py-2 max-w-7xl mx-auto">
        {/* Menu desktop */}
        <nav
          className={`hidden mt-[10px] md:flex justify-center gap-15 text-[17px] font-semibold text-[#176734] relative ${merriweather.className}`}
        >
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group flex items-center">
              {item.isLogo ? (
                <div className="relative w-[60px] h-[60px] perspective-1000 mx-auto">
                  <div className="absolute inset-0 animate-flipLogo preserve-3d">
                    <img
                      src="/images/e14e901b-87a0-4313-8cfd-0854c8d8e9de.svg"
                      alt="Logo Front"
                      className="absolute inset-0 h-full w-full object-contain backface-hidden"
                    />
                    <img
                      src="/images/log di san the gioi-01.svg"
                      alt="Logo Back"
                      className="absolute inset-0 h-full w-full object-contain backface-hidden rotate-y-180"
                    />
                  </div>
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
                          className="block px-4 py-2 text-sm text-[#0F7F3E] rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
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

        {/* Mobile top bar: [Menu] [Logo] [Lang] */}
        <div className="flex md:hidden mt-[15px] justify-between items-center">
          <button onClick={() => setOpenMenu(!openMenu)} className="p-2 z-20">
            {openMenu ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <div className="relative w-[50px] h-[50px] perspective-1000 mx-auto">
            <div className="absolute inset-0 animate-flipLogo preserve-3d">
              <img
                src="/images/e14e901b-87a0-4313-8cfd-0854c8d8e9de.svg"
                alt="Logo Front"
                className="absolute inset-0 h-full w-full object-contain backface-hidden"
              />
              <img
                src="/images/log di san the gioi-01.svg"
                alt="Logo Back"
                className="absolute inset-0 h-full w-full object-contain backface-hidden rotate-y-180"
              />
            </div>
          </div>

          {/* Language mobile */}
          <div className="relative z-20">
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

        {/* Mobile menu + icon dưới cùng */}
        {openMenu && (
          <div className="md:hidden bg-[#FFFFFF] space-y-2 text-gray-800 font-medium z-100">
            {menuItems.map((item, idx) => {
              if (item.isLogo) return null;
              return (
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
              );
            })}

            {/* Icon dưới cùng mobile */}
            <div className="flex items-center gap-2 justify-center">
              <Link
                href="https://www.facebook.com/chuabaidinh35"
                className="p-2 rounded-full border border-gray-200"
              >
                <FaFacebookF className="w-4 h-4 text-blue-600" />
              </Link>
              <Link
                href="https://www.instagram.com/baidinhpagoda/"
                className="p-2 rounded-full border border-gray-200"
              >
                <FaInstagram className="w-4 h-4 text-pink-600" />
              </Link>
              <button className="p-2 rounded-full border border-gray-200">
                <SiZalo className="w-5 h-5 text-blue-600" />
              </button>
              <Link
                href="https://youtube.com/@baidinhpagoda?si=KOZ7yP9cqIXn-5Ao"
                className="p-2 rounded-full border border-gray-200"
              >
                <FaYoutube className="w-4 h-4 text-red-600" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Desktop icon + ngôn ngữ */}
      <div className="hidden mt-[-40px] mr-[2%] md:flex justify-end gap-4">
        <div className="flex items-center gap-3">
          {/* Các icon mạng xã hội giống code gốc */}
          <Link
            href="https://www.facebook.com/chuabaidinh35"
            className="p-2 rounded-full"
          >
            <FaFacebookF className="w-3 h-3 text-blue-600" />
          </Link>
          <Link
            href="https://www.tiktok.com/@chuabaidinh35?lang=vi-VN"
            className="p-2 rounded-full"
          >
            <SiTiktok className="w-3 h-3 hover:text-black" />
          </Link>
          <Link
            href="https://www.instagram.com/baidinhpagoda/"
            className="p-2 rounded-full border border-gray-200"
          >
            <FaInstagram className="w-3 h-3 text-pink-600" />
          </Link>
          <Link
            href="https://zalo.me/0913899135"
            className="p-2 rounded-full border border-gray-200"
          >
            <img
              src="/images/7044033_zalo_icon.png"
              alt="Logo Front"
              className="w-3 h-3 object-contain"
            />
          </Link>
          <Link
            href="https://youtube.com/@baidinhpagoda"
            className="p-2 rounded-full border border-gray-200"
          >
            <FaYoutube className="w-3 h-3 text-red-600" />
          </Link>
        </div>

        {/* Language desktop */}
        <div className="relative mt-[10px]">
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
    </header>
  );
}

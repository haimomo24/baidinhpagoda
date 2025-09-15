"use client"
import React, { useEffect, useState } from "react"
import { Eye } from "lucide-react"

const FooterPage = () => {
  const [views, setViews] = useState(0)

  useEffect(() => {
    // Ghi nhận 1 lượt truy cập
    fetch("http://113.160.202.187:1989/api/see", { method: "POST" })
      .catch(err => console.error("❌ Lỗi ghi lượt truy cập:", err))

    // Lấy tổng lượt truy cập
    fetch("http://113.160.202.187:1989/api/see/total")
      .then(res => res.json())
      .then(data => {
        if (data?.view_count !== undefined) {
          setViews(data.view_count)
        }
      })
      .catch(err => console.error("❌ Lỗi lấy tổng lượt truy cập:", err))
  }, [])

  return (
    <footer
      style={{
        backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210827/pngtree-color-block-texture-watercolor-smudge-beige-background-image_770429.jpg")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      className="w-full"
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo + tên + lượt truy cập */}
          <div className="flex flex-col items-start space-y-2">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/images/e14e901b-87a0-4313-8cfd-0854c8d8e9de.svg"
                className="h-8"
                alt="Logo"
              />
             <span
  className="text-xl md:text-2xl font-semibold text-[#0F7F3E] 
             transition duration-300 hover:text-red-600 hover:scale-105 
             inline-block leading-relaxed text-center md:text-left"
>
  Bai Dinh Cultural and Spiritual Tourism Complex
</span>
            </a>
            {/* Lượt truy cập */}
            <div className="flex items-center text-[#0F7F3E]  text-sm">
              <Eye className="w-4 h-4 mr-1 text-red-600" /> 
              <span >{views}</span>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="text-sm space-y-1 sm:mt-0">
            <p className="transition duration-300 text-[#0F7F3E] hover:text-red-600 hover:scale-105 inline-block">
              <strong>Địa chỉ:</strong> Phường Tây Hoa Lư, Ninh Bình
            </p>

            <br></br>
            <p className="transition duration-300 text-[#0F7F3E] hover:text-red-600 hover:scale-105 inline-block">
              <strong>Điện thoại:</strong> 1900.966.909
            </p>
            <br></br>
            <p className="transition duration-300 text-[#0F7F3E] hover:text-red-600 hover:scale-105 inline-block">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@chua-baidinh.vn" className="hover:underline text-[#0F7F3E]">
                info@ctrangangroup.com
              </a>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <span className="block text-sm sm:text-center 
          transition duration-300 text-[#0F7F3E] hover:text-red-600 hover:scale-105 inline-block">
          ©{" "}
          <a href="https://trangangroup.com/" className="hover:underline">
            trangangroup.com
          </a>
        </span>
      </div>
    </footer>
  )
}

export default FooterPage

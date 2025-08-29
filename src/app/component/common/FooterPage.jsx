import React from 'react'

const FooterPage = () => {
  return (
    <footer className="w-full bg-[#356D3D] ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo + tên */}
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logo-bai-dinh.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
               Bái Đính complex
            </span>
          </a>

          {/* Thông tin liên hệ */}
          <div className="text-sm space-y-1 text-gray-300">
            <p><strong>Địa chỉ:</strong> Phường Tây Hoa Lư, Ninh Bình</p>
            <p><strong>Điện thoại:</strong> 02293868789</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@chua-baidinh.vn" className="hover:underline">
                info@ctrangangroup.com
              </a>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <span className="block text-sm text-gray-300 sm:text-center">
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

import React from 'react'

const HeaderBookingvi = () => {
  return (
     <div className="w-full mt-[-15px]  py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 px-4">
        {/* Tiêu đề */}
        <div className="flex flex-col mr-4">
          <span className="font-bold text-gray-800">Đặt Phòng</span>
          
        </div>

        {/* Ngày nhận phòng */}
        <div className="flex items-center border rounded px-2 py-1 bg-white">
          <input
            type="date"
            defaultValue="2025-08-26"
            className="outline-none text-sm"
          />
        </div>

        {/* Ngày trả phòng */}
        <div className="flex items-center border rounded px-2 py-1 bg-white">
          <input
            type="date"
            defaultValue="2025-08-27"
            className="outline-none text-sm"
          />
        </div>

        {/* Khách */}
        <div className="flex items-center border rounded px-2 py-1 bg-white">
          <select className="outline-none text-sm">
            <option>2 người lớn, 0 trẻ em</option>
            <option>1 người lớn, 0 trẻ em</option>
            <option>2 người lớn, 1 trẻ em</option>
            <option>2 người lớn, 2 trẻ em</option>
          </select>
        </div>

        {/* Mã khuyến mãi */}
        <input
          type="text"
          placeholder="Nhập mã khuyến mãi"
          className="border rounded px-2 py-1 text-sm flex-1 min-w-[150px]"
        />

        {/* Nút tìm phòng */}
        <button className="bg-teal-800 text-white px-4 py-2 rounded">
          Tìm phòng
        </button>
      </div>
    </div>
  )
}

export default HeaderBookingvi
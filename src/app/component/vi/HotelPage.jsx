'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, WifiIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

export default function HotelPage() {
  const router = useRouter()
  const [noRoomTypeId, setNoRoomTypeId] = useState(null)
  const [rooms, setRooms] = useState([])

  // 🟢 Gọi API lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://113.160.202.187:1985/api/room')
        setRooms(res.data)
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách phòng:', err)
      }
    }
    fetchRooms()
  }, [])

  const handleViewDetail = (roomId) => {
    router.push(`/vi/hotel/${roomId}`) // chuyển sang trang chi tiết phòng
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 font-sans space-y-5">
      <h2 className="text-xl text-gray-700 font-semibold">Phòng & Giá</h2>
      <div className="bg-white border rounded-2xl divide-y divide-gray-100">
        {rooms.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">Đang tải danh sách phòng...</p>
        ) : (
          rooms.map((room, idx) => (
            <div
              key={room.id}
              className={`flex flex-col md:flex-row gap-4 p-6 ${
                idx === 0 ? 'rounded-t-2xl' : ''
              } ${idx === rooms.length - 1 ? 'rounded-b-2xl' : ''}`}
            >
              {/* Ảnh đầu tiên */}
              <div className="w-full md:w-60 h-40 flex-shrink-0">
                <img
                  src={
                    room.image1
                      ? `http://113.160.202.187:1985${room.image1}`
                      : '/uploads/placeholder.jpg'
                  }
                  alt={room.room_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Thông tin */}
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-medium text-gray-700 leading-snug">
                  {room.room_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Tổng: {room.total_rooms} phòng
                </p>
                <div className="text-sm text-gray-700">
                  <div>Đã đặt: 0</div>
                  <div>Chưa đặt: {room.total_rooms}</div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-700 pt-1">
                  <WifiIcon className="w-4 h-4 text-gray-400" />
                  <span>Internet miễn phí</span>
                </div>
                {noRoomTypeId === room.id && (
                  <p className="mt-2 text-red-500 text-sm">
                    Đã đầy, không còn phòng trống!
                  </p>
                )}
              </div>

              {/* Nút xem chi tiết */}
              <div className="md:w-56 flex flex-col text-gray-700 justify-center items-start md:items-center gap-2">
                <button
                  onClick={() => handleViewDetail(room.id)}
                  className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-3"
                >
                  Xem chi tiết
                </button>
                <div className="flex items-center text-xs text-emerald-600 gap-1">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Tỷ giá thấp hôm nay</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

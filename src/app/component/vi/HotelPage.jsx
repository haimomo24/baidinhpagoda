'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  WifiIcon,
} from '@heroicons/react/24/solid'

export default function HotelPage() {
  const router = useRouter()
  const [noRoomTypeId, setNoRoomTypeId] = useState(null)

  // Ảnh cho mỗi typeId
  const typeImages = {
    1: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2df20f5b3-450x252.jpg',
    2: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d56b7bcb-450x252.jpg',
    3: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2d45-450x252.jpg',
    4: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2cc9-450x252.jpg',
  }

  // Tên phòng FIX CỨNG theo typeId
  const typeTitles = {
    1: 'Phòng deluxe/double',
    2: 'Phòng Baidinh Triple',
    3: 'Phòng extrabed',
    4: 'Phòng president',
  }

  // Dữ liệu giả định (thay vì fetch database)
  const typesSummary = [
    { typeId: 1, typeTitle: typeTitles[1], totalRooms: 5, bookedCount: 2, availableCount: 3 },
    { typeId: 2, typeTitle: typeTitles[2], totalRooms: 4, bookedCount: 4, availableCount: 0 },
    { typeId: 3, typeTitle: typeTitles[3], totalRooms: 6, bookedCount: 1, availableCount: 5 },
    { typeId: 4, typeTitle: typeTitles[4], totalRooms: 2, bookedCount: 1, availableCount: 1 },
  ]

  // Khi click Xem chi tiết
  const handleViewDetail = (typeId, availableCount) => {
    if (availableCount === 0) {
      setNoRoomTypeId(typeId)
      return
    }
    // Demo: đưa sang trang booking với typeId (không cần roomId từ DB nữa)
    router.push(`/booking?typeId=${typeId}`)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 font-sans space-y-5">
      <h2 className="text-xl text-gray-700 font-semibold">Phòng & Giá</h2>
      <div className="bg-white border rounded-2xl divide-y divide-gray-100">
        {typesSummary.map((t, idx) => (
          <div
            key={t.typeId}
            className={`
              flex flex-col md:flex-row gap-4 p-6
              ${idx === 0 ? 'rounded-t-2xl' : ''}
              ${idx === typesSummary.length - 1 ? 'rounded-b-2xl' : ''}
            `}
          >
            {/* Ảnh */}
            <div className="w-full md:w-60 h-40 flex-shrink-0">
              <img
                src={typeImages[t.typeId] || '/uploads/placeholder.jpg'}
                alt={t.typeTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Thông tin */}
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium text-gray-700 leading-snug">
                {t.typeTitle}
              </h3>
              <p className="text-sm text-gray-500">
                Tổng: {t.totalRooms} phòng
              </p>
              <div className="text-sm text-gray-700">
                <div>Đã đặt: {t.bookedCount}</div>
                <div>Chưa đặt: {t.availableCount}</div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700 pt-1">
                <WifiIcon className="w-4 h-4 text-gray-400" />
                <span>Internet miễn phí</span>
              </div>
              {noRoomTypeId === t.typeId && (
                <p className="mt-2 text-red-500 text-sm">
                  Đã đầy, không còn phòng trống!
                </p>
              )}
            </div>

            {/* Button Xem chi tiết */}
            <div className="md:w-56 flex flex-col text-gray-700 justify-center items-start md:items-center gap-2">
              <button
                onClick={() => handleViewDetail(t.typeId, t.availableCount)}
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
        ))}
      </div>
    </section>
  )
}

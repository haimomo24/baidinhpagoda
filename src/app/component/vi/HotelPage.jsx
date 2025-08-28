'use client'

import React from 'react'
import { CheckCircleIcon, WifiIcon } from '@heroicons/react/24/solid'

const HotelPage = () => {
  // Ảnh cho mỗi phòng
  const typeImages = {
    1: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2df20f5b3-450x252.jpg',
    2: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d56b7bcb-450x252.jpg',
    3: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2d45-450x252.jpg',
    4: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2cc9-450x252.jpg',
  }

  // Dữ liệu cứng cho UI
  const rooms = [
    { typeId: 1, typeTitle: 'Phòng deluxe/double', totalRooms: 10, bookedCount: 4, availableCount: 6 },
    { typeId: 2, typeTitle: 'Phòng Baidinh Triple', totalRooms: 8, bookedCount: 5, availableCount: 3 },
    { typeId: 3, typeTitle: 'Phòng extrabed', totalRooms: 5, bookedCount: 5, availableCount: 0 },
    { typeId: 4, typeTitle: 'Phòng president', totalRooms: 2, bookedCount: 1, availableCount: 1 },
  ]

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 font-sans space-y-5">
      <h2 className="text-xl text-gray-700 font-semibold">Phòng & Giá</h2>
      <div className="bg-white border rounded-2xl divide-y divide-gray-100">
        {rooms.map((t, idx) => (
          <div
            key={t.typeId}
            className={`
              flex flex-col md:flex-row gap-4 p-6
              ${idx === 0 ? 'rounded-t-2xl' : ''}
              ${idx === rooms.length - 1 ? 'rounded-b-2xl' : ''}
            `}
          >
            {/* Ảnh */}
            <div className="w-full md:w-60 h-40 flex-shrink-0">
              <img
                src={typeImages[t.typeId]}
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
              {t.availableCount === 0 && (
                <p className="mt-2 text-red-500 text-sm">
                  Đã đầy, không còn phòng trống!
                </p>
              )}
            </div>

            {/* Button */}
            <div className="md:w-56 flex flex-col text-gray-700 justify-center items-start md:items-center gap-2">
              <button
                className={`w-full md:w-auto ${
                  t.availableCount === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600'
                } text-white font-semibold rounded-lg px-8 py-3`}
                disabled={t.availableCount === 0}
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

export default HotelPage

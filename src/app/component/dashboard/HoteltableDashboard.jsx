'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HoteltableDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // 🟢 Lấy danh sách đơn đặt phòng
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://113.160.202.187:1985/api/booking')
        setBookings(res.data)
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách đơn đặt phòng:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  // 🟢 Xác nhận đơn đặt phòng
  const handleConfirm = async id => {
  try {
    const res = await axios.put(`http://113.160.202.187:1985/api/booking/${id}/status`, {
      status: 'Đã xác nhận'
    })
    alert(res.data.message)

    // Cập nhật lại trạng thái trong danh sách
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: 'Đã xác nhận' } : b
      )
    )
  } catch (err) {
    console.error('❌ Lỗi khi xác nhận đơn:', err)
    alert('Không thể xác nhận đơn!')
  }
}

  if (loading) return <p className="text-center py-10">Đang tải danh sách đơn đặt phòng...</p>

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách đơn đặt phòng</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="px-4 py-2 border text-center">STT</th>
              <th className="px-4 py-2 border">Họ và tên</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Số điện thoại</th>
              <th className="px-4 py-2 border">Loại phòng</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Chưa có đơn đặt phòng nào
                </td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{b.name}</td>
                  <td className="px-4 py-2 border">{b.email}</td>
                  <td className="px-4 py-2 border">{b.phone}</td>
                  <td className="px-4 py-2 border">{b.roomType}</td>
                  <td className="px-4 py-2 border text-emerald-700 font-semibold">
                    {b.price ? `${b.price.toLocaleString()}₫` : 'Liên hệ'}
                  </td>
                  <td
                    className={`px-4 py-2 border font-medium ${
                      b.status === 'Đã xác nhận'
                        ? 'text-emerald-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {b.status || 'Chưa xác nhận'}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {b.status !== 'Đã xác nhận' ? (
                      <button
                        onClick={() => handleConfirm(b.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm"
                      >
                        Xác nhận
                      </button>
                    ) : (
                      <span className="text-gray-400">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HoteltableDashboard

'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CarTable = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // 🟢 Lấy danh sách đơn đặt vé xe điện
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://113.160.202.187:1989/api/bookingcar')
        setBookings(res.data)
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách vé xe điện:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // 🟢 Xác nhận đơn đặt vé xe điện
  const handleConfirm = async id => {
    try {
      const res = await axios.put(
        `http://113.160.202.187:1989/api/bookingcar/${id}/status`,
        { status: 1 } // ✅ Gửi kiểu số (1) đúng với backend
      )
      alert(res.data.message)

      // ✅ Cập nhật trạng thái trong danh sách hiển thị
      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status: 1 } : b
        )
      )
    } catch (err) {
      console.error('❌ Lỗi khi xác nhận vé xe điện:', err)
      alert('Không thể xác nhận vé!')
    }
  }

  if (loading) return <p className="text-center py-10">Đang tải danh sách vé xe điện...</p>

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Danh sách đơn đặt vé xe điện
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="px-4 py-2 border text-center">STT</th>
              <th className="px-4 py-2 border">Họ và tên</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Số điện thoại</th>
              <th className="px-4 py-2 border">Ngày sử dụng</th>
              <th className="px-4 py-2 border">Tổng tiền</th>
              <th className="px-4 py-2 border">Chi tiết vé</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Chưa có đơn đặt vé nào
                </td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{b.fullname}</td>
                  <td className="px-4 py-2 border">{b.email}</td>
                  <td className="px-4 py-2 border">{b.phone}</td>

                  {/* ✅ Hiển thị đúng ngày sử dụng */}
                  <td className="px-4 py-2 border">
                    {b.booking_date
                      ? new Date(b.booking_date).toLocaleDateString('vi-VN')
                      : '—'}
                  </td>

                  <td className="px-4 py-2 border text-emerald-700 font-semibold">
                    {b.total_price ? `${Number(b.total_price).toLocaleString()}₫` : '—'}
                  </td>

                  <td className="px-4 py-2 border text-xs leading-relaxed">
                    <ul className="list-disc list-inside text-gray-700">
                      <li>ĐH TE: {b.dong_hanh_te}</li>
                      <li>ĐH NL: {b.dong_hanh_nl}</li>
                      <li>HT TE: {b.hanh_trinh_te}</li>
                      <li>HT NL: {b.hanh_trinh_nl}</li>
                      <li>CN TE: {b.cham_net_te}</li>
                      <li>CN NL: {b.cham_net_nl}</li>
                    </ul>
                  </td>

                  {/* ✅ Hiển thị trạng thái đúng kiểu */}
                  <td
                    className={`px-4 py-2 border font-medium ${
                      b.status === 1 ? 'text-emerald-600' : 'text-yellow-600'
                    }`}
                  >
                    {b.status === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}
                  </td>

                  {/* ✅ Nút hành động */}
                  <td className="px-4 py-2 border text-center">
                    {b.status !== 1 ? (
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

export default CarTable

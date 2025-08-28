'use client'
import React, { useState } from 'react'

const prices = {
  'Đồng hành an nhiên (TE)': 70000,
  'Đồng hành an nhiên (NL)': 100000,
  'Hành trình vui khoẻ (NL)': 300000,
  'Hành trình vui khoẻ (TE)': 210000,
  'Chạm nét tâm linh (NL)': 150000,
  'Chạm nét tâm linh (TE)': 100000,
}

const CarPagevi = () => {
  const [bookingDate, setBookingDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  )
  const [ticketList, setTicketList] = useState(
    Object.keys(prices).map((type) => ({ type, quantity: 0 }))
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const total = ticketList.reduce((sum, ticket) => {
    const price = prices[ticket.type] || 0
    return sum + price * ticket.quantity
  }, 0)

  const handleQuantityChange = (index, amount) => {
    setTicketList((prev) => {
      const updated = [...prev]
      const newQty = updated[index].quantity + amount
      updated[index].quantity = newQty < 0 ? 0 : newQty
      return updated
    })
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const selectedTickets = ticketList.filter((t) => t.quantity > 0)

    if (!name || !email || !phoneNumber) {
      alert('Vui lòng nhập đầy đủ thông tin cá nhân.')
      return
    }

    if (selectedTickets.length === 0) {
      alert('Vui lòng chọn ít nhất một loại vé.')
      return
    }

    // Không gửi đi đâu nữa, chỉ hiển thị confirm
    alert(`
      ✅ Đặt vé thành công!
      Họ tên: ${name}
      Email: ${email}
      Số điện thoại: ${phoneNumber}
      Ngày sử dụng: ${bookingDate}
      Vé: ${selectedTickets.map((t) => `${t.type} x ${t.quantity}`).join(', ')}
      Tổng tiền: ${total.toLocaleString()} đ
    `)

    // Reset form
    setName('')
    setEmail('')
    setPhoneNumber('')
    setTicketList(Object.keys(prices).map((type) => ({ type, quantity: 0 })))
  }

  return (
    <form
      onSubmit={handleBookingSubmit}
      className="mt-[50px] mb-20 px-6 max-w-[1300px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Cột trái: Thông tin mô tả */}
        <div>
          <h2 className="text-xl font-Philosopher text-gray-700 mb-4">
            Xe Điện - Vé Thăm Quan
          </h2>
          <p className="text-sm text-gray-700 font-Philosopher leading-relaxed">
            Du khách thập phương rút ngắn được thời gian di bộ từ bến xe vào
            chùa khi chỉ mất khoảng 10 phút ngồi xe điện. Bến xe điện được tổ
            chức quy củ, các xe được xếp lượt trình tự và tài xế chở khách cũng
            không sợ bị chặt chém, bất khách đọc được vì giá đã được niêm yết và
            do Ban Quản Lý bán ngay từ bến chính. Các biển chỉ dẫn, hướng dẫn
            khách đi xe điện được dán khắp nơi.
          </p>
          <p className="text-sm mt-2 text-gray-700">
            Giá vé xe điện chùa Bái Đính từ 100.000đ/người đối với người lớn,
            riêng trẻ em dưới 1m sẽ được miễn phí.
          </p>

          {/* Hình ảnh */}
          <div className="mt-4">
            <img
              src="https://sinhtour.vn/wp-content/uploads/2024/01/ve-xe-dien-bai-dinh-1.jpg"
              alt="Vé xe điện Bái Đính"
              className="w-full max-w-[500px] rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Cột phải: Đặt vé */}
        <div className="border rounded-lg p-4 space-y-4 shadow">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Đặt dịch vụ</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Họ tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nhập họ tên"
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập email"
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Nhập số điện thoại"
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Ngày sử dụng vé
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            {ticketList.map((ticket, index) => (
              <div
                key={ticket.type}
                className="flex justify-between items-center border px-3 py-2 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{ticket.type}</p>
                  <p className="text-xs text-gray-500">
                    {prices[ticket.type].toLocaleString()} đ
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(index, -1)}
                    className="px-2 border rounded text-gray-700 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{ticket.quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(index, 1)}
                    className="px-2 border rounded text-gray-700 hover:bg-gray-100"
                  >
                    ＋
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right text-sm font-semibold text-green-700">
            Tổng tiền: {total.toLocaleString()} đ
          </div>

          <button
            type="submit"
            className="w-full bg-[#356D3D] text-white py-2 rounded-md hover:bg-[#2b4d33] transition"
          >
            ĐẶT NGAY
          </button>
        </div>
      </div>
    </form>
  )
}

export default CarPagevi

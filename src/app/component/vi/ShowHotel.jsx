'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ShowHotel = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
  })

  // 🟢 Lấy thông tin chi tiết phòng khi vào trang
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/room/${id}`)
        setRoom(res.data)
        const images = [res.data.image1, res.data.image2, res.data.image3, res.data.image4]
          .filter(Boolean)
          .map(img => `${API_URL}${img}`)
        setSelectedImage(images[0])

        // 🟢 Gán sẵn loại phòng trong form
        setFormData(prev => ({ ...prev, roomType: res.data.room_name }))
      } catch (err) {
        console.error('❌ Lỗi khi lấy chi tiết phòng:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoomDetail()
  }, [id])

  // 🟢 Xử lý nhập liệu form
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 🟢 Gửi form đặt phòng lên API
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post(`${API_URL}/api/booking`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: formData.roomType,
        price: room.price,
      })

      alert('✅ ' + res.data.message)
      setShowBookingForm(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        roomType: room.room_name,
      })
    } catch (err) {
      console.error('❌ Lỗi gửi đặt phòng:', err)
      alert('Không thể gửi đơn đặt phòng. Vui lòng thử lại!')
    }
  }

  // 🟢 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Đang tải thông tin phòng...</p>
      </div>
    )
  }

  // 🟢 Nếu không tìm thấy phòng
  if (!room) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Không tìm thấy thông tin phòng.</p>
      </div>
    )
  }

  // 🟢 Mảng ảnh phòng
  const images = [room.image1, room.image2, room.image3, room.image4]
    .filter(Boolean)
    .map(img => `${API_URL}${img}`)

  return (
    <section className="py-8 bg-white mb-[100px] md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* --- Cột trái: Ảnh --- */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              src={selectedImage}
              alt={room.room_name}
              className="w-full h-96 object-cover rounded-lg shadow-md transition duration-300"
            />
            <div className="flex gap-3 justify-center mt-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`room ${idx}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
                    selectedImage === img
                      ? 'border-emerald-600 scale-105'
                      : 'border-gray-300 hover:border-emerald-400'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* --- Cột phải: Thông tin --- */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900">{room.room_name}</h1>

            <div className="mt-3">
              <p className="text-3xl font-bold text-emerald-700">
                {room.price ? `${room.price.toLocaleString()}₫ / đêm` : 'Liên hệ'}
              </p>
              <p className="text-gray-600 mt-2">
                {room.description || 'Phòng tiện nghi, đầy đủ trang thiết bị hiện đại.'}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition"
              >
                {showBookingForm ? 'Huỷ' : 'Đặt phòng'}
              </button>
            </div>

            {/* --- Form đặt phòng --- */}
            {showBookingForm && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 p-5 border border-gray-200 rounded-lg shadow-sm space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Nhập thông tin đặt phòng
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* 🟢 Loại phòng: tự động lấy tên phòng, không cho chỉnh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại phòng</label>
                  <input
                    type="text"
                    name="roomType"
                    value={formData.roomType}
                    disabled
                    className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-800 transition"
                >
                  Xác nhận đặt phòng
                </button>
              </form>
            )}

            <hr className="my-6 border-gray-200" />

            <p className="text-gray-500">
              Bao gồm ăn sáng, wifi miễn phí và dịch vụ dọn phòng hằng ngày.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowHotel

'use client'

import React, { useState, useEffect } from 'react'
const ConfPage = () => {
     const [activeDetail, setActiveDetail] = useState(null)
  const [zoomImage, setZoomImage] = useState(null) // ✅ state zoom ảnh
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  // ----- Booking form state & helpers -----
  const [booking, setBooking] = useState({
    fullName: "",
    phone: "",
    date: "",
    people: "",
    note: "",
    rooms: [],     // lưu id phòng đã chọn
  })

  // Bật/tắt chọn phòng theo id
  const toggleRoom = (id) => {
    setBooking((b) => ({
      ...b,
      rooms: b.rooms.includes(id)
        ? b.rooms.filter((r) => r !== id)
        : [...b.rooms, id],
    }))
  }

  // Gửi form (demo)
  const handleSubmitBooking = (e) => {
    e.preventDefault()

    if (!booking.fullName || !booking.phone || !booking.date || !booking.people) {
      alert("Vui lòng nhập đầy đủ Họ tên, SĐT, Ngày và Số người.")
      return
    }
    if (booking.rooms.length === 0) {
      alert("Vui lòng chọn ít nhất 1 phòng hội nghị.")
      return
    }

    const selectedRoomNames = rooms
      .filter((r) => booking.rooms.includes(r.id))
      .map((r) => r.name)

    const payload = {
      ...booking,
      selectedRoomNames,
    }

    console.log("📦 Đăng ký dịch vụ:", payload)
    alert("Đã gửi đăng ký. Chúng tôi sẽ liên hệ sớm!")

    // Reset form
    setBooking({
      fullName: "",
      phone: "",
      date: "",
      people: "",
      note: "",
      rooms: [],
    })
  }

  const rooms = [
    {
      id: 1,
      name: 'Phòng họp A',
      capacity: 200,
      images: ['/images/phonga.jpg', '/images/vsack.png', '/images/phongA.png'],
      details:
        'Diện tích: 460m2 .Với sức chứa 200 người, phòng họp A là không gian lý tưởng để tổ chức các hội nghị, sự kiện quy mô lớn. Phòng được trang bị wifi tốc độ cao, máy chiếu hiện đại, hệ thống âm thanh – ánh sáng đạt chuẩn quốc tế cùng đội ngũ nhân viên phục vụ chuyên nghiệp.'
    },
    {
      id: 2,
      name: 'Phòng họp B',
      capacity: 50,
      images: ['/images/phonga.jpg', '/images/vsack.png', '/images/phongA.png'],
      details:
        'Phòng họp B có sức chứa 50 người, phù hợp cho các buổi hội nghị vừa và nhỏ. Không gian được bố trí tiện nghi, wifi miễn phí, máy chiếu, hệ thống âm thanh – ánh sáng chất lượng cao.'
    },
    {
      id: 3,
      name: 'Phòng họp Vesak',
      capacity: 2000,
      images: ['/images/vsack.jpg', '/images/phonga.jpg', '/images/phonga.jpg'],
      details:
        'Diện tích: 5.000m2. Phòng họp Vesak là hội trường lớn với sức chứa 2.000 người, thích hợp tổ chức các sự kiện quốc tế, lễ hội và hội nghị cấp cao. Trang thiết bị tối tân, phục vụ chuyên nghiệp.'
    }
  ]

  const handlePrev = (id, total) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : total - 1
    }))
  }

  const handleNext = (id, total) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] < total - 1 ? prev[id] + 1 : 0
    }))
  }

  // ✅ Xử lý ESC để thoát modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setZoomImage(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])
  return (
   <section className="max-w-5xl mx-auto px-4 py-8 font-sans space-y-5">
      <h2 className="text-xl text-gray-700 font-semibold">Phòng Hội Nghị</h2>
      <div className="bg-white border rounded-2xl divide-y divide-gray-100">
        {rooms.map((room, idx) => (
          <div
            key={room.id}
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-6 ${
              idx === 0 ? 'rounded-t-2xl' : ''
            } ${idx === rooms.length - 1 ? 'rounded-b-2xl' : ''}`}
          >
            {/* Cột ảnh */}
            <div className="relative w-full h-40 flex items-center justify-center">
              {room.images.length > 0 ? (
                <img
                  src={
                    room.images[currentImageIndex[room.id] || 0] ||
                    '/uploads/placeholder.jpg'
                  }
                  alt={room.name}
                  className="w-full h-full object-cover rounded-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:brightness-110"
                  onClick={() =>
                    setZoomImage(
                      room.images[currentImageIndex[room.id] || 0]
                    )
                  }
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Chưa có ảnh
                </div>
              )}

              {/* Nút prev/next */}
              <button
                onClick={() => handlePrev(room.id, room.images.length)}
                className="absolute left-2 bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
              >
                ‹
              </button>
              <button
                onClick={() => handleNext(room.id, room.images.length)}
                className="absolute right-2 bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
              >
                ›
              </button>
            </div>

            {/* Cột thông tin */}
            <div className="flex flex-col justify-center space-y-1">
              <h3 className="text-lg font-medium text-gray-700">{room.name}</h3>
              <p className="text-sm text-gray-500">
                Sức chứa: {room.capacity} người
              </p>
              {activeDetail === room.id && (
                <p className="text-gray-600 mt-2 text-justify leading-relaxed">
                  {room.details}
                </p>
              )}
            </div>

            {/* Cột nút */}
            <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  setActiveDetail(activeDetail === room.id ? null : room.id)
                }
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-6 py-2 text-sm"
              >
                {activeDetail === room.id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---- FORM ĐĂNG KÝ DỊCH VỤ ---- */}
      <div className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-2xl ring-1 ring-gray-200">
      <h3
  className="text-lg font-semibold text-gray-700 mb-4 
             cursor-pointer transition duration-300 
             hover:text-red-600 hover:scale-105 hover:shadow-amber-500/50 hover:shadow-lg hover-shake
             active:text-red-700 text-center w-full"
>
  Đăng Ký Phòng Hội Nghị
</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmitBooking}>
          {/* Họ tên */}
          <div>
            <label className="block text-sm text-gray-600">Họ và tên*</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              value={booking.fullName}
              onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
              required
            />
          </div>

          {/* SĐT */}
          <div>
            <label className="block text-sm text-gray-600">Số điện thoại*</label>
            <input
              type="tel"
              className="w-full border rounded-lg p-2 mt-1"
              value={booking.phone}
              onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
              required
            />
          </div>

          {/* Ngày */}
          <div>
            <label className="block text-sm text-gray-600">Ngày*</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              required
            />
          </div>

          {/* Số người */}
          <div>
            <label className="block text-sm text-gray-600">Số người*</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded-lg p-2 mt-1"
              value={booking.people}
              onChange={(e) => setBooking({ ...booking, people: e.target.value })}
              required
            />
          </div>

          {/* Chọn phòng */}
          <div className="col-span-2">
            <label className="block text-sm text-gray-600">Chọn phòng*</label>
            <div className="mt-2 flex gap-4 flex-wrap">
              {rooms.map(r => (
                <label key={r.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={booking.rooms.includes(r.id)}
                    onChange={() => toggleRoom(r.id)}
                  />
                  {r.name}
                </label>
              ))}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="col-span-2">
            <label className="block text-sm text-gray-600">Ghi chú</label>
            <textarea
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
              value={booking.note}
              onChange={(e) => setBooking({ ...booking, note: e.target.value })}
            />
          </div>

          {/* Nút submit */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-2 text-sm 
                         transition duration-300 transform hover:scale-105 shadow-md"
            >
              ĐĂNG KÝ
            </button>
          </div>
        </form>
      </div>

      {/* Modal phóng to ảnh */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={zoomImage}
              alt="Zoom"
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full shadow hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ConfPage
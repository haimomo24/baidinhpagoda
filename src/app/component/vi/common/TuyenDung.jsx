'use client'
import React, { useState } from 'react'

const TuyenDung = () => {
      const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null,
  })

  const positions = [
    'Lễ tân',
    'Nhân viên phục vụ',
    'Bảo vệ',
    'Quản lý khu nghỉ dưỡng',
    'Hướng dẫn viên',
  ]

  // Danh sách vị trí đang tuyển + số lượng + độ tuổi yêu cầu
  const recruitingList = [
    { name: 'Bếp', quantity: 2, ageRange: '20 - 35' },
    { name: 'Nhân viên nhà hàng', quantity: 4, ageRange: '18 - 30' },
    { name: 'Bảo vệ', quantity: 1, ageRange: '25 - 40' },
    { name: 'Hướng dẫn viên', quantity: 3, ageRange: '20 - 35' },
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('email', formData.email)
      form.append('phone', formData.phone)
      form.append('position', formData.position)
      form.append('message', formData.message)
      form.append('cv', formData.cv)

      const res = await fetch('/api/recruitment', {
        method: 'POST',
        body: form,
      })

      const result = await res.json()
      if (result.success) {
        alert(result.message)
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          cv: null,
        })
      } else {
        alert('Đã xảy ra lỗi: ' + result.message)
      }
    } catch (error) {
      console.error('Submit Error:', error)
      alert('Lỗi kết nối server')
    }
  }
  return (
     <div className="min-h-screen   from-[#f0f9f3] to-white py-12 px-4 md:px-10 lg:px-32 font-[serif]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Form bên trái */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#cce3d5] p-8 md:p-12">
          <h2 className="text-4xl font-bold text-[#356D3D] mb-10 tracking-wide">
            Tuyển dụng
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Họ và tên */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
                placeholder="Nhập email"
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Vị trí ứng tuyển */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Vị trí ứng tuyển
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
              >
                <option  value="">-- Chọn vị trí --</option>
                {positions.map((pos, index) => (
                  <option  key={index} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Tin nhắn */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Tin nhắn (nếu cần thiết)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none resize-none bg-[#f9fefb]"
                placeholder="Viết thêm thông tin bạn muốn chia sẻ..."
              ></textarea>
            </div>

            {/* Gửi CV */}
            <div>
              <label className="block text-base font-medium text-[#356D3D] mb-1">
                Tải lên CV (PDF/DOC)
              </label>
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-white text-[#356D3D]"
              />
            </div>

            {/* Nút gửi */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[#356D3D] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#2e5e34] hover:scale-105 transition-all duration-300"
              >
                Gửi thông tin
              </button>
            </div>
          </form>
        </div>

        {/* Danh sách vị trí bên phải */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#cce3d5] p-8 md:p-12">
          <h3 className="text-2xl font-bold text-[#356D3D] mb-6">Các vị trí đang tuyển</h3>
          <ul className="space-y-4">
            {recruitingList.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-[#f9fefb] border border-[#cce3d5] rounded-md"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-[#356D3D] font-bold">{item.quantity} người</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Độ tuổi yêu cầu: {item.ageRange} tuổi
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default TuyenDung
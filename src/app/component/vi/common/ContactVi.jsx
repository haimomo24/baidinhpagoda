'use client'
import React, { useState } from 'react'

const ContactVi = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    try {
      const res = await fetch("http://113.160.202.187:1989/api/contactpage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Booking successfully!");
        setSubmitStatus({ type: "success", message: "Booking successfully!" });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert("Error booking, please try again!");
        setSubmitStatus({ type: "error", message: "Error booking, please try again!" });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error!");
      setSubmitStatus({ type: "error", message: "Network error!" });
    }
    setLoading(false);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Hiệu ứng zoom ảnh */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src="/images/MAP2-01-01.jpg"
            alt="Bản đồ liên hệ"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Ảnh + Form */}
          <div className="space-y-8">
            <img 
              src="/images/MAP2-01-01.jpg" 
              alt="Bản đồ liên hệ" 
              onClick={() => setIsZoomed(true)}
              className="rounded-xl shadow-lg object-cover  w-full h-full max-h-[530px] cursor-pointer hover:scale-[1.02] transition-transform"
            />

            {/* Form liên hệ */}
            <div className="bg-gray-100 h-[530px] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Thông điệp</h3>

              {submitStatus && (
                <div className={`mb-4 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Họ và tên *"
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  />
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Số điện thoại"
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
                />
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="4" 
                  placeholder="Lời nhắn - thông điệp bạn muốn gửi đến"
                  required 
                  className="w-full h-[230px] px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-[#356D3D] hover:scale-105 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition text-sm"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                </button>
              </form>
            </div>
          </div>

          {/* Google Map giữ nguyên */}
          <div className="space-y-6">
            <div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-96 lg:h-[530px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.8234567890123!2d105.8637726!3d20.2736257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367ea560375713%3A0xab30ab2390bc9816!2sBai%20Dinh%20Hotel!5e0!3m2!1svi!2s!4v1704123456789!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bai Dinh Hotel Location"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Chùa Bái Đính</h4>
                  <p className="text-gray-600 mb-4">Phường tây Hoa Lư Ninh Bình</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.google.com/maps/place/Bai+Dinh+Hotel/@20.2736257,105.8637726,1066m/data=!3m1!1e3!4m9!3m8!1s0x31367ea560375713:0xab30ab2390bc9816!5m2!4m1!1i2!8m2!3d20.2736257!4d105.8663475!16s%2Fg%2F11b6c__yy7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#356D3D] text-white rounded-lg hover:bg-[#356D3D] transition duration-300"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Chỉ đường
                    </a>
                    <button
                      type="submit"
                      disabled={loading}
                      className="border px-6 py-2 rounded-lg hover:bg-emerald-900 hover:text-white transition disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Booking Now"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Thông tin thêm</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Nằm trong khuôn viên chùa Bái Đính</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Từ sân bay Nội Bài:</span>
                    <p className="text-gray-600">Khoảng 2 giờ lái xe</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Từ trung tâm Hà Nội:</span>
                    <p className="text-gray-600">Khoảng 100km</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Bãi đỗ xe:</span>
                    <p className="text-gray-600">Miễn phí</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactVi

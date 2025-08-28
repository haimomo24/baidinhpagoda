'use client'
import React, { useState } from 'react'

const ContactVi = () => {
     const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate form data trước khi gửi
      if (!formData.fullname.trim() || !formData.email.trim() || !formData.message.trim()) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, Tin nhắn)' 
        });
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Vui lòng nhập email hợp lệ' 
        });
        setIsSubmitting(false);
        return;
      }

      console.log('Sending form data:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        // Xử lý các loại lỗi khác nhau
        let errorMessage = result.error || 'Có lỗi xảy ra khi gửi tin nhắn';
        
        if (response.status === 500) {
          errorMessage = 'Hệ thống đang bảo trì. Vui lòng liên hệ trực tiếp qua số điện thoại +84 229 3781 999 hoặc email info@baidinhhotel.com';
        } else if (response.status === 400) {
          errorMessage = result.error || 'Thông tin không hợp lệ';
        }
        
        setSubmitStatus({ type: 'error', message: errorMessage });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      
      // Xử lý lỗi network hoặc timeout
      let errorMessage = 'Không thể kết nối đến server. ';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage += 'Vui lòng kiểm tra kết nối internet và thử lại.';
      } else {
        errorMessage += 'Vui lòng liên hệ trực tiếp qua:';
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen mt-[60px]">
     
     

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
              
              <div className="">
                <div className="flex items-start space-x-4">
                  <div className=" p-3 rounded-full">
                    <svg className="w-6 h-6 text-[#356D3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Địa chỉ</h3>
                    <p className="text-gray-600"> Phường Tây Hoa Lư, Ninh Bình, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className=" p-3 rounded-full text-[#356D3D]">
                    <svg className="w-6 h-6 text-[#356D3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Điện thoại</h3>
                    <p className="text-gray-600">
                      <a href="tel:+842293781999" className="hover:text-blue-600">
                      02293868789

                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className=" p-3 rounded-full">
                    <svg className="w-6 h-6 text-[#356D3D] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@baidinhhotel.com" className="hover:text-blue-600">
                      info@trangangroup.com
                      </a>
                    </p>
                  </div>
                </div>

               
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#D3F8E2] h-[530px] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold  mb-6">Thông điệp </h3>
              
              {/* Status Messages */}
              {submitStatus && (
                <div className={` mb-4 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                  <div className="flex  items-start">
                    <div className="flex-shrink-0">
                      {submitStatus.type === 'success' ? (
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p>{submitStatus.message}</p>
                      {submitStatus.type === 'error' && submitStatus.message.includes('liên hệ trực tiếp') && (
                        <div className="mt-2 text-sm">
                          <p><strong>Điện thoại:</strong> <a href="tel:+842293781999" className="underline">+84 229 3781 999</a></p>
                          <p><strong>Email:</strong> <a href="mailto:info@baidinhhotel.com" className="underline">info@baidinhhotel.com</a></p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Họ và tên *"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Lời nhắn - thông điệp bạn muốn gửi đến "
                  required
                  disabled={isSubmitting}
                  className="w-full h-[230px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                  <div className="flex text-center items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-1  bg-[#356D3D] hover: bg-[#356D3D] text-white font-semibold px-6 py-2 rounded-md shadow-sm transition text-sm ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : ' bg-[#356D3D] hover: bg-[#356D3D] text-white hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex  items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang gửi...
                      </div>
                    ) : (
                      'Gửi '
                    )}
                  </button>
                    </div> 
                  
                </form>
              </div>
            </div>
  
            {/* Google Maps */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Vị trí</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-96 lg:h-[600px]">
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
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Khách xá Bái Đính</h4>
                    <p className="text-gray-600 mb-4">Gia Sinh, Gia Viễn, Ninh Bình</p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="https://www.google.com/maps/place/Bai+Dinh+Hotel/@20.2736257,105.8637726,1066m/data=!3m1!1e3!4m9!3m8!1s0x31367ea560375713:0xab30ab2390bc9816!5m2!4m1!1i2!8m2!3d20.2736257!4d105.8663475!16s%2Fg%2F11b6c__yy7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2  bg-[#356D3D] text-white rounded-lg hover: bg-[#356D3D] transition duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Chỉ đường
                      </a>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('Gia Sinh, Gia Viễn, Ninh Bình, Việt Nam')
                          alert('Đã sao chép địa chỉ!')
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Sao chép địa chỉ
                      </button>
                    </div>
                  </div>
                </div>
  
                {/* Additional Info */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Thông tin thêm</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Khoảng cách từ chùa Bái Đính:</span>
                      <p className="text-gray-600">Chỉ 2km</p>
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
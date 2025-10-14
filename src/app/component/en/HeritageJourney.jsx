'use client'
import React, { useState } from "react";

const combos = [
  {
    id: 1,
    title: "Trang An - Bai Dinh tour tickets",
    description: " Explore the famous Trang An eco-tourism area and Bai Dinh Pagoda.",
    adultPrice: "650,000đ",
    childPrice: "420,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-dJob1xgnWDh0Xav7.png",
  },
  {
    id: 2,
    title: "Tickets to visit Trang An - Bai Dinh - Hoa Lu Ancient Town",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
 {
    id: 3,
    title: "Tickets to visit Trang An - Bai Dinh - Dong Chuong Lake",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town. ",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 4,
    title: "Trang An - Tam Chuc tour tickets",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town. ",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 5,
    title: "Tickets to visit Bai Dinh - Tam Coc - Hoa Lu Ancient Town",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 6,
    title: "Tam Coc - Bai Dinh - Dong Chuong Lake tour tickets",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 7,
    title: "Tam Chuc - Tam Coc - Hoa Lu Ancient Town Tour Tickets",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 8,
    title: "Tam Chuc - Dong Chuong Lake entrance ticket",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },
    {
    id: 9,
    title: "Tam Coc - Tam Chuc tour tickets",
    description: "Special tour to visit Trang An, Bai Dinh and Hoa Lu Ancient Town.",
    adultPrice: "750,000đ",
    childPrice: "480,000đ",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=432,fit=crop/dWxe6v3Xk4hMNNnR/ta-bd-pc-AGBbZ0g5p2UJkXlO.png",
  },

];

const HeritageJourney = () => {
  const [selectedCombo, setSelectedCombo] = useState(null);
   const [formData, setFormData] = useState({
     fullname: "",
     phone: "",
     email: "", // ✅ thêm email
     visit_date: "",
     people_count: "",
     message: "",
   });
   const [loading, setLoading] = useState(false);
 
   const handleSelectCombo = (comboId) => {
     setSelectedCombo(comboId);
     const formElement = document.getElementById("booking-form");
     if (formElement) {
       formElement.scrollIntoView({ behavior: "smooth" });
     }
   };
 
   // 📨 Gửi dữ liệu form lên server
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     if (
       !formData.fullname ||
       !formData.phone ||
       !formData.email || // ✅ kiểm tra email
       !selectedCombo ||
       !formData.visit_date ||
       !formData.people_count
     ) {
       alert(" Please fill in all required information !");
       return;
     }
 
     const selectedComboTitle =
       combos.find((c) => c.id === selectedCombo)?.title || "Không rõ";
     const dataToSend = {
       fullname: formData.fullname,
       phone: formData.phone,
       email: formData.email, // ✅ gửi email lên API
       ticket_option: selectedComboTitle,
       visit_date: formData.visit_date,
       people_count: parseInt(formData.people_count),
       message: formData.message,
     };
 
     try {
       setLoading(true);
       const res = await fetch("http://113.160.202.187:1989/api/ticket", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(dataToSend),
       });
 
       const result = await res.json();
       if (res.ok) {
         alert("✅ Ticket booking information sent successfully!");
         setFormData({
           fullname: "",
           phone: "",
           email: "",
           visit_date: "",
           people_count: "",
           message: "",
         });
         setSelectedCombo(null);
       } else {
         alert("❌ Error: " + (result.error || "Unable to send information"));
       }
     } catch (err) {
       console.error(err);
       alert("❌ Error.");
     } finally {
       setLoading(false);
     }
   };

  return (
   <div className="container mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#256F3D]">
       Heritage Journey
      </h1>
      <p className="text-center text-gray-600 ">
        Enjoy a tour of Ninh Binh's famous landscapes and heritage sites..
      </p>

      {/* Danh sách combo */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-[#FBE6D1] border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              className="rounded-t-lg w-full h-58 object-cover"
              src={combo.image}
              alt={combo.title}
            />
            <div className="p-4">
              <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
                {combo.title}
              </h5>
              <p className="mb-2 text-sm text-gray-700">{combo.description}</p>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="font-medium text-gray-600">
                  Adult: <span className="text-red-600">{combo.adultPrice}</span>
                </span>
                <span className="font-medium text-gray-600">
                  Children: <span className="text-green-600">{combo.childPrice}</span>
                </span>
              </div>
              <button
                onClick={() => handleSelectCombo(combo.id)}
                className="w-full px-3 py-1.5 text-sm font-medium text-white bg-[#256F3D] rounded-lg hover:bg-[#E7000B] focus:ring-2 focus:ring-blue-300"
              >
                Select tickets
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form đặt vé */}
      <div
        id="booking-form"
        className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#256F3D]">
          Book Heritage Journey tickets
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Full name*</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone*</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          {/* ✅ thêm email */}
          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Select*</label>
            <div className="space-y-2">
              {combos.map((combo) => (
                <label key={combo.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="combo"
                    value={combo.id}
                    checked={selectedCombo === combo.id}
                    onChange={() => setSelectedCombo(combo.id)}
                  />
                  <span>{combo.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Tour day*</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.visit_date}
              onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of visitors*</label>
            <input
              type="number"
              min="1"
              className="w-full border px-3 py-2 rounded-lg"
              required
              value={formData.people_count}
              onChange={(e) => setFormData({ ...formData, people_count: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message/Note</label>
            <textarea
              className="w-full border px-3 py-2 rounded-lg"
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#256F3D] text-white rounded-lg hover:bg-[#E7000B]"
          >
            {loading ? "Sending..." : "Submit registration"}
          </button>
        </form>
      </div>
    </div>
  
  )
}

export default HeritageJourney;
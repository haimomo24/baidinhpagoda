'use client'
import React, { useState } from 'react'

const prices = {
  'Peaceful companionship(children)': 70000,
  'Peaceful companionship ': 100000,
  'Happy and healthy journey ': 300000,
  'Happy and healthy journey (children)': 210000,
  'Touch spirituality ': 150000,
  'Touch spirituality (children)': 100000,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ElectricCar = () => {
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
          alert('Please enter full personal information')
          return
        }
    
        if (selectedTickets.length === 0) {
          alert('Please select at least one ticket type.')
          return
        }
    
        
        alert(`
          ✅ Ticket booking successful!
          name: ${name}
          Email: ${email}
          Phone: ${phoneNumber}
          Date of use: ${bookingDate}
          Ticket: ${selectedTickets.map((t) => `${t.type} x ${t.quantity}`).join(', ')}
          Total amount: ${total.toLocaleString()} đ
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
          <h2 className="text-xl font-Philosopher font-bold text-gray-700 mb-4">
            Electric Car - Sightseeing Tickets
          </h2>
          <p className="text-sm text-gray-700 font-Philosopher leading-relaxed">
           Tourists can shorten the walking time from the bus station to the temple by taking only about 10 minutes by tram. The tram station is organized
in a disciplined manner, the vehicles are arranged in order and the drivers carrying passengers are
not afraid of being ripped off, and passengers can read the prices because they are posted and
sold by the Management Board right at the main station. Signs and instructions for
tram passengers are posted everywhere.
          </p>
          <p className="text-sm mt-2 text-gray-700">
            The price of the electric car ticket to Bai Dinh pagoda is from 100,000 VND/person for adults, children under 1m will be free.
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
          <h3 className="text-xl font-medium font-bold text-gray-800 mb-2">Book a service</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="enter name"
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
                placeholder="enter email"
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter phone number"
                className="w-full border px-3 py-2 rounded-md text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Ticket use date
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
            Total amount: {total.toLocaleString()} đ
          </div>

          <button
            type="submit"
            className="w-full bg-[#356D3D] text-white py-2 rounded-md hover:bg-[#2b4d33] transition"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </form>
  )
}

export default ElectricCar
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const SiderbarDashboard = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const authData = localStorage.getItem("auth")
    if (authData) {
      try {
        const parsed = JSON.parse(authData)
        setUser(parsed.user)
      } catch (err) {
        console.error("Lỗi parse localStorage:", err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth") 
    router.push("/login") 
  }

  const menuItems = [
    { name: "Blog", path: "/dashboard/blog" },
    { name: "Khuyến mại", path: "/dashboard/khuyenmai" },
    { name: "Điểm đến", path: "/dashboard/diemden" },
    { name: "Quản lí tài khoản", path: "/dashboard/auth" },
    { name: "Đơn hàng", path: "/dashboard/products" }
  ]

  return (
    <aside className="row-span-3  bg-[#374151] text-white p-4 flex flex-col">
    

     {/* Thông tin user */}
{user && (
  <div className="flex flex-col items-center mb-6">
    {/* Avatar nhỏ */}
    <img
      src={user.avatar || "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"}
      alt="Avatar"
      className="w-12 h-12 rounded-full border border-gray-500 shadow-sm"
    />
    {/* Tên nhỏ */}
    <p className="mt-2 text-sm font-medium">{user.username}</p>
    {/* Nút logout nhỏ */}
    <button
      onClick={handleLogout}
      className="mt-2 px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
    >
      Đăng xuất
    </button>
  </div>
)}

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 
                  ${isActive 
                    ? 'bg-red-600 text-white font-semibold shadow-md' 
                    : 'hover:bg-gray-700 hover:text-red-400'}`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default SiderbarDashboard

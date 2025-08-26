'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SiderbarDashboard = () => {
  const pathname = usePathname()

  const menuItems = [
    { name: "Blog", path: "/dashboard/blog" },
    { name: "Khuyến mại ", path: "/dashboard/khuyenmai" },
    { name: "Điểm đến ", path: "/dashboard/diemden" },
     { name: "Phản hồi ", path: "/dashboard/products" },
      { name: "Đơn hàng  ", path: "/dashboard/products" }
  ]

  return (
    <aside className="row-span-3 bg-[#374151] text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
        Trang quản trị
      </h2>

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

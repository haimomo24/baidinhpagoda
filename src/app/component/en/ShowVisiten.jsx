'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://113.160.202.187:1989"

const ShowVisiten = () => {
    const { id } = useParams()
      const [visit, setVisit] = useState(null)
      const [relatedVisits, setRelatedVisits] = useState([])
      const [loading, setLoading] = useState(true)
    
      // Fetch chi tiết điểm đến
      useEffect(() => {
        if (!id) return
        const fetchVisit = async () => {
          try {
            const res = await fetch(`${API_URL}/api/visit/${id}`)
            const data = await res.json()
            setVisit(data)
          } catch (error) {
            console.error('Lỗi khi load chi tiết visit:', error)
          } finally {
            setLoading(false)
          }
        }
        fetchVisit()
      }, [id])
    
      // Fetch các điểm đến liên quan
      useEffect(() => {
        const fetchRelated = async () => {
          try {
            const res = await fetch(`${API_URL}/api/visit`)
            const data = await res.json()
            if (Array.isArray(data)) {
              const filtered = data
                .filter(item => item.id !== parseInt(id))
                .slice(0, 3)
              setRelatedVisits(filtered)
            }
          } catch (error) {
            console.error('Lỗi khi load related visits:', error)
          }
        }
        if (id) fetchRelated()
      }, [id])
    
      if (loading) return <div className="text-center py-10">Đang tải...</div>
      if (!visit) return <div className="text-center py-10">Không tìm thấy điểm đến</div>
  return (
    <div className="max-w-6xl mt-12 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chi tiết điểm đến */}
      <article className="lg:col-span-2 grid gap-4">
        <h1 className="text-4xl font-bold leading-tight">{visit.name_en}</h1>

        {visit.title_1 && (
          <p className="text-lg leading-7 text-justify">{visit.title_1_en}</p>
        )}
        {visit.images_1 && (
          <img
            src={`${API_URL}${visit.images_1}`}
            alt="Ảnh 1"
            className="w-full h-auto rounded-lg"
          />
        )}

        {visit.title_2 && (
          <p className="text-lg leading-7 text-justify">{visit.title_2_en}</p>
        )}
        {visit.images_2 && (
          <img
            src={`${API_URL}${visit.images_2}`}
            alt="Ảnh 2"
            className="w-full h-auto rounded-lg"
          />
        )}

        {visit.title_3 && (
          <p className="text-lg leading-7 text-justify">{visit.title_3_en}</p>
        )}
        {visit.image_3 && (
          <img
            src={`${API_URL}${visit.image_3}`}
            alt="Ảnh 3"
            className="w-full h-auto rounded-lg"
          />
        )}
        {visit.images_5 && (
          <img
            src={`${API_URL}${visit.images_5}`}
            alt="Ảnh 4"
            className="w-full h-auto rounded-lg"
          />
        )}
 {visit.images_4 && (
          <img
            src={`${API_URL}${visit.images_4}`}
            alt="Ảnh 4"
            className="w-full h-auto rounded-lg"
          />
        )}
        {visit.title_4 && (
          <p className="text-lg leading-7 text-justify">{visit.title_4_en}</p>
        )}
       
      </article>

      {/* Điểm đến liên quan */}
      <aside className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Điểm đến liên quan
        </h2>
        <ul className="space-y-4">
          {relatedVisits.map(item => (
            <li key={item.id}>
              <Link href={`/vi/visit/${item.id}`} className="flex gap-3 items-stretch">
                {item.images_1 && (
                  <img
                    src={`${API_URL}${item.images_1}`}
                    alt={item.name_en}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.name_en}
                  </h3>
                  {item.title_1_en && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {item.title_1_en}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default ShowVisiten
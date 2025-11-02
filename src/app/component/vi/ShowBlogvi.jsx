'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const ShowBlogvi = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  // 🟢 Lấy blog theo ID
  useEffect(() => {
    if (!id) return
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://113.160.202.187:1989/api/blog/${id}`)
        const data = await res.json()
        setBlog(data)
      } catch (error) {
        console.error('Lỗi khi load chi tiết blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  // 🟡 Lấy bài viết liên quan
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch('http://113.160.202.187:1989/api/blog')
        const data = await res.json()
        if (Array.isArray(data)) {
          const filtered = data
            .filter(item => item.id !== parseInt(id))
            .slice(0, 2)
          setRelatedBlogs(filtered)
        }
      } catch (error) {
        console.error('Lỗi khi load related blogs:', error)
      }
    }
    if (id) fetchRelated()
  }, [id])

  if (loading) return <div className="text-center py-10">Đang tải...</div>
  if (!blog) return <div className="text-center py-10">Không tìm thấy bài viết</div>

  // 🧩 Gom dữ liệu các phần blog (để dễ hiển thị lặp)
  const blogSections = [
    { title: blog.title_1, image: blog.images_1 },
    { title: blog.title_2, image: blog.images_2 },
    { title: blog.title_3, image: blog.images_3 },
    { title: blog.title_4, image: blog.images_4 },
    { title: blog.title_5, image: blog.images_5 },
  ].filter(section => section.title || section.image)

  return (
    <div className="max-w-6xl mt-12 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bài viết chính */}
      <article className="lg:col-span-2 grid gap-6">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6 border-b pb-4">
          {blog.name}
        </h1>

        {blogSections.map((section, index) => (
          <div key={index} className="space-y-4">
            {section.title && (
              <p className="text-lg leading-7 text-justify text-gray-800">
                {section.title}
              </p>
            )}
            {section.image && (
              <img
                src={section.image}
                alt={`Ảnh ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md border"
              />
            )}
          </div>
        ))}

        <div className="text-right mt-10 italic text-gray-600">
          — Kết thúc bài viết —
        </div>
      </article>

      {/* Bài viết liên quan */}
      <aside className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Bài viết liên quan</h2>
        <ul className="space-y-4">
          {relatedBlogs.map(item => (
            <li key={item.id}>
              <Link href={`/vi/blog/${item.id}`} className="flex gap-3 items-stretch hover:opacity-80 transition">
                {item.images_1 && (
                  <img
                    src={item.images_1}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </h3>
                  {item.title_1 && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">{item.title_1}</p>
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

export default ShowBlogvi

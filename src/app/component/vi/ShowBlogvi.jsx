'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const ShowBlogvi = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch bài viết hiện tại
  useEffect(() => {
    if (!id) return
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/blog/${id}`)
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

  // Fetch bài viết liên quan
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/blog')
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

  return (
    <div className="max-w-6xl mt-12 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bài viết chính */}
      <article className="lg:col-span-2 grid gap-4">
        <h1 className="text-4xl font-bold leading-tight">{blog.name}</h1>

        {blog.title_1 && (
          <p className="text-lg leading-7 text-justify">{blog.title_1}</p>
        )}
        {blog.images_1 && (
          <img
            src={blog.images_1}
            alt="Ảnh 1"
            className="w-full h-auto rounded-lg"
          />
        )}

        {blog.title_2 && (
          <p className="text-lg leading-7 text-justify">{blog.title_2}</p>
        )}
        {blog.images_2 && (
          <img
            src={blog.images_2}
            alt="Ảnh 2"
            className="w-full h-auto rounded-lg"
          />
        )}

        {blog.title_3 && (
          <p className="text-lg leading-7 text-justify">{blog.title_3}</p>
        )}
      </article>

      {/* Bài viết liên quan */}
      <aside className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Bài viết liên quan</h2>
        <ul className="space-y-4">
          {relatedBlogs.map(item => (
            <li key={item.id}>
              <Link href={`/vi/blog/${item.id}`} className="flex gap-3 items-stretch">
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

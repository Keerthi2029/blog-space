"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { BlogContext } from "../contexts/BlogContext"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
import "./BlogDetail.css"

const API_URL = "http://localhost:5000/api"

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const { getBlog, deleteBlog } = useContext(BlogContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      // First try to get the blog from context
      const blogData = getBlog(id)

      if (blogData) {
        setBlog(blogData)
        setLoading(false)
        return
      }

      // If not found in context, fetch from API
      try {
        const { data } = await axios.get(`${API_URL}/blogs/${id}`)
        setBlog(data)
      } catch (error) {
        console.error("Error fetching blog:", error)
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, getBlog, navigate])

  const handleDelete = async () => {
    try {
      await deleteBlog(id)
      navigate("/")
    } catch (err) {
      console.error(err.message)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return <div className="loading">Loading blog...</div>
  }

  if (!blog) {
    return <div className="loading">Blog not found</div>
  }

  // Check if user is author using MongoDB _id
  const isAuthor = currentUser && currentUser.id === blog.authorId.toString()

  return (
    <div className="blog-detail-container">
      <article className="blog-detail">
        <header className="blog-detail-header">
          <h1>{blog.title}</h1>
          <div className="blog-detail-meta">
            <span className="blog-detail-author">By {blog.author}</span>
            <span className="blog-detail-date">
              Published on {formatDate(blog.createdAt)}
              {blog.updatedAt !== blog.createdAt && ` (Updated on ${formatDate(blog.updatedAt)})`}
            </span>
          </div>
        </header>

        <div className="blog-detail-content">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="blog-detail-footer">
          {isAuthor && (
            <div className="blog-detail-actions">
              <Link to={`/edit/${blog._id}`} className="blog-detail-edit">
                Edit
              </Link>
              <button onClick={handleDelete} className="blog-detail-delete">
                Delete
              </button>
            </div>
          )}
          <Link to="/" className="blog-detail-back">
            Back to Home
          </Link>
        </footer>
      </article>
    </div>
  )
}

export default BlogDetail


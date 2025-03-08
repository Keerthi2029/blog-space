"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { BlogContext } from "../contexts/BlogContext"
import { AuthContext } from "../contexts/AuthContext"
import "./BlogDetail.css"

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const { getBlog, deleteBlog } = useContext(BlogContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // First try to get the blog from context
    const blogData = getBlog(id)

    if (blogData) {
      setBlog(blogData)
      setLoading(false)
      return
    }

    // If not found in context, try to get from localStorage directly
    try {
      const storedBlogs = localStorage.getItem("blogs")
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs)
        const foundBlog = parsedBlogs.find((b) => b.id === id)

        if (foundBlog) {
          setBlog(foundBlog)
        } else {
          // Blog not found, redirect to home
          navigate("/")
        }
      } else {
        // No blogs in localStorage, redirect to home
        navigate("/")
      }
    } catch (error) {
      console.error("Error loading blog from localStorage:", error)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }, [id, getBlog, navigate])

  const handleDelete = () => {
    try {
      deleteBlog(id)
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

  const isAuthor = currentUser && currentUser.id === blog.authorId

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
              <Link to={`/edit/${blog.id}`} className="blog-detail-edit">
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


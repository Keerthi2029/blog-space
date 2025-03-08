"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BlogContext } from "../contexts/BlogContext"
import { AuthContext } from "../contexts/AuthContext"
import "./BlogForm.css"

const EditBlog = () => {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const { getBlog, updateBlog } = useContext(BlogContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/signin")
      return
    }

    // Load blog data
    const blog = getBlog(id)
    if (!blog) {
      navigate("/")
      return
    }

    // Check if current user is the author
    if (blog.authorId !== currentUser.id) {
      navigate("/")
      return
    }

    setTitle(blog.title)
    setContent(blog.content)
    setLoading(false)
  }, [id, getBlog, currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    try {
      updateBlog(id, { title, content })
      navigate(`/blog/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="blog-form-container">
      <h2>Edit Blog Post</h2>
      {error && <div className="blog-form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            rows={10}
          />
        </div>
        <div className="blog-form-actions">
          <button type="button" onClick={() => navigate(`/blog/${id}`)} className="blog-form-cancel">
            Cancel
          </button>
          <button type="submit" className="blog-form-submit">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog


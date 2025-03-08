"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BlogContext } from "../contexts/BlogContext"
import { AuthContext } from "../contexts/AuthContext"
import "./BlogForm.css"

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const { createBlog } = useContext(BlogContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  // Check authentication on component mount
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    try {
      const newBlog = createBlog(title, content)
      navigate(`/blog/${newBlog.id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!currentUser) {
    return null // Don't render anything if not logged in
  }

  return (
    <div className="blog-form-container">
      <h2>Create New Blog Post</h2>
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
          <button type="button" onClick={() => navigate("/")} className="blog-form-cancel">
            Cancel
          </button>
          <button type="submit" className="blog-form-submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog


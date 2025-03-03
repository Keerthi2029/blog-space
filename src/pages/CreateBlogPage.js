"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "react-feather"

function CreateBlogPage({ addBlog }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    thumbnail: "/placeholder.svg?height=200&width=300",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.author) {
      alert("Please fill in all required fields")
      return
    }
    addBlog(formData)
    navigate("/")
  }

  return (
    <div className="create-blog-page">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="back-btn">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Create New Blog</h1>
      </div>

      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="12"
            required
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogPage


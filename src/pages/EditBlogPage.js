"use client"

import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { ArrowLeft } from "react-feather"

function EditBlogPage({ blogs, onEdit }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    thumbnail: "",
  })

  useEffect(() => {
    const blog = blogs.find((blog) => blog.id === Number.parseInt(id))
    if (blog) {
      setFormData(blog)
    } else {
      navigate("/")
    }
  }, [blogs, id, navigate])

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
    onEdit(formData)
    navigate(`/blog/${id}`)
  }

  return (
    <div className="edit-blog-page">
      <div className="edit-blog-header">
        <Link to={`/blog/${id}`} className="back-btn">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
        <h2>Edit Blog</h2>
      </div>

      <form className="edit-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
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
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate(`/blog/${id}`)}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlogPage


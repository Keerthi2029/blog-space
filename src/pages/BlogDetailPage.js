"use client"

import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Edit, Trash } from "react-feather"

function BlogDetailPage({ blogs, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = blogs.find((blog) => blog.id === Number.parseInt(id))

  if (!blog) {
    return (
      <div className="blog-detail-not-found">
        <h2>Blog not found</h2>
        <p>The blog you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      onDelete(blog.id)
      navigate("/")
    }
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-actions">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <div className="blog-detail-buttons">
          <Link to={`/edit/${blog.id}`} className="edit-btn">
            <Edit size={18} /> Edit
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>

      <article className="blog-detail">
        <h1>{blog.title}</h1>

        <div className="blog-detail-meta">
          <span className="blog-author">By {blog.author}</span>
          <span className="blog-date">{blog.date}</span>
        </div>

        {blog.thumbnail && (
          <div className="blog-detail-thumbnail">
            <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} />
          </div>
        )}

        <div className="blog-detail-content">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  )
}

export default BlogDetailPage


"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "./BlogCard.css"

const BlogCard = ({ blog, onDelete }) => {
  const { currentUser } = useContext(AuthContext)
  // Check if user is author using MongoDB _id
  const isAuthor = currentUser && currentUser.id === blog.authorId.toString()

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substr(0, maxLength) + "..."
  }

  return (
    <div className="blog-card">
      <h2 className="blog-title">{blog.title}</h2>
      <div className="blog-meta">
        <span className="blog-author">By {blog.author}</span>
        <span className="blog-date">{formatDate(blog.createdAt)}</span>
      </div>
      <p className="blog-excerpt">{truncateContent(blog.content)}</p>
      <div className="blog-actions">
        <Link to={`/blog/${blog._id}`} className="blog-read-more">
          Read More
        </Link>
        {isAuthor && (
          <div className="blog-author-actions">
            <Link to={`/edit/${blog._id}`} className="blog-edit">
              Edit
            </Link>
            <button onClick={() => onDelete(blog._id)} className="blog-delete">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogCard


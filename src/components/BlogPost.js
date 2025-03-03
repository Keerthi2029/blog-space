"use client"

import { useState } from "react"

function BlogPost({ blog, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="blog-post">
      {blog.thumbnail && (
        <div className="blog-thumbnail">
          <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} />
        </div>
      )}
      <div className="blog-content">
        <h3>{blog.title}</h3>
        <div className="blog-meta">
          <span className="blog-author">By {blog.author}</span>
          <span className="blog-date">{blog.date}</span>
        </div>
        <div className={`blog-text ${isExpanded ? "expanded" : ""}`}>
          <p>{blog.content}</p>
        </div>
        <div className="blog-actions">
          <button className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
          <button className="delete-btn" onClick={() => onDelete(blog.id)} aria-label="Delete blog">
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogPost


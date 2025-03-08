"use client"

import { useContext, useEffect, useState } from "react"
import { BlogContext } from "../contexts/BlogContext"
import BlogCard from "../components/BlogCard"
import "./Home.css"

const Home = () => {
  const { blogs, deleteBlog, loading } = useContext(BlogContext)
  const [localBlogs, setLocalBlogs] = useState([])

  // Load blogs from localStorage directly as a fallback
  useEffect(() => {
    try {
      const storedBlogs = localStorage.getItem("blogs")
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs)
        setLocalBlogs(parsedBlogs)
      }
    } catch (error) {
      console.error("Error loading blogs from localStorage:", error)
    }
  }, [])

  // Update local blogs when context blogs change
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLocalBlogs(blogs)
    }
  }, [blogs])

  // Use blogs from context or fallback to local state
  const displayBlogs = blogs.length > 0 ? blogs : localBlogs

  // Sort blogs by creation date (newest first)
  const sortedBlogs = [...displayBlogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  if (loading) {
    return <div className="loading">Loading blogs...</div>
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Multi-User Blog</h1>
        <p>Read the latest posts from our community</p>
      </div>

      {sortedBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs have been posted yet. Be the first to create a blog!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home


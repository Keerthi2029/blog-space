"use client"

import { createContext, useState, useEffect, useCallback, useMemo, useContext } from "react"
import { AuthContext } from "./AuthContext"

export const BlogContext = createContext()

// Initialize with default blogs if none exist in localStorage
const initializeBlogs = () => {
  const storedBlogs = localStorage.getItem("blogs")
  if (storedBlogs) {
    try {
      return JSON.parse(storedBlogs)
    } catch (error) {
      console.error("Error parsing blogs from localStorage:", error)
      return []
    }
  }
  return []
}

export const BlogProvider = ({ children }) => {
  // Initialize blogs state directly from localStorage
  const [blogs, setBlogs] = useState(initializeBlogs())
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  // Load blogs from localStorage on initial render
  useEffect(() => {
    try {
      const storedBlogs = localStorage.getItem("blogs")
      if (storedBlogs) {
        setBlogs(JSON.parse(storedBlogs))
      }
    } catch (error) {
      console.error("Error loading blogs from localStorage:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("blogs", JSON.stringify(blogs))
    } catch (error) {
      console.error("Error saving blogs to localStorage:", error)
    }
  }, [blogs])

  const createBlog = useCallback(
    (title, content) => {
      if (!currentUser) {
        throw new Error("You must be logged in to create a blog")
      }

      const newBlog = {
        id: Date.now().toString(),
        title,
        content,
        author: currentUser.username,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Update state and localStorage in one operation
      const updatedBlogs = [...blogs, newBlog]
      setBlogs(updatedBlogs)

      // Directly update localStorage as a backup
      try {
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      } catch (error) {
        console.error("Error saving blog to localStorage:", error)
      }

      return newBlog
    },
    [currentUser, blogs],
  )

  const updateBlog = useCallback(
    (id, { title, content }) => {
      if (!currentUser) {
        throw new Error("You must be logged in to update a blog")
      }

      const updatedBlogs = blogs.map((blog) => {
        if (blog.id === id) {
          // Check if current user is the author
          if (blog.authorId !== currentUser.id) {
            throw new Error("You can only edit your own blogs")
          }
          return {
            ...blog,
            title,
            content,
            updatedAt: new Date().toISOString(),
          }
        }
        return blog
      })

      setBlogs(updatedBlogs)

      // Directly update localStorage as a backup
      try {
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      } catch (error) {
        console.error("Error updating blog in localStorage:", error)
      }
    },
    [currentUser, blogs],
  )

  const deleteBlog = useCallback(
    (id) => {
      if (!currentUser) {
        throw new Error("You must be logged in to delete a blog")
      }

      const blogToDelete = blogs.find((blog) => blog.id === id)

      if (!blogToDelete) {
        throw new Error("Blog not found")
      }

      if (blogToDelete.authorId !== currentUser.id) {
        throw new Error("You can only delete your own blogs")
      }

      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)

      // Directly update localStorage as a backup
      try {
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      } catch (error) {
        console.error("Error removing blog from localStorage:", error)
      }
    },
    [currentUser, blogs],
  )

  const getBlog = useCallback(
    (id) => {
      return blogs.find((blog) => blog.id === id)
    },
    [blogs],
  )

  const getUserBlogs = useCallback(
    (userId) => {
      return blogs.filter((blog) => blog.authorId === userId)
    },
    [blogs],
  )

  const value = useMemo(
    () => ({
      blogs,
      createBlog,
      updateBlog,
      deleteBlog,
      getBlog,
      getUserBlogs,
      loading,
    }),
    [blogs, createBlog, updateBlog, deleteBlog, getBlog, getUserBlogs, loading],
  )

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}


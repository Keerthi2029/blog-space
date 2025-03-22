"use client"

import { createContext, useState, useEffect, useCallback, useMemo, useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"

export const BlogContext = createContext()

const API_URL = "http://localhost:5000/api"

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  // Load blogs from API on initial render
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/blogs`)
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const createBlog = useCallback(
    async (title, content) => {
      if (!currentUser) {
        throw new Error("You must be logged in to create a blog")
      }

      try {
        const { data } = await axios.post(
          `${API_URL}/blogs`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          },
        )

        // Update state with new blog
        setBlogs((prevBlogs) => [...prevBlogs, data])
        return data
      } catch (error) {
        throw new Error(error.response?.data?.message || "Error creating blog")
      }
    },
    [currentUser],
  )

  const updateBlog = useCallback(
    async (id, { title, content }) => {
      if (!currentUser) {
        throw new Error("You must be logged in to update a blog")
      }

      try {
        const { data } = await axios.put(
          `${API_URL}/blogs/${id}`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          },
        )

        // Update state with updated blog
        setBlogs((prevBlogs) => prevBlogs.map((blog) => (blog._id === id ? data : blog)))

        return data
      } catch (error) {
        throw new Error(error.response?.data?.message || "Error updating blog")
      }
    },
    [currentUser],
  )

  const deleteBlog = useCallback(
    async (id) => {
      if (!currentUser) {
        throw new Error("You must be logged in to delete a blog")
      }

      try {
        await axios.delete(`${API_URL}/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })

        // Update state by removing deleted blog
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id))
      } catch (error) {
        throw new Error(error.response?.data?.message || "Error deleting blog")
      }
    },
    [currentUser],
  )

  const getBlog = useCallback(
    (id) => {
      return blogs.find((blog) => blog._id === id)
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


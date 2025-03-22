"use client"

import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"

export const AuthContext = createContext()

const API_URL = "http://localhost:5000/api"

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load current user from localStorage token on initial render
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          // Set auth header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

          // Get user profile
          const { data } = await axios.get(`${API_URL}/users/profile`)

          setCurrentUser({
            id: data._id,
            username: data.username,
            email: data.email,
            token,
          })
        } catch (error) {
          console.error("Error loading user:", error)
          localStorage.removeItem("token")
          delete axios.defaults.headers.common["Authorization"]
        }
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  const signUp = useCallback(async (username, email, password) => {
    try {
      await axios.post(`${API_URL}/users`, {
        username,
        email,
        password,
      })

      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error creating account")
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      })

      // Save token to localStorage
      localStorage.setItem("token", data.token)

      // Set auth header
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

      // Set current user
      const userWithoutPassword = {
        id: data._id,
        username: data.username,
        email: data.email,
        token: data.token,
      }

      setCurrentUser(userWithoutPassword)
      return userWithoutPassword
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials")
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      signUp,
      signIn,
      signOut,
      loading,
    }),
    [currentUser, signUp, signIn, signOut, loading],
  )

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}


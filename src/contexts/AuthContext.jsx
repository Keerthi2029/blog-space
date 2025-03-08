"use client"

import { createContext, useState, useEffect, useCallback, useMemo } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize users from localStorage or create empty array
  const initializeUsers = useCallback(() => {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  }, [])

  // Load current user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signUp = useCallback(
    (username, email, password) => {
      const users = initializeUsers()

      // Check if user already exists
      const userExists = users.some((user) => user.email === email || user.username === username)
      if (userExists) {
        throw new Error("User already exists")
      }

      // Create new user
      const newUser = { id: Date.now().toString(), username, email, password }
      const updatedUsers = [...users, newUser]

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      return newUser
    },
    [initializeUsers],
  )

  const signIn = useCallback(
    (email, password) => {
      const users = initializeUsers()

      // Find user
      const user = users.find((user) => user.email === email && user.password === password)
      if (!user) {
        throw new Error("Invalid credentials")
      }

      // Save current user to localStorage
      const userWithoutPassword = { ...user, password: undefined }
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      setCurrentUser(userWithoutPassword)
      return userWithoutPassword
    },
    [initializeUsers],
  )

  const signOut = useCallback(() => {
    localStorage.removeItem("currentUser")
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


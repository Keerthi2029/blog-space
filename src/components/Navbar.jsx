"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "./Navbar.css"

const Navbar = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Multi-User Blog
        </Link>
        <div className="navbar-menu">
          {currentUser ? (
            <>
              <span className="navbar-welcome">Welcome, {currentUser.username}</span>
              <Link to="/create" className="navbar-link">
                Create Blog
              </Link>
              <button onClick={handleSignOut} className="navbar-button">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="navbar-link">
                Sign In
              </Link>
              <Link to="/signup" className="navbar-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar


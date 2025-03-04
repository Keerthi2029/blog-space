import { Link, useNavigate } from "react-router-dom"
import { Plus, LogIn, UserPlus, LogOut } from "react-feather"
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          BlogSpace
        </Link>

        <nav className="nav">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/create" className="nav-link create-link">
                    <Plus size={20} />
                    Create Blog
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }} 
                    className="nav-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </li>
                <li>
                  <span className="nav-link">Welcome, {user.username}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin" className="nav-link">
                    <LogIn size={20} /> Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="nav-link">
                    <UserPlus size={20} /> Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
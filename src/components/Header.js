import { Link, useNavigate } from "react-router-dom"
import { Plus } from "react-feather"

function Header() {
  const navigate = useNavigate()

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
            <li>
              <Link to="/create" className="nav-link create-link">
                <Plus size={20} />
                Create Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { BlogProvider } from "./contexts/BlogContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import CreateBlog from "./pages/CreateBlog"
import EditBlog from "./pages/EditBlog"
import BlogDetail from "./pages/BlogDetail"
import "./App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/create" element={<CreateBlog />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>&copy; {new Date().getFullYear()} Multi-User Blog. All rights reserved.</p>
            </footer>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  )
}

export default App


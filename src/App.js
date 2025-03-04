import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EditBlogPage from "./pages/EditBlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { getBlogs, addBlog, deleteBlog, editBlog } from "./data/blogData";
import "./App.css";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

function App() {
  const [blogs, setBlogs] = useState(getBlogs);

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  const handleAddBlog = (blog) => {
    addBlog(blog);
    setBlogs(getBlogs());
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id);
    setBlogs(getBlogs());
  };

  const handleEditBlog = (updatedBlog) => {
    editBlog(updatedBlog);
    setBlogs(getBlogs());
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage blogs={blogs} />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateBlogPage addBlog={handleAddBlog} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog/:id" 
                element={<BlogDetailPage blogs={blogs} onDelete={handleDeleteBlog} />} 
              />
              <Route 
                path="/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditBlogPage blogs={blogs} onEdit={handleEditBlog} />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
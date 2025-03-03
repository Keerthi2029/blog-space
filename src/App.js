"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EditBlogPage from "./pages/EditBlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import { getBlogs, addBlog, deleteBlog, editBlog } from "./data/blogData";
import "./App.css";

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
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage blogs={blogs} />} />
            <Route path="/create" element={<CreateBlogPage addBlog={handleAddBlog} />} />
            <Route path="/blog/:id" element={<BlogDetailPage blogs={blogs} onDelete={handleDeleteBlog} />} />
            <Route path="/edit/:id" element={<EditBlogPage blogs={blogs} onEdit={handleEditBlog} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


"use client";

import { useState } from "react";

function CreateBlogForm({ addBlog, isFormVisible }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    thumbnail: "/placeholder.svg?height=200&width=300",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      alert("Please fill in all required fields");
      return;
    }
    addBlog(formData);
    setFormData({
      title: "",
      content: "",
      author: "",
      thumbnail: "/placeholder.svg?height=200&width=300",
    });
  };

  return (
    <section id="create-blog" className="create-blog-section">
      {isFormVisible && (
        <form className="create-blog-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail URL</label>
            <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Publish Blog
          </button>
        </form>
      )}
    </section>
  );
}

export default CreateBlogForm;


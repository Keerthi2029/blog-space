import { Link } from "react-router-dom"

function BlogList({ blogs }) {
  if (blogs.length === 0) {
    return (
      <section id="blogs" className="blog-list-empty">
        <h2>No blogs yet</h2>
        <p>Create your first blog post using the form above!</p>
      </section>
    )
  }

  return (
    <section id="blogs" className="blog-list">
      <h2>Latest Blog Posts</h2>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card-link">
            <article className="blog-post">
              <div className="blog-thumbnail">
                <img src={blog.thumbnail || "/placeholder.svg?height=200&width=300"} alt={blog.title} />
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <div className="blog-meta">
                  <span className="blog-author">By {blog.author}</span>
                  <span className="blog-date">{blog.date}</span>
                </div>
                <div className="blog-text">
                  <p>{blog.content.substring(0, 150)}...</p>
                </div>
                <div className="blog-actions">
                  <span className="read-more-btn">Read More</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default BlogList


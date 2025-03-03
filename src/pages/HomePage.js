import BlogList from "../components/BlogList"

function HomePage({ blogs }) {
  return (
    <div className="home-page">
      <BlogList blogs={blogs} />
    </div>
  )
}

export default HomePage


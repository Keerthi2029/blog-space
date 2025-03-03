const initialBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    content:
      "React is a popular JavaScript library for building user interfaces. Developed by Facebook, React has gained widespread adoption in the web development community due to its efficiency and flexibility.\n\nOne of the key features of React is its component-based architecture. Components are reusable pieces of code that return React elements describing what should appear on the screen. They can be composed together to build complex UIs from small, isolated pieces of code.\n\nReact also introduces the concept of a virtual DOM, which is a lightweight representation of the real DOM. When the state of your application changes, React updates the virtual DOM first and then efficiently updates the real DOM to match it. This approach minimizes expensive DOM operations and improves performance.",
    author: "Jane Doe",
    date: "2025-03-11",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "CSS Tips and Tricks",
    content:
      "Here are some useful CSS techniques that every developer should know:\n\n1. **Flexbox Layout**: Flexbox is a one-dimensional layout method designed for laying out items in rows or columns. It makes it easier to design flexible responsive layout structures.\n\n2. **CSS Grid**: CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.\n\n3. **CSS Variables**: CSS variables (custom properties) allow you to store specific values to reuse throughout your stylesheet.\n\n4. **Media Queries**: Media queries allow you to apply CSS styles depending on device characteristics, such as screen width, height, or orientation.\n\n5. **Transitions and Animations**: CSS transitions and animations allow you to create smooth effects when changing from one style to another without using JavaScript.",
    author: "John Smith",
    date: "2025-03-02",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
];

const saveBlogsToLocalStorage = (blogs) => {
  localStorage.setItem('blogs', JSON.stringify(blogs));
};

export const getBlogs = () => {
  const savedBlogs = localStorage.getItem('blogs');
  return savedBlogs ? JSON.parse(savedBlogs) : initialBlogs;
};

export const addBlog = (blog) => {
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
  };
  const updatedBlogs = [newBlog, ...blogs];
  saveBlogsToLocalStorage(updatedBlogs);
};

export const deleteBlog = (id) => {
  const blogs = getBlogs();
  const updatedBlogs = blogs.filter((blog) => blog.id !== id);
  saveBlogsToLocalStorage(updatedBlogs);
};

export const editBlog = (updatedBlog) => {
  const blogs = getBlogs();
  const updatedBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
  saveBlogsToLocalStorage(updatedBlogs);
};
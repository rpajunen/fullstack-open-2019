import React from 'react'
import blogService from '../services/blogs'


const BlogView = ({ user, blog, setBlogs, blogs, setNotification,  }) => {

  const handleLikeButtonClick = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog.id, blog)
      setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
      setNotification(`you liked '${updatedBlog.title}'`, 5)
    } catch (e) {
      setNotification('error liking blog', 5)
    }
  }

  const handleRemoveButtonClick = async (id, title) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${title}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification(`you removed '${title}'`, 5)
      } catch (e) {
        setNotification('error removing blog', 5)
      }
    }
  }

  if (blog === null) {
    return <p>blog is null</p>
  }
  return (
    <div>
      <h2>{blog.url}</h2>
      {blog.likes} likes <button onClick={() => handleLikeButtonClick(blog)}>like</button><br />
      Added by {blog.user.username} <br />
      {(blog.user.username === user.username) && <button onClick={() => handleRemoveButtonClick(blog.id, blog.title)}>remove</button>}
    </div>
  )
}

export default BlogView
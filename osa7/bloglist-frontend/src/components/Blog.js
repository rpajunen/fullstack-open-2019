// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'


const fullDetails = (user, blog, handleLikeButtonClick, handleRemoveButtonClick) => (
  <div>
    {blog.url}<br />
    {blog.likes} likes <button onClick={() => handleLikeButtonClick(blog)}>like</button><br />
    Added by {blog.user.username} <br />
    {(blog.user.username === user.username) && <button onClick={() => handleRemoveButtonClick(blog.id, blog.title)}>remove</button>}
  </div>
)

const Blog = ({ blog, user, handleLikeButtonClick, handleRemoveButtonClick }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <a className="clickable-tag" onClick={() => setShowDetails(!showDetails)} >{blog.title} {blog.author}</a> <br />
      {showDetails && fullDetails(user, blog, handleLikeButtonClick, handleRemoveButtonClick)}
    </div>
  )
}

export default Blog

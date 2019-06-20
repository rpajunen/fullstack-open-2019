import React from 'react'
import { connect } from 'react-redux'

import blogService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'

import Comments from '../components/Comments'

const mapDispatchToProps = {
  setNotification
}

const BlogView = (props) => {

  const handleLikeButtonClick = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog.id, blog)
      props.setBlogs(props.blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
      props.setNotification(`you liked '${updatedBlog.title}'`, 5)
    } catch (e) {
      props.setNotification('error liking blog', 5)
    }
  }

  const handleRemoveButtonClick = async (id, title) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${title}`)) {
      try {
        await blogService.remove(id)
        props.setBlogs(props.blogs.filter(blog => blog.id !== id))
        setNotification(`you removed '${title}'`, 5)
      } catch (e) {
        setNotification('error removing blog', 5)
      }
    }
  }

  if (props.blog === null) {
    return <p>blog is null</p>
  }
  return (
    <div>
      <h2>{props.blog.url}</h2>
      {props.blog.likes} likes <button onClick={() => handleLikeButtonClick(props.blog)}>like</button><br />
      Added by {props.blog.user.username} <br />
      {(props.blog.user.username === props.user.username) && <button onClick={() => handleRemoveButtonClick(props.blog.id, props.blog.title)}>remove</button>}
      <Comments id={props.blog.id}/>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(BlogView)
import React from 'react'
import { connect } from 'react-redux'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

import { setNotification } from '../reducers/notificationReducer'

const mapDispatchToProps = {
  setNotification
}

const HomeView = ({ setNotification, user, title, author, url, setBlogs, blogs, handleLikeButtonClick, handleRemoveButtonClick }) => {
  const sortedBlogs = (blogs) => {
    const blogComponents = blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        handleLikeButtonClick={handleLikeButtonClick}
        handleRemoveButtonClick={handleRemoveButtonClick} />
    )
    return blogComponents.sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  }
  const handleBlogFormSubmit = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }

    try {
      const newBlog = await blogService.createNew(newBlogObject)
      setBlogs(blogs.concat(newBlog))
      title.reset('')
      author.reset('')
      url.reset('')
      setNotification(`uusi blogi lisatty: ${newBlog.title}`, 5)
    } catch (e) {
      setNotification('error creating blog', 5)
    }
  }
  return (
    <div>
      <div>
        <Togglable buttonLabel="create">
          <BlogForm
            onSubmit={handleBlogFormSubmit}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
        {sortedBlogs(blogs)}
      </div>
    </div>
  )
}
export default connect(null, mapDispatchToProps)(HomeView)
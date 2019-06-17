/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import { useField } from './hooks'

const App = (props) => {
  const [blogs, setBlogs] = useState([])

  const registerName = useField('text')
  const registerUsername = useField('text')
  const registerPassword = useField('password')

  const username = useField('text')
  const password = useField('password')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen', 5)
    } finally {
      username.reset()
      password.reset()
    }
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username: registerUsername.value,
        name: registerName.value,
        password: registerPassword.value
      })
      props.setNotification(`rekisterointi onnistui kayttajanimella: ${user.username}`, 5)
    } catch (e) {
      props.setNotification('rekistoityminen epaonnistui', 5)
    } finally {
      registerName.reset()
      registerPassword.reset()
      registerUsername.reset()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogFormSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }

    try {
      const newBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(newBlog))
      title.reset('')
      author.reset('')
      url.reset('')
      props.setNotification(`uusi blogi lisatty: ${newBlog.title}`, 5)
    } catch (e) {
      props.setNotification('error creating blog', 5)
    }
  }

  const handleLikeButtonClick = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
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
        setBlogs(blogs.filter(blog => blog.id !== id))
        props.setNotification(`you removed '${title}'`, 5)
      } catch (e) {
        props.setNotification('error removing blog', 5)
      }
    }
  }

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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ?
        <div>
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
          />
          <RegisterForm
            handleSubmit={handleRegistration}
            name={registerName}
            username={registerUsername}
            password={registerPassword}
          />
        </div>
        :
        <div>
          <p>{user.name} logged in</p>
          <p><button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              onSubmit={handleBlogFormSubmit}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          {sortedBlogs(blogs)}
        </div>
      }
    </div>
  )
}

export default connect(null, { setNotification })(App)
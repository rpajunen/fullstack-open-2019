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

import { useField } from './hooks'

const App = () => {
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
  const [message, setMessage] = useState('')

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
      setMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      // to-do: notification after successfull registration
    } catch (e) {
      setMessage('rekistoityminen epaonnistui')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      setMessage('new blog created')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      setMessage('error creating blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLikeButtonClick = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
      setMessage('blog liked')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      setMessage('error liking blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleRemoveButtonClick = async (id, title) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${title}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage('blog removed')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (e) {
        setMessage('error removing blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} />
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

export default App
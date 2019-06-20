/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogView from './components/BlogView'
import HomeView from './components/HomeView'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser } from './reducers/loginReducer'

import { useField } from './hooks'
import { blogsById, userById, blogByBlogId } from './utils/helper'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  loginUser,
  setUser
}

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [comments, setComments] = useState([])

  const registerName = useField('text')
  const registerUsername = useField('text')
  const registerPassword = useField('password')

  const username = useField('text')
  const password = useField('password')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <Notification />
          {props.user === null ?
            <div>
              <h1>Blogs</h1>
              <LoginForm
                loginUser={props.loginUser}
                username={username}
                password={password}
              />
              <RegisterForm
                name={registerName}
                username={registerUsername}
                password={registerPassword}
                setNotification={props.setNotification}
              />
            </div> :
            <div>
              <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/users">users</Link>
                {props.user.name} logged in <button onClick={handleLogout}>logout</button>
              </div>
              <h1>Blogs</h1>
              <Route exact path="/" render={() => <HomeView
                blogFormRef={blogFormRef}
                blogs={blogs}
                setBlogs={setBlogs}
                user={props.user}
                title={title}
                author={author}
                url={url} />} />
              <Route exact path="/users" render={() => <Users blogs={blogs} />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User
                  user={userById(match.params.id, blogs)}
                  blogs={blogsById(match.params.id, blogs)} />
              } />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <BlogView
                  user={props.user}
                  blog={blogByBlogId(match.params.id, blogs)}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  comments={comments}
                  setComments={setComments}
                />
              } />
            </div>
          }
        </div>
      </Router>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
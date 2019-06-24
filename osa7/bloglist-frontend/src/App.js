/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Menu, Header, Icon } from 'semantic-ui-react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogView from './components/BlogView'
import HomeView from './components/HomeView'
import Users from './components/Users'
import User from './components/User'
import { Container } from 'semantic-ui-react'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { loginUser, setUser } from './reducers/loginReducer'
import { getBlogs, setBlogs } from './reducers/blogReducer'

import { useField } from './hooks'
import { blogsById, userById, blogByBlogId } from './utils/helper'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  loginUser,
  setUser,
  getBlogs,
  setBlogs
}

const App = (props) => {
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
    props.getBlogs()
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
    <Container>
      <div>
        <Router>
          <div>
            <Notification />
            {props.user === null ?
              <div>
                <Route exact path="/" render={() =>
                  <LoginForm
                    loginUser={props.loginUser}
                    username={username}
                    password={password}
                  />} />
                <Route exact path="/register" render={() =>
                  <RegisterForm
                    name={registerName}
                    username={registerUsername}
                    password={registerPassword}
                    setNotification={props.setNotification}
                  />} />
              </div> :
              <div>
                <Menu>
                  <Menu.Item>
                    <Icon name='home' />
                    <Link style={padding} to="/">home</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name='users' />
                    <Link style={padding} to="/users">users</Link>
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {props.user.name} logged in
                  </Menu.Item>
                  <Menu.Item>
                    <Button color='grey' onClick={handleLogout}>logout</Button>
                  </Menu.Item>
                </Menu>
                <Header as='h1'>Blogs</Header>
                <Route exact path="/" render={() =>
                  <HomeView
                    blogFormRef={blogFormRef}
                    blogs={props.blogs}
                    setBlogs={props.setBlogs}
                    user={props.user}
                    title={title}
                    author={author}
                    url={url} />} />
                <Route exact path="/users" render={() =>
                  <Users blogs={props.blogs} />} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User
                    user={userById(match.params.id, props.blogs)}
                    blogs={blogsById(match.params.id, props.blogs)} />
                } />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <BlogView
                    user={props.user}
                    blog={blogByBlogId(match.params.id, props.blogs)}
                    blogs={props.blogs}
                    setBlogs={props.setBlogs}
                    comments={comments}
                    setComments={setComments}
                  />
                } />
              </div>
            }
          </div>
        </Router>
      </div>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
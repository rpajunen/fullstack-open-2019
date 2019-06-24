/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BlogView from './components/BlogView'
import HomeView from './components/HomeView'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'

import blogService from './services/blogs'

import { setUser } from './reducers/loginReducer'
import { getBlogs } from './reducers/blogReducer'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setUser,
  getBlogs
}

const App = (props) => {
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

  return (
    <Container>
      <Router>
        <div>
          <Notification />
          {props.user === null ?
            <div>
              <Route exact path="/" render={() => <LoginForm />} />
              <Route exact path="/register" render={() => <RegisterForm />} />
            </div> :
            <div>
              <NavBar />
              <Header as='h1'>Blogs</Header>
              <Route exact path="/" render={() => <HomeView />} />
              <Route exact path="/users" render={() => <Users />} />
              <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
              <Route exact path="/blogs/:id" render={({ match }) => <BlogView id={match.params.id} />} />
            </div>
          }
        </div>
      </Router>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
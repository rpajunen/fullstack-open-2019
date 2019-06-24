import React from 'react'
import { connect } from 'react-redux'
import { Button, Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import { setUser } from '../reducers/loginReducer'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser
}

const NavBar = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
    props.history.push('/')
  }

  const padding = { padding: 5 }

  return (
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
  )

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
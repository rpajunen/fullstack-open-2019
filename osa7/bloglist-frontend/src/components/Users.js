import React from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const Users = (props) => {
  const users = props.blogs.reduce((unique, item) => {
    return unique.some(user => user.id === item.user.id) ? unique : [...unique, item.user]
  }, [])

  const numberOfBlogs = (name) => props.blogs.reduce((total, blog) => {
    return blog.user.name === name ? total + 1 : total
  }, 0)

  return (
    <div>
      <Router>
        <div>
          <h2>Users</h2>
          <table>
            <tbody>
              <tr>
                <td>name</td>
                <td>blogs created</td>
              </tr>
              {users.map(user => <tr key={user.id}><td><a href={`/users/${user.id}`}>{user.name}</a></td>
                <td>{numberOfBlogs(user.name)}</td></tr>)}
            </tbody>

          </table>
        </div>
      </Router>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, null)(Users))
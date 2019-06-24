import React from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

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
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Number of Blogs</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => <tr key={user.id}><td><a href={`/users/${user.id}`}>{user.name}</a></td>
                <td>{numberOfBlogs(user.name)}</td></tr>)}
            </Table.Body>

          </Table>
        </div>
      </Router>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, null)(Users))
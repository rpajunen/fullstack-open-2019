import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

import blogService from '../services/blogs'

import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const mapDispatchToProps = {
  setNotification,
  setBlogs
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const HomeView = (props) => {
  const sortedBlogs = () => {
    const blogComponents = props.blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={props.user} />
    )
    return (
      <div style={{ marginBottom: '40px' }}>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>All blogs</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {blogComponents.sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
          </Table.Body>
        </Table>
      </div>
    )
  }
  const handleBlogFormSubmit = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    try {
      const newBlog = await blogService.createNew(newBlogObject)
      props.setBlogs(props.blogs.concat(newBlog))
      props.setNotification(`uusi blogi lisatty: ${newBlog.title}`, 5)
    } catch (e) {
      props.setNotification('error creating blog', 5)
    }
  }

  return (
    <div>
      <div>
        <Togglable buttonLabel="create">
          <BlogForm onSubmit={handleBlogFormSubmit} />
        </Togglable>
        {sortedBlogs(props.blogs)}
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
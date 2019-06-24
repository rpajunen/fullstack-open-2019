import React from 'react'
import { connect } from 'react-redux'
import { blogsById, userById } from '../utils/helper'
import { List, Header } from 'semantic-ui-react'

const mapStateToProps = (state, props) => {
  return {
    blogs: blogsById(props.id, state.blogs),
    user: userById(props.id, state.blogs)
  }
}

const User = (props) => {
  if (props.user === null) {
    return <p>empty</p>
  }

  return (
    <div>
      <Header as='h3'>All added blogs by {props.user.name}</Header>
      <List bulleted>
        {props.blogs.map(blog => <List.Item key={blog.id}>{blog.title}</List.Item>)}
      </List>
    </div>
  )
}

export default connect(mapStateToProps, null)(User)
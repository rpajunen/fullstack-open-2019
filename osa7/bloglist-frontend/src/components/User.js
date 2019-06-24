import React from 'react'
import { connect } from 'react-redux'
import { blogsById, userById } from '../utils/helper'

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
    < div >
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div >
  )
}

export default connect(mapStateToProps, null)(User)
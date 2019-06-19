// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'


const Blog = (props) => {

  const handleClick = id => {
    props.history.push(`/blogs/${id}`)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <a className="clickable-tag" onClick={() => handleClick(props.blog.id)}>{props.blog.title} {props.blog.author}</a> <br />
    </div>
  )
}

export default withRouter(Blog)
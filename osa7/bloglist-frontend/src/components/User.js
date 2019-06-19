import React from 'react'

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

export default User
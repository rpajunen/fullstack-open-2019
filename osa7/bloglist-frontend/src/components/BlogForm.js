// eslint-disable-next-line no-unused-vars
import React from 'react'
import _ from 'lodash'

const BlogForm = ({ onSubmit, title, author, url }) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={onSubmit}>
      Title: <input {..._.omit(title, ['reset'])} /><br />
      Author: <input {..._.omit(author, ['reset'])} /><br />
      Url: <input {..._.omit(url, ['reset'])} /><br />
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
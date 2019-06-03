// eslint-disable-next-line no-unused-vars
import React from 'react'

const BlogForm = ({ onSubmit, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={onSubmit}>
      Title:
      <input
        value={title}
        onChange={handleTitleChange}
      /><br />
      Author:
      <input
        value={author}
        onChange={handleAuthorChange}
      /><br />
      Url:
      <input
        value={url}
        onChange={handleUrlChange}
      /><br />
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
import React from 'react'

const SimpleBlog = ({ simpleBlog, onClick }) => (
  <div className="simpleBlog">
    <div>
      {simpleBlog.title} {simpleBlog.author}
    </div>
    <div>
      blog has {simpleBlog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
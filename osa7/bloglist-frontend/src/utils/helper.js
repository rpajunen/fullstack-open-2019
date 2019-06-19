export const blogsById = (id, blogs) => {
  return blogs.filter(blog => blog.user.id === id)
}

export const userById = (id, blogs) => {
  const blog = blogs.find(blog => blog.user.id === id)
  if (blog === undefined) {
    return null
  }
  return blog.user
}

export const blogByBlogId = (id, blogs) => {
  const blog = blogs.find(blog => {
    return blog.id === id
  })
  if (blog === undefined) {
    return null
  }
  return blog
}


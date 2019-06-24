import blogsService from '../services/blogs'

export const like = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogsService.like({ ...blog, votes: blog.votes + 1 })
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogsService.createNew(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs,
    })
  }
}

export const setBlogs = blogs => {
  return dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    return state.filter(a => a.id !== action.data.id).concat(action.data).sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
  case 'NEW_Blog':
    return [...state, action.data]
  case 'GET_BLOGS':
    return action.data
  case 'SET_BLOGS':
    return action.data
  default:
    return state
  }
}

export default reducer
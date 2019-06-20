import loginService from '../services/login'
import blogService from '../services/blogs'

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    state = action.data
    return state
  default:
    return state
  }
}

export default reducer
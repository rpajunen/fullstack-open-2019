export const setNotification = (message, timeout) => {
  return async dispatch => {
    await dispatch({
      type: 'MESSAGE',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'MESSAGE',
        data: ''
      })
    }, timeout * 1000)

  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'MESSAGE':
    state = action.data
    return state
  default:
    return state
  }
}

export default reducer
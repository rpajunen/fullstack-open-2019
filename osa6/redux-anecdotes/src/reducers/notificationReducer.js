export const setNotification = (message) => {
  return {
    type: 'MESSAGE',
    message: message
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE':
      state = action.message
      return state
    default:
      return state
  }
}

export default reducer
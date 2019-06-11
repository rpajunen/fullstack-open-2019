export const setFilter = (searchWord) => {
  return {
    type: 'FILTER',
    data: searchWord
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      state = action.data
      return state
    default:
      return state
  }
}

export default reducer
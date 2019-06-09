export const setFilter = (searchWord) => {
  return {
    type: 'FILTER',
    filter: searchWord
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      state = action.filter
      return state
    default:
      return state
  }
}

export default reducer
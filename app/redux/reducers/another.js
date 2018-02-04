const initialState = [
  {
    text: 'yes',
    completed: false,
  }
]

export default function another(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ANOTHER':
      if (!action.todoText) {
        action.callback()
        return state
      } else {
        return [
          ...state,
          {
            completed: false,
            text: action.todoText
          }
        ]
      }
    default:
      return state
  }
}

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
    redux: true
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
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

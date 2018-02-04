export const addTodo = (todoText, callback) => ({ type: 'ADD_TODO', todoText, callback })

const another = (todoText, callback) => ({
  type: 'ADD_ANOTHER',
  todoText,
  callback
})

export const addAnthoer = (todoText, callback) => (dispatch, getState) => {
  const { text } = getState().todos[0]
  setTimeout(() => {
      dispatch(another(text, callback))
    }, 1000)  
}

import { combineReducers } from 'redux'
import todos from './todos'
import another from './another'

const rootReducer = combineReducers({
  todos,
  another
})

export default rootReducer

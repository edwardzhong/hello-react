import { combineReducers } from 'redux'
import list from './list.js'
import user from './user.js'

const rootReducer = combineReducers({
  list,
  user
});

export default rootReducer
import { combineReducers } from 'redux'
import list from './list'
import user from './user'

const rootReducer = combineReducers({
  list,
  user
});

export default rootReducer
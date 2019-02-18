import combineReducers from '../common/combineReducers'
import list from './list'
import user from './user'

const rootReducer = combineReducers({
  list,
  user
});

export default rootReducer
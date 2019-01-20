import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';
import session from './sessions';

const rootReducer = combineReducers({
  entities,
  errors,
  session
}) 

export default rootReducer;


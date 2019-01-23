import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';
import session from './sessions';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  entities,
  errors,
  session,
  ui
}) 

export default rootReducer;


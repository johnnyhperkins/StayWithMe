import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';
import session from './sessions';
import ui from './ui';
import filters from './filters'

const rootReducer = combineReducers({
  entities,
  errors,
  session,
  ui,
  filters
}) 

export default rootReducer;


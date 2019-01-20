import { combineReducers } from 'redux';
import users from './users';

const entitiesReducer = combineReducers({
  users
})

export default entitiesReducer;
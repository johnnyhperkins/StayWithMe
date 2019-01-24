import { combineReducers } from 'redux';
import users from './users';
import listings from './listings';

const entitiesReducer = combineReducers({
  users,
  listings
})

export default entitiesReducer;
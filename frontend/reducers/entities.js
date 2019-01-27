import { combineReducers } from 'redux';
import users from './users';
import listings from './listings';
import home_types from './home_types';
import amenities from './amenities';


const entitiesReducer = combineReducers({
  users,
  listings,
  home_types,
  amenities,
})

export default entitiesReducer;
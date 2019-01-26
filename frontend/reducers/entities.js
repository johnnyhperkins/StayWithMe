import { combineReducers } from 'redux';
import users from './users';
import listings from './listings';
import displayed_listing from './displayed_listing';
import home_types from './home_types';
import amenities from './amenities';


const entitiesReducer = combineReducers({
  users,
  listings,
  displayed_listing,
  home_types,
  amenities,
})

export default entitiesReducer;
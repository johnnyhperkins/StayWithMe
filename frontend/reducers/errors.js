import { combineReducers } from 'redux';
import sessionErrors from './session_errors';
import listingErrors from './listing_errors';

const errorsReducer = combineReducers({
  session: sessionErrors,
  listing: listingErrors
})

export default errorsReducer;
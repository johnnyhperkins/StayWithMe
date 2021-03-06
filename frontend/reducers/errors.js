import { combineReducers } from 'redux';
import sessionErrors from './session_errors';
import listingErrors from './listing_errors';
import bookingErrors from './booking_errors';

const errorsReducer = combineReducers({
  session: sessionErrors,
  listing: listingErrors,
  booking: bookingErrors
})

export default errorsReducer;
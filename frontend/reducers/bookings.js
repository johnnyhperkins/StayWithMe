import { 
  RECEIVE_BOOKING,
  RECEIVE_BOOKINGS,
  RECEIVE_BOOKING_ERRORS 
} from '../actions/bookings';

import merge from 'lodash/merge';


export const bookings = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return !!action.bookings ? action.bookings : {}
    case RECEIVE_BOOKING:
      return merge({}, 
        state, 
        {
          [action.listing.id]: action.listing
        }
      )
        
    // case REMOVE_BOOKING:
    //   let newState = merge({},state);
    //   delete newState[action.id]
    //   return newState
    default:
      return state;
  }
}

export default bookings;
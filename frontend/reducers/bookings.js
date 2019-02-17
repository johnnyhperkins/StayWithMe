import { 
  RECEIVE_BOOKING,
  RECEIVE_BOOKINGS,
  REMOVE_BOOKING
} from '../actions/bookings';

import merge from 'lodash/merge';

export const bookings = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return !!action.bookings ? action.bookings : {}
      // return merge({}, 
      //   state, 
      //   action.bookings
      // )

    case RECEIVE_BOOKING:
      return merge({}, 
        state, 
        {
          [action.booking.id]: action.booking
        }
      )
        
    case REMOVE_BOOKING:
      let newState = merge({}, state);
      delete newState[action.id]
      return newState

    default:
      return state;
  }
}

export default bookings;
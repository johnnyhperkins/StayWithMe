import { 
  RECEIVE_BOOKING,
  RECEIVE_BOOKINGS,
  REMOVE_BOOKING
} from '../actions/bookings';

import { merge, extend } from 'lodash'

export const bookings = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return !!action.bookings ? action.bookings : {}

    case RECEIVE_BOOKING:
      return extend({}, 
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
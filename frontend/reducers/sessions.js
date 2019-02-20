import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/sessions';
import { REMOVE_BOOKING } from '../actions/bookings';
import merge from 'lodash/merge';

const defaultState = {};

const sessionReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      return action.user
    
    case REMOVE_BOOKING:
      let user = merge({}, state);
      user.listing_booking_ids = user.listing_booking_ids.filter(booking => booking.booking_id != action.id)
      return user;

    case LOGOUT_CURRENT_USER: 
      return {};
    default:
      return state;
  }
}

export default sessionReducer;
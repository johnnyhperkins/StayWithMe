import RECEIVE_BOOKING_ERRORS from '../actions/bookings';

export const bookingErrors = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKING_ERRORS:
      return action.errors || []

    default:
      return state;
  }
}

export default bookingErrors;
import * as ApiBookingsUtil from '../util/bookings_api';
export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_BOOKINGS = "RECEIVE_BOOKINGS";
export const RECEIVE_BOOKING_ERRORS = "RECEIVE_BOOKING_ERRORS";

export const createBooking = booking => dispatch => {
  return ApiBookingsUtil.createBooking(booking).then(booking => {
    return dispatch(receiveBooking(booking));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const fetchBookings = id => dispatch => {
  return ApiBookingsUtil.fetchBookings(id).then(bookings => {
    return dispatch(receiveBookings(bookings));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking
})

const receiveBookings = (bookings) => ({
  type: RECEIVE_BOOKINGS,
  bookings
})

const receiveBookingErrors = (errors) => ({
  type: RECEIVE_BOOKING_ERRORS,
  errors
})
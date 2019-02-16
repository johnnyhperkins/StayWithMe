import * as ApiBookingsUtil from '../util/bookings_api';

export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_BOOKINGS = "RECEIVE_BOOKINGS";
export const REMOVE_BOOKING = "REMOVE_BOOKING";
export const RECEIVE_BOOKING_ERRORS = "RECEIVE_BOOKING_ERRORS";

export const createBooking = booking => dispatch => {
  return ApiBookingsUtil.createBooking(booking).then(booking => {
    return dispatch(receiveBooking(booking));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const destroyBooking = id => dispatch => {
  return ApiBookingsUtil.destroyBooking(id).then(() => {
    return dispatch(removeBooking(id));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const updateBooking = booking => dispatch => {
  return ApiBookingsUtil.updateBooking(booking).then(booking => {
    return dispatch(receiveBooking(booking));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const updateBookingStatus = (id, status) => dispatch => {
  return ApiBookingsUtil.updateBookingStatus(id, status).then(booking => {
    return dispatch(receiveBooking(booking));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const fetchListingBookings = listing_id => dispatch => {
  return ApiBookingsUtil.fetchListingBookings(listing_id).then(bookings => {
    return dispatch(receiveBookings(bookings));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const fetchBookingsByIds = ids => dispatch => {
  return ApiBookingsUtil.fetchBookingsByIds(ids).then(bookings => {
    return dispatch(receiveBookings(bookings));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

export const fetchUserBookings = user_id => dispatch => {
  return ApiBookingsUtil.fetchUserBookings(user_id).then(bookings => {
    return dispatch(receiveBookings(bookings));
  },
  (e) => dispatch(receiveBookingErrors(e.responseJSON)))
};

const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking
});

export const receiveBookings = ({bookings}) => ({
  type: RECEIVE_BOOKINGS,
  bookings
});

const removeBooking = (id) => ({
  type: REMOVE_BOOKING,
  id
});

export const receiveBookingErrors = (errors) => ({
  type: RECEIVE_BOOKING_ERRORS,
  errors
})
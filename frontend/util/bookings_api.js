export const createBooking = (booking) => {
  return $.ajax({
    url: '/api/bookings',
    method: "POST",
    data: {booking},
  })
};

export const updateBooking = (booking) => {
  return $.ajax({
    url: `/api/bookings/${booking.id}`,
    method: "PATCH",
    data: {booking},
  })
};

export const destroyBooking = (id) => {
  return $.ajax({
    url: `/api/bookings/${id}`,
    method: "DELETE",
  })
};

export const fetchListingBookings = (listing_id) => {
  return $.ajax({
    url: `/api/listings/${listing_id}/bookings/`,
    method: "GET",
  })
};

export const fetchBookingsByIds = (ids) => {
  return $.ajax({
    url: '/api/bookings/ids',
    method: "POST",
    data: {ids},
  })
};

export const fetchUserBookings = (user_id) => {
  return $.ajax({
    url: `/api/users/${user_id}/bookings/`,
    method: "GET",
  })
};
export const createBooking = (booking) => {
  return $.ajax({
    url: '/api/bookings',
    method: "POST",
    data: {booking},
    error: (err) => console.log(err)
  })
};

export const updateBookingStatus = (id, status) => {
  return $.ajax({
    url: `/api/bookings/${id}/${status}`,
    method: "PATCH",
    error: (err) => console.log(err)
  })
};

export const updateBooking = (booking) => {
  return $.ajax({
    url: `/api/bookings/${id}`,
    method: "PATCH",
    data: {booking},
    error: (err) => console.log(err)
  })
};

export const destroyBooking = (id) => {
  return $.ajax({
    url: `/api/bookings/${id}`,
    method: "DELETE",
    error: (err) => console.log(err)
  })
};

export const fetchListingBookings = (listing_id) => {
  return $.ajax({
    url: `/api/listings/${listing_id}/bookings/`,
    method: "GET",
    error: (err) => console.log(err)
  })
};

export const fetchUserBookings = (user_id) => {
  return $.ajax({
    url: `/api/users/${user_id}/bookings/`,
    method: "GET",
    error: (err) => console.log(err)
  })
};
export const createBooking = (booking) => {
  return $.ajax({
    url: '/api/bookings',
    method: "POST",
    data: {booking},
    error: (err) => console.log(err)
  })
};

export const fetchBookings = (id) => {
  return $.ajax({
    url: `/api/listings/${id}/bookings/`,
    method: "GET",
    data: id,
    error: (err) => console.log(err)
  })
};
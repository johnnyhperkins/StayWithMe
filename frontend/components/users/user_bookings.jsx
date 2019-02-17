import React from 'react';
import BookingItem from './booking_item';

const UserBookings = ({ bookings, destroyBooking }) => {
  return (
    bookings.length ? 
      <div className="bookings-panel">
        { bookings.map(booking => <BookingItem key={booking.id} booking={booking} destroyBooking={destroyBooking} />) }
      </div>
      :
      <h4>You have not made any bookings</h4>
  )
};

export default UserBookings
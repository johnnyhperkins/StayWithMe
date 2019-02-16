import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserBookings } from '../../actions/bookings'
import Loading from '../misc/loading'
import BookingItem from './booking_item';

class UserBookings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserBookings(this.props.user.id); 
  }

  render() {
    const { 
      bookingsLoading,
      destroyBooking, 
      bookings 
    } = this.props;
    
    if(bookingsLoading) {
      return <Loading />
    }
    return (
      <div className="bookings-panel">
        { bookings.length ?
          <>
            { bookings.map(booking => <BookingItem key={booking.id} booking={booking} destroyBooking={destroyBooking} />) }
          </>
        :
          <h3>You have not made any bookings</h3>
        }
      </div>
    )
  }
}

const msp = (state) => ({
  bookings: Object.values(state.entities.bookings),
  bookingLoading: state.ui.bookingLoading
})

const mdp = dispatch => ({
  fetchUserBookings: (id) => dispatch(fetchUserBookings(id)),
})

export default connect(msp,mdp)(UserBookings)
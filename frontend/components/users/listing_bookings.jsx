import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBooking } from '../../actions/bookings';
import Loading from '../misc/loading';
import ListingBookingItem from './listing_booking_item';
import ListingListItem from './listing_list_item';

class ListingBookings extends Component {
  constructor(props) {
    super(props);
  }

  updateBookingStatus = (booking, status) => {
    booking.status = status;
    this.props.updateBooking(booking);
  }
 
  render() {
    const {
      bookingsLoading, 
      listing, 
      bookings,
      home_types,
      destroyBooking,
      
    } = this.props;
      
    if(bookingsLoading) {
      return <Loading />
    }

    return (
      <>
      <ListingListItem key={listing.id} listing={listing} home_types={home_types} destroyListing={false} />
      <hr className="hr-24"/>
      <h4>Bookings for {listing.title}</h4>
      <hr className="hr-24--no-line"/>
      { bookings.length ?
          bookings.map(booking => 
          <ul>
            <ListingBookingItem
              key={`booking${booking.id}`}
              booking={booking} 
              destroyBooking={destroyBooking} 
              updateBookingStatus={this.updateBookingStatus}   
            />
          </ul>)
        :
          <h3>This listing doesn't have any bookings</h3>
        }
      
      </>
    );
  }
};

const msp = (state, props) => {
  const bookings = Object.values(state.entities.bookings).filter(booking => booking.listing_id == props.listing.id)
  return {
  home_types: state.entities.home_types,
  bookings,
  bookingLoading: state.ui.bookingLoading,
  }
};

const mdp = dispatch => ({
  updateBooking: (booking) => dispatch(updateBooking(booking)),
});

export default connect(msp,mdp)(ListingBookings);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyBooking, fetchBookingsByIds } from '../../actions/bookings'
import Loading from '../misc/loading'
import ListingBookings from './listing_bookings';
import _ from 'lodash';

class UserListingsBookings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { listings } = this.props;
    if(!_.isEmpty(listings)) {
      const allBookingIds = Object.values(listings).map(listing => listing.booking_ids).flat();
      this.props.fetchBookingsByIds(allBookingIds);
    } 
  }

  render() {
    const { 
      destroyBooking, 
      listingLoading
    } = this.props;
    
    if(listingLoading) {
      return <Loading />
    }
    
    const listings = Object.values(this.props.listings).filter(listing => listing.booking_ids.length);

    return (
      <div className="bookings-panel">
        { listings.length ?
          <>
          <ul>
            { listings.map(listing => <ListingBookings key={`listing${listing.id}`} listing={listing} destroyBooking={destroyBooking} />) }
          </ul>
          </>
        :
          <h3>You don't have any listings.</h3>
        }
      </div>
    )
  }
}

const msp = (state) => ({
  listingLoading: state.ui.listingLoading,
  bookings: state.entities.bookings,
});

const mdp = dispatch => ({
  fetchBookingsByIds: (ids) => dispatch(fetchBookingsByIds(ids)),
  destroyBooking: (id) => dispatch(destroyBooking(id)),
});

export default connect(msp,mdp)(UserListingsBookings)
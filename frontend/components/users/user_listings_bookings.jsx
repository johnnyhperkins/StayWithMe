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
      listingLoading,
      listings
    } = this.props;
    
    if(listingLoading) {
      return <Loading />
    }
    
    const listingsWithBookings = Object.values(listings).filter(listing => listing.booking_ids.length);

    return (
      <div className="bookings-panel">
        { listingsWithBookings.length ?
          <>
          <ul>
            { listingsWithBookings.map(listing => 
              <ListingBookings 
                key={`listing${listing.id}`} 
                listing={listing} 
                destroyBooking={destroyBooking} />
              ) 
            }
          </ul>
          </>
        :
          <h4>Your listings don't have any bookings right now.</h4>
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
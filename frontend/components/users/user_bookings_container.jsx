import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyBooking } from '../../actions/bookings';
import { fetchUserListings } from '../../actions/listings';
import UserBookings from './user_bookings';
import UserListingsBookings from './user_listings_bookings';

class UserBookingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBookingsOpen: true,
      myListingsBookingsOpen: false,
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if(user.listing_ids.length) {
      this.props.fetchUserListings(user.id)
    } 
  }

  togglePanel = (e) => {
    const { myBookingsOpen, myListingsBookingsOpen } = this.state;

    if( (myBookingsOpen && e.target.id == "bookings") || 
        (myListingsBookingsOpen && e.target.id == "listings") ) return;

    this.setState({
      myBookingsOpen: !this.state.myBookingsOpen,
      myListingsBookingsOpen: !this.state.myListingsBookingsOpen
    })
  }

  render() {
    const { 
      destroyBooking, 
      user,
      listings
    } = this.props;

    const {
      myBookingsOpen,
      myListingsBookingsOpen
    } = this.state;

    const hasListings = !!this.props.user.listing_ids.length;
    
    return (
      <section className="grid--75 margin-left24">
        <div className="grid--75__header">
          <p>Bookings</p>
        </div>
        <div className="content-container--profile user-bookings-container">
          <div className="toggle-panel">
            <span 
              onClick={this.togglePanel}
              id="bookings" 
              className={myBookingsOpen ? "button--toggle-panel active" : "button--toggle-panel"}>
              My Bookings
            </span>

            <span 
              onClick={this.togglePanel} 
              id="listings"
              className={myListingsBookingsOpen ? "button--toggle-panel active" : "button--toggle-panel"}>
              My Listings' Bookings
            </span>
          </div>

          { myBookingsOpen && 
            <UserBookings user={user} destroyBooking={destroyBooking} /> 
          }

          { (myListingsBookingsOpen && hasListings) && 
            <UserListingsBookings user={user} listings={listings} destroyBooking={destroyBooking} /> 
          }
          
        </div>
      </section>
    )
  }
}

const msp = (state) => ({
  listings: state.entities.listings,
  listingLoading: state.ui.listingLoading
});

const mdp = dispatch => ({
  fetchUserListings: (id) => dispatch(fetchUserListings(id)),
  destroyBooking: (id) => dispatch(destroyBooking(id)),
})

export default connect(msp, mdp)(UserBookingsContainer)
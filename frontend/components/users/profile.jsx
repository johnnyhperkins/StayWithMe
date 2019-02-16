import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import BookingItem from './booking_item';
import { fetchUserBookings, destroyBooking } from '../../actions/bookings';
import Loading from '../misc/loading';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserBookings(this.props.user.id)
  }

  render() {
    const { user, bookingLoading, bookings, destroyBooking } = this.props;

    if(bookingLoading) {
      return <Loading />
    }

    return (
      <section className="grid--75 margin-left24">
        {/* GENERAL INFO */}

        <h2 style={{marginTop: 0}} className="font--300">Hey, I'm {user.username}!</h2>
        <p className="bold">Joined in {moment(user.created_at).format('MMM YYYY')}</p>
        <NavLink className="text--teal" to={`/users/${user.id}/edit`}>Edit Profile</NavLink>

        <hr className="hr-24" />
        {/* STATS */}
        { user.review_ids.length || user.listing_ids.length ? 
        <>
        <div className="stats flex-container--no-justify space-top-16">
          {user.review_ids.length ? 
            <p><span className="number-reviews-badge">{user.review_ids.length}</span> Review{user.review_ids.length > 1 ? 's' : ''}</p>
            : null
          }
          {user.listing_ids.length ? 
            <p><span className="number-reviews-badge--green">{user.listing_ids.length}</span> Listing{user.listing_ids.length > 1 ? 's' : ''}</p>
            : null
          }
        </div>
        <hr className="hr-24" />
        </>
        : null }

        
        {/* BOOKINGS */}

        {bookings.length ?
          <div className="user-bookings-container">
            <h3>Bookings</h3>
              {bookings.map(booking => <BookingItem key={booking.id} booking={booking} destroyBooking={destroyBooking} />)}
          </div>
          :
          <h3>You have not made any bookings</h3>
        }

      </section>
    )
  }
}

const msp = (state) => ({
  bookings: Object.values(state.entities.bookings),
  bookingLoading: state.ui.bookingLoading
})

const mdp = dispatch => ({
  fetchUserBookings: (id) => dispatch(fetchUserBookings(id)),
  destroyBooking: (id) => dispatch(destroyBooking(id)),
})

export default connect(msp,mdp)(Profile);
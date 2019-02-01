import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeLoggedOut from './home_logged_out';
import { queryListings } from '../../actions/listings';
import FeaturedListing from './featured_listing';

class Home extends Component {
  componentDidMount() {
    this.props.queryListings({sample: 3})
  }
  render() {
    const { loggedIn, listings, home_types } = this.props;
    return (
      <>
      {!loggedIn && <HomeLoggedOut />}
      {/* TO DO: when clicked on this, focus the sear bar */}
      <section className={loggedIn ? "content-container" : "content-container content-container--logged-out"}>
        <h3>Explore StayWithMe</h3>
        <div className="flex-container--no-justify explore-wrapper">
          <div className="explore-container flex-container--no-justify">
            <img src='https://s3.us-east-2.amazonaws.com/stay-with-me/homes-thumb.jpg' />
            <h4>Homes</h4>
          </div>
        </div>
      </section>
      <section className="featured-listings content-container">
        <h3>Featured Listings</h3>
        <section className="flex-container--no-justify">
          { listings.map(listing => {
            return (
              <Link key={listing.id} to={`/listings/${listing.id}`}>
                <FeaturedListing home_types={home_types} listing={listing} />
              </Link>
            )}) 
          }
        </section>
      </section>
    </>
    )
  }
}

const msp = state => ({
  loggedIn: Boolean(state.session.id),
  listings: Object.values(state.entities.listings),
  home_types: state.entities.home_types
})

const mdp = dispatch => ({
  queryListings: (query) => dispatch(queryListings(query))
})

export default connect(msp,mdp)(Home);
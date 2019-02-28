import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import HomeLoggedOut from './home_logged_out';
import { queryListings } from '../../actions/listings';
import FeaturedListing from './featured_listing';
import moment from 'moment';
import queryString from 'query-string';

class Home extends Component {
  componentDidMount() {
    this.props.queryListings({sample: 3})
  }

  displaySampleResults = () => {
    const lat = 40.7830603,
      lng= -73.97124880000001,
      max_guests = 1,
      start_date = moment().format('YYYY-MM-DD'),
      end_date = moment().add(5, 'days').format('YYYY-MM-DD');

    const urlString = queryString.stringify({
      lat,
      lng,
      start_date,
      end_date,
      max_guests
    })

    this.props.history.push({
      pathname: '/search', 
      search: `?${urlString}`
    });
  }

  render() {
    const { loggedIn, listings, home_types } = this.props;
    return (
      <>
      {!loggedIn && <HomeLoggedOut />}
      <section className={loggedIn ? "content-container home" : "content-container content-container--logged-out"}>
        <h3>Explore StayWithMe</h3>
        <div className="flex-container--no-justify explore-wrapper cursor-pointer">
          <div className="explore-container flex-container--no-justify" onClick={this.displaySampleResults}>
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

export default withRouter(connect(msp,mdp)(Home));
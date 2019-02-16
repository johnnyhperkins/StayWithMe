import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { fetchUserListings, destroyListing } from '../../actions/listings';
import ListingListItem from './listing_list_item';
import Loading from '../misc/loading';


class UserListings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserListings(this.props.user.id)
  }

  render() {
    const {
      listings, 
      destroyListing, 
      listingLoading, 
      amenities, 
      home_types
    } = this.props;

    if(listingLoading) {
      return <Loading />
    }

    return (
      <>
      <section className="grid--75 margin-left24">
        <div className="grid--75__header">
          <p>Your Listings</p>
        </div>
        <div className="content-container--profile">
          { listings.length ? 
            <ul className="user-listings">
              {listings.map(listing => 
              <ListingListItem 
                destroyListing={destroyListing}
                amenities={amenities} 
                home_types={home_types} 
                key={listing.id} 
                listing={listing} />)}
            </ul>
            :
            <h3>You have no listings. <Link to="/listings/new" className="text--teal">Create one</Link></h3>
          }
        </div>
      </section>
      
      </>
    )
  } 
}

const msp = state => ({
  listings: Object.values(state.entities.listings),
  listingLoading: state.ui.listingLoading,
  amenities: state.entities.amenities,
  home_types: state.entities.home_types,
})

const mdp = dispatch => ({
  fetchUserListings: (id) => dispatch(fetchUserListings(id)),
  destroyListing: (id) => dispatch(destroyListing(id)),
})

export default connect(msp,mdp)(UserListings);
import React, { Component } from 'react';
import ListingListItem from './listing_list_item';
import Loading from '../misc/loading';


const UserListings = ({listings, destroyListing, listingLoading, amenities, home_types}) => {
    if(listingLoading) {
      return <Loading />
    }
    return (
      <>
      <section className="grid--75 margin-left24">
        <div className="grid--75__header">
          <p>Your Listings</p>
        </div>
        <div className="form-wrapper">
          <ul className="user-listings">
            {listings.map(listing => 
            <ListingListItem 
              destroyListing={destroyListing}
              amenities={amenities} 
              home_types={home_types} 
              key={listing.id} 
              listing={listing} />)}
          </ul>
        </div>
      </section>
      
      </>
    )
};

export default UserListings
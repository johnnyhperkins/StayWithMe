import React from 'react';
import SmallRatings from '../misc/small_ratings';
// import MiniSlider from '../misc/mini_slider';

const FeaturedListing = ({listing, home_types}) => {
    return (
      <div className="featured-listing">
        {/* <MiniSlider listing_id={listing.id} photos={listing.photos} /> */}
        { listing.photos && <div className="listing-thumb" style={{backgroundImage: `url(${listing.photos[0]})`}}></div>}
        {Object.values(home_types).filter(ht => ht.id == listing.home_type_id).map(ht => <h6 key={ht.id} className="text--light-black">{ht.name}</h6>)}
        <h4>{listing.title}</h4>
        <p>${listing.price} per night</p>
        <SmallRatings listing={listing} />
      </div>
    );
};

export default FeaturedListing;
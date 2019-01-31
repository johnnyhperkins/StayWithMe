import React from 'react';
import Rating from 'react-rating';

const FeaturedListing = ({listing, home_types}) => {
    return (
      <div className="featured-listing">
        <div className="listing-thumb" style={{backgroundImage: `url(${listing.photos[0]})`}}></div>
        {Object.values(home_types).filter(ht => ht.id == listing.home_type_id).map(ht => <h6 key={ht.id} className="text--light-black">{ht.name}</h6>)}
        <h4>{listing.title}</h4>
        <p>${listing.price} per night</p>
        <div className="flex-container--no-justify">
        { listing.rating > 0 ?
          ( <>
            <p className="tiny text--teal-blue">{listing.rating} </p>
            <Rating 
            className="read-only-rating thumb-size-rating"
            readonly
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            initialRating={listing.rating}
          /> <p className="tiny">{listing.review_ids.length}</p> 
          </>
          ) 
          :
          (
            <p className="tiny">Not yet rated</p>
          )
        }
        </div>
        
      </div>
    );
};

export default FeaturedListing;
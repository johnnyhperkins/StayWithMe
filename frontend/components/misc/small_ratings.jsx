
import React from 'react';
import Rating from 'react-rating';

const SmallRatings = ({listing}) => {
    return (
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
    );
};

export default SmallRatings;


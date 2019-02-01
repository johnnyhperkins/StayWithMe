import React from 'react';
import Rating from 'react-rating';

const Review = ({review}) => {
    return (
      <div className="review">
        <hr className="hr-24"/>
         <div className="flex-container--no-justify">
         <Rating 
            className="read-only-rating"
            readonly
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            initialRating={review.rating}
          />
         </div> 
        
          <p>{review.review_body}</p>
        <hr className="hr-24--no-line"/>
      </div>
    );
};

export default Review;
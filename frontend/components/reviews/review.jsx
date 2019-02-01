import React from 'react';
import Rating from 'react-rating';

const Review = ({review}) => {
    return (
      <div className="review">
        <hr className="hr-24"/>
        <div className="flex-container--no-justify rating-container">
          <div>
            <div class="profile-thumb" style={{backgroundImage: `url(${review.photoUrl})`}}></div>
            <p className="tiny center">{review.username}</p>
          </div>
          <div className="review-body margin-left24">
            <Rating 
              className="read-only-rating no-margin"
              readonly
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={review.rating}
            />
            <p>{review.review_body}</p>
          </div>   
        </div> 
        <hr className="hr-24--no-line"/>
      </div>
    );
};

export default Review;
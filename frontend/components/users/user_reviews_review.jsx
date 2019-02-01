import React, {Component} from 'react';
import Rating from 'react-rating';

// star rating 
// date of rating


const UserReviewsReview = ({review}) => {
   const {
     review_body, 
     rating, 
     photoUrl, 
     username, 
     listing_title 
    } = review
    debugger
    return (
      <>
      <div className="flex-container--no-justify">
        <div className="profile-thumb" style={{backgroundImage: `url(${photoUrl})`}}></div>
        
        <div className="review-body margin-left24">

          <h5>{listing_title}</h5>
          <Rating 
              className="read-only-rating no-margin"
              readonly
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={rating}
            />
          <p>{review_body}</p>

        </div>   
      </div>
      <hr className="hr-24"/>
      </>
    );
};

export default UserReviewsReview;
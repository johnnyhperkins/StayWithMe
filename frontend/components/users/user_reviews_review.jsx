import React, {Component} from 'react';

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
    return (
      <>
      <div className="flex-container--no-justify">
        <div className="profile-thumb" style={{backgroundImage: `url(${photoUrl})`}}></div>
        
        <div className="review-body margin-left24">
          <h5>{listing_title}</h5>
          <p>{review_body}</p>

        </div>   
      </div>
      <hr className="hr-24"/>
      </>
    );
};

export default UserReviewsReview;
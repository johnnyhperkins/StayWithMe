import React, {Component} from 'react';

const Review = ({review}) => {
    console.log(review);
    return (
      <div className="review">
        <h6>{review.rating}</h6>
        <p>{review.review_body}</p>
      </div>
    );
};

export default Review;
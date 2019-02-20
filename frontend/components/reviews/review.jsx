import React from 'react';
// import Rating from 'react-rating';
import moment from 'moment';

const Review = ({review}) => {
    return (
      <div className="review">
        <hr className="hr-24"/>
        <div className="rating-container">
          <div className="flex-container--no-justify margin-bottom16">
            <div className="profile-thumb" style={{backgroundImage: `url(${review.photoUrl})`}}></div>
            <div className="margin-left16">
              <h5>{review.username}</h5>
              <p className="small">{moment(review.created_at).format('MMMM YYYY')}</p>
            </div>
          </div>
          <div className="review-body">
            {/* <Rating 
              className="read-only-rating no-margin"
              readonly
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={review.rating}
            /> */}
            <p>{review.review_body}</p>
          </div>   
        </div> 
        <hr className="hr-24--no-line"/>
      </div>
    );
};

export default Review;
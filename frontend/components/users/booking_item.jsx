import React from 'react';
import moment from 'moment';

const BookingItem = ({booking}) => {
   const {
     status, 
     start_date, 
     end_date, 
     listing_title 
    } = booking

    return (
      <>
      <div className="flex-container--no-justify"> 
        <div className="booking-body">
          <h5>{listing_title}</h5>
          <p>Check in: {moment(start_date).format('MMM DD YYYY')}</p>
          <p>Check out: {moment(end_date).format('MMM DD YYYY')}</p>
          <p>Status: {status}</p>
        </div>   
      </div>
      <hr className="hr-24"/>
      </>
    );
};

export default BookingItem;
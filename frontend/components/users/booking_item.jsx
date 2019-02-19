import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BookingItem = ({booking, destroyBooking}) => {
   const {
     id,
     status, 
     listing_id,
     start_date, 
     end_date, 
     listing_title,
     listingPrice
    } = booking

    const cost = moment(end_date).diff(moment(start_date), 'days') * listingPrice;

    return (
      <>
      <div className="flex-container--no-justify"> 
        <div className="booking-body">
          <h5><Link to={`/listings/${listing_id}`}>{listing_title}</Link></h5>
          <p>Check in: {moment(start_date).format('MMM DD YYYY')}</p>
          <p>Check out: {moment(end_date).format('MMM DD YYYY')}</p>
          <p>Total cost: ${cost}</p>
          <p>Status: {status}</p>
          <h6 className="text--maroon" onClick={() => destroyBooking(id)}>Cancel Booking</h6>
        </div>   
      </div>
      <hr className="hr-24"/>
      </>
    );
};

export default BookingItem;
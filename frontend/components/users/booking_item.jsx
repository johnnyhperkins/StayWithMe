import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MiniSlider from '../misc/mini_slider';

const BookingItem = ({booking, destroyBooking}) => {
   const {
     id,
     status, 
     listing_id,
     start_date, 
     end_date, 
     listing_title,
     listingPrice,
     listingPhotosUrls
    } = booking

    const cost = moment(end_date).diff(moment(start_date), 'days') * listingPrice;

    return (
      <>
      <div className="booking-item-wrapper"> 
        <MiniSlider listing_id={listing_id} photos={listingPhotosUrls} className="mini-slider" />
        <div className="booking-body">
          <h3><Link to={`/listings/${listing_id}`}>{listing_title}</Link></h3>
          <hr className="hr-24--no-line" />
          <h5>Details</h5>
          <p>{moment(start_date).format('MMMM Do')} - {moment(end_date).format('MMMM Do, YYYY')}</p>
          <p>Total cost: ${cost}</p>
          {status == "PENDING" && <p>Your host has received your request.</p>} 
          {status == "DENIED" && <p>Unfortunately the host has denied your request to stay here.</p>}
          {status == "APPROVED" && <p>Congratulations! The host has approved your booking.</p>}
          <hr className="hr-24--no-line" />
          {status == "PENDING" && <h6 className="text--maroon cursor-pointer" onClick={() => destroyBooking(id)}>Cancel Booking</h6>}
        </div>   
      </div>
      <hr className="hr-24"/>
      </>
    );
};

export default BookingItem;
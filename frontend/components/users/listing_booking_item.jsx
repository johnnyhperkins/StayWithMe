import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ListingBookingItem = ({booking, updateBookingStatus}) => {
   const {
     id,
     user_id,
     bookerName,
     bookerPhotoUrl,
     status, 
     listing_id,
     start_date, 
     end_date, 
     listing_title 
    } = booking

    return (
      <>
      <li> 
        <hr className="hr-24"/>
        <div className="flex-container--no-justify">
          <div className="booking-thumb-wrapper">
            <Link to={`/users/${user_id}`}>
              <div className="booking-thumb" style={{backgroundImage: `url(${bookerPhotoUrl})`}}></div>
            </Link>
            <p className="tiny">{bookerName}</p>
          </div>
          <div className="booking-details margin-left24">
            <h5><Link to={`/listings/${listing_id}`}>{listing_title}</Link></h5>
            { status == "APPROVED" &&
              <p>{bookerName} is staying at your place!</p>
            } 
            { status == "PENDING" &&
              <p>{bookerName} is requesting to stay at your place!</p>
            }
            <p>Check in: {moment(start_date).format('MMM DD YYYY')}</p>
            <p>Check out: {moment(end_date).format('MMM DD YYYY')}</p>
            <p>Status: {status[0] + status.slice(1).toLowerCase()}</p>
            { status == "PENDING" && 
            <>
            <button className="button--teal-inline grid--33" onClick={() => updateBookingStatus(booking, 'APPROVED')}>Approve</button>
            <button className="button--cancel grid--33" onClick={() => updateBookingStatus(booking, 'DENIED')}>Deny</button>
            </>
            }
          </div>
        </div>
      </li>
      </>
    );
};

export default ListingBookingItem;
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
     listing_title,
     listingPrice
    } = booking

    const cost = moment(end_date).diff(moment(start_date), 'days') * listingPrice;
    
    return (
      <>
      <li> 
        <div className="flex-container--no-justify">
          <div className="booking-thumb-wrapper">
            <Link to={`/users/${user_id}/profile`}>
              <div className="booking-thumb" style={{backgroundImage: `url(${bookerPhotoUrl})`}}></div>
            </Link>
            <p className="tiny">{bookerName}</p>
          </div>
          <div className="booking-details margin-left24">
            { status == "APPROVED" &&
              <p>{bookerName} is staying at your place!</p>
            } 
            { status == "PENDING" &&
              <p>{bookerName} is requesting to stay at your place!</p>
            }
            <h5>Details</h5>
            <p>{moment(start_date).format('MMMM Do')} - {moment(end_date).format('MMMM Do, YYYY')}</p>
            
            { status == "APPROVED" && <p>You made ${cost} on this booking.</p> }
            { status == "PENDING" && <p>You could make ${cost} on this booking.</p> }

            { status == "APPROVED" && <p>This reservation has been {status.toLowerCase()}</p> }
            { status == "PENDING" && 
            <>
            <button className="button--teal-inline grid--33" onClick={() => updateBookingStatus(booking, 'APPROVED')}>Approve</button>
            <button className="button--cancel grid--33" onClick={() => updateBookingStatus(booking, 'DENIED')}>Deny</button>
            </>
            }
          </div>
        </div>
        <hr className="hr-24"/>
      </li>
      </>
    );
};

export default ListingBookingItem;
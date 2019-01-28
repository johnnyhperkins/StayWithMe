import React, {Component} from 'react';
import { Link } from 'react-router-dom'

const ListingListItem = ({listing, amenities, home_types}) => {
  const { 
      id,
      title, 
      address, 
      price,
      amenity_ids, 
      home_type_id, 
      description 
    } = listing;
    return (
      <li className="flex-container--no-justify">
        {/* <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_1638.jpg" alt=""/> */}
        <div className="living"></div>
        <div className="listing-details">
        {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 className="text--maroon">{ht.name}</h6>)}
          <h3><Link to={`/listings/${id}`}>{title}</Link></h3>
          <h3 style={{fontSize: '2.2rem'}}>${price} <span className="tiny bold">per night</span></h3>
          <p>{address}</p>
          <p>{description}</p>
          
        </div>
      </li>
    );
};

export default ListingListItem;
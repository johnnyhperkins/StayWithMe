import React from 'react';
import { Link } from 'react-router-dom'

const ListingListItem = ({listing, destroyListing, home_types}) => {
  
  const { 
    id,
    title, 
    address, 
    price,
    home_type_id, 
    description,
    photos
  } = listing;
  
  return (
    <li className="flex-container--no-justify">
      { photos ? <div className="listing-thumb" style={{backgroundImage: `url(${photos[0]})`}} ></div> : null }
      <div className="listing-details">
        { Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 key={ht.id}>{ht.name}</h6>) }
        <h3><Link to={`/listings/${id}`}>{title}</Link></h3>
        <h3 style={{fontSize: '2.2rem'}}>${price} <span className="tiny bold">per night</span></h3>
        <p>{ address }</p>
        <p>{ description }</p>
        { destroyListing && <h6 className="text--maroon" onClick={() => destroyListing(id)}>Delete Listing</h6> }
      </div>
    </li>
  );
};

export default ListingListItem;
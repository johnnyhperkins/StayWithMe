import React, {Component} from 'react';
import { Link } from 'react-router-dom'

// class ListingListItem extends Component {
//   constructor(props) {
//     super(props)
//     this.
//   }
  
// }
const ListingListItem = ({listing, amenities, destroyListing, home_types}) => {
  const { 
      id,
      title, 
      address, 
      price,
      amenity_ids, 
      home_type_id, 
      description,
      photoUrls
    } = listing;
    return (
      <li className="flex-container--no-justify">
        <div className="listing-thumb" style={{backgroundImage: `url(${photoUrls[0]})`}} ></div>
        <div className="listing-details">
        {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 key={ht.id}>{ht.name}</h6>)}
          <h3><Link to={`/listings/${id}`}>{title}</Link></h3>
          <h3 style={{fontSize: '2.2rem'}}>${price} <span className="tiny bold">per night</span></h3>
          <p>{address}</p>
          <p>{description}</p>
          <h6 className="text--maroon" onClick={() => destroyListing(id)}>Delete Listing</h6>
        </div>
      </li>
    );
};

export default ListingListItem;
import React, {Component} from 'react';

const SearchResultItem = ({listing, home_types, amenities}) => {
    const {title, amenity_ids, home_type_id, photos, price, max_guests} = listing
    return (
      <div className="listing-result-wrapper">
        <div className="listing-thumb" style={{backgroundImage: `url(${photos[0] })`}}>
        </div> 
        <div className="listing-details">
          <div className="top--left">
              {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 className="text--light-gray" key={ht.id}>{ht.name}</h6>)}
              <h4>{title}</h4>
              <ul className="amenity-listings">
                <li className="amenity-item">{max_guests} guests</li><br />
                {Object.values(amenities)
                  .filter(a => amenity_ids.includes(a.id))
                  .map((amenity, idx) => {
                    return <li className="amenity-item" key={amenity.id}>{idx ? ' · ' : null }{amenity.name}
                      </li>
                  })}
              </ul>
            </div>
            <div className="top--right">
              <i className="heart text--maroon fas fa-heart"></i>
            </div>
            <div className="bottom--left">
              Rating
            </div>
            <div className="bottom--right">
              <h4>${price}/<span className="tiny">night</span></h4>
            </div>
          </div>
        
      </div> 

    );
};

export default SearchResultItem;
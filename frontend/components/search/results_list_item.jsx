import React, {Component} from 'react';

const SearchResultItem = ({listing}) => {
    return (
      <div>
        <div className="grid--25 listing-thumb" style={{backgroundImage: `url(${listing.photos[0] })`}} /> 
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
      </div>
    );
};

export default SearchResultItem;
import React, { Component } from 'react';
import SearchListItem from './results_list_item';

class SearchResultsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    const listingsArray = Object.values(this.props.listings);
     
    return (
      <section className="search-index-container">
        {listingsArray.map(listing => {
          return (
            <SearchListItem key={listing.id} listing={listing} {...this.props} />
          )
        })}
      </section>  
    )
  }
}

export default SearchResultsList

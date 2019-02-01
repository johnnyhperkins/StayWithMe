import React, { Component } from 'react';
import SearchListItem from './results_list_item';

class SearchResultsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const defaultBounds = { "northEast": { "lat": "37.80971", "lng": "-122.39208" }, "southWest": { "lat": "37.74187", "lng": "-122.47791" } }
    // this.props.fetchListings(this.props.filter);
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

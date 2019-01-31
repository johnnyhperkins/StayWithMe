import React, { Component } from 'react';
import SearchListItem from './results_list_item';
import { Link } from 'react-router-dom';

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
            <Link key={listing.id} to={`listings/${listing.id}`}>
              <SearchListItem listing={listing} {...this.props} />
            </Link>
          )
        })}
      </section>  
    )
  }
}

export default SearchResultsList

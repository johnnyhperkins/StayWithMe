import React, { Component } from 'react';
import SearchListItem from './results_list_item';
import Loading from '../misc/loading';

class SearchResultsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    const listingsArray = Object.values(this.props.listings);
    const { searching } = this.props
    if(searching) {
      return <Loading />
    } 
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

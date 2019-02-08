
// fetch ALL listings within the map's bounds AND filter for max_guests, dates, etc on the server-side
// step one is queryListings is called 


import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import { fetchListings, queryListings } from '../../actions/listings'
import SearchResultsMap from './results_map';
import SearchResultsList from './results_list';
import SearchFilterBar from './filter_bar';
import Loading from '../misc/loading';
import { receiveSearchQuery, updateBounds } from '../../actions/ui';

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
  }

  setQuery = () => {
    const { receiveSearchQuery } = this.props;

    const query = queryString.parse(this.props.location.search)
    query.lat = parseFloat(query.lat)
    query.lng = parseFloat(query.lng)

    receiveSearchQuery(query);
  }
 
  componentDidMount() {
    let query = queryString.parse(this.props.location.search)
    
    // TO DO: change to default to new york area
    if(_.isEmpty(query)) return this.props.history.push('/');
    this.setQuery()
  }

  componentDidUpdate(prevProps) {
    const query = queryString.parse(this.props.location.search)
    if(_.isEmpty(query)) return <Redirect push to="/" />
    if(prevProps.location.search != this.props.location.search) {
      this.setQuery();
    }
  }

  render() {
    const { searching, listings } = this.props;
    if(searching) {
      return <Loading />
    } 
    const resultsCount = listings.length;
    
    return (
      <>
      <SearchFilterBar />
      <section className="flush-content-container search-listings-container">
        <h3>{resultsCount ? `${resultsCount}+ home${resultsCount > 1 ? 's' : ''}` : 'No results were found for this search' }
        </h3>
        <SearchResultsList {...this.props} />
        <SearchResultsMap {...this.props} />
      </section>
      </>
    )
  }
}

const msp = state => ({
  query: state.ui.query,
  searching: state.ui.searching,
  listings: Object.values(state.entities.listings),
  amenities: state.entities.amenities,
  home_types: state.entities.home_types
})

const mdp = dispatch => ({
  fetchListings: bounds => dispatch(fetchListings(bounds)),
  receiveSearchQuery: (searchQuery) => dispatch(receiveSearchQuery(searchQuery)),
  queryListings: (query) => dispatch(queryListings(query)),
  updateBounds: (bounds) => dispatch(updateBounds(bounds))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
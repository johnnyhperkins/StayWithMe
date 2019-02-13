

// fetch ALL listings within the map's bounds AND filter for max_guests, dates, etc on the server-side
// step one is queryListings is called 


import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import { queryListings } from '../../actions/listings'
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

    // Would it make more sense to combine the queryListings action and the receiveSearchQuery?
    // Or is the idea to have the query set here and trickle down to the map, which actually queries the DB?
    
    // OOOR should the map just update the store, which triggers a re-render of this container, which updates the results list and the map?
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
    const { searching, listings, query } = this.props;
    // refactor this to only check if searching 
    if(searching || !query) {
      return <Loading />
    }
    const resultsCount = listings.length;
    
    return (
      <>
        <SearchFilterBar query={query} />
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
  receiveSearchQuery: (searchQuery) => dispatch(receiveSearchQuery(searchQuery)),
  queryListings: (query) => dispatch(queryListings(query)),
  updateBounds: (bounds) => dispatch(updateBounds(bounds))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
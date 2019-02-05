import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import { fetchListings } from '../../actions/listings'
import SearchResultsMap from './results_map';
import SearchResultsList from './results_list';
import SearchFilterBar from './filter_bar';
import Loading from '../misc/loading';
import { receiveSearchQuery, updateBounds } from '../../actions/ui';

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
  }

  setMapPosition = () => {
    const query = queryString.parse(this.props.location.search)
    
    if(_.isEmpty(query)) return this.props.history.push('/');

    const { lat, lng } = query;
    this.props.receiveSearchQuery({ 
      query: {
        lat: parseFloat(lat), 
        lng: parseFloat(lng) 
      }
    })
  }
 
  componentDidMount() {
    const {fetchListings} = this.props;
    this.setMapPosition();
    fetchListings()
  }

  componentDidUpdate(prevProps) {
    const query = queryString.parse(this.props.location.search)
    if(_.isEmpty(query)) return <Redirect push to="/" />

    if(prevProps.location.search != this.props.location.search) {
      this.setMapPosition();
    }
  }

  render() {
    const { searching, listingLoading, listings } = this.props;
    if(searching || listingLoading) {
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
  latLng: state.ui.query, //original orientation of the map
  filter: state.ui.bounds,
  searching: state.ui.searching,
  listingLoading: state.ui.listingLoading,
  listings: Object.values(state.entities.listings),
  amenities: state.entities.amenities,
  home_types: state.entities.home_types
})

const mdp = dispatch => ({
  fetchListings: bounds => dispatch(fetchListings(bounds)),
  receiveSearchQuery: (searchQuery) => dispatch(receiveSearchQuery(searchQuery)),
  updateBounds: (bounds) => dispatch(updateBounds(bounds))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
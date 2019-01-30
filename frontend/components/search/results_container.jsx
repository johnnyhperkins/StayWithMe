import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import { fetchListings } from '../../actions/listings';
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

    const {lat, lng } = query;
    this.props.receiveSearchQuery({ 
      query: {
        lat: parseFloat(lat), 
        lng: parseFloat(lng) 
      }
    })
  }
 
  componentDidMount() {
    this.setMapPosition();
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
    // debugger
    if(searching) {
      return <Loading />
    } 
    return (
      <>
      <SearchFilterBar />
      <section className="flush-content-container search-listings-container flex-container">
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
  listings: state.entities.listings
})

const mdp = dispatch => ({
  fetchListings: bounds => dispatch(fetchListings(bounds)),
  receiveSearchQuery: (searchQuery) => dispatch(receiveSearchQuery(searchQuery)),
  updateBounds: (bounds) => dispatch(updateBounds(bounds))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
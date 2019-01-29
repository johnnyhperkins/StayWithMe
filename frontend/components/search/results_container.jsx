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
import { receiveSearchQuery } from '../../actions/ui';

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
  }

  updateMapBounds = () => {
    const query = queryString.parse(this.props.location.search)
    console.log(_.isEmpty(query));
    
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
    this.updateMapBounds();
  }

  componentDidUpdate(prevProps) {
    const query = queryString.parse(this.props.location.search)
    
    if(_.isEmpty(query)) return <Redirect push to="/" />

    if(prevProps.location.search != this.props.location.search) {
      this.updateMapBounds();
    }
  }

  render() {
    const {latLng, searching } = this.props;
    if(searching) {
      return <Loading />
    } 
    return (
      <>
      <SearchFilterBar />
      <section className="flush-content-container search-listings-container flex-container">
        <SearchResultsList />
        <SearchResultsMap latLng={latLng} />
      </section>
      </>
    )
  }
}

const msp = state => ({
  latLng: state.ui.query,
  searching: state.ui.searching

})

const mdp = dispatch => ({
  fetchListings: query => dispatch(fetchListings(query)),
  receiveSearchQuery: (query) => dispatch(receiveSearchQuery(query))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
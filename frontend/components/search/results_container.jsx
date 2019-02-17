import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import moment from 'moment';

import { queryListings } from '../../actions/listings'
import SearchResultsMap from './results_map';
import SearchResultsList from './results_list';

import Loading from '../misc/loading';


class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
    //have default lat lng be new york?
    this.state = {
      bounds: {},
      lat: 40.75317389843926,
      lng: -73.97239013496062,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().add(2, 'days').format('YYYY-MM-DD'),
      numGuests: 1
    }
  }

  setQuery = (bounds = {}, mapCenter = {}) => {
    const { queryListings } = this.props;

    const query = queryString.parse(this.props.location.search)

    if(!_.isEmpty(mapCenter)) {
      query.lat = parseFloat(mapCenter.lat());
      query.lng = parseFloat(mapCenter.lng());
    } else {
      query.lat = parseFloat(query.lat)
      query.lng = parseFloat(query.lng)
    }
    
    query.bounds = bounds
    // debugger;
    this.setState({
      ...query
    }, () => {
      if(!_.isEmpty(this.state.bounds)) {
        queryListings(this.state)
      }
    })
  }
 
  componentDidMount() {
    let query = queryString.parse(this.props.location.search)
    
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
    const { listings, searching } = this.props;
    console.log(listings);
    // if(searching) {
    //   return <Loading />
    // }

    const resultsCount = listings.length;
    
    return (
      <>
        <section className="flush-content-container search-listings-container">
          <h3>{resultsCount ? `${resultsCount}+ home${resultsCount > 1 ? 's' : ''}` : 'No results were found for this search' }
          </h3>
          <SearchResultsList {...this.props} />
          <SearchResultsMap 
            listings={listings} 
            query={this.state} 
            setQuery={this.setQuery} 
            
          />
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
  queryListings: (query) => dispatch(queryListings(query)),
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));




// Would it make more sense to combine the queryListings action and the receiveSearchQuery?
    // Or is the idea to have the query set here and trickle down to the map, which actually queries the DB?
    // SKIP DOING IT ALL THROUGH THE STORE AND HAVE IT ALL DONE THROUGH LOCAL STATE HERE
    // OOOR should the map just update the store, which triggers a re-render of this container, which updates the results list and the map?
    // receiveSearchQuery(query);

// fetch ALL listings within the map's bounds AND filter for numGuests, dates, etc on the server-side
// step one is queryListings is called 
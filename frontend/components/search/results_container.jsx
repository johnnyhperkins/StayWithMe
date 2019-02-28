import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';

import { updateFilter, setFilter } from '../../actions/filters';

import SearchResultsMap from './results_map';
import SearchResultsList from './results_list';


class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
    this.bounds = {}
  }

  setBounds = (bounds) => {
    this.bounds = bounds;
    this.setFilterFromURL()
  }

  setFilterFromURL = () => {
    const { setFilter } = this.props;
    const query = queryString.parse(this.props.location.search)

    const {
      lat,
      lng,
      start_date, 
      end_date, 
      max_guests 
    } = query;
    
    if(_.isEmpty(query)) return this.props.history.push('/');
    
    if(_.isEmpty(this.bounds)) return;

    setFilter({
      bounds: this.bounds,
      lat: parseFloat(query.lat),
      lng: parseFloat(query.lng),
      start_date: query.start_date, 
      end_date: query.end_date, 
      max_guests: query.max_guests
    });

    const urlString = queryString.stringify({
      lng,
      lat,
      start_date,
      end_date,
      max_guests
    })
    
    window.location = `/#/search?${urlString}`;
  }
 
  componentDidMount() {
    this.setFilterFromURL()
  }

  render() {
    const { 
      listings,
      home_types, 
      updateFilter, 
      filter 
    } = this.props;

    const query = queryString.parse(this.props.location.search)

    const initMapLatLng = {
      lat: parseFloat(query.lat),
      lng: parseFloat(query.lng)
    }

    const resultsCount = listings.length;
    
    return (
      <>
        <section className="flush-content-container search-listings-container">
          <h3>{resultsCount ? `${resultsCount}+ home${resultsCount > 1 ? 's' : ''}` : 'No results were found for this search' }
          </h3>
          <SearchResultsList {...this.props} />
          <SearchResultsMap 
            setBounds={this.setBounds}
            listings={listings}
            updateFilter={updateFilter}
            setFilter={setFilter}
            filter={filter}
            initMapLatLng={initMapLatLng}
            home_types={home_types}
          />
        </section>
      </>
    )
  }
}

const msp = state => ({
  listings: Object.values(state.entities.listings),
  amenities: state.entities.amenities,
  home_types: state.entities.home_types,
  filter: state.filters
})

const mdp = dispatch => ({
  updateFilter: (filter,value) => dispatch(updateFilter(filter,value)),
  setFilter: (filter) => dispatch(setFilter(filter))
})

export default withRouter(connect(msp,mdp)(SearchResultContainer));
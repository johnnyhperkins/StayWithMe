import React, { Component } from 'react';
import _ from 'lodash';
import MarkerManager from './marker_manager';

class SearchResultsMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { query } = this.props 
    if(query) {
      const mapDOMNode = document.getElementById('search-results-map')
      const mapOptions = {
        center: { lat: query.lat, lng: query.lng }, 
        zoom: 13
      };
      
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
      this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
      
      this.registerListeners();
    }
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if( !_.isEqual(prevProps.listings, this.props.listings) ) {
      this.MarkerManager.updateMarkers(this.props.listings)
    } 
    if( !_.isEqual(prevProps.query, query) ) {
      this.map.setCenter({lat:query.lat, lng:query.lng})   
    }
  }

  registerListeners() {
    let { query, queryListings } = this.props;
    
    google.maps.event.addListener(this.map, 'idle', () => {
      
      query.bounds = {
        'northEast': {
          lat: 0,
          lng: 0
        },
        'southWest': {
          lat: 0,
          lng: 0
        }
      }
      query.bounds['northEast']['lat'] = this.map.getBounds().ma.l
      query.bounds['northEast']['lng'] = this.map.getBounds().ga.j
      query.bounds['southWest']['lat'] = this.map.getBounds().ma.j
      query.bounds['southWest']['lng'] = this.map.getBounds().ga.l  
      // TO DO refactor to just get listing id then populate by id
      // debugger
      return queryListings(query).then(({listings}) => {
        if(_.isUndefined(listings)) {
          this.MarkerManager.emptyMarkers();
        } else {
          this.MarkerManager.updateMarkers(Object.values(listings))
        }
      }
      )
    });

    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng);
      this.handleClick(coords);
    });
  }

  handleMarkerClick(listing) {
    this.props.history.push(`listings/${listing.id}`);
  }

  handleClick(coords) {
    //TO DO: fix this to preserve other url query vars
    this.props.history.push({
      pathname: '/search',
      search: `lat=${coords.lat}&lng=${coords.lng}`
    });
  }

  render() {
    // const { query } = this.props;
    // if(!query) {
    //   return <Loading />
    // } 
    return (
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
    )
  }
}

export default SearchResultsMap
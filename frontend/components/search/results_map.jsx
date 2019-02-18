import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import MarkerManager from './marker_manager';
import { setFilter } from '../../actions/filters';

class SearchResultsMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { initMapLatLng, filter } = this.props 
    if(initMapLatLng) {
      const mapDOMNode = document.getElementById('search-results-map')
      const mapOptions = {
        center: { lat: initMapLatLng.lat, lng: initMapLatLng.lng }, 
        zoom: 13
      };
      
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
      this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
      
      this.registerListeners();
      this.MarkerManager.updateMarkers(this.props.listings)
    }
  }

  componentDidUpdate(prevProps) {
    const { listings, filter } = this.props;

    if(_.isUndefined(listings) || _.isEmpty(listings)) {
      this.MarkerManager.emptyMarkers();
    }
    if( !_.isEqual(prevProps.listings, listings) ) {
      this.MarkerManager.updateMarkers(listings)
    } 
    if( prevProps.filter.lat !== filter.lat || 
      prevProps.filter.lng !== filter.lng ) {
      this.map.setCenter({lat:filter.lat, lng:filter.lng})   
    }
  
  }

  calculateBounds = (gmBounds) => {
    let bounds = {
      'northEast': {
        lat: 0,
        lng: 0
      },
      'southWest': {
        lat: 0,
        lng: 0
      }
    }

    bounds['northEast']['lat'] = gmBounds.ma.l
    bounds['northEast']['lng'] = gmBounds.ga.j
    bounds['southWest']['lat'] = gmBounds.ma.j
    bounds['southWest']['lng'] = gmBounds.ga.l 

    return bounds; 
  }

  registerListeners = () => {
    let { 
      // setQuery, 
      updateFilter } = this.props;
    google.maps.event.addListener(this.map, 'idle', () => {
      
      //add something to update map center on search
      const bounds = this.calculateBounds(this.map.getBounds());
      const mapCenter = this.map.getCenter();
      updateFilter('bounds', bounds);
      setFilter({
        bounds, 
        lat: mapCenter.lat(),
        lng: mapCenter.lng()
      })
      
      // setQuery(bounds, mapCenter)
      
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
    
    return (
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
    )
  }
}

export default withRouter(SearchResultsMap)
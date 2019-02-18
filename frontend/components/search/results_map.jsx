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
    console.log(listings);
    this.MarkerManager.updateMarkers(listings)
    // if( !_.isEqual(prevProps.listings, listings) ) {
      
    // } 

    if( prevProps.filter.lat !== filter.lat || 
      prevProps.filter.lng !== filter.lng ) {
      this.map.setCenter({lat:filter.lat, lng:filter.lng})   
    }
  }

  registerListeners = () => {
    let { setFilter, updateFilter } = this.props;
    google.maps.event.addListener(this.map, 'idle', () => {
      
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat: south, lng: west } };

      updateFilter('bounds', bounds);
      // const mapCenter = this.map.getCenter();
      // debugger;
      
      // setFilter({
      //   bounds, 
      //   lat: mapCenter.lat(),
      //   lng: mapCenter.lng()
      // })
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
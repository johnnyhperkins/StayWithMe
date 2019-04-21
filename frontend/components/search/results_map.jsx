import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import MarkerManager from './marker_manager';

class SearchResultsMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { initMapLatLng, home_types } = this.props 
    if(initMapLatLng) {
      const mapDOMNode = document.getElementById('search-results-map');

      const mapOptions = {
        center: { lat: initMapLatLng.lat, lng: initMapLatLng.lng }, 
        zoom: 13
      };
      
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
      this.MarkerManager = new MarkerManager(this.map, home_types);
      
      this.registerListeners();
      this.MarkerManager.updateMarkers(this.props.listings)
    }
  }

  componentDidUpdate(prevProps) {
    const { listings, filter } = this.props;

    this.MarkerManager.updateMarkers(listings)
    
    if( prevProps.filter.lat !== filter.lat || 
      prevProps.filter.lng !== filter.lng ) {
      this.map.setCenter({lat:filter.lat, lng:filter.lng})   
    }
  }

  registerListeners = () => {
    let { setBounds } = this.props;

    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      
      setBounds(bounds);
    });

    google.maps.event.addListener(this.map, "click", () => {
      this.MarkerManager.closeInfoWindow();
    });

  }

  render() {
    return (
      <>
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
      </>      
    )
  }
}

export default withRouter(SearchResultsMap)
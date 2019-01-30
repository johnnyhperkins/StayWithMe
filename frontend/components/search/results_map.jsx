import React, { Component } from 'react';
import MarkerManager from './marker_manager';

class SearchResultsMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { latLng, listings } = this.props //starting place of map
    const mapOptions = {
      center: { lat: latLng.lat, lng: latLng.lng }, // this is SF
      zoom: 13
    };
    const mapDOMNode = document.getElementById('search-results-map')
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.registerListeners();
    this.MarkerManager.updateMarkers(listings);
  }

  componentDidUpdate() {
    const { listings } = this.props
    this.MarkerManager.updateMarkers(listings)
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
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
      bounds['northEast']['lat'] = this.map.getBounds().ma.l
      bounds['northEast']['lng'] = this.map.getBounds().ga.j
      bounds['southWest']['lat'] = this.map.getBounds().ma.j
      bounds['southWest']['lng'] = this.map.getBounds().ga.l  
      
      this.props.fetchListings(bounds)
    });


    // TO DO Handle click listeners
    // google.maps.event.addListener(this.map, 'click', (event) => {
    //   const coords = getCoordsObj(event.latLng);
    //   this.handleClick(coords);
    // });
  }

  handleMarkerClick(bench) {
    this.props.history.push(`listings/${bench.id}`);
  }

  // handleClick(coords) {
  //   this.props.history.push({
  //     pathname: 'listings/new',
  //     search: `lat=${coords.lat}&lng=${coords.lng}`
  //   });
  // }

  

  render() {

    return (
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
    )
  }
}

export default SearchResultsMap
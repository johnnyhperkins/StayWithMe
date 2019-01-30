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

    console.log(this.props);
    
    
    // debugger

    
    // debugger

    
    // debugger
    
   
    // this.map.addListener('idle', () => {
    //   bounds['northEast']['lat'] = this.map.getBounds().ma.l
    //   bounds['northEast']['lng'] = this.map.getBounds().ga.j
    //   bounds['southWest']['lat'] = this.map.getBounds().ma.j
    //   bounds['southWest']['lng'] = this.map.getBounds().ga.l  
    //   this.props.updateBounds(bounds);
    //   this.props.fetchListings(this.props.filter)
    // })  
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      // const { north, south, east, west } = this.map.getBounds().toJSON();
      // const bounds = {
      //   northEast: { lat:north, lng: east },
      //   southWest: { lat: south, lng: west } };
      // this.props.updateFilter('bounds', bounds);
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

    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng);
      this.handleClick(coords);
    });
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

  componentDidUpdate() {
    const { listings } = this.props
    // console.log('updating benchmap')
    // debugger
    
    this.MarkerManager.updateMarkers(listings)
  }

  render() {

    return (
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
    )
  }
}

export default SearchResultsMap
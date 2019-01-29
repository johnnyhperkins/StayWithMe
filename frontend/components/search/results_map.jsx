import React, { Component } from 'react';
import MarkerManager from './marker_manager';

class SearchResultsMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { listings } = this.props
    const { latLng } = this.props

    const mapOptions = {
      center: { lat: latLng.lat, lng: latLng.lng }, // this is SF
      zoom: 13
    };
    const mapDOMNode = document.getElementById('search-results-map')
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    // let bounds = {
    //   'northEast': {
    //     lat: 0,
    //     lng: 0
    //   },
    //   'southWest': {
    //     lat: 0,
    //     lng: 0
    //   }
    // }
    // // debugger
    // this.MarkerManager = new MarkerManager(this.map);
    // this.MarkerManager.updateMarkers(listings);
    // this.map.addListener('idle', () => {
    //   bounds['northEast']['lat'] = this.map.getBounds().ma.l
    //   bounds['northEast']['lng'] = this.map.getBounds().ga.j
    //   bounds['southWest']['lat'] = this.map.getBounds().ma.j
    //   bounds['southWest']['lng'] = this.map.getBounds().ga.l  
    //   this.props.updateBounds(bounds);
    //   this.props.requestAllListings(this.props.filter)
      
    // })
     
  }

  componentDidUpdate() {
    // const { listings } = this.props
    // // console.log('updating benchmap')
    // // debugger
    
    // this.MarkerManager.updateMarkers(listings)
  }

  render() {

    return (
      <div id="search-results-map" ref={map => this.mapNode = map}></div>
    )
  }
}

export default SearchResultsMap
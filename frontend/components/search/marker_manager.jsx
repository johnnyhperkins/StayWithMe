// Convert the listings array that was received as an argument into an object(we want constant time lookup by id)
// For each marker in this.markers, if the marker does not have a corresponding listing in our constant time listing lookup object, then remove the marker from the map and this.markers

import isEmpty from 'lodash/isEmpty';

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }
  updateMarkers(listings) {

    if(!isEmpty(listings)) {
      
      Object.values(listings).forEach(listing => {
        this.markers[listing.id] = this.createMarkerFromBench(listing);
        this.markers[listing.id].setMap(this.map);
      })
      let listingsIds = Object.keys(listings).map(n => parseInt(n))
      Object.keys(this.markers).forEach(markerId => {
        // console.log(listingsIds);
        // console.log(markerId.toString())
        console.log(!listingsIds.includes(markerId));
        if (!listingsIds.includes(markerId.toString())) {
          this.removeMarker(this.markers[markerId])
        }
      })
    
    }
    
  }
  createMarkerFromBench(listing) {
    const myLatLng = { lat: listing.lat, lng: listing.lng };
    return new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: listing.description
    });
  }
  removeMarker(marker) {
    console.log(marker);
    // marker.setMap(null);
    // delete this.markers[marker.id]
    // console.log('all markers:', this.markers);
    // console.log(this.markers)
    
    // this.markerssetMap(this.map);
  }
}

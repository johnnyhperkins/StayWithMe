// Convert the listings array that was received as an argument into an object(we want constant time lookup by id)
// For each marker in this.markers, if the marker does not have a corresponding listing in our constant time listing lookup object, then remove the marker from the map and this.markers

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }
  updateMarkers(listings) {
    const listingsObj = {};
    listings.forEach(listing => listingsObj[listing.id] = listing);

    listings
      .filter(listing => !this.markers[listing.id])
      .forEach(newListing => this.createMarkerFromListing(newListing, this.handleClick))

    Object.keys(this.markers)
      .filter(listingId => !listingsObj[listingId])
      .forEach((listingId) => this.removeMarker(this.markers[listingId]))
  }

  createMarkerFromListing(listing) {
    const myLatLng = { lat: listing.lat, lng: listing.lng };
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: listing.description
    });
    marker.addListener('click', () => this.handleClick(listing));
    this.markers[marker.listingId] = marker;
  }

  removeMarker(marker) {
    console.log(this.markers);
    this.markers[marker.listingId].setMap(null);
    delete this.markers[marker.listingId];
    
  }
}

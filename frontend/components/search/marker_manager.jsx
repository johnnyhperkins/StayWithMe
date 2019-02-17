// Convert the listings array that was received as an argument into an object(we want constant time lookup by id)
// For each marker in this.markers, if the marker does not have a corresponding listing in our constant time listing lookup object, then remove the marker from the map and this.markers

export default class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }
  updateMarkers(listings) {
    
    const listingsObj = {};
    listings.forEach(listing => listingsObj[listing.id] = listing);

    listings
      .filter(listing => !this.markers[listing.id])
      .forEach(newListing => this.createMarkerFromListing(newListing, this.handleClick))
    Object.keys(this.markers)
      .filter(listingId => !listingsObj[listingId])
      .forEach((listingId) => this.removeMarker(listingId))
  }

  emptyMarkers = () => {
    this.markers = {}
  }

  createMarkerFromListing(listing) {
    const myLatLng = { lat: listing.lat, lng: listing.lng };
    
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: listing.description,
      listingId: listing.id,
      label: {
        text: `$${listing.price}`,
        fontWeight: 'bold',
        fontSize: '14px'
      },
      icon: {
        path: 'M22-48h-44v43h16l6 5 6-5h16z',
        fillColor: 'white',
        scale: 0.85,
        fillOpacity: 1,
        labelOrigin: new google.maps.Point(-1, -25),
        strokeColor: 'gray',
      },
    });

    marker.addListener('click', () => this.handleClick(listing));

    this.markers[listing.id] = marker;
  }

  removeMarker(id) {
    this.markers[id].setMap(null);
    delete this.markers[id];
    
  }
}

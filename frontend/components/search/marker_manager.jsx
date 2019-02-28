import React from 'react';
import { renderToString } from 'react-dom/server';
import MarkerContent from './marker_content';

export default class MarkerManager {
  constructor(map, home_types) {
    this.map = map;
    this.markers = {};
    this.infoWindow = new google.maps.InfoWindow();
    this.home_types = home_types;
  }

  updateMarkers(listings) {
    const listingsObj = {};
    listings.forEach(listing => listingsObj[listing.id] = listing);

    listings
      .filter(listing => !this.markers[listing.id])
      .forEach(newListing => this.createMarkerFromListing(newListing))
    Object.keys(this.markers)
      .filter(listingId => !listingsObj[listingId])
      .forEach((listingId) => this.removeMarker(listingId))
  }

  emptyMarkers = () => {
    this.markers = {}
  }

  closeInfoWindow = () => {
    this.infoWindow.marker = null;
    this.infoWindow.close();
  }

  handleMarkerClick(marker) {
    if (this.infoWindow.marker != marker) {
      this.infoWindow.setContent('');
      this.infoWindow.marker = marker;
      this.map.panTo(marker.getPosition());
      
      this.infoWindow.addListener('closeclick', function() {
        this.marker = null;
      });
      
      if(marker.hasOwnProperty('markerContent')) { 
        this.infoWindow.setContent(marker.markerContent);
        this.infoWindow.open(this.map, marker);
      } else {
        this.setMarkerContent(marker);
      }
    } 
  }

  setMarkerContent = (marker) => {    
    marker.markerContent = renderToString(
      <MarkerContent listing={marker.listing} home_types={this.home_types } />
    );
    this.infoWindow.setContent(marker.markerContent);
    this.infoWindow.maxWidth = 300;
    this.infoWindow.open(this.map, marker);
  }

  createMarkerFromListing(listing) {
    const myLatLng = { lat: listing.lat, lng: listing.lng }; 

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: listing.description,
      listing: listing,
      label: {
        text: `$${listing.price}`,
        fontWeight: 'bold',
        fontSize: '14px'
      },
      icon: {
        path: 'M22-35h-44v30h16l6 5 6-5h16z',
        fillColor: 'white',
        scale: 0.85,
        fillOpacity: 1,
        strokeColor: 'gray',
        labelOrigin: new google.maps.Point(-1, -19),
      },
    });

    marker.addListener('click', () => this.handleMarkerClick(marker));

    this.markers[listing.id] = marker;
  }

  removeMarker(id) {
    this.markers[id].setMap(null);
    delete this.markers[id];
    
  }
}

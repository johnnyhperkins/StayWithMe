import React from 'react';
import { connect } from 'react-redux';
import { createListing, fetchAmenities, fetchHomeTypes, receiveListingErrors } from '../../actions/listings';
import ListingForm from './listing_form'

const msp = state => ({
  user_id: state.session.id,
  messages: state.ui,
  home_types: Object.values(state.entities.home_types),
  amenities: Object.values(state.entities.amenities),
  errors: state.errors.listing,
  listings: state.entities.listings,
  displayed_listing: state.entities.displayed_listing
})

const mdp = dispatch => ({
  createListing: listing => dispatch(createListing(listing)),
  fetchAmenities: () => dispatch(fetchAmenities()),
  fetchHomeTypes: () => dispatch(fetchHomeTypes()),
  receiveListingErrors: (errors) => dispatch(receiveListingErrors(errors))
})

export default connect(msp,mdp)(ListingForm);

import React from 'react';
import { connect } from 'react-redux';
import { createListing, fetchAmenitiesAndHomeTypes, receiveListingErrors } from '../../actions/listings';
import ListingForm from './listing_form'

const msp = state => ({
  user_id: state.session.id,
  messages: state.ui.messages,
  home_types: Object.values(state.entities.home_types),
  amenities: Object.values(state.entities.amenities),
  errors: state.errors.listing,
  formType: "Create Listing"
})

const mdp = dispatch => ({
  createListing: listing => dispatch(createListing(listing)),
  fetchAmenitiesAndHomeTypes: () => dispatch(fetchAmenitiesAndHomeTypes()),
  receiveListingErrors: (errors) => dispatch(receiveListingErrors(errors))
})

export default connect(msp,mdp)(ListingForm);

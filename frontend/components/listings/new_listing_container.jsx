import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listings';
import { NavLink } from 'react-router-dom';
import ListingForm from './listing_form'

const msp = state => ({
  user_id: state.session.id,
  messages: state.ui
})

const mdp = dispatch => ({
  createListing: (listing) => dispatch(createListing(listing))
})

export default connect(msp,mdp)(ListingForm);

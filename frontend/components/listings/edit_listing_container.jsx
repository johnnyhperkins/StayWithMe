import { connect } from 'react-redux';
import { receiveSessionErrors } from '../../actions/sessions';
import { updateListing } from '../../actions/listings';
import ListingForm from './listing_form';

const msp = (state, props) => {
  return {
      listing: state.entities.listings[props.match.params],
      
  }
}

const mdp = (dispatch) => ({
    updateListing: listing => dispatch(updateListing(listing)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
})

export default connect(msp,mdp)(ListingForm);
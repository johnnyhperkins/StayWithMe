import { connect } from 'react-redux';
import { 
    updateListing, 
    receiveListingErrors,
    fetchListing,
} from '../../actions/listings';
import ListingForm from './listing_form';

const msp = (state, props) => {
  return {
    listing: state.entities.listings[props.match.params],
    messages: state.ui.messages,
    home_types: Object.values(state.entities.home_types),
    amenities: Object.values(state.entities.amenities),
    errors: state.errors.listing,
    user_id: state.session.id,
    formType: "Edit Listing",
    listingLoading: state.ui.listingLoading,
    savingListing: state.ui.savingListing
  }
}

const mdp = (dispatch) => ({
    updateListing: listing => dispatch(updateListing(listing)),
    receiveListingErrors: errors => dispatch(receiveListingErrors(errors)),
    fetchListing: id => dispatch(fetchListing(id))
})

export default connect(msp,mdp)(ListingForm);
import merge from 'lodash/merge';

import {  
  RECEIVE_MESSAGES, 
  RECEIVE_SEARCH_QUERY,
  UPDATE_BOUNDS, 
  SAVING_LISTING,
  TOGGLE_LOGIN_MODAL
} from '../actions/ui';

import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listings';
import { RECEIVE_BOOKING, RECEIVE_BOOKINGS } from '../actions/bookings';
import { RECEIVE_SESSION_ERRORS } from '../actions/sessions'
import { RECEIVE_REVIEWS } from '../actions/reviews';


const defaultState = {
  listingLoading: true,
  bookingLoading: true,
  searching: true,
  savingListing: false,
  reviewsLoading: true,
  messages: [],
  sessionModalOpen: false,
  sessionModalType: null,
}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case SAVING_LISTING:
      return merge({}, 
        state, { 
          savingListing: true 
        }) 

    case RECEIVE_LISTINGS:
    case RECEIVE_LISTING:
      return merge({}, 
        state, { 
          listingLoading: false,
          searching: false,
          savingListing:false 
        }) 
    
    case RECEIVE_BOOKINGS:
    case RECEIVE_BOOKING:
      return merge({}, 
        state, { 
          bookingLoading: false,
        }) 

    case TOGGLE_LOGIN_MODAL:
        return merge({}, 
          state, {
            sessionModalOpen: action.bool,
            sessionModalType: action.modal
        })

    case UPDATE_BOUNDS:
      return merge({}, 
        state, { 
          bounds: action.bounds,
          // searching: true ?
        })

    case RECEIVE_SEARCH_QUERY:
      console.log(action.query);
      return merge({}, state, {
        searching: !action.query,
        query: action.query,
        listingLoading: true
      })

    case RECEIVE_REVIEWS:
      return merge({}, state, {
        reviewsLoading: false
      })
    
    case RECEIVE_MESSAGES:
      // debugger;
      return merge({}, 
        state, { 
          messages: action.messages 
        })

    case RECEIVE_SESSION_ERRORS:
      // debugger;
      return merge({}, state, {
        messages: []
      })

    default:
      return state;
  }
}

export default uiReducer;
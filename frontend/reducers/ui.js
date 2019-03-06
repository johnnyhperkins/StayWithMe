import merge from 'lodash/merge';

import {  
  RECEIVE_MESSAGES, 
  RECEIVE_SEARCH_QUERY,
  TOGGLE_LOGIN_MODAL,
  FETCHING_LISTING
} from '../actions/ui';

import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listings';
import { RECEIVE_BOOKING, RECEIVE_BOOKINGS } from '../actions/bookings';
import { RECEIVE_SESSION_ERRORS } from '../actions/sessions'
import { RECEIVE_REVIEWS } from '../actions/reviews';
import { RECEIVE_USER } from '../actions/users';

const defaultState = {
  listingLoading: true,
  bookingLoading: true,
  searching: true,
  reviewsLoading: true,
  messages: {
    bookings: [],
    profile: [],
    session: []
  },
  sessionModalOpen: false,
  sessionModalType: null,
  userLoading: true
}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {

    case RECEIVE_LISTINGS:
    case RECEIVE_LISTING:
      return merge({}, state, { 
        listingLoading: false,
        searching: false,
      }) 
    
    case FETCHING_LISTING: 
      return merge({}, state, { 
        listingLoading: true,
      }) 

    case RECEIVE_USER:
      return merge({}, state, { 
        userLoading: false,
      }) 
    
    case RECEIVE_BOOKINGS:
    case RECEIVE_BOOKING:
      return merge({}, state, { 
        bookingLoading: false,
      }) 

    case TOGGLE_LOGIN_MODAL:
      return merge({}, state, {
        sessionModalOpen: action.bool,
        sessionModalType: action.modal
      })

    case RECEIVE_SEARCH_QUERY:
      return merge({}, state, {
        searching: !action.query,
        query: action.query,
      })

    case RECEIVE_REVIEWS:
      return merge({}, state, {
        reviewsLoading: false
      })
    
    case RECEIVE_MESSAGES:
      return merge({}, state, { 
        messages: {
          ...state.messages,
          [action.category]: action.messages
        } 
      })

    case RECEIVE_SESSION_ERRORS:
      return merge({}, state, {
        messages: {
          ...state.messages,
          session: [] 
        }
      })

    default:
      return state;
  }
}

export default uiReducer;
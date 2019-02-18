import merge from 'lodash/merge';

import {  
  RECEIVE_SEARCH_QUERY,
} from '../actions/ui';

import { UPDATE_FILTER, SET_FILTER } from '../actions/filters'

const defaultState = {}

const filters = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, 
        state, { 
          [action.filter]: action.value,
          // searching: true ?
        })
    
    case SET_FILTER:
      return merge({}, state, action.filter)

    case RECEIVE_SEARCH_QUERY:
      console.log(action.query);
      return merge({}, state, {
        query: action.query,
      })

    default:
      return state;
  }
}

export default filters;
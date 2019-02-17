import merge from 'lodash/merge';

import {  
  RECEIVE_SEARCH_QUERY,
  UPDATE_BOUNDS, 
} from '../actions/ui';

const defaultState = {}

const filters = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case UPDATE_BOUNDS:
      return merge({}, 
        state, { 
          bounds: action.bounds,
          // searching: true ?
        })

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
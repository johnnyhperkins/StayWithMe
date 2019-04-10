import merge from 'lodash/merge';

import { UPDATE_FILTER, SET_FILTER } from '../actions/filters'

const defaultState = {}

const filters = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, 
        state, { 
          [action.filter]: action.value,
        })
    
    case SET_FILTER:
      return merge({}, state, action.filter)

    default:
      return state;
  }
}

export default filters;
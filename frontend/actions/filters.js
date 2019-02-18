import { queryListings } from './listings';

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const SET_FILTER = 'SET_FILTER';

export const changeFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});

export const createFilter = (filter) => ({
  type: SET_FILTER,
  filter
})

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(changeFilter(filter, value));
  return queryListings(getState().filters)(dispatch);
};

export const setFilter = (filter) => (dispatch, getState) => {
  dispatch(createFilter(filter));
  return queryListings(getState().filters)(dispatch);
};
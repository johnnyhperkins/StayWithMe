export const FORM_TYPE = 'FORM_TYPE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const SAVING_LISTING = 'SAVING_LISTING';
export const RECEIVE_SEARCH_QUERY = 'RECEIVE_SEARCH_QUERY'
export const UPDATE_BOUNDS = 'UPDATE_BOUNDS';

export const changeFormType = (formType) => ({
  type: FORM_TYPE,
  formType
})

export const receiveSearchQuery = ({query}) => ({
  type: RECEIVE_SEARCH_QUERY,
  query
})

export const updateBounds = (bounds) => ({
  type: UPDATE_BOUNDS,
  bounds
})

export const savingListing = () => ({
  type: SAVING_LISTING
})

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const SAVING_LISTING = 'SAVING_LISTING';
export const RECEIVE_SEARCH_QUERY = 'RECEIVE_SEARCH_QUERY'
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const FETCHING_LISTING = 'FETCHING_LISTING';

export const toggleLoginModal = (modal, bool) => ({
  type: TOGGLE_LOGIN_MODAL,
  modal,
  bool
})

export const fetchingListing = () => ({
  type: FETCHING_LISTING
})

export const receiveSearchQuery = (query) => ({
  type: RECEIVE_SEARCH_QUERY,
  query
})

export const savingListing = () => ({
  type: SAVING_LISTING
})

export const receiveMessages = (messages, category) => ({
  type: RECEIVE_MESSAGES,
  category,
  messages,

})
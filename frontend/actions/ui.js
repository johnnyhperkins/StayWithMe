export const FORM_TYPE = 'FORM_TYPE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const LOADING = 'LOADING';
export const RECEIVE_SEARCH_QUERY = 'RECEIVE_SEARCH_QUERY'

export const changeFormType = (formType) => ({
  type: FORM_TYPE,
  formType
})

export const receiveSearchQuery = ({query}) => ({
  type: RECEIVE_SEARCH_QUERY,
  query
})

export const loading = (loading) => ({
  type: RECEIVE_MESSAGES,
  loading
})

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})
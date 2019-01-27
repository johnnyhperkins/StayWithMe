export const FORM_TYPE = 'FORM_TYPE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const LOADING = 'LOADING';

export const changeFormType = (formType) => ({
  type: FORM_TYPE,
  formType
})

export const loading = (loading) => ({
  type: RECEIVE_MESSAGES,
  loading
})

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})
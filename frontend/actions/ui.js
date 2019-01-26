export const FORM_TYPE = 'FORM_TYPE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const changeFormType = (formType) => ({
  type: FORM_TYPE,
  formType
})

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root';
import thunk from 'react-thunk'

export default (preloadedState = {}) => createStore(
  RootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)


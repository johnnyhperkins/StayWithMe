import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root';
import thunk from 'redux-thunk'

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
)

export default configureStore;

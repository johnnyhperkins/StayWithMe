import { applyMiddleware, createStore, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from '../reducers/root';
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
)

export default configureStore;

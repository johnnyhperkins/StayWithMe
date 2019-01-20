import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';


const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default Root;
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener("DOMContentLoaded", () => {
  let store;
  ReactModal.setAppElement('#root');
  if(window.currentUser) {
    const preloadedState = {
      entities: {
        users: {[window.currentUser.id] : window.currentUser },
      },
      session: window.currentUser
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
})
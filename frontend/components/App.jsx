import React from 'react';
import { Route } from 'react-router-dom'

import LoginFormContainer from './session/login_form_container';
import Home from './splash/home';
import NavBar from './nav/navbar';
import {AuthRoute, ProtectedRoute} from '../util/route_utils';
import Footer from './footer';


const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <Route path="/" component={Footer} />
  </div>
);

export default App;
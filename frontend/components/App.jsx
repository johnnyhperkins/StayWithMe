import React from 'react';
import { Route } from 'react-router-dom'

import LoginFormContainer from './session/login_form_container';
import Home from './splash/home';
import NavBar from './nav/navbar';
import {AuthRoute, ProtectedRoute} from '../util/route_utils';


const App = () => (
  <div>
    <Route path="/" component={NavBar} />
    <Route exact path="/" component={Home} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
  </div>
);

export default App;
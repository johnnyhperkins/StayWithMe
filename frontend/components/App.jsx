import React from 'react';
import { Route } from 'react-router-dom'

import LoginForm from './session/login_form';
import Home from './home';
import NavBar from './nav/navbar';
import {AuthRoute, ProtectedRoute} from '../util/route_utils';


const App = () => (
  <div>
    <Route path="/" component={NavBar} />
    <Route exact path="/" component={Home} />
    <AuthRoute exact path="/login" component={LoginForm} />
  </div>
);

export default App;
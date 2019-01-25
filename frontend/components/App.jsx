import React from 'react';
import { Route, Switch } from 'react-router-dom'

import LoginFormContainer from './session/login_form_container';
import Home from './splash/home';
import NavBar from './nav/navbar';
import Dashboard from './users/dashboard';
import Profile from './users/profile';
import {AuthRoute, ProtectedRoute} from '../util/route_utils';
import Footer from './footer';


const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <ProtectedRoute exact path="/users/:id/edit" component={Dashboard} />
    <ProtectedRoute exact path="/users/:id" component={Profile} />
    <Route path="/" component={Footer} />
  </div>
);

export default App;
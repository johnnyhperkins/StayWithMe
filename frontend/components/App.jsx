import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginFormContainer from './session/login_form_container';
import NewListingContainer from './listings/new_listing_container';
import EditListingContainer from './listings/edit_listing_container';
import Listing from './listings/listing_page';
import ListingIndex from './listings/listings_index';
import Home from './splash/home';
import NavBar from './nav/navbar';
import Dashboard from './users/dashboard';
import SearchResultContainer from './search/result_container';
import {AuthRoute, ProtectedRoute} from '../util/route_utils';
import Footer from './footer';


const App = connect(state => ({
  loggedIn: Boolean(state.session.id),
}))(({loggedIn}) => {
  const classes = loggedIn ? 'logged-in' : '';
  return (
    <main className={classes}>
      <Route path="/" component={NavBar} />    
      <Switch>
        <Route exact path="/" component={Home} />    
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <ProtectedRoute exact path="/listings/new" component={NewListingContainer} />
        <Route exact path="/listings" component={ListingIndex} />
        <Route exact path="/listings/:id" component={Listing} />
        <Route exact path="/search" component={SearchResultContainer} />
        <ProtectedRoute exact path="/listings/new" component={NewListingContainer} />
        <ProtectedRoute exact path="/listings/:id/edit" component={EditListingContainer} />
        <ProtectedRoute path="/users/:id" component={Dashboard} />
      </Switch>
      <Route path="/" component={Footer} />
    </main>
  );
});

export default withRouter(App);

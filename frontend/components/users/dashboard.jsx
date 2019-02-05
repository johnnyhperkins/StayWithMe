// displays user information, link to edit profile and list of user's listings with links to edit them

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';
import UserListings from './user_listings';
import UserReviews from './user_reviews';
import DashboardSidebar from './dashboard_sidebar';
import Profile from './profile';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { session, location } = this.props;
    return (
      <section className="content-container--interior-page flex-container">
        <Route 
          path="/users/"
          render={() => <DashboardSidebar session={session} path={location.pathname} />} />
        <Route 
          path={`/users/${session.id}`} exact
          render={() => <Profile userId={session.id} />} />
        <Route 
          path={`/users/${session.id}/reviews`} exact
          render={() => <UserReviews userId={session.id} />} />
        <Route 
          path={`/users/${session.id}/edit`}
          render={() => <EditProfileForm userId={session.id} />} />
        <Route 
          path={`/users/${session.id}/listings`} 
          render={() => <UserListings userId={session.id} />}
            />
      </section>
    )
  }
}

const msp = state => ({
  session: state.session,
})

export default connect(msp)(Dashboard);
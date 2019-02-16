// displays user information, link to edit profile and list of user's listings with links to edit them

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';
import UserListings from './user_listings';
import UserReviews from './user_reviews';
import DashboardSidebar from './dashboard_sidebar';
import Profile from './profile';
import UserBookingsContainer from './user_bookings_container';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, location } = this.props;
    return (
      <section className="content-container--interior-page flex-container">
        <Route 
          path="/users/"
          render={() => <DashboardSidebar user={user} path={location.pathname} />} />
        <Route 
          path={`/users/${user.id}`} exact
          render={() => <Profile user={user} />} />
        <Route 
          path={`/users/${user.id}/reviews`} exact
          render={() => <UserReviews user={user} />} />
        <Route 
          path={`/users/${user.id}/edit`}
          render={() => <EditProfileForm user={user} />} />
        <Route 
          path={`/users/${user.id}/listings`} 
          render={() => <UserListings user={user} />}
            />
        <Route 
          path={`/users/${user.id}/bookings`} 
          render={() => <UserBookingsContainer user={user} />}
        />
      </section>
    )
  }
}

const msp = state => ({
  user: state.session,
})

export default connect(msp)(Dashboard);
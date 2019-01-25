// displays user information, link to edit profile and list of user's listings with links to edit them

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <section className="dashboard-container flex-container">
        <aside className="sidebar-menu">
          <ul>
            <li><NavLink to={`/users/${session.id}/edit`}>Edit Profile</NavLink></li>
            <li><NavLink to={`/users/${session.id}/reviews`}>Reviews</NavLink></li>
            <li><NavLink className="button button--outlined">View Profile</NavLink></li>
          </ul>
        </aside>
        <section className="profile-form">
          <EditProfileForm />
        </section>
      </section>
    )
  }
}

const msp = state => ({
  session: state.session
})

const mdp = dispatch => ({
  
})

export default connect(msp,mdp)(Dashboard);
// displays user information, link to edit profile and list of user's listings with links to edit them

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProfileForm from './edit_profile_form';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { session } = this.props;
    return (

      <section className="dashboard-container content-container flex-container">
        <aside>
          <ul>
            <li><Link to={`/users/${session.id}/edit`}>Edit Profile</Link></li>
            <li><Link to={`/users/${session.id}/reviews`}>Reviews</Link></li>
            <li><Link to={`/users/${session.id}`} className="button button--outlined center">View Profile</Link></li>
          </ul>
        </aside>
        <EditProfileForm userId={session.id} />
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
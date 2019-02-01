import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <section className="grid--75 margin-left24">
        <h2 style={{marginTop: 0}} className="font--300">Hey, I'm {user.username}!</h2>
        <p className="bold">Joined in {moment(user.created_at).format('MMM YYYY')}</p>
        <NavLink className="text--teal-blue" to={`/users/${user.id}/edit`}>Edit Profile</NavLink>
        <hr className="hr-24" />
        <div className="stats flex-container--no-justify space-top-16">
          {user.review_ids.length ? 
            <p><span className="number-reviews-badge">{user.review_ids.length}</span> Review{user.review_ids.length > 1 ? 's' : ''}</p>
            : null
          }

          {user.listing_ids.length ? 
            <p><span className="number-reviews-badge--green">{user.listing_ids.length}</span> Listing{user.listing_ids.length > 1 ? 's' : ''}</p>
            : null
          }
        </div>
      </section>
    )
  }
}

const msp = (state, props) => ({
  user: state.entities.users[props.userId]
})

const mdp = dispatch => ({
  
})

export default connect(msp,mdp)(Profile);
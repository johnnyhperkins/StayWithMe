import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { fetchUser } from '../../actions/users';
import Loading from '../misc/loading';

class PublicProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id); 
  }

  render() {
    const { user, userLoading } = this.props;

    if(userLoading) {
      return <Loading />
    }

    return (
      <section className="content-container--interior-page flex-container">
        <aside className="grid--25">
          <div className="profile-image" style={{backgroundImage: `url(${user.photoUrl})`}}></div>
        </aside>
        <section className="grid--75 margin-left24">
          {/* GENERAL INFO */}

          <h2 style={{marginTop: 0}} className="font--300">Hey, I'm {user.username}!</h2>
          <p className="bold">Joined in {moment(user.created_at).format('MMM YYYY')}</p>

          <hr className="hr-24" />
          {/* STATS */}
          { user.review_ids.length || user.listing_ids.length ? 
          <>
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
          <hr className="hr-24" />
          </>
          : null }

        </section>
      </section>
    )
  }
}

const msp = (state, props) => {
  return {
    user: state.entities.users[props.match.params.id],
    userLoading: state.ui.userLoading
  }
}

const mdp = dispatch => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
})

export default withRouter(connect(msp,mdp)(PublicProfile));
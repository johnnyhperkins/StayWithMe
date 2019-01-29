import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <section className="grid--75 margin-left24">
        <div className="grid--75__header">
          <p>Prolife</p>
        </div>
        <div className="form-wrapper">
          <h1 className="font--300">Hi, I'm {user.username}</h1>
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
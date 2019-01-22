import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { isEmpty } from 'lodash'

class Home extends Component {

  render() {
    const { session, users } = this.props;
    return (
      <section>
        <h1>Home Component</h1>
      </section>
    )
  }
}

const msp = state => ({
  users: state.entities.users
})

export default connect(msp)(Home);
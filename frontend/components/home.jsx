import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { isEmpty } from 'lodash'

class Home extends Component {

  render() {
    const { session } = this.props;
    return (
      <section>
        <h1>Home Component</h1>
      </section>
    )
  }
}

export default Home;
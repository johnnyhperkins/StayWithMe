import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';

class Home extends Component {

  render() {
    const { session, users } = this.props;
    const imgDir = path.resolve(__dirname, 'app', 'assets', 'images');
    return (
      <section className="content-container">
        <h3>Explore StayWithMe</h3>
        <div className="content-container flex-container--no-justify explore-wrapper">
          <div className="explore-block-img"></div>
          <img src={'homes-thumb.jpg'} />
          
          <h5>Homes</h5>
        </div>
      </section>
    )
  }
}

const msp = state => ({
  users: state.entities.users
})

export default connect(msp)(Home);
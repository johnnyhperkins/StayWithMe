import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeLoggedOut from './home_logged_out';
// import NavBar from '../nav/navbar';


class Home extends Component {

  render() {
    const { loggedIn } = this.props;
    return (
      <>
      {!loggedIn && <HomeLoggedOut />}
      <section className={loggedIn ? "content-container" : "content-container content-container--logged-out"}>
        <h3>Explore StayWithMe</h3>
        <div className="flex-container--no-justify explore-wrapper">
          <div className="explore-container flex-container--no-justify">
            <img src='https://s3.us-east-2.amazonaws.com/stay-with-me/homes-thumb.jpg' />
            
            <h4>Homes</h4>
          </div>
        </div>
      </section>
    </>
    )
  }
}

const msp = state => ({
  loggedIn: Boolean(state.session.id)
})

export default connect(msp)(Home);
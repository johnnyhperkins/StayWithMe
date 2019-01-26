import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ListingsIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Listings Index</h1>
      </div>
    )
  }
}

const msp = state => ({

})

const mdp = dispatch => ({
  
})

export default connect(msp,mdp)(ListingsIndex);

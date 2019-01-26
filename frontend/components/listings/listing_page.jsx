import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchListing } from '../../actions/listings'

class Listing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <h1>Listing Show Page</h1>
      </div>
    )
  }
}

const msp = (state, props) => ({
  listing: state.entities.listings[props.match.params.id]
})

const mdp = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id))
})

export default withRouter(connect(msp,mdp)(Listing));

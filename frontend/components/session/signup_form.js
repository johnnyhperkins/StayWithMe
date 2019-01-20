import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { connect } from 'react-redux';

import { signup, receiveSessionErrors } from '../../actions/sessions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'', 
      email: '', 
      password: '' 
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signup(this.state).then( () => this.props.history.push('/'));
  }

  componentDidMount() {
    this.props.receiveSessionErrors({});
  }

  render() {
    const { username, password } = this.state;
    const { errors } = this.props;
    return (
      <form onSubmit={this.handleSubmit} autoComplete="new-password">
        { !isEmpty(errors) && (
            <>
            <ul className="session-errors">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            </>
            ) 
        }
        <h1>Sign Up</h1>
        <label>Username
          <input 
            autoComplete="off"
            type="text" 
            value={username} 
            onChange={e => this.setState({username: e.target.value})} 
            />
        </label>
        
        <label>Email
          <input 
            autoComplete="off"
            type="text" 
            value={this.state.email} 
            onChange={e => this.setState({email: e.target.value})}
            />
        </label> 

        <label>Password
          <input 
            autoComplete="off"
            type="password" 
            value={password} 
            onChange={e => this.setState({password: e.target.value})}   
            />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

const msp = state => ({
    errors: state.errors.session
})

const mdp = (dispatch) => ({
  signup: user => dispatch(signup(user)),
  receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
})

export default connect(msp,mdp)(SignUpForm);
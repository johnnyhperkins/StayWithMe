import React, { Component } from 'react';
import { userExists } from '../../util/session_api';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errors: ''
    }
  }

  handleSubmit = (e) => {
    const { updateProfile } = this.props;
    e.preventDefault();
    updateProfile(this.state.user).then( () => {
      //TODO Update this to profile page
      this.props.history.push('/')
    });
  }

  handleInput = (e) => {
    return () => this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  checkExists = () => {
    const {formType } = this.props;
    if(formType == "Log In") return;

    const { userExists, receiveSessionErrors} = this.props;
    const { username, email } = this.state.user;
    return userExists({username, email}).then(res => {
      let updateErrors = ["Sorry, that username is already taken", "Sorry, that email is already taken"]
      if(!res.username) {
        updateErrors = updateErrors.filter(e => e !== "Sorry, that username is already taken")
      } 
      if(!res.email) {
        updateErrors = updateErrors.filter(e => e !== "Sorry, that email is already taken")
      }
      receiveSessionErrors(updateErrors);
    })
  }

  render() {
    const { username, password } = this.state.user;
    const { errors } = this.props;
    return (
      <>
      <form onSubmit={this.handleSubmit} >
        <input 
          className="text-input"
          autoComplete="off"
          type="text" 
          placeholder="Email"
          name="email"
          value={this.state.user.email} 
          onChange={this.handleInput} 
          onBlur={this.checkExists}
          />
        <input 
          className="text-input"
          autoComplete="off"
          type="text" 
          name="username"
          placeholder="Username"
          value={username} 
          onChange={this.handleInput} 
          onBlur={this.checkExists}
          />
        <input 
          className="text-input"
          autoComplete="off"
          type="password" 
          value={password} 
          placeholder="Password"
          onChange={this.handleInput}
          />
          { !isEmpty(errors) && (
            <>
            <ul className="session-errors">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            </>
            ) 
        }
        <input 
          type="submit" 
          className="button--submit"
          value="Update Profile"
        />
      </form>
      </>
    )
  }
}

const mdp = (dispatch) => {
    return {
    // action: user => dispatch(signup(user)),
    // receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    // checkUsernameExists: (username) => dispatch(checkUsernameExists(username))  
  }
}

const msp = (state, props) => {
  
  return {
      // errors: state.errors.session,
      user: state.entities.users[props.match.params.id],
      userExists
  }
}

export default connect(msp,mdp)(EditProfileForm)
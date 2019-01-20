import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errors: ''
    }
  }

  handleSubmit = (e) => {
    const {closeModal, action} = this.props;
    e.preventDefault();
    action(this.state).then( () => {
      closeModal();
    });
  }

  componentDidMount() {
    this.props.receiveSessionErrors([]);
  }

  checkExists = () => {
    if(formType == "Log In") return;
    const { userExists, formType, receiveSessionErrors} = this.props;
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
    const { errors, formType } = this.props;
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
        <h1>{formType}</h1>
        <label>Username
          <input 
            autoComplete="off"
            type="text" 
            name="username"
            value={username} 
            onChange={e => this.setState({
              user: {
                ...this.state.user,
                username: e.target.value
              }
            })} 
            onBlur={this.checkExists}
            />
        </label>
        { formType === "Sign Up" &&
        <label>Email
          <input 
            autoComplete="off"
            type="text" 
            name="email"
            value={this.state.user.email} 
            onChange={e => this.setState({
              user: {
                ...this.state.user,
                email: e.target.value
              }
            })} 
            onBlur={this.checkExists}
            />
        </label> 
        }
        <label>Password
          <input 
            autoComplete="off"
            type="password" 
            value={password} 
            onChange={e => this.setState({
              user: {
                ...this.state.user,
                password: e.target.value
              }
            })} 
            />
        </label>
        <input type="submit" value={formType} />
      </form>
    )
  }
}

export default SessionForm
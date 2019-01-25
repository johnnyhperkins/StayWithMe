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
    action(this.state.user).then( () => {
      closeModal();
    });
  }

  componentDidMount() {
    this.props.receiveSessionErrors([]);
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
  facebookAuth = () => {
    // console.log('Facebook auth');
  }

  googleAuth = () => {
    // console.log('Google Auth');
  }

  demoLogin = () => {
    const {closeModal, action} = this.props;
    return action({username:"Demo Account", password:"12312312"}).then( () => {
      closeModal();
    });
  }

  render() {
    const { username, password } = this.state.user;
    const { errors, formType } = this.props;
    return (
      <>
      <p className="center">{formType} with <button onClick={this.facebookAuth} className="button--link">Facebook</button> or <button onClick={this.googleAuth} 
        className="button--link">Google</button>
      </p>
      
      <p className="center hr-with-text">Or</p>
      
      <form onSubmit={this.handleSubmit} autoComplete="new-password">
        
        { formType === "Sign Up" &&
        
        <input 
          className="text-input"
          autoComplete="off"
          type="text" 
          placeholder="Email"
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
        }
        <input 
          className="text-input"
          autoComplete="off"
          type="text" 
          name="username"
          placeholder="Username"
          value={username} 
          onChange={e => this.setState({
            user: {
              ...this.state.user,
              username: e.target.value
            }
          })} 
          onBlur={this.checkExists}
          />
        <input 
          className="text-input"
          autoComplete="off"
          type="password" 
          value={password} 
          placeholder="Password"
          onChange={e => this.setState({
            user: {
              ...this.state.user,
              password: e.target.value
            }
          })} 
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
        value={formType} 
          className="button--submit"
        />
      </form>
      <div className="modal--footer">
        {formType === "Log In" && 
          <button className="button--submit background--teal-blue" onClick={this.demoLogin}>Use Demo Account</button>}
        {formType === "Sign Up" ? 
          <p>Already have a StayWithMe account? <button className="button--link" 
                                                        onClick={() => this.props.switch('Log In')}>Log In</button>
          </p> 
          : 
          <button className="button--link" onClick={() => this.props.switch('Sign Up')}>Create new account</button>
        }
      </div>
      </>
    )
  }
}

export default SessionForm
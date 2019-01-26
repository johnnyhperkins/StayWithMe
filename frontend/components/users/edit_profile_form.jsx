import React, { Component } from 'react';
import { userExists } from '../../util/session_api';
import { receiveSessionErrors } from '../../actions/sessions';
import { receiveMessages } from '../../actions/ui';
import { updateUser } from '../../actions/users';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errors: ''
    }
    
  }

  componentDidMount() {
    this.props.receiveSessionErrors([]);
  }

  handleSubmit = (e) => {
    const { updateUser, receiveMessages } = this.props;
    updateUser(this.state.user).then(res => {
      // debugger;
      if(res) {
        receiveMessages(["Succesfully Updated"])
      }
    }, (e) => {
      console.log(e);
    });
  }

  handleInput = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  checkExists = () => {
    const { receiveSessionErrors } = this.props;
    const { username, email } = this.state.user;
    if(username === this.props.user.username || email === this.props.user.email) return
    return userExists({username, email}).then(res => {
      console.log(res);
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
    const { username, email, password } = this.state.user;
    const { errors, messages } = this.props;
    console.log(errors, messages);
    return (
      <>
      <section className="edit-profile-container">
        <div className="edit-profile-container__header">
          <p>Required</p>
        </div>
        <div className="form-wrapper">
        {!isEmpty(messages) && messages.map((m, idx) => <p key={idx} >{m}</p>)}

          <div className="profile-form-row">
            <label>Email</label>
              <input 
                className="text-input--profile text-input"
                autoComplete="off"
                type="text" 
                placeholder="Email"
                name="email"
                value={email} 
                onChange={this.handleInput} 
                onBlur={this.checkExists}
                />
          </div>
          <div className="profile-form-row">
            <label>Username</label>
              <input 
                className="text-input--profile text-input"
                autoComplete="off"
                type="text" 
                name="username"
                placeholder="Username"
                value={username} 
                onChange={this.handleInput}  
                onBlur={this.checkExists}
                />
          </div>
          <div className="profile-form-row">
            <label>Change Your Password</label>
              <input 
                className="text-input--profile text-input"
                autoComplete="off"
                type="password" 
                value={password} 
                placeholder="Password"
                onChange={this.handleInput}
                />
          </div>
          { !isEmpty(errors) && (
                  <>
                  <ul className="session-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  </>
                  ) 
              }
        </div>
        <section>
          <button onClick={this.handleSubmit} className="button--submit inline-block" >Save</button>
        </section>  
      </section>
      
      </>
    )
  }
}

const mdp = (dispatch) => {
    return {
    updateUser: user => dispatch(updateUser(user)),
    receiveSessionErrors: errors => dispatch(receiveSessionErrors(errors)),
    receiveMessages: messages => dispatch(receiveMessages(messages))
  }
}

const msp = (state, props) => {
  return {
      errors: state.errors.session,
      user: state.entities.users[props.userId],
      messages: state.ui.messages
  }
}

export default connect(msp,mdp)(EditProfileForm)
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user
  }

  handleSubmit = (e) => {
    const {closeModal, action} = this.props;
    e.preventDefault();
    action(this.state).then( () => {
      closeModal();
    });
  }

  componentDidMount() {
    this.props.receiveSessionErrors({});
  }

  render() {
    const { username, password } = this.state;
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
            value={username} 
            onChange={e => this.setState({username: e.target.value})} 
            />
        </label>
        { formType === "Sign Up" &&
        <label>Email
          <input 
            autoComplete="off"
            type="text" 
            value={this.state.email} 
            onChange={e => this.setState({email: e.target.value})}
            />
        </label> 
        }
        <label>Password
          <input 
            autoComplete="off"
            type="password" 
            value={password} 
            onChange={e => this.setState({password: e.target.value})}   
            />
        </label>
        <input type="submit" value={formType} />
      </form>
    )
  }
}

export default SessionForm
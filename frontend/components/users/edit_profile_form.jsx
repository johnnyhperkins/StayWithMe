


// TO DO: Figure out how to change passwords!
// update the api util to allow to send picutres
// fade out errors




import React, { Component } from 'react';
import { userExists } from '../../util/session_api';
import { receiveSessionErrors } from '../../actions/sessions';
import { receiveMessages } from '../../actions/ui';
import { updateUser } from '../../actions/users';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import objectToFormData from 'object-to-formdata';
import {BlankUserProfile} from '../../static_assets/user-solid';

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      errors: '',
      imageUrl: this.props.user.photoUrl || '',
      imageFile: '',
      password: ''
    }
    
  }

  componentDidMount() {
    const { errors, messages, receiveMessages, receiveSessionErrors } = this.props;
    if(errors.length || messages.length) {
      receiveSessionErrors([]);
      receiveMessages([]);
    }
  }

  clearErrorsAndMessages = () => {
        window.setTimeout(() => {
          this.props.receiveSessionErrors([]);
          this.props.receiveMessages([]);
        }, 5000);   
    }

  // componentDidUpdate(prevProps) {
  //   console.log('prevProps:', prevProps);
  //   console.log('currentProps:', this.props);
  //   debugger
  //   if(this.props.errors.length || this.props.messages.length) {
  //     debugger
  //     window.setTimeout(() => {
  //         this.props.receiveSessionErrors([]);
  //         this.props.receiveMessages([]);
  //       }, 5000);   
  //   }
  // }

  componentWillUnmount() {
      receiveSessionErrors([]);
      receiveMessages([]);
  }

  handleSubmit = () => {
    const { email, username, id } = this.state.user;
    const { updateUser, receiveMessages } = this.props;
    const updatedUserObject = {
      id,
      email,
      username,
       
    }
    
    updatedUserObject.password = this.state.password.length ? this.state.password : undefined;
    debugger

    const formData = objectToFormData(updatedUserObject, null,null, 'user');
    if(this.state.imageFile) {
      formData.append('user[photo]', this.state.imageFile);
    }
    
    return updateUser(formData).then(() => {
      this.setState({password: ''})
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

  handlePhotoAttachement = (e) => {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file});
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
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
    const { imageUrl } = this.state;
    const { errors, messages } = this.props;
    console.log(errors, messages);
    return (
      <>
      <section className="grid--75 margin-left24">
        <div className="grid--75__header flex-container">
          <p>Required</p>
          {!isEmpty(messages) && messages.map((m, idx) => <h6 className="text--green message" key={idx} >{m}</h6>)}
        </div>
        <div className="form-wrapper">

        
        
        <div className="profile-thumb-wrapper">
        { imageUrl ? 
          ( <>
              <div className="profile-thumb" style={{backgroundImage: `url(${imageUrl})`}} />
            </>
          ) :
            <BlankUserProfile />
          }
            <input 
              type="file"
              className="text-input--profile text-input"
              name="thumb_img"
              onChange={this.handlePhotoAttachement}
            />
            <label>edit</label>
          </div>
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
                onChange={(e) => this.setState({password: e.target.value})}
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
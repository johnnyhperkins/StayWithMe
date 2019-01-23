import React, {Component} from 'react';
import BlankUser from '../../static_assets/user-solid'
import ProfileMenu from './profile_menu';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    }
  }
  toggleMenu = () => this.setState({menuOpen: !this.state.menuOpen})

  render() {
    const {logout, loggedIn, openModal, session } = this.props
    const btnClasses = loggedIn ? 'button--navlink' : 'text--white button--navlink';
    console.log(loggedIn);
    return (
      <>
        <button className={btnClasses}>Become a Host</button>
          { loggedIn ? 
            
            <div className="profile-wrapper" onClick={this.toggleMenu}>
  
              {session.profile_thumb == 'default' ? <BlankUser /> : <img src={session.profile_thumb} className="profile-thumb" />}
  
              {this.state.menuOpen && <ProfileMenu session={session} logout={logout} />}
              
            </div>
 
              :
            <>
  
            <button 
              className={btnClasses} 
              onClick={() => openModal('signUpOpen')} >
              Sign Up
            </button>
            <button 
              className={btnClasses} 
              onClick={() => openModal('loginOpen')} >
              Log In
            </button>
  
            </> 
            
            
            }
      </>
    )
  } 
}

export default Menu
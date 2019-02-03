import React, {Component} from 'react';
import { BlankUser } from '../../static_assets/user-solid'
import ProfileMenu from './profile_menu';
import { NavLink } from 'react-router-dom';
import isUndefined from 'lodash/isUndefined';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideDropDown);  
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideDropDown);
  }

  handleClickOutsideDropDown = (event) => {
    if (this.MenuDropDownRef && !this.MenuDropDownRef.contains(event.target)) {
      this.setState({menuOpen: false})
    }
  }

  setMenuDropDownRef = (node) => {
    this.MenuDropDownRef = node;
  }

  toggleMenu = () => this.setState({menuOpen: !this.state.menuOpen})

  render() {
    const {logout, loggedIn, openModal, session } = this.props
    return (
      <>
          { loggedIn ?
            <>
            <NavLink to="/listings/new" className="button--navlink">
              Add Listing
            </NavLink>
            <div className="profile-wrapper" onClick={this.toggleMenu} ref={this.setMenuDropDownRef}>
              { session.photoUrl ? 
                <div className="button--navlink button--navlink__user-thumb">
                  <div className="profile-thumb" style={{backgroundImage: `url(${session.photoUrl})`}} /> 
                </div>
                : 
                <BlankUser /> 
              }
              {this.state.menuOpen && <ProfileMenu session={session} logout={logout} />}
            </div>
            </>
              :
            <>
            <button 
              className='button--navlink'
              onClick={() => openModal('signup')} >
              Sign Up
            </button>
            <button 
              className='button--navlink'
              onClick={() => openModal('login')} >
              Log In
            </button>
            </> 
          }
      </>
    )
  } 
}

export default Menu
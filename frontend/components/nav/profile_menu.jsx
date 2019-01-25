import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileMenu = ({logout, session}) => {
  return (
    <ul className="drop-down-wrapper">
      <li><NavLink to={`/users/${session.id}`} >Welcome {session.username}</NavLink></li>
      <li><NavLink to={`/users/${session.id}/edit`} >Edit Profile</NavLink></li>
      <li onClick={logout}>Log Out</li>
    </ul>
  )
}

export default ProfileMenu
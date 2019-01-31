import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileMenu = ({logout, session}) => {
  return (
    <ul className="drop-down-wrapper">
      <NavLink to={`/users/${session.id}`}><li>Welcome {session.username}</li></NavLink>
      <NavLink to={`/users/${session.id}/edit`} ><li>Edit Profile</li></NavLink>
      <li onClick={logout}>Log Out</li>
    </ul>
  )
}

export default ProfileMenu
import React from 'react';

const ProfileMenu = ({logout, session}) => {
  return (
    <ul className="drop-down-wrapper">
      <li>Welcome {session.username}</li>
      <li onClick={logout}>Log Out</li>
      <li>Edit Profile</li>
    </ul>
  )
}

export default ProfileMenu
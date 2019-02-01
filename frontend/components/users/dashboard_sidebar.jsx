import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({session, path}) => {
    const userId = session.id;
    return (
      <aside className="grid--25">
      {(path == `/users/${session.id}`) ? (
        <div className="profile-image" style={{backgroundImage: `url(${session.photoUrl})`}}></div>
      ) :
        <ul>
          <li><Link to={`/users/${userId}/edit`}>Edit Profile</Link></li>
          <li><Link to={`/users/${userId}/reviews`}>Reviews</Link></li>
          <li><Link to={`/users/${userId}/listings`}>Listings</Link></li>
          <li><Link to={`/users/${userId}`} className="button button--outlined center">View Profile</Link></li>
        </ul>
      }
      </aside>
    );
};

export default DashboardSidebar;
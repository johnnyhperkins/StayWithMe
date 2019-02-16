import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({user, path}) => {
    return (
      <aside className="grid--25">
      {(path == `/users/${user.id}`) ? (
        <div className="profile-image" style={{backgroundImage: `url(${user.photoUrl})`}}></div>
      ) :
        <ul>
          <li><Link to={`/users/${user.id}/edit`}>Edit Profile</Link></li>
          <li><Link to={`/users/${user.id}/reviews`}>Reviews</Link></li>
          <li><Link to={`/users/${user.id}/listings`}>Listings</Link></li>
          <li><Link to={`/users/${user.id}/bookings`}>Bookings</Link></li>
          <li><Link to={`/users/${user.id}`} className="button button--outlined center">View Profile</Link></li>
        </ul>
      }
      </aside>
    );
};

export default DashboardSidebar;
import React from 'react';
import './style/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">My Logo</div>
      <div className="navbar-profile">
        <img src="https://via.placeholder.com/40" alt="User Profile" className="navbar-profile-pic" />
      </div>
    </nav>
  );
}

export default Navbar;

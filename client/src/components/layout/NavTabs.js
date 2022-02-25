import React from 'react';
import logo from '../images/TFLogo.svg';

import '../assets/css/Nav.css';

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <ul className="nav justify-content-center nav-tabs">
      <li className="nav-item">
      <a className="navbar-brand" href="/#">
      <img src={logo} alt="Tandem Fandom"/>
    </a>
      </li>
      <li className="nav-item">
        <a
          href="#main"
          onClick={() => handlePageChange('Main')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home or Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === 'Main' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#profile"
          onClick={() => handlePageChange('Profile')}
          // Check to see if the currentPage is `Profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
        >
          Profile
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#matches"
          onClick={() => handlePageChange('Matches')}
          // Check to see if the currentPage is `Matches`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Matches' ? 'nav-link active' : 'nav-link'}
        >
          Matches
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#logout"
          onClick={() => handlePageChange('Logout')}
          // Check to see if the currentPage is `Matches`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Logout' ? 'nav-link active' : 'nav-link'}
        >
          Logout
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
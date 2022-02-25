import React from 'react';

import { Link } from 'react-router-dom';
import '../assets/Nav.css';
import logo from '../images/TFLogo.svg';

function NavTabs() {
  return (
    <ul className="nav justify-content-center nav-tabs">
    <li className="nav-item">
    <a className="navbar-brand" href="/#">
    <img src={logo} alt="Tandem Fandom"/>
  </a>
    </li>

    <li className="nav-item">
    <Link className="navbar-brand" to="/Profile">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Profile
        </h1>
      </Link>
    </li>

    <li className="nav-item">
    <Link className="navbar-brand" to="/Matches">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Matches
        </h1>
      </Link>
    </li>

    <li className="nav-item">
    <Link className="navbar-brand" to="/Login">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Login
        </h1>
      </Link>
    </li>

    <li className="nav-item">
    <Link className="navbar-brand" to="/Signup">
        <h1 className="m-0" style={{ fontSize: '3rem' }}>
          Signup
        </h1>
      </Link>
    </li>

    </ul>
  );
};

export default NavTabs;
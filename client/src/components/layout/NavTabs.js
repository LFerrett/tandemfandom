import React from "react";

import { Link } from "react-router-dom";
import "../assets/Nav.css";
import logo from "../images/TFLogo.svg";

import auth from "../../utils/auth";

function NavTabs() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top">
      <a className="navbar-brand" href="/">
        <img src={logo} width="125" alt="Tandem Fandom" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {auth.loggedIn() && (
            <>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/Profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/Connections">
                  Connections
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/Matches">
                  Find Matches
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/" onClick={auth.logout}>Logout</Link>
              </li>
            </>
          )}
          {!auth.loggedIn() && (
            <>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/Login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/Signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavTabs;

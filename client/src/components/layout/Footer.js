import React from "react";
import "../assets/Footer.css";
import { FontAwesomeIcon } from 'react'

function Footer() {
  return (
    <div className="footer">
      <a href="http://www.github.com/LFerrett/tandemfandom">&copy; Copyright TandemFandom 2022</a>
      <br></br>
      <div className="icons">
        <a href="http://www.twitter.com"><i className="fa-brands fa-2x fa-twitter"></i></a>
        <a href="http://www.facebook.com"><i className="fa-brands fa-2x fa-facebook"></i></a>
        <a href="http://www.instagram.com"><i className="fa-brands fa-2x fa-instagram"></i></a>
        <a href="http://www.github.com"><i className="fa-brands fa-2x fa-github"></i></a>
      </div>
    </div>
  );
}

export default Footer;
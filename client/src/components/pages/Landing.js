import React from 'react';
import './../assets/Landing.css'
import Logo from './../images/TFLogo.svg';
import LandingCard from '../layout/LandingCard';

export default function Landing() {
  return (
    <div className='container'>
      <img src={Logo} alt="Tandem Fandom logo" height="200" align=""></img>
      <h1></h1>
      <p>
      Tandem Fandom is THE people finding app for the Who's Whovian of your favorite fandoms!
      </p>
      <p>LOGIN</p>
      <p>SIGNUP</p>
    </div>
  );
}

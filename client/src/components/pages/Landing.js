import React from "react";
import "./../assets/Landing.css";
import SmoothScroll from "smooth-scroll";
import Carousel from "./../layout/Carousel";
import Logo from "./../images/TFLogo.svg"

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default function Landing() {
  return (
    <>
      <header>
        <div>
        <div className='row'>
                <div className='col-md-12 intro-text'>
                <img className='img-fluid' src={Logo} width="65%" alt="Tandem Fandom" />
                <p className='text-secondary'>Tandem Fandom is THE people finding app for the Who's Whovian of your favorite fandoms!</p>
                 <a
                    href='/Signup'
                    className='btn btn-custom btn-lg'
                  >
                    Sign Up
                  </a>{' '}
                  <a
                    href='/Login'
                    className='btn btn-custom btn-lg'
                  >
                    Login
                  </a>{' '}
                  
                </div>
              </div>
        </div>
      </header>
          <div id='features' className='text-center'>
          <div className='container'>
            {/* <div className='col-md-10 col-md-offset-1 section-title'> */}<div className='section-title'>
              
            </div>
            <div className=''>
            <h2>Features</h2>
              <Carousel/>
            </div>
          </div>
        </div>
        </>
    )
}

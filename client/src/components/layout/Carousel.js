import { Carousel } from 'react-bootstrap';
import React from 'react';
import '../assets/Carousel.css';

function CarouselComponent() {
    return (
  <><Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./../images/Slider1.png")}
            alt="First slide" />
          <Carousel.Caption>
            <h3>Convention Retention</h3>
            <p>Meet your matches at local conventions</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./../images/Slider2.png")}
            alt="Second slide" />
          <Carousel.Caption>
            <h3>LLLCoolJ</h3>
            <p>Larping Ladies Love Cool Jedi</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./../images/Slider3.png")}
            alt="Third slide" />
          <Carousel.Caption>
            <h3>Stormtrooper Bloopers</h3>
            <p>"I hit him", said no Stormtrooper ever</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./../images/Slider4.png")}
            alt="Fourth slide" />
          <Carousel.Caption>
            <h3>Maintain a safe distance</h3>
            <p>Socially distant swordfighting</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./../images/Slider5.png")}
            alt="Fifth slide" />
          <Carousel.Caption>
            <h3>Difference between war and peace</h3>
            <p>The couple that fights together, stays together</p>
          </Carousel.Caption>
        </Carousel.Item>

        </Carousel>
        </>
    )
};
export default CarouselComponent;

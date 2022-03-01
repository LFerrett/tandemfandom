import { Carousel } from 'react-bootstrap';
import React from 'react';
import '../assets/Carousel.css';

function CarouselComponent() {
    return (
  <><Carousel fade controls={false}>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={require("./../images/Slider1.png")}
            alt="Comic Con aerial view" />
          <Carousel.Caption>
            <h3>Convention Retention</h3>
            <p>Meet your matches at local conventions</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={require("./../images/Slider2.png")}
            alt="Cosplaying women" />
          <Carousel.Caption>
            <h3>LLLCoolJ</h3>
            <p>Larping Ladies Love Cool Jedi</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={require("./../images/Slider3.png")}
            alt="Two stormtroopers playing" />
          <Carousel.Caption>
            <h3>Stormtrooper Bloopers</h3>
            <p>"I hit him", said no Stormtrooper ever</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={require("./../images/Slider4.png")}
            alt="MCU cosplay in the woods" />
          <Carousel.Caption>
            <h3>Maintain a safe distance</h3>
            <p>Add matches for socially distant swordfighting</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={require("./../images/Slider5.png")}
            alt="Two couples in cosplay on the convention floor" />
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

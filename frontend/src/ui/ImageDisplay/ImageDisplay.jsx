import React from 'react';
import { Container, Row, Col } from 'reactstrap'; // Ensure you import from 'reactstrap'
import img01 from './../../images/tour-img01.jpg';
import img02 from './../../images/Notre-Dame.png';
import img03 from './../../images/hero-img02.jpg';

import './image-display.css'
const ImageDisplay = () => (
  <Container>
    <Row>
      <Col lg="4">
        <div className="hero__img-box mt-3">
          <img src={img01} alt="" />
        </div>
      </Col>
      <Col lg="4">
        <div className="hero__img-box mt-5">
          <img src={img03} alt="" />
        </div>
      </Col>
      <Col lg="4">
        <div className="hero__img-box mt-6">
          <img src={img02} alt="" />
        </div>
      </Col>
    </Row>
  </Container>
);

export default ImageDisplay;

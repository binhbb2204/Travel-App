import React from 'react';
import { Container, Row, Col } from 'reactstrap'; // Ensure you import from 'reactstrap'
import img01 from './../../img/tour-img01.jpg';
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
          <img src={img01} alt="" />
        </div>
      </Col>
      <Col lg="4">
        <div className="hero__img-box mt-6">
          <img src={img01} alt="" />
        </div>
      </Col>
    </Row>
  </Container>
);

export default ImageDisplay;

import React, {useState} from 'react';

import {Container, Row, Col, Form, FormGroup, Button} from "reactstrap";
import {Link} from 'react-router-dom'
import '../styles/login.css'

import loginImg from '../images/image.png'
import userIcon from '../images/trueuser.png'

const Login = () => {

  const [credentials, setCredentials] = useState({
    email:undefined,
    password:undefined
  });

  const handleChange = e =>{
    setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = e =>{
    e.preventDefault();
  }

  return <section>
    <Container className='Container__test'>
      <Row>
        <Col lg='8' className="m-auto">
          <div className="login__containter d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form>
                <FormGroup>
                  <input type="email" placeholder="email" required id="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                </FormGroup>
                <Button className="btn secondary__btn auth__btn"
                type="submit">Login</Button>
              </Form>
              <p>Don't have an account? <Link to='register'>Create</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
};

export default Login;
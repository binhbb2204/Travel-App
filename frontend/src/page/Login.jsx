import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';

import {Container, Row, Col, Form, FormGroup, Button} from "reactstrap";
import {Link} from 'react-router-dom';
import '../styles/login.css';

import loginImg from '../images/image.png';
import userIcon from '../images/trueuser.png';

const Login = () => {

  const [credentials, setCredentials] = useState({
    email:undefined,
    password:undefined
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    setIsVisible(true);
  }, []);

  const handleChange = e =>{
    setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = e =>{
    e.preventDefault(); 
  }

  return <section className={`login__background ${isVisible ? 'active' : ''}`}>
    <Container>
      <Row>
        <Col lg='8' className="m-auto">
          <div className={`login__container ${isVisible ? 'active' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="test"
            >
            <div className="login__form">
              <div className='login__title'>
                <h2>Welcome to </h2>
                <h1 className='tab__element'>TAB
                  {/* <motion.div
                    className="TAB__element"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />   */}
                </h1>
              </div>

              <Form>
                <section className="login__input">
                  <FormGroup className='email__box'>
                    <i class='bx bxs-user'></i>
                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup className='password__box'>
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                  </FormGroup>
                </section>
                <section className="remember-forgot__box">
                <div className="remember-me">
                  <input type="checkbox" name="remember-me" id="remember-me" />
                  <label for="remember-me">
                    <h5>Remember me</h5>
                  </label>
                </div>
                <div className="forgot-password">
                <Link to='/register'>Forgot password?</Link>
                </div>
              </section>
                <Button className="login__btn"
                type="submit">Login</Button>
              </Form>
              <p className="register__link">Don't have an account? <Link to='/register' className="create__link">Create</Link></p>
            </div>
            </motion.div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
};

export default Login;
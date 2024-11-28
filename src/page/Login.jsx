import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

// import loginImg from '../images/image.png';
// import userIcon from '../images/trueuser.png';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', credentials);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <section className={`login__background ${isVisible ? 'active' : ''}`}>
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
                    <h1 className='tab__element'>TAB</h1>
                  </div>
                  {/* Display error message */}
                  {error && <Alert color="danger">{error}</Alert>}
                  {/* Display success message */}
                  {success && <Alert color="success">{success}</Alert>}

                  <Form onSubmit={handleClick}>
                    <section className="login__input">
                      <FormGroup className='email__box'>
                        <i className='bx bxs-user'></i>
                        <input type="email"
                          placeholder="Email"
                          // autoComplete="off"  
                          // This attribute prevents the browser from suggesting previously entered values for the input fields
                          required id="email"
                          onChange={handleChange} />
                      </FormGroup>

                      <FormGroup className='password__box'>
                        <i className='bx bxs-lock-alt'></i>
                        <div className="input-container">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            // autoComplete="off" 
                            // This attribute prevents the browser from suggesting previously entered values for the input fields
                            required
                            id="password"
                            onChange={handleChange}
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormGroup>
                    </section>

                    <section className="remember-forgot__box">
                      <div className="remember-me">
                        <input type="checkbox" name="remember-me" id="remember-me" />
                        <label htmlFor="remember-me">
                          <h5>Remember me</h5>
                        </label>
                      </div>
                      <div className="forgot-password">
                        <Link to='/register'>Forgot password?</Link>
                      </div>
                    </section>
                    <Button className="login__btn" type="submit">Login</Button>
                  </Form>
                  <p className="register__link">Don't have an account? <Link to='/register' className="create__link">Create</Link></p>
                </div>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
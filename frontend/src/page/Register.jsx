import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/register.css';

const Register = () => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    // Add more genders here C:
  ];

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <motion.section
      className='register__background'
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Container>
        <Row>
          <Col lg='8' className="m-auto">
            <motion.div
              className={`register__container ${isVisible ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="register__form">
                <div className='register__title'>
                  <h1>Create an Account with</h1>
                  <h2 style={{ marginLeft: '10px' }}>TAB</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <section className="register__input">
                    <FormGroup className='name__box'>
                      <i className='bx bxs-user'></i>
                      <input type="text" placeholder="Name" required id="name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='gender__box'>
                      <i className='bx bx-male-female'></i>
                      <select
                        id="gender"
                        onChange={handleChange}
                        required
                        value={formData.gender}
                      >
                        <option value="">Select Gender</option>
                        {genderOptions.map(gender => (
                          <option key={gender.value} value={gender.value}>
                            {gender.label}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                    <FormGroup className='email__box'>
                      <i className='bx bxs-envelope'></i>
                      <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='phone__box'>
                      <i className='bx bxs-phone'></i>
                      <input type="tel" placeholder="Phone Number" required id="phone" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='password__box'>
                      <i className='bx bxs-lock-alt'></i>
                      <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='confirm-password__box'>
                      <i className='bx bxs-lock-alt'></i>
                      <input type="password" placeholder="Confirm Password" required id="confirmPassword" onChange={handleChange} />
                    </FormGroup>
                  </section>
                  <Button className="register__btn" type="submit">Register</Button>
                </Form>

                <p className="login__link">
                  Already have an account?
                  <Link to='/login' className="create__link" onClick={() => navigate('/login')}>
                    Login
                  </Link>
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Register;
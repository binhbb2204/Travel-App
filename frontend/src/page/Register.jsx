import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/register.css';
import { useUsers } from "./admin/UsersContext";
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {

  const { addUser } = useUsers();

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    setError(null);
    setSuccess(null);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', formData);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay (ms)
      setFormData({
        name: '',
        gender: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
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
                  <h1>Create an Account</h1>
                </div>
                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
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
                      <div className="input-container">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          required
                          id="password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormGroup>

                    <FormGroup className='confirm-password__box'>
                      <i className='bx bxs-lock-alt'></i>
                      <div className="input-container">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          required
                          id="confirmPassword"
                          onChange={handleChange}
                          value={formData.confirmPassword}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
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
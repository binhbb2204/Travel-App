import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration data:', formData);
    };

    return (
        <section className='register__background min-h-screen overflow-hidden'>
            <Container>
                <Row>
                    <Col lg='8' className="m-auto">
                        <div className="register__container">
                            <div className="register__form">
                                <div className='register__title'>
                                    <h2>Create an Account</h2>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <section className="register__input">
                                        <FormGroup className='name__box'>
                                            <i className='bx bxs-user'></i>
                                            <input type="text" placeholder="Name" required id="name" onChange={handleChange} />
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
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;
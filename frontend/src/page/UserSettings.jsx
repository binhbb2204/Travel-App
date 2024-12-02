import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user information
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    phone: response.data.data.phone,
                });
            } catch (error) {
                console.error('Error fetching user information:', error);
                setError('Failed to fetch user information.');
            }
        };

        fetchUserInfo();
    }, [token, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put('http://localhost:8000/api/v1/users/', userInfo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess(response.data.message);
        } catch (error) {
            console.error('Error updating user information:', error);
            setError('Failed to update user information.');
        }
    };

    return (
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <h2>User Settings</h2>
                    {error && <Alert color="danger">{error}</Alert>}
                    {success && <Alert color="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" id="name" value={userInfo.name} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" value={userInfo.email} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input type="text" id="phone" value={userInfo.phone} onChange={handleChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" value={userInfo.password} onChange={handleChange} />
                            <small className="text-muted">Leave blank to keep current password.</small>
                        </FormGroup>

                        <Button type="submit" color="primary">Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UserSettings;
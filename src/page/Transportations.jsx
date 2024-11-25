import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, FormGroup, Input, Button, Spinner } from "reactstrap";
import { FaPlane, FaSearch } from 'react-icons/fa';
import {Plane, Search} from 'lucide-react'
import '../styles/transportations.css';

const Transportations = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [flightResults, setFlightResults] = useState([]); // Initialize as empty array
    const [error, setError] = useState(null);

    const searchFlights = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your API key
                    'X-RapidAPI-Host': 'airhob-api.p.rapidapi.com'
                },
                body: JSON.stringify({
                    origin,
                    destination,
                    date
                })
            };

            const response = await fetch('https://flight-bookings.p.rapidapi.com/search', options);
            const data = await response.json();
            console.log(data); // Log the data to see the structure

            // Assuming data.flights is the correct path for flight results
            setFlightResults(data.flights || []); // Set to an empty array if no flights
        } catch (err) {
            setError('Failed to fetch flight data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className='trans__container'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="trans__content"
            >
                <h1 className="trans__header">
                    <Plane className="header-icon" /> Flight Search
                </h1>

                <div className="search-section">
                    <Form>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="From (Airport Code)"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                                        maxLength={3}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="To (Airport Code)"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value.toUpperCase())}
                                        maxLength={3}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Button 
                                    color="primary" 
                                    block 
                                    onClick={searchFlights}
                                    disabled={isLoading || !origin || !destination || !date}
                                >
                                    {isLoading ? <Spinner size="sm" /> : <><Search /> Search Flights</>}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {Array.isArray(flightResults) && flightResults.length > 0 ? (
                    <motion.div 
                        className="results-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Row>
                            {flightResults.map((flight, index) => (
                                <Col md={6} key={index}>
                                    <div className="flight-card">
                                        <div className="flight-details">
                                            <h3>{flight.airline}</h3>
                                            <div className="route">
                                                {origin} → {destination}
                                            </div>
                                            <div className="time">
                                                Departure: {flight.departureTime}
                                            </div>
                                            <div className="price">
                                                ${flight.price}
                                            </div>
                                        </div>
                                        <Button color="success" size="sm">
                                            Book Now
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                ) : (
                    <div>No flights found.</div>
                )}
            </motion.div>
        </Container>
    );
};

export default Transportations;
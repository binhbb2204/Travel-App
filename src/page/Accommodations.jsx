import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import AccomodationSearchBox from '../ui/SearchBar/AccommodationSearchBox';
import '../styles/accomodations.css';

const Accommodations = () => {
    return (
    <Container className='acco__container'>
        <section className='search__container'>
            <div className="search__box">
                <AccomodationSearchBox>
                    testing
                </AccomodationSearchBox>
            </div>
        </section>
        <section className='result__container'>

        </section>
    </Container>   
    );
};  

export default Accommodations;
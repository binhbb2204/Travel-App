import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';

import AccomodationSearchBox from '../ui/SearchBar/AccommodationSearchBox';
import accommodationData from '../data/accommodationData';
import Pagination from '../ui/Pagination/Pagination';


import '../styles/accomodations.css';

const Accommodations = () => {

    const [searchParams, setSearchParams] = useState({
        keyword: "",
        country: "",
        city: "",
        type: "any",
        minPrice: "",
        maxPrice: "",
        groupSize: 1,
        rooms: 1,
    });

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
          ...prev,
          [name]: value,
          ...(name === 'country' ? { city: '' } : {}),
        }));
    };

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
          keyword: params.get('keyword') || '',
          country: params.get('country') || '',
          city: params.get('city') || '',
          minPrice: params.get('minPrice') || '',
          maxPrice: params.get('maxPrice') || '',
          duration: params.get('duration') || 'any',
          groupSize: params.get('groupSize') || 'any',
        };
    };

    const handleSearch = (params) => {
        const results = filterTours(params);
        setFilteredResults(results);
        setHasSubmitted(true);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchParams);
    };

    return (
    <div className='acco__container'>
        <section className='search__container'>
            <motion.h1 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="label text-3xl lg:text-4xl font-bold text-center "
            >
                Set up your stay!
            </motion.h1>  
            <div className="search__box">
                <AccomodationSearchBox className ="box__detail"
                    searchParams={searchParams}
                    onSearchChange={handleSearchChange}
                    onSearch={handleSearch}
                    countries={[...new Set(accommodationData.map(tour => tour.country))].sort()}
                    cities={accommodationData.reduce((acc, tour) => {
                      if (!acc[tour.country]) acc[tour.country] = [];
                      if (!acc[tour.country].includes(tour.city)) acc[tour.country].push(tour.city);
                      return acc;
                    }, {})}
                    
                    onSubmit={handleSubmit}
                />
            </div>
        </section>
        <section className='result__container'>

        </section>
    </div>   
    );
};  

export default Accommodations;
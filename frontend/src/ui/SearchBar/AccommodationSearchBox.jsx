import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import '../SearchBar/accommodation-search-box.css'


{/* 
    Planning
    Search bar
    Country - City - Accommodation Type
    Check in - Check out - Price
    Number of guest - Number of room - Sort by
*/}

const AccommodationSearchBox = ({searchParams, onSearchChange, countries, cities, onSubmit}) => {

    // const [checkIn, setCheckIn] = useState("");
    // const [checkOut, setCheckOut] = useState("");
    // const [focused, setFocused] = useState(false);

    const onSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const countries = ["USA", "Canada", "Mexico"]; // Placeholder countries
    const cities = {
        USA: ["New York", "Los Angeles", "Chicago"],
        Canada: ["Toronto", "Vancouver", "Montreal"],
        Mexico: ["Mexico City", "Guadalajara", "Cancun"],
    };

    return (
        <Container className="box__container">
            <Row className='row-item'>
                <SearchBar searchParams={searchParams} onSearchChange={onSearchChange} />
            </Row>
            <Row className='row-item'>
                <LocationFilters
                    searchParams={searchParams}
                    onSearchChange={onSearchChange}
                    countries={countries}
                    cities={cities}
                />
                <AccommodationType
                    searchParams={searchParams}
                    onSearchChange={onSearchChange}
                />
            </Row>
            <Row className='row-item'>
                {/* <Duration
                    checkIn={checkIn}
                    checkOut={checkOut}
                    setCheckIn={setCheckIn}
                    setCheckOut={setCheckOut}
                    setFocused={setFocused}
                /> */}
                <GroupSize searchParams={searchParams} onSearchChange={onSearchChange} />
                <PriceFilter searchParams={searchParams} onSearchChange={onSearchChange} />
            </Row>
            {/* <Row className='row-item'>
                <GroupSize searchParams={searchParams} onSearchChange={onSearchChange} />
                <Rooms searchParams={searchParams} onSearchChange={onSearchChange} />
            </Row> */}
            <Row className='row-item'>
            <form onSubmit={onSubmit}>
                <button
                    type="submit"  
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Search Accommodation
                </button>
            </form>
            </Row>
        </Container>
    );
};  

const SearchBar = ({ searchParams, onSearchChange}) => {
    return(
        <div className="relative">
            <Search className="absolute left-6 top-1/2 transfrom -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input
            type = "text"
            name = "keyword"
            placeholder="Search tours..." 
            className="w-full pl-10 pr-4 py-2 
                    text-black
                    border rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500"
            value={searchParams.keyword}
            onChange={onSearchChange}
            />
        </div>
    )
}

const LocationFilters = ({ searchParams, onSearchChange, countries, cities }) => {
    const selectedCountryCities = Array.isArray(cities) ? cities : cities[searchParams.country] || [];
    
    return (
        <>
            {/* Country Selection */}
            <div className="relative">
                <label className="custom-label">Country</label>
                <select
                    name="country"
                    className="custom-input"
                    value={searchParams.country}
                    onChange={onSearchChange}
                >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            {/* City Selection */}
            <div className="relative">
                <label className="custom-label">City</label>
                <select
                    name="city"
                    className="custom-input"
                    value={searchParams.city}
                    onChange={onSearchChange}
                >
                    <option value="">All Cities</option>
                    {selectedCountryCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

const AccommodationType = ({ searchParams, onSearchChange}) => {
    return(
        <div className='type__container'>
            <div className="relative">
                <label className="custom-label">Type</label>
                <select
                name="type"
                className="custom-input"
                value={searchParams.type}
                onChange={onSearchChange}
                >
                    <option value="any">Any Type</option>
                    <option value="1">Hotel</option>
                    <option value="2">Hostel</option>
                    <option value="3">Motel</option>
                    <option value="4">Resort</option>
                </select>
            </div>
        </div>
    )
}

const PriceFilter = ({ searchParams, onSearchChange }) => {
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center space-x-2">
                <input
                type="number"
                min="0"
                name="minPrice"
                placeholder="Min"
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={searchParams.minPrice}
                onChange={onSearchChange}
            />
            <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            value={searchParams.maxPrice}
            onChange={onSearchChange}
            />
            </div>
        </div>
    )
}

// const Duration = ({searchParams, onSearchChange}) => {
//     const [checkIn, setCheckIn] = useState(""); // Temporary state for check-in date
//     const [checkOut, setCheckOut] = useState(""); // Temporary state for check-out date
//     return(
//         <div className="duration__container relative">
//              {/* Check In */}
//             {/* <div className="flex-1 md:px-4 border-t md:border-t-0 border-gray-200"> */}
//                 <div className="flex items-center space-x-3">
//                     {/* <div className="flex flex-col flex-1"> */}
//                     <div className="test d-column flex-1 min-w-[0px]">
//                     <span className="block text-sm font-medium text-gray-700 mb-1">Check In</span>
//                         <input
//                         type="date"
//                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                         value={checkIn}
//                         onChange={(e) => setCheckIn(e.target.value)}
                        
//                         // onFocus={() => setFocused(true)}
//                         // onBlur={() => setFocused(false)}
//                         />
//                     </div>
//                     <div className="test d-column flex-1 min-w-[0px]">
//                     <span className="block text-sm font-medium text-gray-700 mb-1">Check Out</span>
//                         <input
//                         type="date"
//                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                         value={checkOut}
//                         onChange={(e) => setCheckOut(e.target.value)}
//                         // onFocus={() => setFocused(true)}
//                         // onBlur={() => setFocused(false)}
//                         />
//                     </div>
                        
                        
//                     {/* </div> */}
//                 </div>
//             {/* // </div> */}

//             {/* Check Out */}
//             {/* <div className="flex-1 md:px-4 border-t md:border-t-0 border-gray-200"> */}
//                 {/* <div className="flex items-center space-x-3"> */}
//                     {/* <div className="flex flex-col flex-1"> */}
                        
//                     {/* </div> */}
//                 {/* </div> */}
//             {/* // </div> */}
//         </div>
//     )   
// }


const GroupSize = ({ searchParams, onSearchChange }) => {
    return(
        <div className="group__container">
            <div className="relative">
            <label className="custom-label">Group Size</label>
            <input
            type="number"
            min="1"
            name="groupSize"
            className="custom-input"
            value={searchParams.groupSize}
            onChange={onSearchChange}
            >
            </input>
            </div>
        </div>
    )
}

// const Rooms = ({ searchParams, onSearchChange}) => {
//     return(
//         <div className='room__container'>
//             <div className="relative">
//                 <label className="custom-label">Number of rooms</label>
//                 <input
//                 type="number"
//                 min="1"
//                 name="duration"
//                 className="custom-input"
//                 value={searchParams.rooms}
//                 onChange={onSearchChange}
//                 >
//                 </input>
//             </div>
//         </div>
//     )
// }

export default AccommodationSearchBox;
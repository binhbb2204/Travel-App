import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Calendar, Users, Search } from 'lucide-react';
import { Button } from '../Button';
import './animated-search-bar.css';

const AnimatedSearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestAlert, setShowGuestAlert] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setGuests(1);
    } else {
      setGuests(value);
    }
    setShowGuestAlert(false);
  };

  const searchHandler = () => {
    if (!location || !checkIn || !checkOut || !guests) {
      return alert("Please fill out all fields.");
    }
    if (!guests || guests < 1) {
      setShowGuestAlert(true);
      return;
    }
    setShowGuestAlert(false);
    // Handle search logic here
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto bg-white rounded-full overflow-hidden shadow-2xl search__bar"
      animate={{
        scale: focused ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center p-2 w-full">
        <div className="flex-1 flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:items-center md:divide-x divide-gray-200 md:space-x-4">
          {/* Location */}
          <div className="flex-1 md:px-4 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <Compass className="w-5 h-5 text-blue-500" />
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-500">Location</span>
                <input
                  className="w-full bg-transparent border-none focus:outline-none input__field"
                  type='text'
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Check In */}
          <div className="flex-1 md:px-4 border-t md:border-t-0 border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-500">Check In</span>
                <input
                  type="date"
                  className="w-full bg-transparent border-none focus:outline-none"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 md:px-4 border-t md:border-t-0 border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-500">Check Out</span>
                <input
                  type="date"
                  className="w-full bg-transparent border-none focus:outline-none"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 px-4 border-t md:border-t-0 border-gray-200">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-500">Guests</span>
                <input
                  type="number"
                  min="0"
                  className="w-full bg-transparent border-none focus:outline-none"
                  value={guests}
                  onChange={handleGuestChange}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="px-2">
          <Button 
            onClick={searchHandler}
            className="w-full md:w-auto rounded-full px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      
    </motion.div>
  );
};

export default AnimatedSearchBar;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import TourSearchCard from '../ui/Card/TourSearchCard';
import TourCard from '../ui/Card/TourCard';
import { Filter } from 'lucide-react';
import tourData from '../data/tourData';

const Tours = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    country: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    duration: 'any',
    groupSize: 'any'
  });

  const [searchResults, setSearchResults] = useState(tourData);
  const [activeView, setActiveView] = useState('grid');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Country and city data
  const countries = [...new Set(tourData.map(tour => tour.country))];
  const cities = tourData.reduce((acc, tour) => {

    // Initialize the country if it doesn't exist yet
    if(!acc[tour.country]){
      acc[tour.country] = [];
    }

    // Only add the city if it's not already in the list for that country
    if(!acc[tour.country].includes(tour.city)){
      acc[tour.country].push(tour.city);
    }
    return acc;
  }, {})

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search); // Use URLSearchParams to parse query string
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
  useEffect(() => {
    const params = getQueryParams();
    setSearchParams(params);
    handleSearch(params);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {})
    }));
  };

  const handleSearch = (params) => {
    const filteredResults = tourData.filter(tour => {
      const matchesKeyword = tour.title.toLowerCase().includes(params.keyword.toLowerCase());
      const matchesCountry = !params.country || tour.country === params.country;
      const matchesCity = !params.city || tour.city === params.city;
      const matchesMinPrice = !params.minPrice || tour.price >= parseInt(params.minPrice);
      const matchesMaxPrice = !params.maxPrice || tour.price <= parseInt(params.maxPrice);
      const matchesDuration = params.duration === 'any' || tour.duration === parseInt(params.duration);
      const matchesGroupSize = params.groupSize === 'any' || tour.maxGroupSize >= parseInt(params.groupSize);

      return matchesKeyword && matchesCountry && matchesCity && matchesMinPrice && matchesMaxPrice && matchesDuration && matchesGroupSize;
    });
    
    setSearchResults(filteredResults);
    setHasSubmitted(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-40 shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold text-center">Find Tours</h1>
        </div>
      </div>

      {/* Hero Section with Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-900 text-white py-8 lg:py-16 mt-14 lg:mt-0"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8 mt-5 lg:mt-7"
          >
            Find Your Perfect Tour
          </motion.h1>

          <TourSearchCard
            searchParams={searchParams}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            countries={countries}
            cities={cities}
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>

      {/* Results Section */}
      {hasSubmitted && (
        <div className="container mx-auto px-4 py-8">
          {/* Mobile View Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Available Tours</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('grid')}
                className={`p-2 rounded ${activeView === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded ${activeView === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Tours Grid/List */}
          <div className={`${activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6' : 'flex flex-col space-y-4'}`}>
            {searchResults.map(tour => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={activeView === 'list' ? 'w-full' : ''}
              >
                <TourCard tour={tour} viewMode={activeView} />
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-blue-600">
            <Filter className="w-6 h-6" />
            <span className="text-sm">Filters</span>
          </button>
          {/* Add more navigation items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Tours;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TourSearchCard from '../ui/Card/TourSearchCard';
import TourCard from '../ui/Card/TourCard';
import { Filter } from 'lucide-react';
import tourData from '../data/tourData';
const ToursPage = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    country: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    duration: 'any',
    groupSize: 'any'
  });

  const [activeView, setActiveView] = useState('grid'); // 'grid' or 'list'

  //Country testing
  const countries = ["Italy", "France", "Spain", "Greece"];
  const cities = {
    "Italy": ["Rome", "Venice", "Florence"],
    // ... other cities
  };
  const filteredTours = tourData.filter(tour => {
    const matchesKeyword = tour.title.toLowerCase().includes(searchParams.keyword.toLowerCase());
    const matchesCountry = !searchParams.country || tour.country === searchParams.country;
    const matchesCity = !searchParams.city || tour.city === searchParams.city;
    const matchesMinPrice = !searchParams.minPrice || tour.price >= parseInt(searchParams.minPrice);
    const matchesMaxPrice = !searchParams.maxPrice || tour.price <= parseInt(searchParams.maxPrice);
    const matchesDuration = searchParams.duration === 'any' || tour.duration === parseInt(searchParams.duration);
    const matchesGroupSize = searchParams.groupSize === 'any' || tour.maxGroupSize >= parseInt(searchParams.groupSize);

    return matchesKeyword && matchesCountry && matchesCity && 
           matchesMinPrice && matchesMaxPrice && matchesDuration && matchesGroupSize;
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional submit logic if needed
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
            countries={countries}
            cities={cities}
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>

      {/* Results Section */}
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
        <div className={`
          ${activeView === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'
            : 'flex flex-col space-y-4'
          }
        `}>
          {filteredTours.map(tour => (
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
        {filteredTours.length === 0 && (
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

export default ToursPage;
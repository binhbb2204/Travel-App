import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TourSearchCard from '../ui/Card/TourSearchCard';
import TourCard from '../ui/Card/TourCard';
import tourData from '../data/tourData';
import Pagination from '../ui/Pagination/Pagination';
import '../styles/tours.css'
const Tours = () => {
  // Initialize state
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    country: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    duration: 'any',
    groupSize: 'any',
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeView, setActiveView] = useState('grid');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Set items per page to 8
  const itemsPerPage = 8;

  // Get query params from URL
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

  // Filter tours based on search params
  const filterTours = (params) => {
    return tourData.filter((tour) => {
      const matchesKeyword = tour.title.toLowerCase().includes(params.keyword.toLowerCase());
      const matchesCountry = !params.country || tour.country === params.country;
      const matchesCity = !params.city || tour.city === params.city;
      const matchesMinPrice = !params.minPrice || tour.price >= parseInt(params.minPrice);
      const matchesMaxPrice = !params.maxPrice || tour.price <= parseInt(params.maxPrice);
      const matchesDuration = params.duration === 'any' || tour.duration === parseInt(params.duration);
      const matchesGroupSize = params.groupSize === 'any' || tour.maxGroupSize >= parseInt(params.groupSize);

      return matchesKeyword && matchesCountry && matchesCity && matchesMinPrice && 
             matchesMaxPrice && matchesDuration && matchesGroupSize;
    });
  };

  // Initialize search from URL params
  useEffect(() => {
    const params = getQueryParams();
    setSearchParams(params);
    const results = filterTours(params);
    setFilteredResults(results);
    setHasSubmitted(true);
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {}),
    }));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 300); // Scroll to top when changing pages
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  // Get current page's results
  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResults.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="search__background text-white py-8 lg:py-16 mt-14 lg:mt-0"
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
            countries={[...new Set(tourData.map(tour => tour.country))].sort()}
            cities={tourData.reduce((acc, tour) => {
              if (!acc[tour.country]) acc[tour.country] = [];
              if (!acc[tour.country].includes(tour.city)) acc[tour.country].push(tour.city);
              return acc;
            }, {})}
            
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>
      {/* Pagination */}
      {filteredResults.length > 0 && (
            <div className="mt-8">
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}

      {/* Results Section */}
      {hasSubmitted && (
        <div className="container mx-auto px-4 py-8">
          <div className={`${
            activeView === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6' 
              : 'flex flex-col space-y-4'
          }`}>
            {getCurrentPageResults().map((tour) => (
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
          {filteredResults.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-8"
            >
              <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredResults.length > 0 && (
            <div className="mt-8">
              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tours;
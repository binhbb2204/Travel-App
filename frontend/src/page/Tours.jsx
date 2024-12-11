
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tourService } from '../data/Service/tourService';
import axios from 'axios'; 
import TourSearchCard from '../ui/Card/TourSearchCard';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import TourCard from '../ui/Card/TourCard';
import Pagination from '../ui/Pagination/Pagination';
import '../styles/tours.css';


const Tours = () => {
  const navigate = useNavigate();
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
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  
  const itemsPerPage = 8;

  // Fetch tours from backend
  const fetchTours = async (params = {}) => {
    setIsLoading(true);
    try {
      const results = await tourService.searchTours(params);
      
      setFilteredResults(results);
      setHasSubmitted(true);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const fetchCountriesAndCities = async () => {
    try {
      const { countries, cities } = await tourService.getUniqueLocations();
      
      setCountries(countries);
      setCities(cities);
    } catch (error) {
      console.error('Error fetching countries and cities:', error);
    }
  };

 
  useEffect(() => {
    fetchCountriesAndCities();
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    
    // Convert URL params to search params object
    params.forEach((value, key) => {
      // Remove 'tour-' prefix if it exists
      const cleanKey = key.replace(/^tour-/, '');
      queryParams[cleanKey] = value;
    });

    const filledParams = { ...searchParams, ...queryParams };
    setSearchParams(filledParams);
    if (Object.keys(queryParams).length >= 0) {
      fetchTours(filledParams);
    }
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
      // Reset city if country changes
      ...(name === 'country' ? { city: '' } : {}),
    }));
  };

  // Perform search and update URL
  const handleSearch = (params) => {
    // Remove empty and default values
    const prefixedParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [`tour-${key}`, value])
    );
    const cleanParams = Object.fromEntries(
      Object.entries(prefixedParams).filter(([_, value]) => 
        value !== '' && value !== 'any'
      )
    );

    // Update URL with search parameters
    const searchString = new URLSearchParams(cleanParams).toString();
    navigate(`?${searchString}`);
    fetchTours(params);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchParams);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 300);
  };

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResults.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ChristmasParallaxBackground/>
      <div className="relative z-2">
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
              countries={countries}
              cities={cities}
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
            {isLoading ? (
              <div className="text-center">Loading tours...</div>
            ) : (
              <>
                {/* Tours Grid/List */}
                <div className={`${
                  activeView === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6' 
                    : 'flex flex-col space-y-4'
                }`}>
                  {getCurrentPageResults().map((tour) => (
                    <motion.div
                      key={tour._id}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;

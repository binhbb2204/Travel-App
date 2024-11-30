import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AccomodationSearchBox from '../ui/SearchBar/AccommodationSearchBox';
import accommodationData from '../data/accommodationData';
import AccommodationCard from '../ui/Card/AccommodationCard';
import Pagination from '../ui/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import '../styles/accomodations.css';

const Accommodations = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        country: '',
        city: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        groupSize: "any",
    });
    const [accommodationsData, setAccommodationsData] = useState([]); // State to store accommodations

    const [filteredResults, setFilteredResults] = useState([]);
    const [activeView, setActiveView] = useState('grid');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const fetchAccommodation = async () => {
        try{
            const response = await axios.get("/api/v1/accommodations");
            setAccommodationsData(response.data.data);
        } catch(error) {
            console.error("Error fetching accommodations: ", error)
        }
    }

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        const queryParams = {
            keyword: params.get('keyword') || '',
            country: params.get('country') || '',
            city: params.get('city') || '',
            type: params.get('type') || '',
            minPrice: params.get('minPrice') || '',
            maxPrice: params.get('maxPrice') || '',
            groupSize: params.get('groupSize') || 'any',
        };
      
        const cleanParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => 
              value !== '' && value !== 'any'
            )
        );
        const newUrl = new URL(window.location.href);
        newUrl.search = new URLSearchParams(cleanParams).toString();
        window.history.replaceState({}, '', newUrl);
    
        return cleanParams;
    };
      

    const filterTours = (params) => {
        return accommodationData.filter((acco) => {
            const matchesKeyword = !params.keyword || acco.title.toLowerCase().includes(params.keyword.toLowerCase());
            const matchesCountry = !params.country || acco.country === params.country;
            const matchesCity = !params.city || acco.city === params.city;
            const matchesType = !params.type || acco.type === params.type;
            const matchesMinPrice = !params.minPrice || acco.price >= parseInt(params.minPrice);
            const matchesMaxPrice = !params.maxPrice || acco.price <= parseInt(params.maxPrice);
            const totalCapacity = acco.rooms.reduce((sum, room) => sum + room.roomType * room.availableRooms, 0);

            const matchesGroupSize = params.groupSize === 'any' || totalCapacity >= parseInt(params.groupSize);
            return matchesKeyword && matchesCountry && matchesCity && matchesType && 
                    matchesMinPrice && matchesMaxPrice && matchesGroupSize;
        });
    };

    useEffect(() => {
        
        const params = getQueryParams();
        const filledParams = { ...searchParams, ...params };
        setSearchParams(filledParams);
        const results = filterTours(filledParams);
        setFilteredResults(results);
        setHasSubmitted(true);

        fetchAccommodation();
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
        const prefixedParams = Object.fromEntries(
            Object.entries(params).map(([key, value]) => [`${key}`, value])
        );
        
        const cleanParams = Object.fromEntries(
            Object.entries(prefixedParams).filter(([_, value]) => 
                value !== '' && value !== 'any'
            )
        );
        
        const searchString = new URLSearchParams(cleanParams).toString();
        navigate(`?${searchString}`);
        const results = filterTours(params)
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

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const getCurrentPageResults = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredResults.slice(startIndex, endIndex);
    };

    return (
    <div className='min-h-screen bg-gray-50'>
        {/* Search Section */}
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="search__container text-white py-8 lg:py-16 mt-14 lg:mt-0"
        >
            <div className="container mx-auto px-4">
                <motion.h1 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8 mt-5 lg:mt-7"
                >
                    Find the Perfect Place for Your Stay!
                </motion.h1>
                <AccomodationSearchBox className ="box__detail"
                searchParams={searchParams}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
                countries={[...new Set(accommodationData.map(acco => acco.country))].sort()}
                cities={accommodationData.reduce((acc, acco) => {
                    if (!acc[acco.country]) acc[acco.country] = [];
                    if (!acc[acco.country].includes(acco.city)) acc[acco.country].push(acco.city);
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
        <section className='result__container'>
            {hasSubmitted && (
            <div className="container mx-auto px-4 py-8">
                <div className={`${
                    activeView === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6' 
                    : 'flex flex-col space-y-4'
                }`}>
                    {getCurrentPageResults().map((acco) => (
                    <motion.div
                        key={acco.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={activeView === 'list' ? 'w-full' : ''}
                    >
                        <AccommodationCard acco={acco} viewMode={activeView} />
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
                    <p className="text-xl text-gray-600">No accommodations found matching your criteria.</p>
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
        </section>
    </div>   
    );
};  

export default Accommodations;
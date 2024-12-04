import React, { useState } from 'react'
import { Car, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Card, CardContent } from './Card'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { LocationFilters,  PriceFilter, AccommodationDetailsFilters } from '../Featured-tours/AccommodationFilters';


const AccommodationSearchCard = ({searchParams, onSearchChange, countries, cities, onSubmit}) => {
    const handleClearSearch = () => {
        onSearchChange({ target: { name: 'keyword', value: '' } });
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const y = useMotionValue(0);
    const opacity = useTransform(y, [0, 200], [0.5, 0]);

    const handleDragEnd = (event, info) => {
        if(info.offset.y > 100){
            setIsFilterOpen(false);
        }
    }
    return (
        <div className="w-full">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                    type="text"
                    name="keyword"
                    placeholder="Search accommodations..."
                    className="w-full 
                            pl-10 
                            pr-10 
                            py-3 
                            text-gray-700
                            border rounded-lg 
                            focus:ring-2 
                            focus:ring-blue-500
                            focus:border-blue-500"
                    value={searchParams.keyword}
                    onChange={onSearchChange}
                    />
                    {searchParams && (
                        <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                    </div>
                    <button
                    type="submit"
                    className="px-4 
                            bg-blue-600 
                            text-white 
                            rounded-lg 
                            hover:bg-blue-700 
                            transition duration-200 
                            flex items-center 
                            justify-center"
                    aria-label="Search" 
                    >
                        <Search size={20} />       
                    </button>
                </form>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden">
                <button
                onClick={() =>setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg mb-4"
                >
                    <span>Filters</span>
                    {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {/* Desktop Submit */}
            <div className="hidden lg:block">
                <DesktopSearchForm 
                    searchParams={searchParams}
                    onSearchChange={onSearchChange}
                    countries={countries}
                    cities={cities}
                    onSubmit={onSubmit}
                />
            </div>
            {/* Mobile Filters Modal */}
            <AnimatePresence>
                {isFilterOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="lg:hidden fixed inset-0 z-50 bg-gray-900/50 flex items-end"
                >
                    <motion.div
                    drag="y"
                    dragConstraints={{ top: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{ y }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full bg-white rounded-t-xl p-4 max-h-[90vh] overflow-y-auto"
                    >   
                        {/* Drag Handle */}
                        <div className="w-full h-6 flex items-center justify-center cursor-grab active:cursor-grabbing">
                            <div className="w-10 h-1 bg-gray-300 rounded-full" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Filters</h3>
                                <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e);
                        setIsFilterOpen(false);
                        }} className="space-y-4">

                            {/* Location Filters */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-700">Location</h4>
                                <LocationFilters 
                                searchParams={searchParams}
                                onSearchChange={onSearchChange}
                                countries={countries}
                                cities={cities}
                                />
                            </div>

                            {/* Price Filter */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-700">Price Range</h4>
                                <PriceFilter 
                                searchParams={searchParams}
                                onSearchChange={onSearchChange}
                                />
                            </div>

                            {/* Accommodation Details Filters */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-700">Accommodation Details</h4>
                                <AccommodationDetailsFilters
                                searchParams={searchParams}
                                onSearchChange={onSearchChange}
                                />
                            </div>

                            <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// This part if for Desktop cuz desktop has bigger screen so it can see the bar wider 
const DesktopSearchForm = ({searchParams, onSearchChange, countries, cities, onSumbit}) => {
    return(
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
                <form onSubmit={onSumbit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-full">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transfrom -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                type = "text"
                                name = "keyword"
                                placeholder="Search accommodations..." 
                                className="w-full pl-10 pr-4 py-2 
                                        text-black
                                        border rounded-lg focus:ring-2 
                                        focus:ring-blue-500 focus:border-blue-500"
                                value={searchParams.keyword}
                                onChange={onSearchChange}
                                />
                            </div>
                        </div>
                        <LocationFilters {...{searchParams, onSearchChange, countries, cities}}/>
                        <PriceFilter {...{searchParams, onSearchChange}}/>
                        <AccommodationDetailsFilters {...{searchParams, onSearchChange}}/>
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Search Tours
                    </button>
                </form>
            </CardContent>
        </Card>
    );
}
export default AccommodationSearchCard
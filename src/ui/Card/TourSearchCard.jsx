import React, { useState } from 'react'
import { Car, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Card, CardContent } from './Card'
import { motion, AnimatePresence } from 'framer-motion';
import { LocationFilters,  PriceFilter, TourDetailsFilters } from '../Featured-tours/ToursPageSearchComponent';

const TourSearchCard = ({searchParams, onSearchChange, countries, cities, onSubmit}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    return (
        <div className="w-full">
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                    type="text"
                    name="keyword"
                    placeholder="Search tours..."
                    className="w-full 
                            pl-10 
                            pr-4 
                            py-3 
                            text-gray-700
                            border rounded-lg 
                            focus:ring-2 
                            focus:ring-blue-500
                            focus:border-blue-500"
                    value={searchParams.keyword}
                    onChange={onSearchChange}
                    />
                </div>
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
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="w-full bg-white rounded-t-xl p-4 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={20} />
                        </button>
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

                    {/* Tour Details Filters */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">Tour Details</h4>
                        <TourDetailsFilters 
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
                                placeholder="Search tours..." 
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
                        <TourDetailsFilters {...{searchParams, onSearchChange}}/>
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
export default TourSearchCard
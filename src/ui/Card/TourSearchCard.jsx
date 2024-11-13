import React, { useState } from 'react'
import { Car, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Card, CardContent } from './Card'
import { motion, AnimatePresence } from 'framer-motion';

const TourSearchCard = ({searchParams, onSearchChange, countries, cities, onSumbit}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    return (
        <div className="w-full">
            {/* This one is for mobile */}
            <div className="lg:hidden w-full">
                <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                    type="text"
                    name="keyword"
                    placeholder="Search tours..."
                    className="w-10 
                            pl-10 
                            pr-4 
                            py-3 
                            border rounded-lg 
                            focus:ring-2 
                            focus:ring-blue-500
                            focus:border-blue-500"
                    value={searchParams.keyword}
                    onChange={onSearchChange}
                    />
                </div>
                <button
                onClick={() =>
                    setIsFilterOpen(!isFilterOpen)
                }
                className="w-full 
                        flex items-center 
                        justify-center 
                        space-x-2 
                        bg-blue-600 
                        text-white 
                        py-3 
                        rounded-lg 
                        mb-4"
                >
                    <span>Filters</span>
                    {isFilterOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
            </div>
            {/* This if for desktop */}
            <div className="hidden lg:block">

            </div>
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

                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
export default TourSearchCard
import './tour-page-search.css'
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


const PriceFilter = ({ searchParams, onSearchChange }) => {
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center space-x-2">
                <input
                type="number"
                name="minPrice"
                placeholder="Min"
                min={0}
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={searchParams.minPrice}
                onChange={onSearchChange}
                />
                <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                min={0}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={searchParams.maxPrice}
                onChange={onSearchChange}
                />
            </div>
        </div>
    )
}

const TourDetailsFilters = ({ searchParams, onSearchChange }) => {
    return(
        <>
            {/* Duration */}
            <div className="relative">
                <label className="custom-label">Duration (Days)</label>
                <select
                name="duration"
                className="custom-input"
                value={searchParams.duration}
                onChange={onSearchChange}

                >
                    <option value="any">Any Duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="5">5+ Days</option>
                </select>
            </div>

            {/* Group Size */}
            <div className="relative">
                <label className="custom-label">Group Size</label>
                <select
                name="groupSize"
                className="custom-input"
                value={searchParams.groupSize}
                onChange={onSearchChange}

                >
                    <option value="any">Any Size</option>
                    <option value="2">2+ People</option>
                    <option value="4">4+ People</option>
                    <option value="6">6+ People</option>
                    <option value="8">8+ People</option>
                </select>
            </div>
        </>
    )
};

export { LocationFilters, PriceFilter, TourDetailsFilters };
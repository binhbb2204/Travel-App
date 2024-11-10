import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Clock } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Link } from 'react-router-dom';
import './tour-card.css'; // Import the CSS

const TourCard = ({ tour }) => {
  const {id, title, city, photo, price, featured, avgRating, reviews, maxGroupSize = 8 } = tour;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="card">
        <div className="tour__img">
          <img src={photo} alt={title} />
          
          {featured && (
            <div className="featured-badge">Featured</div>
          )}

          <div className="price-badge">${price}</div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{city}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{avgRating}</span>
              <span className="text-sm text-gray-500">({reviews.length})</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
            <Link to ={`/tours/${id}`}>{title}</Link>
          </h3>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Max: {maxGroupSize}</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            
            <Link to ={`/tours/${id}`}>Book Now</Link>
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TourCard;

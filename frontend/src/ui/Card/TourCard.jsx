import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Clock } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Link } from 'react-router-dom';
import './tour-card.css'; // Import the CSS
import calculateAvgRating from '../../utils/avgRating';
const TourCard = ({ tour }) => {
  const {_id: id, title, city, photos, price, featured, reviews} = tour;
  console.log('Tour ID:', id);
  const {totalRating, avgRating} = calculateAvgRating(reviews)

  const ratedReview = reviews.filter(review => review.rating !== null && review.rating > 0);
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
          <img 
          src={photos && photos.length > 0 ? photos[0] : '/default-tour-image.jpg'}  
          alt={title} 
          />
          
          {featured && (
            <div className="featured-badge">Featured</div>
          )}

          <div className="price-badge">${price}</div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm h-5">{city}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">
                {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? 
                  'Not Rated' 
                  : <span className="text-sm text-gray-500">({ratedReview.length})</span>}
              </span>
              
            </div>
          </div>

          <h3 className="card-title">
            <Link to ={`/tours/${id}`}>{title}</Link>
          </h3>

          {/* <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Max: {maxGroupSize}</span>
            </div>
          </div> */}

          <button className="book__button">
            <Link to ={`/tours/${id}`}>Book Now</Link>
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TourCard;

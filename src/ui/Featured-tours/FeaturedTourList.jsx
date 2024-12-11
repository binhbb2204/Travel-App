import React from 'react';
import TourCard from '../Card/TourCard';
import tourData from '../../data/tourData';
import { tourService } from '../../data/Service/tourService';
import { Col } from 'reactstrap';
import { motion } from 'framer-motion';

const FeaturedTourList = () => {
  const featuredTours = tourData.filter(tour => tour.featured);
  return (
    <>
      {featuredTours?.map((tour, index) => (
        <motion.div
          key={tour.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="col-lg-3 mb-4"
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </>
  );
};

export default FeaturedTourList;

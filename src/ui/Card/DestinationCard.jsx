import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import './destination-card.css'
const DestinationCard = ({ title, description, icon: Icon, delay, destinationUrl }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(destinationUrl); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="relative"
      onClick={handleCardClick} 
    >
      <Card className="card__size">
        <div className="icon__position">
          <div className="icon__element">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardContent className="mt-8 text-center">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DestinationCard

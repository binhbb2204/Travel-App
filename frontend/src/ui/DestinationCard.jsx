import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './Card'; // Adjusted import

const DestinationCard = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
    className="relative"
  >
    <Card className="p-6 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-lg border-none shadow-xl">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
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

export default DestinationCard;

import React from 'react';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 2 }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

export default FloatingElement;
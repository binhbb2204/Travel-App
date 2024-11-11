import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const InteractiveGlobe = () => (
  <motion.div
    className="relative w-64 h-64"
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="absolute inset-0 bg-blue-500/20 rounded-full" />
    <div className="absolute inset-2 bg-blue-500/30 rounded-full" />
    <div className="absolute inset-4 bg-blue-500/40 rounded-full" />
    <Globe className="absolute inset-0 w-full h-full text-blue-500" />
  </motion.div>
);

export default InteractiveGlobe;
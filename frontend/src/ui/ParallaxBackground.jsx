import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const ParallaxBackground = () => {
  const clouds = Array(5).fill(null);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: -100, opacity: 0.8 }}
          animate={{
            x: ['100vw', '-20vw'],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: i * 2,
          }}
          style={{
            top: `${15 + i * 15}%`,
          }}
        >
          <Cloud className="text-white/20 w-16 h-16" />
        </motion.div>
      ))}
    </div>
  );
};

export default ParallaxBackground;
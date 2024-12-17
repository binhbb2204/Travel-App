import React, {useMemo} from 'react';
import { motion } from 'framer-motion';

const ChristmasParallaxBackground = () => {
  // Create snowflakes with random properties
  const snowflakes = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 3 + 1,

      horizontalDrift: Math.random() * 10 - 5
    }));
  }, []);

  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient background resembling winter sky */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(to bottom, #1e3a8a, #3b82f6, #93c5fd)',
          opacity: 0.7
        }}
      />

      {/* Snowflake layer */}
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.x}%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [
              `${flake.x}%`, 
              `${flake.x + flake.horizontalDrift}%`
            ]
          }}
          transition={{
            duration: flake.speed * 10,
            delay: flake.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
        />
      ))}

      {/* Optional Christmas tree silhouettes in background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className="w-full h-full opacity-20"
        >
          <path 
            fill="#ffffff" 
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,160C672,171,768,213,864,224C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ChristmasParallaxBackground;
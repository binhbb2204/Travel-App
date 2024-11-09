import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Button } from './Button';

const AnimatedSearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={`relative w-full max-w-2xl mx-auto bg-white rounded-full overflow-hidden shadow-2xl 
        ${focused ? 'ring-2 ring-blue-500' : ''}`}
      animate={{
        scale: focused ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center p-2">
        <div className="flex-1 flex items-center space-x-4 px-4">
          <Compass className="w-6 h-6 text-blue-500" />
          <input
            className="w-full bg-transparent border-none focus:outline-none text-lg"
            placeholder="Where would you like to explore?"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <Button className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          Explore
        </Button>
      </div>
    </motion.div>
  );
};

export default AnimatedSearchBar;
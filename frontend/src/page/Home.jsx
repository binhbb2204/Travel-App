import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Plane, Compass, Sun, Star, Wind } from 'lucide-react';
import FloatingElement from './../ui/FloatingElement'; // Corrected path
import ParallaxBackground from './../ui/ParallaxBackground'; // Corrected path
import InteractiveGlobe from './../ui/InteractiveGlobe'; // Corrected path
import AnimatedSearchBar from './../ui/AnimatedSearchBar'; // Corrected path
import DestinationCard from './../ui/DestinationCard'; // Corrected path

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <ParallaxBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ y: y1, opacity }}
            className="absolute top-10 right-10"
          >
            <FloatingElement delay={0.2}>
              <Sun className="w-16 h-16 text-yellow-500/50" />
            </FloatingElement>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ y: y2, opacity }}
            className="absolute bottom-20 left-10"
          >
            <FloatingElement delay={0.5}>
              <Star className="w-20 h-20 text-purple-500/50" />
            </FloatingElement>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold leading-tight mb-6 text-white">
                Discover Your
                <div className="relative inline-block ml-4">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Adventure
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Embark on a journey of discovery. Let us guide you through the world's most breathtaking destinations.
              </p>
              
              <AnimatedSearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <InteractiveGlobe />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Wind className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Unforgettable Experiences Await
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Choose your perfect adventure from our carefully curated experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <DestinationCard
              title="Exotic Locations"
              description="Discover hidden paradises and untouched natural wonders"
              icon={Map}
              delay={0.2}
            />
            <DestinationCard
              title="Luxury Travel"
              description="Experience world-class comfort and exceptional service"
              icon={Plane}
              delay={0.4}
            />
            <DestinationCard
              title="Adventure Tours"
              description="Push your limits with thrilling outdoor experiences"
              icon={Compass}
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

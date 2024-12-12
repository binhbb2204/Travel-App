import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Plane, Compass, Sun, Star, Wind, Globe2, Calendar, Users, CreditCard,  Award, Section, SnowflakeIcon } from 'lucide-react';
import FloatingElement from './../ui/FloatingElement'; 
import ParallaxBackground from './../ui/ParallaxBackground'; 
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import InteractiveGlobe from './../ui/InteractiveGlobe'; 
import AnimatedSearchBar from '../ui/SearchBar/AnimatedSearchBar'; 
import DestinationCard from '../ui/Card/DestinationCard'; 
import ImageDisplay from '../ui/ImageDisplay/ImageDisplay';
import '../styles/home.css'
import testimonials from '../data/testimonials';
import NewsLetter from '../ui/NewsLetter/NewsLetter';
//mb is margin-bottom, px is horizontal padding

const Home = () => {


  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ChristmasParallaxBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ y: y1, opacity }}
            className="absolute top-16 sm:top-24 md:top-10 right-4 sm:right-6 md:right-10 z-10"
          >
            <FloatingElement delay={0.2}>
              <SnowflakeIcon className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 text-white" />
            </FloatingElement>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ y: y2, opacity }}
            className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-4 sm:left-6 md:left-10 z-10"
          >
            <FloatingElement delay={0.5}>
              <i className="ri-hotel-line hotel__icon text-2xl sm:text-3xl md:text-4xl"></i>
            </FloatingElement>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              
            >
              <h1 className="custom-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
                Travel Everywhere With
                <div className="relative inline-block ml-2 sm:ml-3 md:ml-4">
                  <span className="text-gradient">
                    TAB
                  </span>
                  <motion.div
                    className="TAB__element"
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
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                Embark on a journey of discovery. Let us guide you through the world's most breathtaking destinations.
              </p>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <ImageDisplay/>
            </motion.div>
          </div>
          
          <div className="w-full px-2 sm:px-4 mt-6 sm:mt-8 lg:mt-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
            >
                <AnimatedSearchBar />
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Wind className="w-6 h-6 md:w-8 md:h-8 text-gray-400 pt-2 md:pt-1 absolute top-10 md:top-0 " />
        </motion.div>
        
      </section>


      {/* Why Choose Us Section */}
      <section className="overlap__container py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-4 text-gray-800">Why Choose Us</h2>
            <p className="text-gray-600">Experience the difference with our premium travel services</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Calendar, title: "Easy Booking", description: "Simple and secure booking process" },
              { icon: Users, title: "Expert Guides", description: "Professional local guides worldwide" },
              { icon: CreditCard, title: "Best Prices", description: "Guaranteed best rates and offers" },
              { icon: Award, title: "24/7 Support", description: "Round-the-clock customer service" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 bg-white rounded-lg shadow-sm"
              >
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-blue-600" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section End*/}

      {/* Features Section */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16" 
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
              Unforgettable Experiences Await
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-2"> 
              Choose your perfect adventure from our carefully curated experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-8 md:mt-20">
            <DestinationCard
              title="Exotic Tours"
              description="Discover hidden paradises and untouched natural wonders"
              icon={Map}
              delay={0.2}
              destinationUrl="/exotic_tours"
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


      {/* Testimonials Section */}
      <section className="overlap__container py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-800">What Our Travelers Say</h2>
            <p className="text-gray-600">Real experiences from real travelers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 md:w-12 h-10 md:h12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-base md:text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs md:text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-4">{testimonial.comment}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/*Testimonials Section End*/}      
      <NewsLetter />
    </div>
  );
};

export default Home;


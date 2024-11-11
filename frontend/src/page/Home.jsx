import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Plane, Compass, Sun, Star, Wind, Globe2, Calendar, Users, CreditCard,  Award, } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import FloatingElement from './../ui/FloatingElement'; 
import ParallaxBackground from './../ui/ParallaxBackground'; 
import InteractiveGlobe from './../ui/InteractiveGlobe'; 
import AnimatedSearchBar from '../ui/SearchBar/AnimatedSearchBar'; 
import DestinationCard from '../ui/Card/DestinationCard'; 
import ImageDisplay from '../ui/ImageDisplay/ImageDisplay';
import '../styles/home.css'
import testimonials from '../data/testimonials';


const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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
              <Sun className="w-16 h-16 text-yellow-400" />
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
              <i className="ri-hotel-line hotel__icon"></i>
            </FloatingElement>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold leading-tight mb-6 text-gray-800">
                Travel Everywhere With
                <div className="relative inline-block ml-4">
                  <span className="text-gradient">
                    TAB
                  </span>
                  <motion.div
                    
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
              <p className="text-xl text-gray-600 mb-8">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <AnimatedSearchBar />
            </motion.div>

            
          
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
          <Wind className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose Us</h2>
            <p className="text-gray-600">Experience the difference with our premium travel services</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                className="text-center"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section End*/}

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Unforgettable Experiences Await
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your perfect adventure from our carefully curated experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">What Our Travelers Say</h2>
            <p className="text-gray-600">Real experiences from real travelers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.comment}</p>
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
    </div>
  );
};

export default Home;


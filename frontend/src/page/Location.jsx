import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Plane, Compass, Sun, Star, Wind, Globe2 } from 'lucide-react';
import ParallaxBackground from '../ui/ParallaxBackground';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import { Section } from 'lucide-react';
import { Container, Row, Col } from 'reactstrap'
import FloatingElement from '../ui/FloatingElement';
import FeaturedTourList from '../ui/Featured-tours/FeaturedTourList';
import Pagination from '../ui/Pagination/Pagination';
import '../styles/location.css'
const Location = () => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const itemsPerPage = 8;

    return (
        <div  className="min-h-screen bg-white relative overflow-hidden" style={{ marginBottom: "4rem" }}>
            <ChristmasParallaxBackground />
            {/* Hero section */}
            <section className="relative min-h-screen flex items-center">
            <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            
            <FloatingElement delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            
              className="inline-block p-3 bg-blue-100 rounded-full mb-2"
            >
              </motion.div>
            </FloatingElement>
            <h1 className="text-5xl font-bold mb-4 text-blue-900">Discover Our Tours</h1>
            <p className="text-xl text-blue-700">Experience the city like never before</p>
            </motion.div>

          <section>
            <Container>
                <Row>
                    <FeaturedTourList/>
                </Row>
            </Container>
          </section>
            
          </div>

            </section>
        </div>
    )
}

export default Location
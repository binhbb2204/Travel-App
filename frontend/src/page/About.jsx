import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Award, Heart } from 'lucide-react';
import ParallaxBackground from '../ui/ParallaxBackground';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import teamMemberImage1 from '../images/nature.jpg';
import teamMemberImage2 from '../images/ice.jpg';
import teamMemberImage3 from '../images/nature.jpg';
import backgroundImage from '../images/travel.jpg';
import aboutVideo from '../images/home-bg-final_2.mp4';

// Sponsors Logo
import QatarAirways from '../images/logo/QatarAirways_t.jpg';
import Trivago from '../images/logo/Trivago_t.png';
import Agoda from '../images/logo/Agoda.png';
import AmericanAirlines from '../images/logo/AmericanAirlines.png';
import EtihadAirways from '../images/logo/EtihadAirways.png';
import Expedia from '../images/logo/Expedia.png';
import Traveloka from '../images/logo/Traveloka.png';
import Trip from '../images/logo/Trip.png';
import VietjetAir from '../images/logo/VietjetAir.png';
import VietnamAirlines from '../images/logo/VietnamAirlines.png';

import '../styles/about.css';

const About = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const teamMembers = [
        {
            name: "Tran Thanh Binh",
            role: "Project Manager",
            image: teamMemberImage1,
            description: "Leader of the project, as well as manager and developer. Passionate in coding, playing ROBLOX"
        },
        {
            name: "Hoang Thien An",
            role: "Project Member",
            image: teamMemberImage3,
            description: "Data analyst and developer. Passionate in Laziness and Poorness"
        },
        {
            name: "Nguyen Minh Thuan",
            role: "Project Member",
            image: teamMemberImage3,
            description: "Data researcher and developer. Passionate in planting Thai Jackfruit"
        },
    ];

    const stats = [
        { number: "10k+", label: "Happy Travelers", icon: Heart },
        { number: "50+", label: "Destinations", icon: Globe },
        { number: "100+", label: "Local Guides", icon: Users },
        { number: "15+", label: "Years Experience", icon: Award },
        { number: "200+", label: "Travel Packages", icon: Target },
        { number: "5k+", label: "Reviews", icon: Award },
        { number: "30+", label: "Countries Visited", icon: Globe },
        { number: "80%", label: "Customer Satisfaction", icon: Heart }
    ];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden -z-10">
            {/* <ParallaxBackground /> */}
            <div className="absolute inset-0 -z-10">
                <ChristmasParallaxBackground />
            </div>
            <div className="h-16 md:h-24"></div>    {/* seperate the header and the video */}

            {/* Video Section */}
            <section className="video-section relative w-full">
                <div className="absolute inset-0 z-10">
                    {!isVideoLoaded && (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                            <p>Loading video...</p>
                        </div>
                    )}
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => setIsVideoLoaded(true)}
                        loading="lazy"
                    >
                        <source src={aboutVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* Hero Section */}
            <section className="relative pt-20 pb-12 md:py-20 z-20 space-y-6">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-3xl font-bold mb-6 text-gray-800">
                            Our Story
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            TAB was founded with a simple yet powerful vision: to make extraordinary travel experiences accessible to everyone. We believe that travel has the power to transform lives, bridge cultures, and create lasting memories.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-50 z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center stats-card"
                            >
                                <stat.icon className="w-12 h-12 mb-4 text-blue-600" />
                                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-20 z-10 space-y-6">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-3xl md:text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
                            <p className="text-gray-600 mb-6">
                                We're committed to creating meaningful travel experiences that connect people with diverse cultures, stunning landscapes, and extraordinary adventures. Our mission is to make travel more accessible, sustainable, and enriching for everyone.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Curate authentic local experiences",
                                    "Promote sustainable tourism",
                                    "Support local communities",
                                    "Provide exceptional service"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <Target className="w-5 h-5 text-blue-600 mr-3" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                                style={{ backgroundImage: `url(${backgroundImage})` }}
                            ></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 md:py-20 bg-gray-50 z-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-3xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
                        <p className="text-gray-600">The passionate individuals behind your extraordinary travels</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl z-10"
                            >
                                <div className="team-image-container relative h-48 bg-gray-200 z-10">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-300 transform hover:scale-110 hover:shadow-xl z-10"
                                        style={{ backgroundImage: `url(${member.image})` }}
                                    ></div>
                                </div>
                                <div className="p-6 z-10">
                                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-blue-600 mb-4">{member.role}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsors' Logos */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-3xl font-bold mb-6 text-gray-800">Our Beloved Sponsors</h2>
                    <div className="flex flex-wrap justify-center">
                        <img src={EtihadAirways} alt="Etihad Airways" style={{ height: '5rem', width: 'auto' }} className="mx-2" />
                        <img src={QatarAirways} alt="Qatar Airways" style={{ height: '4rem', width: 'auto' }} className="logo mx-2" />
                        <img src={AmericanAirlines} alt="American Airlines" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={VietjetAir} alt="Vietjet Air" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={VietnamAirlines} alt="Vietnam Airlines" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <img src={Trivago} alt="Trivago" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={Traveloka} alt="Traveloka" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={Expedia} alt="Expedia" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={Agoda} alt="Agoda" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                        <img src={Trip} alt="Trip.com" style={{ height: '5rem', width: 'auto' }} className="logo mx-2" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
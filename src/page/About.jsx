import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Award, Heart } from 'lucide-react';
import ParallaxBackground from '../ui/ParallaxBackground';
import teamMemberImage1 from '../images/binhbb.jpg';
import teamMemberImage2 from '../images/ice.jpg';
import teamMemberImage3 from '../images/thuan.jpg';
import backgroundImage from '../images/nature.jpg';

const About = () => {
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
            image: teamMemberImage2,
            description: "Data analyst and developer. Passionate in Laziness and Poorness"
        },
        {
            name: "Nguyen Minh Thuan",
            role: "Project Member",
            image: teamMemberImage3,
            description: "Data researcher and developer. Passionate in planting Thai Jackfruit "
        },
    ];

    const stats = [
        { number: "10k+", label: "Happy Travelers", icon: Heart },
        { number: "50+", label: "Destinations", icon: Globe },
        { number: "100+", label: "Local Guides", icon: Users },
        { number: "15+", label: "Years Experience", icon: Award }
    ];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <ParallaxBackground />

            {/* Hero Section */}
            <section className="relative pt-20 pb-12 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                            Our Story
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            TAB was founded with a simple yet powerful vision: to make extraordinary travel experiences accessible to everyone. We believe that travel has the power to transform lives, bridge cultures, and create lasting memories.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
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
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
                        <p className="text-gray-600">The passionate individuals behind your extraordinary travels</p>
                    </motion.div>

                    {/* Team Member Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div className="team-image-container relative h-48 bg-gray-200">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-300 transform hover:scale-110 hover:shadow-xl"
                                        style={{ backgroundImage: `url(${member.image})` }}
                                    ></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-blue-600 mb-4">{member.role}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
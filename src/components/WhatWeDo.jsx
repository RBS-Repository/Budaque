import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import './WhatWeDo.css';

const WhatWeDo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const services = [
        {
            icon: "💻",
            title: "Web Development",
            description: "Custom websites and web applications built with cutting-edge technologies",
            skills: ["React", "Node.js", "Next.js", "MongoDB"]
        },
        {
            icon: "📱",
            title: "Mobile Development",
            description: "Native and cross-platform mobile apps for iOS and Android",
            skills: ["React Native", "Flutter", "iOS", "Android"]
        },
        {
            icon: "🎨",
            title: "UI/UX Design",
            description: "User-centered design solutions that enhance digital experiences",
            skills: ["Figma", "Adobe XD", "Prototyping", "User Research"]
        },
        {
            icon: "🚀",
            title: "Digital Strategy",
            description: "Strategic solutions to drive your digital transformation",
            skills: ["Consulting", "Analytics", "SEO", "Marketing"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0,
            y: 50
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="whatwedo-section" id="services">
            <div className="spline-background">
                <Spline 
                    scene="https://prod.spline.design/3oDIGGuUyodNRAbU/scene.splinecode "
                    onLoad={() => setIsLoading(false)}
                />
                {isLoading && (
                    <div className="loading-screen">
                        <div className="loader"></div>
                        <p>Loading 3D Scene...</p>
                    </div>
                )}
            </div>
            
            <div className="whatwedo-overlay"></div>

            <div className="whatwedo-container">
                <motion.div 
                    className="whatwedo-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>What We Do</h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Transforming Ideas into Digital Reality</p>
                </motion.div>

                <motion.div 
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.map((service, index) => (
                        <motion.div 
                            key={index} 
                            className="service-card"
                            variants={cardVariants}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div 
                                className="service-icon"
                                initial={{ scale: 0.5 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {service.icon}
                            </motion.div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="skills-container">
                                {service.skills.map((skill, i) => (
                                    <motion.span 
                                        key={i} 
                                        className="skill-tag"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ 
                                            duration: 0.3, 
                                            delay: 0.4 + (i * 0.1)
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="service-hover-effect"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDo; 
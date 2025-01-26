import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Marquee from './Marquee'; // Import the Marquee component
import './Hero.css'; // Importing CSS for styling
import { motion } from 'framer-motion';

const Hero = () => {
    const [isLoading, setIsLoading] = useState(true);

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <section className="hero-container">
            <div className="spline-background">
                <Spline 
                    scene="https://prod.spline.design/0QuRrFvW2gnjfJyT/scene.splinecode"
                    onLoad={onLoad}
                />
                {isLoading && (
                    <div className="loading-screen">
                        <div className="loader"></div>
                        <p>Loading 3D Scene...</p>
                    </div>
                )}
            </div>

            <div className="blur-overlay"></div>

            <div className="hero-content">
                <div className="hero-main">
                    <div className="hero-text-container">
                        <div className="hero-heading">
                            <motion.h1 
                                style={{fontSize: '100px'}}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="gradient-text">BMMC</span>
                            </motion.h1>
                            <div className="title-line"></div>
                        </div>
                        <motion.h2 
                            style={{textAlign: 'center'}}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Budaqe Multi Media Creation
                        </motion.h2>
                        <div className="hero-tags">
                            <span className="tag">Web Development</span>
                            <span className="dot">•</span>
                            <span className="tag">Digital Design</span>
                            <span className="dot">•</span>
                            <span className="tag">Innovation</span>
                        </div>
                    </div>

                    <div className="hero-description">
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Transforming visions into digital realities. We create immersive experiences that push the boundaries of web technology.
                        </motion.p>
                    </div>

                    <div className="cta-wrapper">
                        <motion.a 
                            href="#projects"
                            className="cta-button primary"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <span>View Our Work</span>
                            <span className="button-glow"></span>
                        </motion.a>
                        <motion.a 
                            href="#about"
                            className="cta-button secondary"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <span>About Us</span>
                            <span className="button-glow"></span>
                        </motion.a>
                    </div>
                </div>

                <motion.div 
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    onClick={() => document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="scroll-text">Discover More</span>
                    <span className="scroll-arrow">↓</span>
                </motion.div>
            </div>

            <div className="hero-stats">
                <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">30+</span>
                    <span className="stat-label">Clients</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years</span>
                </div>
            </div>

        </section>
    ); 
};

export default Hero; 
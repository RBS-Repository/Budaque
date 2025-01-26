import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './VideoIntro.css';
// Import your local video
import demoVideo from '/intro.mp4';

const VideoIntro = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleVideoControl = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0,
            y: 30
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
        <section className="video-intro-section" id="video-intro">
            <div className="video-intro-container">
                <motion.div 
                    className="video-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="video-text"
                        variants={itemVariants}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Our Story
                        </motion.h2>
                        <div className="section-line"></div>
                        <motion.p 
                            className="section-subtitle"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Watch How We Transform Ideas Into Reality
                        </motion.p>
                        
                        <motion.div 
                            className="feature-list"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    icon: "🎯",
                                    title: "Our Mission",
                                    text: "Delivering innovative digital solutions"
                                },
                                {
                                    icon: "💡",
                                    title: "Our Approach",
                                    text: "Combining creativity with excellence"
                                },
                                {
                                    icon: "🚀",
                                    title: "Our Impact",
                                    text: "Transforming businesses digitally"
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="feature-item"
                                    variants={itemVariants}
                                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                                >
                                    <motion.div 
                                        className="feature-icon"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <div className="feature-text">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="video-preview"
                        variants={itemVariants}
                    >
                        <motion.div 
                            className="video-wrapper"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <video
                                ref={videoRef}
                                src={demoVideo}
                                poster="/rits.png"
                                onClick={handleVideoControl}
                                playsInline
                                loop
                            />
                            <motion.div 
                                className={`video-overlay ${isPlaying ? 'playing' : ''}`}
                                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                <motion.button 
                                    className="play-button" 
                                    onClick={handleVideoControl}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="play-icon">
                                        {isPlaying ? '⏸' : '▶'}
                                    </span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoIntro; 
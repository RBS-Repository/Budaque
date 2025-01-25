import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    const [isLoading, setIsLoading] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const onLoad = () => {
        setIsLoading(false);
    };

    return (
        <section className="about-section" id="about">
            <div className="spline-background">
                <Spline 
                    scene="https://prod.spline.design/HabJNK-1JTJTd-7n/scene.splinecode"
                    onLoad={onLoad}
                />
                {isLoading && (
                    <div className="loading-screen">
                        <div className="loader"></div>
                        <p>Loading 3D Scene...</p>
                    </div>
                )}
            </div>

            <div className="about-overlay"></div>
            <div className="about-container">
                <motion.div 
                    className="about-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>About BMMC</h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="about-content">
                    <motion.div 
                        className="about-text"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Who We Are</h3>
                        <p>We are BMMC - Budaque Multi Media Creation, where innovation meets imagination. Simply press the arrow to explore our digital universe.</p>
                    </motion.div>

                    <div className="services-grid">
                        {[
                            {
                                icon: "🎨",
                                title: "Creative Design",
                                text: "Pushing boundaries with cutting-edge UI/UX and immersive digital experiences."
                            },
                            {
                                icon: "💡",
                                title: "Innovation Lab",
                                text: "Transforming \"useless but happy\" ideas into captivating digital solutions."
                            },
                            {
                                icon: "🚀",
                                title: "Future Tech",
                                text: "Crafting tomorrow's digital experiences with today's technology."
                            },
                            {
                                icon: "🔮",
                                title: "Digital Art",
                                text: "Where functionality meets aesthetic in perfect digital harmony."
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.5,
                                    delay: 0.3 + (index * 0.1)
                                }}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h4>{service.title}</h4>
                                <p>{service.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="scroll-to-top" onClick={scrollToTop}>
                ↑
            </div>
        </section>
    );
};

export default About; 
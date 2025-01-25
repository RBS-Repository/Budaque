import React from 'react';
import { motion } from 'framer-motion';
import './HowWeWork.css';

const HowWeWork = () => {
    const steps = [
        {
            number: "01",
            icon: "🔍",
            title: "Discovery",
            description: "We dive deep to understand your vision, goals, and requirements"
        },
        {
            number: "02",
            icon: "🎯",
            title: "Strategy",
            description: "Develop a comprehensive plan and technical roadmap"
        },
        {
            number: "03",
            icon: "✨",
            title: "Design",
            description: "Create intuitive and engaging user experiences"
        },
        {
            number: "04",
            icon: "⚡",
            title: "Development",
            description: "Build robust solutions using cutting-edge technologies"
        },
        {
            number: "05",
            icon: "🚀",
            title: "Launch",
            description: "Deploy and ensure smooth operation of your solution"
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

    const stepVariants = {
        hidden: { 
            opacity: 0,
            x: -50
        },
        visible: { 
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="howwework-section" id="process">
            <div className="howwework-container">
                <motion.div 
                    className="howwework-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>How We Work</h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Our Proven Process for Success</p>
                </motion.div>

                <motion.div 
                    className="process-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            className="process-step"
                            variants={stepVariants}
                        >
                            <motion.div 
                                className="step-content"
                                whileHover={{ 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <motion.div 
                                    className="step-number"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    {step.number}
                                </motion.div>
                                <motion.div 
                                    className="step-icon"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {step.icon}
                                </motion.div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </motion.div>
                            {index < steps.length - 1 && (
                                <motion.div 
                                    className="step-connector"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowWeWork; 
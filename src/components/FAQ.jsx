import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and digital strategy consulting. Our team specializes in creating custom solutions tailored to your specific needs."
        },
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary depending on scope and complexity. A typical website project takes 6-12 weeks, while larger applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation."
        },
        {
            question: "What is your development process?",
            answer: "Our development process follows an agile methodology with five key phases: Discovery, Strategy, Design, Development, and Launch. We maintain clear communication and regular updates throughout the project lifecycle."
        },
        {
            question: "Do you provide ongoing support?",
            answer: "Yes, we offer comprehensive post-launch support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support to ensure your solution continues to perform optimally."
        },
        {
            question: "What technologies do you use?",
            answer: "We work with modern technologies including React, Node.js, Next.js, and various cloud platforms. Our tech stack is chosen based on project requirements to ensure the best performance and scalability."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                <motion.div 
                    className="faq-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>FAQ</h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Common Questions, Expert Answers</p>
                </motion.div>

                <motion.div 
                    className="faq-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {faqs.map((faq, index) => (
                        <motion.div 
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => toggleAccordion(index)}
                        >
                            <motion.div 
                                className="faq-question"
                                initial={false}
                            >
                                <h3>{faq.question}</h3>
                                <motion.span 
                                    className="faq-icon"
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeIndex === index ? '−' : '+'}
                                </motion.span>
                            </motion.div>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div 
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import './Contact.css';

const Contact = () => {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

    const services = [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Digital Strategy",
        "Cloud Solutions",
        "Custom Software Development"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch("https://formspree.io/f/your-form-id", {
                method: "POST",
                body: new FormData(e.target),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
        
        setIsSubmitting(false);
    };

    return (
        <section className="contact-section" id="contact">
            <div className="spline-background3">
                <Spline 
                    scene="https://prod.spline.design/6OEgOviG8e8BuK8a/scene.splinecode"
                    onLoad={() => setIsLoading(false)}
                />
                {isLoading && (
                    <div className="loading-screen">
                        <div className="loader"></div>
                        <p>Loading 3D Scene...</p>
                    </div>
                )}
            </div>
            
            <div className="contact-overlay"></div>
            <div className="blur-overlay"></div>

            <div className="contact-container">
                <motion.div 
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="contact-info"
                        variants={itemVariants}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Get In Touch
                        </motion.h2>
                        <div className="section-line"></div>
                        <p className="section-subtitle">Let's Create Something Amazing Together</p>
                        
                        <motion.div 
                            className="contact-details"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: "📍", title: "Location", text: "Your Address Here" },
                                { icon: "📧", title: "Email", text: "hello@yourcompany.com" },
                                { icon: "📱", title: "Phone", text: "+1 (234) 567-8900" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="contact-item"
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.div 
                                        className="contact-icon"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 * index }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="contact-form-container"
                        variants={itemVariants}
                    >
                        <motion.form 
                            onSubmit={handleSubmit} 
                            className="contact-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {[
                                { type: "text", name: "name", placeholder: "Your Name" },
                                { type: "email", name: "email", placeholder: "Your Email" }
                            ].map((input, index) => (
                                <motion.div 
                                    key={index}
                                    className="form-group"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 * index }}
                                >
                                    <input 
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        required
                                    />
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                className="form-group"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <select name="service" required>
                                    <option value="">Select Service</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div 
                                className="form-group"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                            >
                                <textarea 
                                    name="message" 
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                ></textarea>
                            </motion.div>

                            <motion.button 
                                type="submit" 
                                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                            
                            <AnimatePresence>
                                {status && (
                                    <motion.div 
                                        className={`form-message ${status}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        {status === 'success' ? 
                                            'Message sent successfully!' : 
                                            'Failed to send message. Please try again.'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact; 
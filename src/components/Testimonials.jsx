import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Grace Espiritu",
           
            image: "https://www.shutterstock.com/image-photo/happy-young-confident-asian-business-260nw-2347736311.jpg",
            text: "Grabe, sobrang ganda ng website ko ngayon! Hindi ko inexpect na ganito kaganda ang magiging outcome. Dati basic lang talaga website namin, pero ngayon professional na professional tingnan!",
            rating: 5
        },
        {
            name: "Tina Ignacio",
         
            image: "https://images.unsplash.com/photo-1708585919491-d089c4e5fe79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZpbGlwaW5vfGVufDB8fDB8fHww",
            text: "Ang dami na naming customers ngayon kasi ang smooth ng ordering system. Dati nahihirapan kami mag-track ng orders, ngayon automated na lahat. Worth it talaga!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Startup Founder",
            image: "https://mir-s3-cdn-cf.behance.net/user/276/849cb1229584.63ea25b8b288c.jpg",
            text: "BMMC helped us bring our vision to life. Their understanding of modern web technologies and design trends is exceptional.",
            rating: 5
        },
        {
            name: "Paolo Mendoza",
           
            image: "https://images.unsplash.com/photo-1578942025297-433b80a70874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGZpbGlwaW5vfGVufDB8fDB8fHww",
            text: "Super responsive ng team sa lahat ng requests namin. Kahit mga biglaan naming changes, inaacommodate nila. Tapos ang bilis pa mag-reply sa mga concerns!",
            rating: 5
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

    const testimonialVariants = {
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
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                <motion.div 
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Client Testimonials</h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">What Our Clients Say About Us</p>
                </motion.div>

                <motion.div 
                    className="testimonials-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="testimonial-item"
                            variants={testimonialVariants}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="testimonial-content">
                                <motion.div 
                                    className="testimonial-header"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="testimonial-image">
                                        <motion.img 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        />
                                    </div>
                                    <div className="testimonial-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                        <motion.div 
                                            className="rating"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <motion.span 
                                                    key={i} 
                                                    className="star"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                                >
                                                    ★
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </div>
                                </motion.div>
                                <motion.div 
                                    className="testimonial-body"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <span className="quote-mark">"</span>
                                    <p className="testimonial-text">{testimonial.text}</p>
                                    <span className="quote-mark closing">"</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials; 
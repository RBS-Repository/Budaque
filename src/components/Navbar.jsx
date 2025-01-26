import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.3
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <span className="logo-text">BMMC</span>
                </div>
                
                {/* Desktop Menu */}
                <div className="navbar-links desktop-menu">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#services" className="nav-link">Services</a>
                  
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="#contact" className="nav-link contact-btn">Contact</a>
                    
                </div>

                {/* Hamburger Button */}
                <motion.button 
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                >
                    <motion.span 
                        className={`hamburger-line ${isOpen ? 'open' : ''}`}
                    ></motion.span>
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="mobile-menu"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="mobile-menu-links">
                                <motion.a 
                                    href="#home" 
                                    className="nav-link"
                                    onClick={closeMenu}
                                    whileHover={{ x: 10 }}
                                >
                                    Home
                                </motion.a>
                                <motion.a 
                                    href="#about" 
                                    className="nav-link"
                                    onClick={closeMenu}
                                    whileHover={{ x: 10 }}
                                >
                                    About
                                </motion.a>
                                <motion.a 
                                    href="#services" 
                                    className="nav-link"
                                    onClick={closeMenu}
                                    whileHover={{ x: 10 }}
                                >
                                    Services
                                </motion.a>
                                <motion.a 
                                    href="#projects" 
                                    className="nav-link"
                                    onClick={closeMenu}
                                    whileHover={{ x: 10 }}
                                >
                                    Projects
                                </motion.a>
                                <motion.a 
                                    href="#contact" 
                                    className="nav-link contact-btn"
                                    onClick={closeMenu}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Contact
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar; 
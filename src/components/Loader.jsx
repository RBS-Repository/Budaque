import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = () => {
    return (
        <AnimatePresence>
            <motion.div 
                className="loader-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="loader"
            >
                <div className="loader-content">
                    <motion.div 
                        className="loader-circle"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="loader-text">BMMC</span>
                    </motion.div>
                    <motion.p 
                        className="loading-text"
                        animate={{ 
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Loading...
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loader; 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import './Projects.css';

const Projects = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const projectsPerPage = 6; // Show 6 projects initially (2 rows of 3)
    const [activeIndex, setActiveIndex] = useState(null);

    const projects = [
        {
            title: "Memecoin Web3",
            description: "A cryptocurrency platform designed for meme enthusiasts",
            tech: ["React", "Node.js", "MongoDB"],
            image: "./project1.png",
            category: 'Web',
            link: "https://memecoin-woad.vercel.app/",
         
        },
        {
            title: "Himari AI Web3",
            description: "Future AI entity bridging human-AI understanding.",
            tech: ["Vue.js", "AWS", "Python"],
            image: "./project2.png",
            category: 'Web',
            link: "https://www.himari.io/",
      
        },
        {
            title: "Fear of God",
            description: "A platform for the latest news and updates on Fear of God.",
            tech: ["Next.js", "OpenAI", "PostgreSQL"],
            image: "./project3.png",
            category: 'Design',
            link: "https://fearofgod.com/en-ph"
        },
        {
            title: "Personal Porfolio",
            description: "A dynamic portfolio with chatbot implementation,",
            tech: ["React Native", "Firebase", "Three.js"],
            image: "./project4.png",
            category: 'Mobile',
             link: "https://rbs-repository.github.io/Ronelp/",
        },
        {
            title: "Two14 Cafe",
            description: "A modern cafe website designed to showcase their diverse menu offerings",
            tech: ["Python", "React", "TensorFlow"],
            image: "./project5.png",
            category: 'Web',
            link: "https://two14coffee.com.au/",
        },
        {
            title: "The Violet hour",
            description: "A  modern cocktail website featuring their menu",
            tech: ["Angular", "Node.js", "MySQL"],
            image: "./project6.png",
            category: 'Web',
            link: "https://www.theviolethour.com/",
        },
        {
            title: "Nalen Ayurveda",
            description: "A skincare e-commerce platform showcasing Bright Face Cleanser's products",
            tech: ["React", "Socket.io", "MongoDB"],
            image: "./project7.png",
            category: 'Web',
            link: "https://www.nalenayurveda.com/",
        },
        {
            title: "Cloe Cassandro",
            description: "A sustainable fashion brand offering unique and stylish clothing",
            tech: ["Web3.js", "React", "Solidity"],
            image: "./project8.png",
            category: 'Other',
            link: "https://cloecassandro.com/",
        },
        {
            title: "Magic Spoon Cereal",
            description: "A modern e-commerce platform selling healthy, low-carb cereals with unique flavors",
            tech: ["Vue.js", "MQTT", "GraphQL"],
            image: "./project9.png",
            category: 'Web',
            link: "https://magicspoon.com/",
        },
        {
            title: "Blakes Sweet Treats",
            description: "A delightful e-commerce website specializing in crispy sweet treats and desserts, ",
            tech: ["Unity", "ARKit", "React Native"],
            image: "./project10.png",
            category: 'Mobile',
            link: "https://www.eatblakes.com/",
        },
        {
            title: "L'ATELIER Restaurant",
            description: "An elegant French restaurant website showcasing their exquisite menu",
            tech: ["React", "Node.js", "AWS"],
            image: "./project11.png",
            category: 'Web',
            link: "https://www.ateliersaintbarth.fr/",
        },
        {
            title: "E-Commerce Website",
            description: "A full-featured online store built with React, Node.js, and MongoDB",
            tech: ["Angular", "Python", "TensorFlow"],
            image: "./project12.png",
            category: 'Web',
            link: "https://eastwing23.vercel.app/",
        },
        {
            title: "Photography Portfolio",
            description: "A photographer's portfolio showcasing their masterpiece into digital world,",
            tech: ["Angular", "Python", "TensorFlow"],
            image: "./project13.png",
            category: 'Web',
            link: "https://www.elizabethweinberg.com/"
        },
        {
            title: "Fashion E-Commerce Website",
            description: "A modern fashion retail platform featuring a curated collection of clothing,",
            tech: ["Angular", "Python", "TensorFlow"],
            image: "./project14.png",
            category: 'Web',
            link: "https://www.shenannz.com/",
        }
 
    ];

    const displayedProjects = showAll ? projects : projects.slice(0, projectsPerPage);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const handleCardClick = (index) => {
        if (window.matchMedia('(hover: none)').matches) {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        <section className="projects-section" id="projects">
            <div className="spline-background2">
                <Spline 
                    scene="https://prod.spline.design/t6VPARTahoXxRKei/scene.splinecode"
                    onLoad={() => setIsLoading(false)}
                />
                {isLoading && (
                    <div className="loading-screen">
                        <div className="loader"></div>
                        <p>Loading 3D Scene...</p>
                    </div>
                )}
            </div>
            
            <div className="projects-overlay"></div>
            <div className="blur-overlay"></div>

            <div className="projects-container">
                <motion.div 
                    className="projects-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Projects</h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Showcasing Our Creative Work</p>
                </motion.div>

                <motion.div 
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {displayedProjects.map((project, index) => (
                        <motion.div 
                            key={project.title}
                            className={`project-card ${activeIndex === index ? 'active' : ''}`}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            layout
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                <div className="project-overlay">
                                    <div className="project-details">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="tech-tags">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="project-links">
                                            {project.link && (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="view-project"
                                                >
                                                    View Live
                                                </a>
                                            )}
                                            {project.github && (
                                                <a 
                                                    href={project.github} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="view-project github"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {projects.length > projectsPerPage && (
                    <motion.div 
                        className="view-more-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button 
                            className="view-more-button"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'View Less' : 'View More'}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects; 
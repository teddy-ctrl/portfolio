import React, { useState, useRef } from 'react';
import styles from './Projects.module.css';
import useOnScreen from '../../hooks/useOnScreen';
import ProjectModal from '../ProjectModal/ProjectModal.jsx';
// Correctly import only the two data variables we are using.
import { featuredProject, otherProjects } from './projectsData.js';
import { FiLayers, FiDatabase, FiUsers } from 'react-icons/fi';

const iconMap = {
    FiUsers: <FiUsers />,
    FiDatabase: <FiDatabase />,
    FiLayers: <FiLayers />,
};

const Projects = () => {
    const sectionRef = useRef();
    const isVisible = useOnScreen(sectionRef);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (project) => {
        setModalData(project);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setModalData(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <section id="projects" className="section" ref={sectionRef}>
                <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="sectionTitle">Featured & Recent Works</h2>
                    
                    {/* --- 1. Renders the single featured project --- */}
                    <div className={styles.featuredCard} onClick={() => handleOpenModal(featuredProject)}>
                        <div className={styles.featuredImageContainer}>
                            <img src={featuredProject.image} alt={featuredProject.title} className={styles.featuredImage} />
                        </div>
                        <div className={styles.featuredContent}>
                            <p className={styles.featuredTag}>Featured Project</p>
                            <h3 className={styles.featuredTitle}>{featuredProject.title}</h3>
                            <p className={styles.featuredDescription}>{featuredProject.description}</p>
                            <ul className={styles.keyFeatures}>
                                {featuredProject.keyFeatures.map(feature => (
                                    <li key={feature.text}>
                                        {iconMap[feature.icon]}
                                        <span>{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.techList}>
                                {featuredProject.technologies.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
                            </div>
                        </div>
                    </div>

                    <div className={styles.projectsGrid}>
                        {otherProjects.map((project) => (
                            <div key={project.id} className={styles.projectCard} onClick={() => handleOpenModal(project)}>
                                <div className={styles.imageContainer}>
                                    <img src={project.image} alt={project.title} className={styles.projectImage} />
                                    <div className={styles.overlay}>
                                        {/* <h3 className={styles.projectTitle}>{project.title}</h3>
                                        <p className={styles.projectDescription}>{project.description}</p> */}
                                    </div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {modalData && <ProjectModal project={modalData} onClose={handleCloseModal} />}
        </>
    );
};

export default Projects;
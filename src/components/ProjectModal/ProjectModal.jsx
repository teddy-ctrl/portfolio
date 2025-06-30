import React from 'react';
import styles from './ProjectModal.module.css';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectModal = ({ project, onClose }) => {
    // A small helper to prevent clicks on links from closing the modal
    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <FiX />
                </button>
                <div className={styles.modalContent}>
                    <img src={project.image} alt={project.title} className={styles.modalImage} />
                    <h2 className={styles.modalTitle}>{project.title}</h2>
                    
                    <div className={styles.caseStudySection}>
                        <h3>The Problem</h3>
                        <p>{project.caseStudy.problem}</p>
                    </div>

                    <div className={styles.caseStudySection}>
                        <h3>The Solution</h3>
                        <p>{project.caseStudy.solution}</p>
                    </div>

                    <div className={styles.caseStudySection}>
                        <h3>My Role</h3>
                        <p>{project.caseStudy.role}</p>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.techList}>
                            {project.technologies.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
                        </div>
                        
                        {/* ======================= UPDATED LINKS SECTION ======================= */}
                        {/* This section now uses the links from the project data.             */}
                        {/* We also check if a link exists before rendering the icon.           */}
                        {/* ===================================================================== */}
                        <div className={styles.projectLinks}>
                            {project.repoLink && (
                                <a 
                                  href={project.repoLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  aria-label="GitHub Repository"
                                  onClick={handleLinkClick}
                                >
                                    <FiGithub />
                                </a>
                            )}
                            {project.liveLink && (
                                <a 
                                  href={project.liveLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  aria-label="Live Demo"
                                  onClick={handleLinkClick}
                                >
                                    <FiExternalLink />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
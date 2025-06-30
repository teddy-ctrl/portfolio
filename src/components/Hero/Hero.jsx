import React from 'react';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';
import heroImage from '../../assets/image.jpg'; // Update path if needed

// The SVG filter for creating the "rough" line effect.
const RoughLinesFilter = () => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="rough-lines-filter">
            <feTurbulence baseFrequency="0.02 0.05" numOctaves="1" result="turbulence" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
        </filter>
    </svg>
);

// The background component for the diamond pattern.
const DiamondGridBackground = ({ numLines = 20 }) => (
    <div className={styles.diamondBackground}>
        <div className={styles.gridContainer}>
            {Array.from({ length: numLines }).map((_, i) => (
                <div key={`h-${i}`} className={styles.gridLine} style={{ top: `${(i / (numLines - 1)) * 100}%` }} />
            ))}
            {Array.from({ length: numLines }).map((_, i) => (
                <div key={`v-${i}`} className={styles.gridLine} style={{ left: `${(i / (numLines - 1)) * 100}%` }} />
            ))}
        </div>
    </div>
);


const Hero = () => {
    const techStack = ['React', 'Node.js', 'TypeScript', 'Go', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Next.js'];
    const techStackLoop = [...techStack, ...techStack];

    return (
        <section id="hero" className={styles.heroContainer}>
            <RoughLinesFilter />
            <DiamondGridBackground />
            
            <main className={styles.mainContent}>
                {/* --- UPDATED: Text is now on the left --- */}
                <div className={styles.textSide}>
                    <h1 className={styles.mainHeading}>
                        Architecting Scalable Systems & Intuitive Interfaces.
                    </h1>
                    
                    <p className={styles.subheading}>
                        A full-stack engineer focused on performance, user experience, and writing clean, efficient code.
                    </p>
                    
                    <Link to="contact" spy={true} smooth={true} offset={-80} duration={500} className={styles.ctaButton}>
                        Let's Connect
                    </Link>
                </div>

                {/* --- UPDATED: Image is now on the right --- */}
                <div 
                    className={styles.imageSide} 
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
            </main>

            <footer className={styles.footer}>
                <div className={styles.techStackScroller}>
                    <div className={styles.scrollerInner}>
                        {techStackLoop.map((tech, index) => (
                            <span key={index} className={styles.techItem}>{tech}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Hero;
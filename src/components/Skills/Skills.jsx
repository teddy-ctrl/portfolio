import React, { useRef } from 'react';
import styles from './Skills.module.css';
import useOnScreen from '../../hooks/useOnScreen';
import { FaReact, FaNodeJs, FaDatabase, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiPostgresql, SiMysql, SiExpress, SiPrisma, SiHtml5, SiCss3 } from 'react-icons/si';

const skillsData = {
    "Front-End": [
        { name: 'React', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'HTML5', icon: <SiHtml5 /> },
        { name: 'CSS3', icon: <SiCss3 /> },
        { name: 'JavaScript (ES6+)', icon: <SiJavascript /> },
    ],
    "Back-End": [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Express.js', icon: <SiExpress /> },
        { name: 'Prisma ORM', icon: <SiPrisma /> },
    ],
    "Databases & DevOps": [
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'MYSQL', icon: <SiMysql /> },
        { name: 'Docker', icon: <FaDocker /> },
        { name: 'AWS', icon: <FaAws /> },
        { name: 'Git & GitHub', icon: <FaGitAlt /> }
    ]
};

const Skills = () => {
    const sectionRef = useRef();
    const isVisible = useOnScreen(sectionRef);

    return (
        <section id="skills" className="section" ref={sectionRef}>
            <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                <h2 className="sectionTitle">My Tech Stack</h2>
                <div className={styles.skillsContainer}>
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category} className={styles.categoryCard}>
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.skillsGrid}>
                                {skills.map((skill) => (
                                    <div key={skill.name} className={styles.skillCard}>
                                        <div className={styles.skillIcon}>{skill.icon}</div>
                                        <span className={styles.skillName}>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
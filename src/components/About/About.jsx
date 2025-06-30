import React, { useRef, useState } from "react";
import styles from "./About.module.css";
import useOnScreen from "../../hooks/useOnScreen";
import { FiDownload, FiCode, FiUserCheck, FiPenTool } from "react-icons/fi";
import resumePDF from "../../assets/resume.pdf";

const philosophyPoints = [
  {
    icon: <FiPenTool />,
    title: "Pixel-Perfect Design",
    description:
      "I believe great design is in the details. I strive to translate UI/UX designs into flawless, high-fidelity web experiences.",
  },
  {
    icon: <FiUserCheck />,
    title: "User-Centric Approach",
    description:
      "The most successful applications are intuitive and a joy to use. I prioritize the end-user's experience in every decision.",
  },
  {
    icon: <FiCode />,
    title: "Clean & Scalable Code",
    description:
      "I write code that is not only functional but also maintainable and easy for other developers to understand and build upon.",
  },
];

const About = () => {
  const sectionRef = useRef();
  const isVisible = useOnScreen(sectionRef);

  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return; // Safety check
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = e;

    const x = clientX - card.getBoundingClientRect().left;
    const y = clientY - card.getBoundingClientRect().top;

    const rotateX = (y / height - 0.5) * -15;
    const rotateY = (x / width - 0.5) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
    });
  };

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className={`animate-on-scroll ${isVisible ? "is-visible" : ""}`}>
        <h2 className="sectionTitle">The Architect Behind the Code</h2>

        <div className={styles.aboutGrid}>
          <div
            className={styles.imageContainer}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
          >
            <div className={styles.imageCard}>
              <img
                src="/back.png"
                alt="[Tewodros]"
                className={styles.profileImage}
              />
            </div>
          </div>

          <div className={styles.textContainer}>
            <h3 className={styles.greeting}>Hello there, I'm Tewodros G.</h3>
            <p className={styles.bio}>
              I'm a passionate full-stack developer, with a deep-seated love for
              creating elegant, efficient, and intuitive digital experiences. My
              journey into the world of code began not in a classroom, but with
              a simple fascination for how beautiful design and powerful
              technology could intersect to create magic on a screen.
            </p>
            <p className={styles.bio}>
              Today, I specialize in turning complex problems into beautiful,
              functional user interfaces. Whether it's a dynamic web application
              or a pixel-perfect marketing site, I bring a commitment to
              excellence and a user-first mindset to every project.
            </p>
            <a
              href={resumePDF}
              download="[YourName]-FullStack-Resume.pdf"
              className={styles.resumeButton}
            >
              <FiDownload /> Download My Resume
            </a>
          </div>
        </div>

        <div className={styles.philosophySection}>
          <h3 className={styles.philosophyTitle}>My Development Philosophy</h3>
          <div className={styles.philosophyGrid}>
            {/* 
                  THIS IS THE FIX.
                  We now correctly define `index` as the second argument from .map()
                */}
            {philosophyPoints.map((point, index) => (
              <div key={index} className={styles.philosophyCard}>
                <div className={styles.philosophyIcon}>{point.icon}</div>
                <h4>{point.title}</h4>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
// NEW: Import Link and animateScroll from react-scroll
import { Link, animateScroll as scroll } from 'react-scroll';
import styles from './Header.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// This component remains the same
const TwoLineHamburgerIcon = ({ isOpen, onClick }) => (
    <button className={styles.hamburgerButton} onClick={onClick} aria-label="Toggle menu">
        <div className={`${styles.line} ${styles.line1} ${isOpen ? styles.lineOpen : ''}`}></div>
        <div className={`${styles.line} ${styles.line2} ${isOpen ? styles.lineOpen : ''}`}></div>
    </button>
);


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect for the sticky header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  // NEW: Function to scroll to the top
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // NEW: Function to close menu and then scroll
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          {/* UPDATED: Changed from <a> to a clickable element that scrolls to top */}
          <div
            onClick={scrollToTop}
            className={styles.logo}
            aria-label="Go to top of page"
            style={{ cursor: 'pointer' }}
          >
            <img className={styles.headerLogo} src="/header.png" alt="logo" />
          </div>

          {/* --- Desktop Navigation --- */}
          {/* UPDATED: Changed <a> to react-scroll's Link */}
          <div className={styles.desktopNav}>
              <ul className={styles.navLinks}>
                  <li><Link activeClass={styles.activeLink} to="about" spy={true} smooth={true} offset={-80} duration={500}>About</Link></li>
                  <li><Link activeClass={styles.activeLink} to="skills" spy={true} smooth={true} offset={-80} duration={500}>Skills</Link></li>
                  <li><Link activeClass={styles.activeLink} to="projects" spy={true} smooth={true} offset={-80} duration={500}>Projects</Link></li>
                  <li><Link activeClass={styles.activeLink} to="contact" spy={true} smooth={true} offset={-80} duration={500}>Contact</Link></li>
              </ul>
              <ThemeToggle />
          </div>

          {/* --- Mobile Controls Wrapper --- */}
          <div className={styles.mobileControls}>
            <ThemeToggle />
            <TwoLineHamburgerIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </nav>
      </header>

      {/* --- "Command Palette" Mobile Menu --- */}
      <div className={`${styles.menuOverlay} ${isMenuOpen ? styles.isOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavLinks}>
            {/* UPDATED: Changed <a> to react-scroll's Link and moved the onClick handler */}
            <li style={{ animationDelay: '0.2s' }}>
                <Link to="about" spy={true} smooth={true} offset={-80} duration={500} onClick={handleLinkClick}>About</Link>
            </li>
            <li style={{ animationDelay: '0.3s' }}>
                <Link to="skills" spy={true} smooth={true} offset={-80} duration={500} onClick={handleLinkClick}>Skills</Link>
            </li>
            <li style={{ animationDelay: '0.4s' }}>
                <Link to="projects" spy={true} smooth={true} offset={-80} duration={500} onClick={handleLinkClick}>Projects</Link>
            </li>
            <li style={{ animationDelay: '0.5s' }}>
                <Link to="contact" spy={true} smooth={true} offset={-80} duration={500} onClick={handleLinkClick}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
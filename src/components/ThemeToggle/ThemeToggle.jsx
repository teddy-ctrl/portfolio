import React from 'react';
import styles from './ThemeToggle.module.css';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const ThemeToggle = () => {
  // Get the current theme and the function to toggle it from our context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme} // Use the toggleTheme function from context on click
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* The visible icon is controlled by the .iconWrapper's transform */}
      <div className={styles.iconWrapper}>
        <FiSun className={`${styles.icon} ${styles.sun}`} />
        <FiMoon className={`${styles.icon} ${styles.moon}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
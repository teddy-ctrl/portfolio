import React, { useEffect, useMemo, useRef } from 'react';
import styles from './GlobalBackground.module.css';

const GlobalBackground = () => {
  const containerRef = useRef(null);

  const starLayers = useMemo(() => {
    const createStars = (count, minSize, maxSize) =>
      Array.from({ length: count }).map(() => ({
        size: Math.random() * (maxSize - minSize) + minSize,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${2 + Math.random() * 4}s`,
      }));

    return {
      far: createStars(80, 0.5, 1.2),
      mid: createStars(40, 0.8, 1.8),
      close: createStars(15, 1.2, 2.5),
    };
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      top: `${10 + Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${i * (20 / 3) + 5}s`,
    }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      container.style.setProperty('--mouse-x', `${x * 100}`);
      container.style.setProperty('--mouse-y', `${y * 100}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.starryBackground} ref={containerRef}>
      <div className={`${styles.starLayer} ${styles.layerFar}`}>
        {starLayers.far.map((star, i) => <span key={`far-${i}`} className={styles.glowingStar} style={{ width: `${star.size}px`, height: `${star.size}px`, top: star.top, left: star.left, animationDelay: star.animationDelay, animationDuration: star.animationDuration }} />)}
      </div>
      <div className={`${styles.starLayer} ${styles.layerMid}`}>
        {starLayers.mid.map((star, i) => <span key={`mid-${i}`} className={styles.glowingStar} style={{ width: `${star.size}px`, height: `${star.size}px`, top: star.top, left: star.left, animationDelay: star.animationDelay, animationDuration: star.animationDuration }} />)}
        {shootingStars.map((star, i) => <span key={`shoot-${i}`} className={styles.shootingStar} style={star} />)}
      </div>
      <div className={`${styles.starLayer} ${styles.layerClose}`}>
        {starLayers.close.map((star, i) => <span key={`close-${i}`} className={styles.glowingStar} style={{ width: `${star.size}px`, height: `${star.size}px`, top: star.top, left: star.left, animationDelay: star.animationDelay, animationDuration: star.animationDuration }} />)}
      </div>
    </div>
  );
};

export default GlobalBackground;
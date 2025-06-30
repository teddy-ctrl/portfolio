import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonials.module.css';
import useOnScreen from '../../hooks/useOnScreen';
import { useSwipeable } from 'react-swipeable';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// ================================================================
// THE DATA ARRAY MUST BE DEFINED OR IMPORTED IN THIS FILE
// This was the likely cause of the error.
// ================================================================
const testimonialsData = [
    {
        quote: "Working with them was a game-changer. Their attention to detail and commitment to user experience resulted in a product that our users absolutely love. A true professional.",
        author: "Jane Doe",
        title: "CEO, Tech Solutions Inc."
    },
    {
        quote: "I was blown away by the speed and quality of the final website. It not only looks amazing but also performs flawlessly. I couldn't be happier with the result.",
        author: "John Smith",
        title: "Founder, Creative Co."
    },
    {
        quote: "The ability to translate complex ideas into a beautiful, functional interface is a rare talent. They have that talent in spades. Highly recommended!",
        author: "Emily White",
        title: "Product Manager, Innovate Corp"
    },
    {
        quote: "The collaboration was seamless, and the final product exceeded all our expectations. A top-tier developer with excellent communication skills.",
        author: "Michael Lee",
        title: "CTO, Future Systems"
    }
];

const Testimonials = () => {
    const sectionRef = useRef();
    const isVisible = useOnScreen(sectionRef);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animation, setAnimation] = useState('fadeIn');
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);

    // All the logic from the previous answer is correct.
    const handleNavigate = useCallback((direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        const isNext = direction === 'next';
        setAnimation(isNext ? 'fadeOutNext' : 'fadeOutPrev');
        setTimeout(() => {
            setCurrentIndex((prev) => {
                if (isNext) return (prev + 1) % testimonialsData.length;
                return (prev - 1 + testimonialsData.length) % testimonialsData.length;
            });
            setAnimation(isNext ? 'fadeInNext' : 'fadeInPrev');
            setTimeout(() => setIsTransitioning(false), 300);
        }, 300);
    }, [isTransitioning]);

    const handleDotClick = (index) => {
        if (index === currentIndex || isTransitioning) return;
        setIsTransitioning(true);
        setAnimation('fadeOut');
        setTimeout(() => {
            setCurrentIndex(index);
            setAnimation('fadeIn');
            setTimeout(() => setIsTransitioning(false), 300);
        }, 300);
    };

    useEffect(() => {
        if (isPaused || !isVisible || testimonialsData.length <= 1) {
            clearTimeout(timeoutRef.current);
            return;
        }
        timeoutRef.current = setTimeout(() => handleNavigate('next'), 8000);
        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, isPaused, isVisible, handleNavigate]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNavigate('next'),
        onSwipedRight: () => handleNavigate('prev'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    // ================================================================
    // ADD THIS "GUARD CLAUSE"
    // This prevents the component from rendering if the data is missing,
    // which fixes the crash and is a robust programming practice.
    // ================================================================
    if (!testimonialsData || testimonialsData.length === 0) {
        return null; // or return a loading spinner, or a "no testimonials" message
    }

    const getSlideIndex = (offset) => (currentIndex + offset + testimonialsData.length) % testimonialsData.length;

    return (
        <section id="testimonials" className="section" ref={sectionRef}>
            <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                <h2 className="sectionTitle">What People Are Saying</h2>
                
                <div 
                    className={styles.carouselContainer} 
                    {...swipeHandlers} 
                    onMouseEnter={() => setIsPaused(true)} 
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <button onClick={() => handleNavigate('prev')} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous testimonial" disabled={isTransitioning}>
                        <FiChevronLeft />
                    </button>

                    <div className={styles.carouselFrame}>
                        <div className={`${styles.slide} ${styles.sideSlide}`} aria-hidden="true">
                            <div className={styles.testimonialCard}>
                                <p className={styles.quoteText}>{testimonialsData[getSlideIndex(-1)].quote}</p>
                            </div>
                        </div>

                        <div className={`${styles.slide} ${styles.centerSlide}`} aria-live="polite">
                            <div className={`${styles.testimonialCard} ${styles[animation]}`} key={currentIndex}>
                                <FaQuoteLeft className={styles.quoteIcon} />
                                <p className={styles.quoteText}>{testimonialsData[currentIndex].quote}</p>
                                <div className={styles.authorInfo}>
                                    <p className={styles.authorName}>{testimonialsData[currentIndex].author}</p>
                                    <p className={styles.authorTitle}>{testimonialsData[currentIndex].title}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`${styles.slide} ${styles.sideSlide}`} aria-hidden="true">
                            <div className={styles.testimonialCard}>
                                <p className={styles.quoteText}>{testimonialsData[getSlideIndex(1)].quote}</p>
                            </div>
                        </div>
                    </div>
                    
                    <button onClick={() => handleNavigate('next')} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next testimonial" disabled={isTransitioning}>
                        <FiChevronRight />
                    </button>
                </div>

                <div className={styles.dotsContainer}>
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                            disabled={isTransitioning}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
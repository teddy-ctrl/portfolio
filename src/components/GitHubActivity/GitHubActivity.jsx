import React, { useState, useEffect, useRef } from 'react';
import styles from './GitHubActivity.module.css';
import useOnScreen from '../../hooks/useOnScreen';
import { FiGitCommit, FiGitBranch, FiStar, FiUploadCloud } from 'react-icons/fi';

//  IMPORTANT: ONLY THE USERNAME, NOT THE FULL URL
const GITHUB_USERNAME = "teddy-ctrl"; 

const eventIcons = {
    PushEvent: <FiGitCommit />,
    CreateEvent: <FiGitBranch />,
    WatchEvent: <FiStar />
};

// A more robust formatter to handle different event types and payloads
const formatEvent = (event) => {
    try {
        switch(event.type) {
            case 'PushEvent':
                const branch = event.payload.ref.split('/').pop();
                const commitCount = event.payload.commits.length;
                return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${event.repo.name.split('/')[1]} [${branch}]`;
            case 'CreateEvent':
                if (event.payload.ref_type === 'repository') {
                    return `Created new repository ${event.repo.name}`;
                } else if (event.payload.ref_type === 'branch') {
                    return `Created new branch in ${event.repo.name}`;
                }
                return null; // Ignore other create events like tags
            case 'WatchEvent':
                return `Starred repository ${event.repo.name}`;
            case 'ForkEvent':
                return `Forked ${event.repo.name} to ${event.payload.forkee.full_name}`;
            case 'PublicEvent':
                return `Made ${event.repo.name} public`;
            default:
                return null;
        }
    } catch (e) {
        // If any property is missing (e.g., old event types), just ignore it
        return null;
    }
}

const GitHubActivity = () => {
    const sectionRef = useRef();
    const isVisible = useOnScreen(sectionRef);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // This URL will now be correct: https://api.github.com/users/teddy-ctrl/events/public
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch GitHub activity. Status: ${response.status}`);
                }
                const data = await response.json();
                const formattedEvents = data.map(formatEvent).filter(Boolean).slice(0, 5); // Get latest 5 valid events
                setActivities(formattedEvents);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []); // Empty dependency array means this runs once on component mount

    const renderContent = () => {
        if (isLoading) {
            return <p>Loading recent activity...</p>;
        }
        if (error) {
            return <p className={styles.errorText}>Could not load GitHub activity: User not found or API rate limit exceeded.</p>;
        }
        if (activities.length === 0) {
            return <p>No recent public activity found for this user.</p>;
        }
        return (
            <ul className={styles.activityList}>
                {activities.map((activity, index) => (
                    <li key={index} className={styles.activityItem}>
                        <span className={styles.icon}>{/* You could add more specific icons here */} <FiGitCommit /></span>
                        <span>{activity}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section id="github" className="section" ref={sectionRef}>
            <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
                <h2 className="sectionTitle">Live from GitHub</h2>
                <div className={styles.activityContainer}>
                    {renderContent()}
                    <a 
                        href={`https://github.com/${GITHUB_USERNAME}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.githubLink}
                    >
                        View My Full GitHub Profile <FiUploadCloud/>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GitHubActivity;
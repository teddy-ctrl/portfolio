import React, { useState, useEffect, useRef } from 'react';
import styles from './AIAssistant.module.css';
import { FaComments, FaTimes } from 'react-icons/fa';
import { SiSparkar } from 'react-icons/si';

// Pre-defined script for the "AI"
const scripts = {
    'initial': {
        bot: "Hello! I'm your personal portfolio guide. How can I help you today?",
        options: ["Tell me about your skills", "Show me your best project", "How do I contact you?"]
    },
    "Tell me about your skills": {
        bot: "Of course. I specialize in building modern web applications with technologies like React, Node.js, and advanced CSS. I'm also proficient with tools like Vite, Git, and Figma for a streamlined workflow. You can see a full list in the 'Skills' section.",
        options: ["What's your best project?", "Thanks, that's all!"]
    },
    "Show me your best project": {
        bot: "While every project is special, many visitors are impressed by the 'Interactive Data Dashboard'. It showcases my ability to handle complex data with D3.js and create intuitive user interfaces. You can find it in the 'Selected Works' section.",
        options: ["What are your skills?", "Thanks, that's all!"]
    },
    "How do I contact you?": {
        bot: "The best way is to use the contact form at the bottom of this page. Just fill it out, and the message will be sent directly. I look forward to hearing from you!",
        options: ["Tell me about your skills", "Thanks, that's all!"]
    },
    "Thanks, that's all!": {
        bot: "You're welcome! Feel free to explore the rest of the portfolio. Have a great day!",
        options: []
    }
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [options, setOptions] = useState(scripts['initial'].options);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleOpen = () => {
        setIsOpen(true);
        if (messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([{ sender: 'bot', text: scripts['initial'].bot }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const handleOptionClick = (optionText) => {
        const userMessage = { sender: 'user', text: optionText };
        setMessages(prev => [...prev, userMessage]);
        
        const script = scripts[optionText];
        if (script) {
            setIsTyping(true);
            setOptions([]);
            setTimeout(() => {
                const botMessage = { sender: 'bot', text: script.bot };
                setMessages(prev => [...prev, botMessage]);
                setOptions(script.options);
                setIsTyping(false);
            }, 1500); // Simulate typing delay
        }
    };

    return (
        <>
            <button className={styles.fab} onClick={handleOpen} aria-label="Open AI Assistant">
                <SiSparkar />
            </button>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <h3>Portfolio Assistant</h3>
                        <button onClick={() => setIsOpen(false)} aria-label="Close chat"><FaTimes /></button>
                    </div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className={`${styles.message} ${styles.bot} ${styles.typing}`}><span></span><span></span><span></span></div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.chatFooter}>
                        {options.map((opt, index) => (
                            <button key={index} onClick={() => handleOptionClick(opt)} className={styles.optionButton}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
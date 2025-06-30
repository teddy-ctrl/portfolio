import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import useOnScreen from '../../hooks/useOnScreen';
import { FiSend, FiMail, FiCheckCircle, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const sectionRef = useRef();
  const form = useRef();
  const isVisible = useOnScreen(sectionRef);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  // This is the only function that needs to be updated.
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('Sending your message...');

    // ================== THIS IS THE CORRECTED CODE ==================
    // We use the environment variables here, inside the function.
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
          setStatus('success');
          setMessage('Message sent successfully! Thank you.');
          form.current.reset();
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          setStatus('error');
          setMessage('Failed to send message. Please try again.');
          console.error('EmailJS Error:', error);
          setTimeout(() => setStatus(''), 5000);
      });
  };

  // The extra, misplaced emailjs.sendForm() call that was here has been REMOVED.
  
  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="sectionTitle">Let's Connect</h2>
        
        <div className={styles.contactWrapper}>
            
            {/* Column 1: Info and Direct Links */}
            <div className={styles.infoSide}>
                <h3>Get in Touch</h3>
                <p className={styles.contactIntro}>
                    Have a project in mind or just want to say hi? My inbox is always open. Whether you have a question or just want to connect, feel free to reach out.
                </p>
                <div className={styles.directContact}>
                    <a href="mailto:tedu21@gmail.com" className={styles.contactItem}>
                        <FiMail className={styles.contactIcon} />
                        <span>tedu21@gmail.com</span>
                    </a>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=San+Francisco,CA"
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.contactItem}
                    >
                        <FiMapPin className={styles.contactIcon} />
                        <span>San Francisco, CA, USA</span> 
                    </a>
                </div>
                
            </div>

            {/* Column 2: The Contact Form */}
            <div className={styles.formSide}>
                <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
                    <div className={styles.inputGroup}>
                        <input type="text" name="from_name" placeholder="Your Name" required className={styles.inputField} />
                        <input type="email" name="from_email" placeholder="Your Email" required className={styles.inputField} />
                    </div>
                    <textarea name="message" placeholder="Your Message" required className={styles.textareaField}></textarea>
                    
                    <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                        <FiSend className={styles.sendIcon} />
                    </button>
                </form>

                {status && (
                    <div className={`${styles.statusMessage} ${styles[status]}`}>
                        {status === 'success' && <FiCheckCircle className={styles.statusIcon} />}
                        {status === 'error' && <FiAlertCircle className={styles.statusIcon} />}
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react'; 

import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Skills from './components/Skills/Skills.jsx';
import Projects from './components/Projects/Projects.jsx';
import GitHubActivity from './components/GitHubActivity/GitHubActivity.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
// import AIAssistant from './components/AIAssistant/AIAssistant.jsx';
import GlobalBackground from './components/GlobalBackground/GlobalBackground';
import "./App.css"


function App() {

  const [theme, setTheme] = useState('dark'); 
  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);


  return (
    <>
       <GlobalBackground />
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="App">
        <Hero />
        <About />
        <Skills />
        <Projects /> 
        <GitHubActivity />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* <AIAssistant /> */}
    </>
  );
}

export default App;
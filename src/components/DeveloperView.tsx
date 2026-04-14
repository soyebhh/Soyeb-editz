import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Contact from './Contact';

interface DeveloperViewProps {
  onSwitchToEditor: () => void;
}

const DeveloperView: React.FC<DeveloperViewProps> = ({ onSwitchToEditor }) => {
  return (
    <>
      <Hero onSwitchToEditor={onSwitchToEditor} />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
};

export default DeveloperView;

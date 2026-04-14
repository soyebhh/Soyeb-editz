import React, { useState, useEffect } from 'react';
import { ExternalLink, Video } from 'lucide-react';

interface HeroProps {
  onSwitchToEditor: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSwitchToEditor }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = ["Editor", "Developer", "Builder", "Content Creator", "Problem Solver"];
  const typingSpeed = isDeleting ? 50 : 100;
  const pauseTime = 2000;

  useEffect(() => {
    let timer: any;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center section-padding pt-32 lg:pt-0">
      <div className="container-custom">
        <div className="fade-in-section visible">
          <p className="text-accent font-medium tracking-[0.2em] uppercase mb-6 text-sm">Welcome to my space</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white">
            SOYEB<span className="text-accent">.</span>
          </h1>
          
          <div className="mt-8 h-12 flex items-center">
            <span className="text-2xl md:text-4xl text-white/50 font-light mr-4">I'm a</span>
            <span className="text-2xl md:text-4xl text-white font-medium border-r-2 border-accent pr-2 animate-pulse">
              {displayText}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <button 
                onClick={onSwitchToEditor}
                className="btn-primary group"
            >
              Editing Portfolio
              <Video size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <a href="#contact" className="btn-outline group border-accent/20 hover:border-accent text-accent">
              Let's Collab
              <ExternalLink size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-30">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;

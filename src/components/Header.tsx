import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentView: 'developer' | 'editor';
  onSwitch: (view: 'developer' | 'editor') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onSwitch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = currentView === 'developer' ? [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ] : [
    { name: 'Creators', href: '#trusted-creators' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'nav-blur py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center px-6 md:px-12">
        <a href="#" className="text-xl font-display font-bold tracking-tight text-white hover:text-accent transition-colors">
          SOYEB<span className="text-accent underline decoration-2 underline-offset-4 ml-0.5">.</span>
          <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded">
            {currentView}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button 
            onClick={() => onSwitch(currentView === 'developer' ? 'editor' : 'developer')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-white transition-colors"
          >
            Switch to {currentView === 'developer' ? 'Editor' : 'Developer'}
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => onSwitch(currentView === 'developer' ? 'editor' : 'developer')}
                className="text-[10px] font-bold uppercase tracking-widest text-accent"
            >
                {currentView === 'developer' ? 'Editor' : 'Dev'}
            </button>
            <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-white/40">Menu</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
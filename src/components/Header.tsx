import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface HeaderProps {
  currentView: 'developer' | 'editor';
  onSwitch: (view: 'developer' | 'editor') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onSwitch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ── Effect 9: GSAP glass effect on scroll ─────────────────────────────
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const past = window.scrollY > 50;
      if (past === isScrolled) return;
      setIsScrolled(past);

      if (past) {
        gsap.to(header, {
          backdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'rgba(10, 10, 10, 0.75)',
          borderBottomColor: 'rgba(124, 58, 237, 0.15)',
          boxShadow: '0 4px 30px rgba(124, 58, 237, 0.05)',
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(header, {
          backdropFilter: 'blur(0px) saturate(100%)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderBottomColor: 'rgba(124, 58, 237, 0)',
          boxShadow: '0 0 0px rgba(0,0,0,0)',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

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
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-6"
      style={{
        borderBottom: '1px solid transparent',
        willChange: 'background-color, box-shadow, backdrop-filter',
      }}
    >
      <div className="container-custom flex justify-between items-center px-6 md:px-12">
        <a href="#" className="text-xl font-display font-bold tracking-tight text-white hover:text-accent transition-colors">
          SOYEB<span className="text-accent underline decoration-2 underline-offset-4 ml-0.5">.</span>
          <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded">
            {currentView}
          </span>
        </a>

        {/* ── Effect 10: Nav links with gradient underline sweep ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-sm font-medium"
            >
              {link.name}
            </a>
          ))}

          <div className="h-6 w-px bg-white/10 mx-2" />

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
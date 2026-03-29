import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONFIG } from '../data/siteConfig';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(2, 6, 23, 0.6)' : 'rgba(2, 6, 23, 0)',
        backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)',
        paddingTop: isScrolled ? '1rem' : '1.5rem',
        paddingBottom: isScrolled ? '1rem' : '1.5rem',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    // Magnetic Nav Links
    const links = document.querySelectorAll<HTMLElement>('.nav-link');
    links.forEach((link) => {
      link.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = link.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.5;
        const y = (clientY - (top + height / 2)) * 0.5;
        gsap.to(link, { x, y, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all bg-transparent">
      <div className="text-2xl font-black tracking-tighter text-white uppercase group cursor-pointer">
        {SITE_CONFIG.BRAND} <span className="text-primary italic opacity-80 transition-opacity group-hover:opacity-100">Visuals</span>
      </div>
      
      <nav className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        {['Work', 'Reels', 'Brands', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link hover:text-white transition-colors relative">
            {item}
          </a>
        ))}
      </nav>

      <div className="nav-link">
        <a
          href={SITE_CONFIG.INSTAGRAM_URL}
          target="_blank"
          className="glass-morphism text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-2xl active:scale-95 text-center inline-block"
        >
          Let's Connect
        </a>
      </div>
    </header>
  );
};
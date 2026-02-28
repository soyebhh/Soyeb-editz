import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONFIG } from '../data/siteConfig';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(2, 6, 23, 0.7)' : 'rgba(2, 6, 23, 0)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        duration: 0.4
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
      <div className="text-xl font-black tracking-tight text-white">
        {SITE_CONFIG.BRAND.split(' ')[0]} <span className="text-primary">{SITE_CONFIG.BRAND.split(' ')[1]}</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
        {['Work', 'Reels', 'Brands', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a>
        ))}
      </nav>
      <a
        href={SITE_CONFIG.INSTAGRAM_URL}
        target="_blank"
        className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
      >
        Let's Connect
      </a>
    </header>
  );
};
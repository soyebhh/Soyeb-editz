import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';


export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let wasScrolled = false;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          if (isScrolled !== wasScrolled) {
            wasScrolled = isScrolled;
            if (headerRef.current) {
              headerRef.current.classList.toggle('header-scrolled', isScrolled);
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center bg-transparent header-base">
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
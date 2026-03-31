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
    <header ref={headerRef} className="fixed top-0 w-full z-50 py-6 px-4 md:px-12 flex justify-between items-center bg-transparent header-base">
      <a href="/" className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase group cursor-pointer no-underline border-none outline-none">
        {SITE_CONFIG.BRAND} <span className="text-primary italic opacity-90 transition-opacity group-hover:opacity-100">Visuals</span>
      </a>
      
      <nav className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        {['Work', 'Reels', 'Brands', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link hover:text-white transition-colors relative">
            {item}
          </a>
        ))}
      </nav>

      <div className="flex-shrink-0 flex items-center justify-end">
        <a
          href={SITE_CONFIG.INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-morphism text-white px-4 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_20px_rgba(255,49,49,0.1)] hover:shadow-[0_0_40px_rgba(255,49,49,0.4)] active:scale-95 text-center inline-block whitespace-nowrap border border-white/10"
        >
          Let's Connect
        </a>
      </div>
    </header>
  );
};
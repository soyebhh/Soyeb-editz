import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let wasScrolled = false;
    let ticking     = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 50;
        if (isScrolled !== wasScrolled) {
          wasScrolled = isScrolled;
          headerRef.current?.classList.toggle('header-scrolled', isScrolled);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 py-6 px-4 md:px-12 flex justify-between items-center bg-transparent header-base"
      role="banner"
    >
      <a
        href="/"
        className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase group no-underline"
        aria-label={`${SITE_CONFIG.BRAND} Visuals — Home`}
      >
        {SITE_CONFIG.BRAND}{' '}
        <span className="italic opacity-90 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--c-primary)' }}>
          Visuals
        </span>
      </a>

      <nav className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.4)' }} aria-label="Primary navigation">
        {[
          { label: 'Work',    id: 'portfolio' },
          { label: 'Reels',   id: 'reels' },
          { label: 'Process', id: 'process' },
          { label: 'Contact', id: 'contact' },
        ].map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className="nav-link hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex-shrink-0 flex items-center justify-end">
        <a
          href={SITE_CONFIG.INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="btn-ripple glass-morphism text-white px-4 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-widest transition-all active:scale-95 whitespace-nowrap border"
          style={{ borderColor: 'var(--c-border)' }}
        >
          Let's Connect
        </a>
      </div>
    </header>
  );
};
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONFIG } from '../data/siteConfig';

// Note: the full-page 3D scroll scene is now mounted once in App.tsx
// (ScrollScene – fixed, z-0). No per-section canvas is needed here.



// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero: React.FC = () => {
  const scope = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Cinematic word-reveal ──
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text
          .split(' ')
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`
          )
          .join(' ');

        gsap.to(titleRef.current.querySelectorAll('span span'), {
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        });
      }

      gsap.from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-btns > *', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 1.2,
        ease: 'power3.out',
      });

      // ── Magnetic effect ──
      const magneticElements =
        document.querySelectorAll<HTMLElement>('.magnetic');
      magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = (clientX - (left + width / 2)) * 0.3;
          const y = (clientY - (top + height / 2)) * 0.3;
          gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });
      });

      // ── Ambient ring spin ──
      gsap.to('.ig-ring', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20"
    >
      {/* 3D scene is the global fixed ScrollScene mounted in App.tsx */}

      {/* ── Legacy CSS background decor (kept for progressive enhancement) ── */}
      <div className="ig-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] border-[1px] border-white/5 rounded-[80px] md:rounded-[100px] -z-10 opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[150px] -z-10 animate-pulse-slow" />

      {/* ── Foreground content ────────────────────────────────────────────── */}
      <div className="hero-content text-center max-w-5xl relative z-10">
        {/* Profile avatar */}
        <div className="magnetic profile-wrap relative group inline-block mb-10 md:mb-14 cursor-pointer">
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-700 animate-tilt" />

          <div className="relative inline-block p-1 rounded-full bg-gradient-to-tr from-white/20 to-transparent backdrop-blur-sm shadow-2xl">
            <div className="relative bg-slate-950 rounded-full p-1.5 overflow-hidden">
              {/* LCP image – eager load, explicit size */}
              <img
                src={SITE_CONFIG.PROFILE_IMG}
                width={176}
                height={176}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                alt={SITE_CONFIG.NAME}
              />
            </div>

            {/* Status badge */}
            <div className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2 flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black text-white/90">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* Headline – synchronously rendered for LCP */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-[110px] font-black text-white leading-[0.9] mb-8 tracking-tighter"
        >
          Transforming Brands with Viral High-Impact Visuals.
        </h1>

        <p className="hero-sub text-xl md:text-2xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Professional Reel Creator &amp; Cinematographer. I craft{' '}
          <span className="text-white font-bold">scroll-stopping</span> stories
          that convert viewers into fans.
        </p>

        <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="magnetic">
            <button
              onClick={() =>
                document
                  .getElementById('reels')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Explore Portfolio
            </button>
          </div>
          <div className="magnetic">
            <a
              href={SITE_CONFIG.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 glass-morphism rounded-2xl font-bold hover:bg-white/10 transition-all text-white active:scale-95 inline-block"
            >
              DM for Collabs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
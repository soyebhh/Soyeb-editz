import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const wrapperRef  = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Entrance stagger ── */
      gsap.from('.hero-item', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: 'power4.out',
      });
      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)',
      });
      gsap.from('.hero-stat', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power3.out',
      });

      /* ── 2. Parallax — text overlay fades + drifts up ── */
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 0.3,
          },
        });
      }

      /* ── 3. Parallax — background glow orbs move at different speeds ── */
      if (bgLayer1Ref.current) {
        gsap.to(bgLayer1Ref.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
      if (bgLayer2Ref.current) {
        gsap.to(bgLayer2Ref.current, {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      /* ── 4. Stats parallax (slower layer) ── */
      if (statsRef.current) {
        gsap.to(statsRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full min-h-screen bg-black overflow-hidden" aria-label="Hero">

      {/* ── Parallax BG orbs (deep layer, moves fastest) ── */}
      <div ref={bgLayer1Ref} className="absolute inset-0 pointer-events-none z-0 parallax-layer" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--c-primary), transparent 70%)' }} />
      </div>
      <div ref={bgLayer2Ref} className="absolute inset-0 pointer-events-none z-0 parallax-layer" aria-hidden="true">
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15"
          style={{ background: 'radial-gradient(circle, var(--c-accent), transparent 70%)' }} />
      </div>

      {/* ── Watermark text ── */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none" aria-hidden="true">
        <span className="text-[25vw] font-black uppercase text-white/[0.02] leading-none tracking-tighter">
          SOYEB
        </span>
      </div>

      {/* ── Overlay content (fades on scroll) ── */}
      <div ref={overlayRef} className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen py-20 px-4">

        <div className="text-center">
          {/* Profile avatar */}
          <div className="hero-item inline-block mb-8 md:mb-10">
            <div className="relative inline-block p-[2px] rounded-full shadow-[0_0_60px_rgba(0,0,0,0.5)]"
              style={{ background: 'linear-gradient(135deg, var(--c-primary), var(--c-accent))' }}>
              <div className="relative rounded-full p-2 overflow-hidden backdrop-blur-sm border" style={{ backgroundColor: '#000', borderColor: 'var(--c-border)' }}>
                <img
                  src={SITE_CONFIG.PROFILE_IMG}
                  width={144}
                  height={144}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover"
                  alt={`${SITE_CONFIG.NAME} — Professional Video Editor Mumbai`}
                />
              </div>

              {/* Live badge */}
              <div className="hero-badge absolute -bottom-1 -right-1 md:bottom-1 md:right-1 flex items-center gap-2 px-3 py-1 bg-black border-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                style={{ borderColor: 'var(--c-primary)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--c-primary)' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--c-primary)' }} />
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white">Live</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="hero-item text-6xl md:text-[110px] font-black text-white mb-6 anime-title mt-4">
            I Make Reels That<br />
            <span className="text-gradient">Stop The Scroll.</span>
          </h1>

          {/* Subline */}
          <p className="hero-item text-lg md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] italic uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Premium <span className="font-black" style={{ color: 'var(--c-primary)' }}>Video Editing</span> &amp; Cinematography.
            We transform viewers into loyal <span className="text-white text-glow">Fans</span>.
          </p>

          {/* CTAs */}
          <div className="hero-item flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20interested%20in%20working%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-ripple px-10 py-5 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all active:scale-95 border-b-4 w-full sm:w-auto text-center"
              style={{
                backgroundColor: 'var(--c-primary)',
                color: 'var(--c-bg)',
                borderColor: 'color-mix(in srgb, var(--c-primary) 70%, black)',
                boxShadow: '0 20px 60px color-mix(in srgb, var(--c-primary) 30%, transparent)',
              }}
            >
              Let's Work Together → WhatsApp
            </a>
            <button
              onClick={() => document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' })}
              data-hover
              className="btn-ripple px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all text-white active:scale-95 w-full sm:w-auto glass-morphism"
            >
              View Portfolio
            </button>
          </div>
        </div>

        {/* ── Stats strip (slightly different scroll speed) ── */}
        <div ref={statsRef} className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          {SITE_CONFIG.STATS.map((stat, i) => (
            <div key={i} className="hero-stat">
              <p className="text-3xl md:text-4xl font-black font-display" style={{ color: 'var(--c-primary)' }}>{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mt-1" style={{ color: 'var(--c-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10" aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--c-bg))' }} />
    </section>
  );
};

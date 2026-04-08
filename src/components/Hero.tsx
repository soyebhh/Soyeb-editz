import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      // 1. Initial Content Animation (Anime Reveal)
      const tl = gsap.timeline();
      tl.from(".hero-item", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })
      .from(".hero-badge", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // 2. Fade out the text overlay
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.2,
          },
        });
      }
    }, wrapperRef);

    return () => {
      gsapCtx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full min-h-screen bg-black">
      {/* ── Text overlay (fades out as user scrolls) ──────────────────── */}
      <div
        ref={overlayRef}
        className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen py-20"
      >
        <div className="text-center pointer-events-none px-4">
          <div className="pointer-events-auto">
            {/* Profile avatar */}
            <div className="hero-item inline-block mb-8 md:mb-10">
              <div className="relative inline-block p-1 rounded-full bg-gradient-to-tr from-primary to-accent shadow-[0_0_50px_rgba(255,49,49,0.3)]">
                <div className="relative bg-black rounded-full p-2 overflow-hidden backdrop-blur-sm border border-white/5">
                  <img
                    src={SITE_CONFIG.PROFILE_IMG}
                    width={144}
                    height={144}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover transition-all duration-700 shadow-xl"
                    alt={SITE_CONFIG.NAME}
                  />
                </div>

                {/* Status badge */}
                <div className="hero-badge absolute -bottom-1 -right-1 md:bottom-1 md:right-1 flex items-center gap-2 px-3 py-1 bg-black border-2 border-primary rounded-full shadow-[0_0_20px_rgba(255,49,49,0.5)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white">
                    Live
                  </span>
                </div>
              </div>
            </div>

            <h1 className="hero-item text-6xl md:text-[110px] font-black text-white mb-6 anime-title mt-4">
               I Make Reels That<br/>
              <span className="text-gradient">Stop The Scroll.</span>
            </h1>

            <p className="hero-item text-lg md:text-2xl text-white/80 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] italic uppercase tracking-wider">
              Premium <span className="text-primary font-black">Video Editing</span> & Cinematography. We transform viewers into loyal <span className="text-white text-glow">Fans</span>.
            </p>

            <div className="hero-item flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20interested%20in%20working%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-primary text-[#0A0A0A] rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_20px_60px_rgba(255,215,0,0.3)] active:scale-95 border-b-4 border-primary-900 w-full sm:w-auto"
              >
                Let's Work Together → WhatsApp
              </a>
              <button
                onClick={() =>
                  document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-10 py-5 bg-[#1A1A1A] backdrop-blur-md border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1A1A1A]/80 transition-all text-white active:scale-95 inline-block w-full sm:w-auto"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

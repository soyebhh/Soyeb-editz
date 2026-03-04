import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONFIG } from '../data/siteConfig';

export const Hero: React.FC = () => {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out' });
      gsap.to('.ig-ring', {
        rotate: 360, duration: 20, repeat: -1, ease: 'none'
      });
      // Floating animation for profile picture
      gsap.to('.profile-float', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="ig-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[600px] md:h-[600px] border-[1px] border-white/10 rounded-[60px] md:rounded-[80px] -z-10 opacity-40 blur-[1px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] border-[1px] border-primary/5 rounded-[50px] md:rounded-[70px] -z-10 opacity-20 animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[120px] -z-10" />

      <div className="hero-content text-center max-w-4xl">
        <div className="profile-float relative group inline-block mb-8 md:mb-12">
          {/* Animated Glow Wrapper */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

          <div className="relative inline-block p-[2px] md:p-[3px] rounded-full bg-slate-950">
            <div className="relative bg-slate-950 rounded-full p-1 overflow-hidden">
              <img
                src={SITE_CONFIG.PROFILE_IMG}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Soyeb Khan - Professional Creator"
              />
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-1 -right-1 md:bottom-1 md:right-1 flex items-center gap-1.5 px-2 md:px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-accent"></span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-white/90 whitespace-nowrap">Shoot Available</span>
            </div>
          </div>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-6">
          Transforming Brands with <span className="text-primary italic">Viral High-Impact</span> Visuals.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-medium mb-10 max-w-2xl mx-auto">
          Professional Reel Creator & Cinematographer based in <span className="text-white border-b-2 border-primary/40 pb-1">Mumbai</span>. I craft scroll-stopping stories that convert.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
          >
            View Work
          </button>
          <a
            href={SITE_CONFIG.INSTAGRAM_URL}
            target="_blank"
            className="px-8 py-4 border-2 border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all text-white/80 hover:text-white"
          >
            DM on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
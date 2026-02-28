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
      <div className="ig-ring absolute w-[500px] h-[500px] border-[1px] border-slate-100 rounded-[60px] -z-10 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[120px] -z-10" />

      <div className="hero-content text-center max-w-4xl">
        <div className="profile-float inline-block p-[2px] rounded-full bg-ig-gradient mb-6 shadow-2xl shadow-primary/20">
          <div className="bg-slate-950 rounded-full p-1">
            <img src="https://via.placeholder.com/80" className="w-16 h-16 rounded-full" alt="Soyeb Khan - Professional Creator" />
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
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
          >
            View Work
          </button>
          <a
            href={SITE_CONFIG.INSTAGRAM_URL}
            target="_blank"
            className="px-8 py-4 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            DM on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
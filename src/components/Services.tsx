import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Video, Camera, Palette, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ReactNode> = {
  Video: <Video size={32} className="text-primary" />,
  Camera: <Camera size={32} className="text-primary" />,
  Palette: <Palette size={32} className="text-primary" />,
  TrendingUp: <TrendingUp size={32} className="text-primary" />
};

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Removed GSAP animation to guarantee visibility on all devices
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0A0A0A] relative z-10 w-full" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">What I Do</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.SERVICES.map((service, idx) => (
            <div 
              key={idx} 
              className="service-card group glass-morphism p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,215,0,0.1)] border border-white/5 hover:border-primary/30"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                {ICONS[service.icon]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">{service.title}</h3>
              <p className="text-[#F5F5F0]/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

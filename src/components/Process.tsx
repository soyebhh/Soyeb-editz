import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-step', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
      gsap.from('.process-line', {
        height: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0A0A0A] relative z-10 w-full" id="process">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">Workflow</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            My <span className="text-primary">Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="process-line absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-1/2 rounded-full opacity-30" />

          <div className="space-y-12 relative">
            {SITE_CONFIG.PROCESS.map((step, idx) => (
              <div key={idx} className={`process-step flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Box */}
                <div className={`flex-1 w-full pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="glass-morphism p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors inline-block w-full">
                    <h3 className="text-xl font-bold text-white mb-2 font-display">{step.title}</h3>
                    <p className="text-[#F5F5F0]/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Number Circle */}
                <div className="absolute left-0 md:relative md:left-auto flex-shrink-0 w-14 h-14 bg-[#1A1A1A] border-2 border-primary rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <span className="text-xl font-black text-primary font-display">{step.step}</span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0A0A0A] relative z-10 w-full overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">Client Feedback</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Trusted By <span className="text-primary">Creators</span>
          </h2>
        </div>

        {/* CSS-only snap scrolling container for testimonials */}
        <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar">
          {SITE_CONFIG.TESTIMONIALS.map((testi, idx) => (
            <div 
              key={idx} 
              className="testi-card snap-center flex-shrink-0 w-[85vw] md:w-[400px] glass-morphism p-8 rounded-3xl border border-white/5 relative"
            >
              <Quote size={40} className="text-primary/20 absolute top-6 right-6" />
              <p className="text-[#F5F5F0]/80 text-lg leading-relaxed mb-8 italic relative z-10">"{testi.quote}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testi.image} 
                  alt={testi.name} 
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                />
                <div>
                  <h4 className="text-white font-bold font-display leading-tight">{testi.name}</h4>
                  <a href={`https://instagram.com/${testi.handle.replace('@','')}`} target="_blank" rel="noreferrer" className="text-primary text-sm font-medium hover:underline">
                    {testi.handle}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

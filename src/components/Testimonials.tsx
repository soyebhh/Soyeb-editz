import React, { useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 w-full overflow-hidden" id="testimonials"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <p className="font-black tracking-[0.4em] uppercase text-xs mb-4" style={{ color: 'var(--c-accent)' }}>Client Feedback</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Trusted By <span style={{ color: 'var(--c-primary)' }}>Creators</span>
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar">
          {SITE_CONFIG.TESTIMONIALS.map((testi, idx) => (
            <article
              key={idx}
              className="testi-card snap-center flex-shrink-0 w-[85vw] md:w-[400px] glass-morphism p-8 rounded-3xl relative group hover:-translate-y-1 transition-transform duration-300"
              data-hover
            >
              <Quote size={40} className="absolute top-6 right-6 opacity-20" style={{ color: 'var(--c-primary)' }} />
              <p className="text-lg leading-relaxed mb-8 italic relative z-10" style={{ color: 'var(--c-muted)' }}>
                &quot;{testi.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testi.image}
                  alt={testi.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: 'var(--c-primary)' }}
                />
                <div>
                  <h4 className="text-white font-bold font-display leading-tight">{testi.name}</h4>
                  <a
                    href={`https://instagram.com/${testi.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium hover:underline"
                    style={{ color: 'var(--c-primary)' }}
                  >
                    {testi.handle}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

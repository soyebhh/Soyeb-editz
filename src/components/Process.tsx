import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Steps slide in from alternating sides */
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 80%', once: true },
        });
      });

      /* Line draws itself */
      gsap.from('.process-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 w-full" id="process"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20 reveal-up">
          <p className="font-black tracking-[0.4em] uppercase text-xs mb-4" style={{ color: 'var(--c-accent)' }}>Workflow</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            My <span style={{ color: 'var(--c-primary)' }}>Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="process-line absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 rounded-full opacity-30"
            style={{ background: `linear-gradient(to bottom, var(--c-primary), var(--c-accent), transparent)` }}
          />

          <div className="space-y-12 relative">
            {SITE_CONFIG.PROCESS.map((step, idx) => (
              <div
                key={idx}
                className={`process-step flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Text card */}
                <div className={`flex-1 w-full pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div
                    className="glass-morphism p-6 rounded-2xl transition-all duration-300 inline-block w-full group"
                    style={{ borderColor: 'var(--c-border)' }}
                    data-hover
                  >
                    <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-white transition-colors"
                      style={{ '--tw-gradient-from': 'var(--c-primary)' } as React.CSSProperties}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{step.desc}</p>
                  </div>
                </div>

                {/* Number circle */}
                <div
                  className="absolute left-0 md:relative md:left-auto flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'var(--c-surface)',
                    border: `2px solid var(--c-primary)`,
                    boxShadow: '0 0 20px color-mix(in srgb, var(--c-primary) 20%, transparent)',
                  }}
                >
                  <span className="text-xl font-black font-display" style={{ color: 'var(--c-primary)' }}>{step.step}</span>
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

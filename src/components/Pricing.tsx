import React, { useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.pricing-card', { opacity: 1, y: 0 });

      gsap.fromTo(
        '.pricing-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 w-full" id="pricing"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <p className="font-black tracking-[0.4em] uppercase text-xs mb-4" style={{ color: 'var(--c-accent)' }}>Investment</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Simple <span style={{ color: 'var(--c-primary)' }}>Pricing</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {SITE_CONFIG.PRICING.map((plan, idx) => (
            <div
              key={idx}
              className="pricing-card relative flex flex-col glass-morphism p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 group"
              style={{
                borderColor: plan.isPopular ? 'var(--c-primary)' : 'var(--c-border)',
                boxShadow: plan.isPopular ? '0 0 50px color-mix(in srgb, var(--c-primary) 15%, transparent)' : undefined,
              }}
              data-hover
            >
              {plan.isPopular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--c-primary)',
                    color: 'var(--c-bg)',
                    boxShadow: '0 0 20px color-mix(in srgb, var(--c-primary) 50%, transparent)',
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2 font-display">{plan.tier}</h3>
              <p className="text-sm mb-6 h-10" style={{ color: 'var(--c-muted)' }}>{plan.desc}</p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black" style={{ color: 'var(--c-primary)' }}>{plan.price}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--c-muted)', opacity: 0.6 }}>{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full shrink-0"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--c-primary) 20%, transparent)', color: 'var(--c-primary)' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--c-muted)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/918828182372?text=Hey!%20I'm%20interested%20in%20the%20${plan.tier}%20Package.`}
                target="_blank"
                rel="noreferrer"
                data-hover
                className="btn-ripple w-full text-center py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 hover:scale-[1.02]"
                style={plan.isPopular ? {
                  backgroundColor: 'var(--c-primary)',
                  color: 'var(--c-bg)',
                } : {
                  backgroundColor: 'color-mix(in srgb, var(--c-surface) 80%, transparent)',
                  color: 'var(--c-text)',
                  border: '1px solid var(--c-border)',
                }}
              >
                Choose Package
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

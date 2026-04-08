import React, { useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Visibility bug fixed by removing GSAP opacity:0 overlay 
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0A0A0A] relative z-10 w-full" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">Investment</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Simple <span className="text-primary">Pricing</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.PRICING.map((plan, idx) => (
            <div 
              key={idx} 
              className={`pricing-card relative flex flex-col glass-morphism p-8 rounded-3xl border transition-all hover:-translate-y-2 ${plan.isPopular ? 'border-primary shadow-[0_0_40px_rgba(255,215,0,0.15)] bg-[#1A1A1A]/80' : 'border-white/5'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-[#0A0A0A] font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_20px_theme(colors.primary.DEFAULT)]">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2 font-display">{plan.tier}</h3>
              <p className="text-[#F5F5F0]/60 text-sm mb-6 h-10">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-primary">{plan.price}</span>
                <span className="text-[#F5F5F0]/40 text-sm font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full text-primary shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-[#F5F5F0]/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/918828182372?text=Hey!%20I'm%20interested%20in%20the%20${plan.tier}%20Package.`}
                target="_blank"
                rel="noreferrer"
                className={`w-full text-center py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 ${plan.isPopular ? 'bg-primary text-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A]' : 'bg-[#1A1A1A] text-white border border-white/10 hover:border-primary/50 hover:bg-primary hover:text-[#0A0A0A]'}`}
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

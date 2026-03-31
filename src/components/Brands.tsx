import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import gsap from 'gsap';

export const Brands: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-logo", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="brands" ref={sectionRef} className="py-24 border-y border-white/5 bg-transparent overflow-hidden">
      <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">Selected Collaborations</p>
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 px-6 grayscale transition-all duration-700">
        {SITE_CONFIG.BRANDS.map((b, i) => (
          <img key={i} src={b.logo} alt={b.name} className="brand-logo h-7 md:h-9 object-contain opacity-20 hover:opacity-100 hover:scale-110 transition-all" />
        ))}
      </div>
    </section>
  );
};
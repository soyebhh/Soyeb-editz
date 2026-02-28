import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Brands: React.FC = () => {
  return (
    <section id="brands" className="py-24 border-y border-white/5 bg-transparent">
      <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">Selected Collaborations</p>
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 px-6 invert opacity-30 hover:opacity-80 transition-all duration-700">
        {SITE_CONFIG.BRANDS.map((b, i) => (
          <img key={i} src={b.logo} alt={b.name} className="h-7 md:h-9 object-contain" />
        ))}
      </div>
    </section>
  );
};
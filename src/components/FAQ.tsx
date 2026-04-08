import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative z-10 w-full" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">Questions</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Common <span className="text-primary">FAQs</span>
          </h2>
        </div>

        <div className="space-y-4">
          {SITE_CONFIG.FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="glass-morphism border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <h4 className={`text-lg font-bold font-display ${isOpen ? 'text-primary' : 'text-white'}`}>
                    {faq.question}
                  </h4>
                  <div className={`shrink-0 ml-4 p-2 rounded-full transition-colors ${isOpen ? 'bg-primary/20 text-primary' : 'bg-[#1A1A1A] text-white/50'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-[#F5F5F0]/60 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

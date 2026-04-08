import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 w-full" id="faq"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <p className="font-black tracking-[0.4em] uppercase text-xs mb-4" style={{ color: 'var(--c-accent)' }}>Questions</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Common <span style={{ color: 'var(--c-primary)' }}>FAQs</span>
          </h2>
        </div>

        <div className="space-y-4" role="list">
          {SITE_CONFIG.FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-morphism rounded-2xl overflow-hidden transition-all duration-300"
                style={{ borderColor: isOpen ? 'color-mix(in srgb, var(--c-primary) 40%, transparent)' : 'var(--c-border)' }}
                role="listitem"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors focus-visible:outline-2"
                  aria-expanded={isOpen}
                  style={{ outline: 'none' }}
                >
                  <h3 className="text-lg font-bold font-display transition-colors"
                    style={{ color: isOpen ? 'var(--c-primary)' : 'white' }}>
                    {faq.question}
                  </h3>
                  <div
                    className="shrink-0 ml-4 p-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? 'color-mix(in srgb, var(--c-primary) 20%, transparent)' : 'var(--c-surface)',
                      color: isOpen ? 'var(--c-primary)' : 'rgba(255,255,255,0.5)',
                      transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
                    }}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--c-muted)', opacity: 0.8 }}>
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

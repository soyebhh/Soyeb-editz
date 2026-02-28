import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioGrid: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [modal, setModal] = useState<{ url: string, caption: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.card', {
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    gsap.to(card, { rotationY: x, rotationX: -y, transformPerspective: 1000, duration: 0.4 });
  };

  return (
    <section id="work" ref={root} className="py-24 px-6 md:px-12 bg-transparent">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight">Selected <span className="text-primary italic">Shoots</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_CONFIG.WORK.map((item) => (
          <div
            key={item.id}
            className="card group cursor-pointer relative"
            onMouseMove={onMouseMove}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0 })}
            onClick={() => setModal({ url: item.url, caption: item.caption })}
          >
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-900 shadow-2xl border border-white/5 transition-all group-hover:border-primary/40 group-hover:shadow-primary/10">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" loading="lazy" />
              <div className="absolute top-6 left-6 bg-primary/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-400">
                Visual Concept
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-slate-950/80" onClick={() => setModal(null)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={32} /></button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={modal.url} className="w-full rounded-[40px] shadow-2xl border border-white/10" alt="Preview" />
            <p className="mt-6 text-center font-bold text-slate-400 uppercase tracking-widest text-sm">{modal.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};
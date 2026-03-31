import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';
import { X, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioGrid: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [modal, setModal] = useState<{ url: string, caption: string, title: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for cards
      gsap.from('.portfolio-card', {
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
      });

      // Magnetic interaction for view buttons
      const magneticButtons = document.querySelectorAll<HTMLElement>('.mag-btn');
      magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (clientX - (left + width / 2)) * 0.4;
          const y = (clientY - (top + height / 2)) * 0.4;
          gsap.to(btn, { x, y, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const tiltRAF = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tiltRAF.current) return;
    tiltRAF.current = requestAnimationFrame(() => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;
      const inner = card.querySelector('.tilt-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
      tiltRAF.current = null;
    });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      inner.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      setTimeout(() => { inner.style.transition = ''; }, 600);
    }
  };

  return (
    <section id="work" ref={root} className="py-24 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block opacity-60">Creative Showcase</span>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
            Frame <span className="text-gradient italic opacity-90 font-black">Design</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {SITE_CONFIG.WORK.map((item, i) => {
            // Bento logic: 1st spans 8, 2nd spans 4, then 4,4,4
            const colSpan = i === 0 ? "md:col-span-8" : i === 1 ? "md:col-span-4" : "md:col-span-4";
            const height = i === 0 ? "h-[450px] md:h-[600px]" : "h-[450px]";

            return (
              <div
                key={item.id}
                className={`portfolio-card group cursor-pointer relative ${colSpan}`}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => setModal({ url: item.url, caption: item.caption, title: item.title })}
              >
                <div className={`tilt-inner relative w-full ${height} rounded-[40px] overflow-hidden bg-black cinematic-shadow border border-white/5 transition-all group-hover:border-primary/30`}>
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    loading="lazy" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">{item.caption}</p>
                    </div>
                    <div className="mag-btn p-4 rounded-full glass-morphism text-white">
                      <Maximize2 size={24} />
                    </div>
                  </div>

                  <div className="absolute top-8 left-8 glass-morphism px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                    Project 0{i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Preview Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-3xl bg-black/90" onClick={() => setModal(null)}>
          <button className="absolute top-8 right-8 p-4 rounded-full glass-morphism text-white/50 hover:text-white transition-all hover:scale-110 z-[110]">
            <X size={32} />
          </button>
          
          <div className="max-w-6xl w-full relative z-[105]" onClick={e => e.stopPropagation()}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <img src={modal.url} className="relative w-full rounded-[40px] shadow-2xl border border-white/10 max-h-[80vh] object-contain bg-black" alt="Preview" />
            </div>
            
            <div className="mt-8 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">{modal.title}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">{modal.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
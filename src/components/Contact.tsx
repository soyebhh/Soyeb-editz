import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { MapPin, Copy, Check, Instagram } from 'lucide-react';
import gsap from 'gsap';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const copyHandle = () => {
    navigator.clipboard.writeText(SITE_CONFIG.INSTAGRAM_HANDLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      });

      // Magnetic effect for social cards
      const magneticItems = document.querySelectorAll<HTMLElement>('.mag-contact');
      magneticItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = item.getBoundingClientRect();
          const x = (clientX - (left + width / 2)) * 0.2;
          const y = (clientY - (top + height / 2)) * 0.2;
          gsap.to(item, { x, y, duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-52 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto glass-morphism rounded-[60px] md:rounded-[80px] p-12 md:p-32 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />

        <div className="contact-reveal space-y-6 mb-16">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-xs opacity-60">Ready to start?</span>
          <h2 className="text-5xl md:text-8xl font-black leading-[0.9] text-white tracking-tighter uppercase italic">
            Let's build your <br /><span className="text-gradient">Social Presence.</span>
          </h2>
        </div>

        <div className="contact-reveal flex flex-col items-center gap-10">
          <div className="mag-contact w-full max-w-md">
            <a
              href={SITE_CONFIG.INSTAGRAM_URL}
              target="_blank"
              className="group flex flex-col items-center gap-6 p-10 rounded-[40px] bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-white/5 hover:border-primary/30 cinematic-shadow"
            >
              <div className="w-20 h-20 rounded-3xl bg-ig-gradient p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[23px] flex items-center justify-center transition-transform group-hover:scale-95 duration-500">
                  <Instagram size={36} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 font-display">DM for Bookings</p>
                <p className="text-3xl font-black text-white tracking-tighter">{SITE_CONFIG.INSTAGRAM_HANDLE}</p>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={copyHandle} 
              className="mag-contact flex items-center gap-3 px-8 py-4 bg-white/[0.03] text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all border border-white/5 shadow-2xl"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy Handle"}
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              {SITE_CONFIG.LOCATION}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
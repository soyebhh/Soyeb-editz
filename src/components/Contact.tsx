import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { MapPin, Copy, Check, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const copyHandle = () => {
    navigator.clipboard.writeText(SITE_CONFIG.INSTAGRAM_HANDLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });

      /* Magnetic hover on cards */
      const magneticItems = containerRef.current?.querySelectorAll<HTMLElement>('.mag-contact') ?? [];
      magneticItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = item.getBoundingClientRect();
          gsap.to(item, { x: (clientX - (left + width / 2)) * 0.18, y: (clientY - (top + height / 2)) * 0.18, duration: 0.3 });
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
        {/* Animated background glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full -z-10 animate-pulse-slow blur-[80px]"
          style={{ background: 'color-mix(in srgb, var(--c-primary) 20%, transparent)' }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full -z-10 blur-[80px]"
          style={{ background: 'color-mix(in srgb, var(--c-accent) 20%, transparent)' }} />

        <div className="contact-reveal space-y-6 mb-16">
          <span className="font-black tracking-[0.4em] uppercase text-xs" style={{ color: 'var(--c-primary)' }}>
            Ready to ignite?
          </span>
          <h2 className="text-5xl md:text-8xl font-black leading-[0.9] text-white anime-title">
            Let's build your <br />
            <span className="text-gradient">Social Presence.</span>
          </h2>
        </div>

        <div className="contact-reveal flex flex-col items-center gap-10">
          <div className="mag-contact w-full max-w-md" data-hover>
            <a
              href={SITE_CONFIG.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-6 p-10 rounded-[40px] transition-all cinematic-shadow"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--c-border)',
              }}
            >
              <div className="w-20 h-20 rounded-3xl bg-ig-gradient p-[1px]">
                <div className="w-full h-full bg-black rounded-[23px] flex items-center justify-center transition-transform group-hover:scale-95 duration-500">
                  <Instagram size={36} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-display" style={{ color: 'var(--c-primary)' }}>
                  DM for Bookings
                </p>
                <p className="text-3xl font-black text-white tracking-tighter">{SITE_CONFIG.INSTAGRAM_HANDLE}</p>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={copyHandle}
              data-hover
              className="btn-ripple mag-contact flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all glass-morphism hover:text-white"
              style={{ color: 'var(--c-muted)' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Handle'}
            </button>
          </div>

          <div className="mt-16 pt-12 w-full flex flex-col md:flex-row justify-center items-center gap-8 font-bold uppercase tracking-[0.2em] text-[10px]"
            style={{ borderTop: '1px solid var(--c-border)', color: 'var(--c-muted)', opacity: 0.5 }}>
            <div className="flex items-center gap-3">
              <MapPin size={16} style={{ color: 'var(--c-primary)' }} />
              {SITE_CONFIG.LOCATION}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
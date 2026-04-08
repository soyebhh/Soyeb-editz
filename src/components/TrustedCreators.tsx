import React, { useEffect, useRef } from 'react';
import { BadgeCheck, Flame, Star, MessageCircle, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CREATORS = [
  {
    name: 'Manjari Mishrra',
    handle: '@manjari.mishrra',
    url: 'https://www.instagram.com/manjari.mishrra',
    image: '/d1.jpeg',
    followers: '555K',
    category: 'Actor • Influencer • Fashion & Beauty',
    work: '"Haaye Rama" by Mika Singh',
    quote: 'Soyeb ka editing style bohot unique hai — reels ka look and feel hi badal jaata hai. Highly recommend!',
  },
  {
    name: 'Amit Das',
    handle: '@actoramitdas',
    url: 'https://www.instagram.com/actoramitdas',
    image: '/d2.jpeg',
    followers: '279K',
    category: 'Actor • Influencer • Entrepreneur',
    work: '"FULEKU" Movie — Amazon Prime Video',
    quote: 'Professional, creative aur deadline pe kaam karta hai. Mere reels ki reach badh gayi uske baad!',
  },
];

export const TrustedCreators: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure cards are visible as base state — GSAP from() overrides below
      gsap.set('.creator-card', { opacity: 1, y: 0 });

      gsap.fromTo(
        '.creator-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%', // fires as soon as section top enters viewport
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 w-full" id="trusted-creators"
      style={{ backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal-up">
          <p className="font-black tracking-[0.4em] uppercase text-xs mb-4" style={{ color: 'var(--c-accent)' }}>Featured Collaborations</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Creators Who Trust <span style={{ color: 'var(--c-primary)' }}>My Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CREATORS.map((creator, idx) => (
            <article
              key={idx}
              className="creator-card glass-morphism p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--c-primary)]/50 transition-all duration-300 hover:-translate-y-1"
              data-hover
            >
              {/* BG glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl group-hover:opacity-100 opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'color-mix(in srgb, var(--c-primary) 30%, transparent)' }} />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 relative z-10">
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-full p-[2px] shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                    style={{ background: 'linear-gradient(135deg, var(--c-primary), var(--c-accent))' }}>
                    <img src={creator.image} alt={creator.name} loading="lazy"
                      className="w-full h-full rounded-full object-cover bg-black" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white leading-none">{creator.name}</h3>
                    <BadgeCheck size={18} className="text-[#1DA1F2] fill-white shrink-0" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-3">
                    <a href={creator.url} target="_blank" rel="noreferrer"
                      className="font-medium hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {creator.handle}
                    </a>
                    <div className="flex items-center gap-1">
                      <Flame size={14} className="text-[#f09433]" />
                      <span className="font-black tracking-widest text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] to-[#bc1888]">
                        {creator.followers} Followers
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {creator.category}
                  </p>
                  <p className="text-[10px] md:text-xs italic font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Notable: <span style={{ color: 'var(--c-primary)', opacity: 0.9 }}>{creator.work}</span>
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} style={{ fill: 'var(--c-primary)', color: 'var(--c-primary)', opacity: 0.8 }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 mb-8 p-5 rounded-2xl border shadow-inner"
                style={{ backgroundColor: 'color-mix(in srgb, var(--c-bg) 60%, transparent)', borderColor: 'var(--c-border)' }}>
                <p className="text-sm leading-relaxed italic border-l-2 pl-4" style={{ color: 'rgba(255,255,255,0.75)', borderColor: 'var(--c-primary)', opacity: 0.8 }}>
                  &quot;{creator.quote}&quot;
                </p>
              </blockquote>

              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer"
                className="btn-ripple inline-flex items-center justify-center w-full gap-2 text-xs font-bold uppercase tracking-widest text-white px-6 py-4 rounded-xl transition-all glass-morphism hover:border-white/30 active:scale-[0.98]"
              >
                <Instagram size={16} />
                View Profile on Instagram
              </a>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center relative z-10 max-w-2xl mx-auto p-10 rounded-3xl reveal-up"
          style={{ border: '1px solid var(--c-border)', background: 'linear-gradient(to bottom, color-mix(in srgb, var(--c-surface) 40%, transparent), var(--c-bg))' }}>
          <p className="text-xl md:text-2xl font-bold text-white mb-8 font-display leading-tight">
            Join 20+ Creators Who've Gone Viral With Soyeb Visuals
          </p>
          <a
            href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20a%20creator%20looking%20to%20elevate%20my%20content."
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="btn-ripple inline-flex items-center gap-2 px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 mb-4"
            style={{
              backgroundColor: 'var(--c-primary)',
              color: 'var(--c-bg)',
              boxShadow: '0 10px 30px color-mix(in srgb, var(--c-primary) 15%, transparent)',
            }}
          >
            <MessageCircle size={20} />
            Work With Me → WhatsApp
          </a>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-4" style={{ color: 'var(--c-muted)', opacity: 0.3 }}>
            Mumbai Based • Available Pan India
          </p>
        </div>
      </div>
    </section>
  );
};

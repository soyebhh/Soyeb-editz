import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer: React.FC<{ url: string; isVisible: boolean }> = ({ url, isVisible }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div className="relative w-full h-full group cursor-pointer overflow-hidden border-x border-white/5 bg-black" onClick={() => { setIsMuted(!isMuted); setShowHint(false); }}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain md:object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
      />

      {/* Anime Overlay Label */}
      <div className="absolute bottom-10 left-6 md:left-12 z-30 max-w-sm pointer-events-none">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 text-glow">Visual Impact</p>
         <h3 className="text-4xl md:text-6xl text-white anime-title mb-4">Cinematic <span className="text-gradient">Story</span></h3>
         <p className="text-xs md:text-sm text-white/60 font-bold uppercase tracking-widest leading-relaxed line-clamp-2">High-retention editing designed to stop the scroll.</p>
      </div>

      {/* Interaction Hint */}
      {showHint && isMuted && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 pointer-events-none transition-opacity duration-700">
          <div className="bg-primary/20 border-2 border-primary px-8 py-4 rounded-2xl backdrop-blur-md flex items-center gap-4 animate-float shadow-[0_0_40px_rgba(252,211,77,0.3)]">
            <Play size={24} className="text-primary fill-primary" />
            <span className="text-white text-sm font-black uppercase tracking-[0.2em] italic">Unmute</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 space-y-4 flex flex-col items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMuted(!isMuted);
            setShowHint(false);
          }}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:text-slate-950 hover:scale-110 active:scale-95 z-20 backdrop-blur-xl"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export const ReelEmbed: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = document.querySelectorAll('.reel-snap-item');
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (entry.isIntersecting) {
              next.add(idx);
            } else {
              next.delete(idx);
            }
          });
          return next;
        });
      },
      { threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="bg-slate-950 relative">
      {/* ── Title Card (Snap-start) ─────────────────────────────────── */}
      <div className="h-screen w-full flex items-center justify-center p-6 snap-start bg-transparent relative z-10">
        <div className="text-center space-y-8">
           <span className="text-primary font-black tracking-[0.4em] uppercase text-xs animate-pulse opacity-80">Vertical Mastery</span>
           <h2 className="text-6xl md:text-[160px] text-white anime-title">Viral <br /><span className="text-gradient">Impact</span></h2>
           <p className="text-sm md:text-xl text-white/50 max-w-lg mx-auto font-bold uppercase tracking-widest leading-relaxed">High-retention editing optimized for the vertical scroll world.</p>
           
           <div className="pt-12">
             <div className="w-[1.5px] h-24 bg-gradient-to-b from-primary to-transparent mx-auto animate-bounce" />
             <p className="text-[10px] text-primary/50 font-black uppercase tracking-[0.3em] mt-4">Scroll Down</p>
           </div>
        </div>
      </div>

      {/* ── Snap Container ────────────────────────────────────────── */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth">
        {SITE_CONFIG.REEL_URLS.map((item, i) => {
          const url = typeof item === 'string' ? item : item.url;
          return (
            <div
              key={i}
              data-index={i}
              className="reel-snap-item h-screen w-full snap-start relative flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <div className="relative w-full h-full max-w-5xl mx-auto overflow-hidden shadow-2xl">
                <VideoPlayer url={url} isVisible={visibleCards.has(i)} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

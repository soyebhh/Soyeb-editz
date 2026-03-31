import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const scrollToIndex = (index: number) => {
     if (scrollRef.current) {
       const width = scrollRef.current.offsetWidth;
       scrollRef.current.scrollTo({
         left: index * width,
         behavior: 'smooth'
       });
       setActiveIndex(index);
     }
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.reel-item');
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
      { threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Sync active index for navigation dots on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && window.innerWidth >= 768) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        setActiveIndex(Math.round(scrollLeft / width));
      }
    };
    const ref = scrollRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll, { passive: true });
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="bg-slate-950 relative overflow-hidden">
      
      {/* ── Desktop Header (Hidden on Mobile) ─────────────────────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-12 pt-32 pb-16">
        <div className="flex items-end justify-between gap-10">
          <div className="space-y-4">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs animate-pulse">Portfolio Selection</span>
            <h2 className="text-9xl text-white anime-title">Viral <span className="text-gradient">Impact</span></h2>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <button
               onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary transition-all disabled:opacity-20 group"
               disabled={activeIndex === 0}
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
               onClick={() => scrollToIndex(Math.min(SITE_CONFIG.REEL_URLS.length - 1, activeIndex + 1))}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary transition-all disabled:opacity-20 group"
               disabled={activeIndex === SITE_CONFIG.REEL_URLS.length - 1}
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Title Snap Slide (Only Mobile) ────────────────── */}
      <div className="md:hidden h-screen w-full flex items-center justify-center p-6 snap-start bg-transparent relative z-10">
        <div className="text-center space-y-8">
           <span className="text-primary font-black tracking-[0.4em] uppercase text-xs animate-pulse opacity-80">Vertical Mastery</span>
           <h2 className="text-6xl text-white anime-title">Viral <br /><span className="text-gradient">Impact</span></h2>
           <div className="pt-12">
             <div className="w-[1.5px] h-24 bg-gradient-to-b from-primary to-transparent mx-auto animate-bounce" />
             <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-4">Swipe Up</p>
           </div>
        </div>
      </div>

      {/* ── Responsive Scroll Container ──────────────────────────── */}
      {/* 
          Mobile: Vertical Snap h-screen
          Desktop: Horizontal Grid h-fit
      */}
      <div 
        ref={scrollRef}
        className="
          max-md:h-screen max-md:overflow-y-auto max-md:snap-y max-md:snap-mandatory 
          md:flex md:flex-nowrap md:overflow-x-auto md:px-12 md:pb-32 md:gap-12 md:snap-x md:snap-mandatory
          no-scrollbar scroll-smooth
        "
      >
        {SITE_CONFIG.REEL_URLS.map((item, i) => {
          const url = typeof item === 'string' ? item : item.url;
          return (
            <div
              key={i}
              data-index={i}
              className="
                reel-item flex-shrink-0 snap-start
                max-md:h-screen max-md:w-full max-md:bg-black/60 max-md:backdrop-blur-sm max-md:flex max-md:items-center max-md:justify-center
                md:w-[calc(33.333%-2rem)] md:aspect-[9/16] md:rounded-[40px] md:overflow-hidden md:border md:border-white/5 md:hover:border-primary transition-all md:hover:scale-[1.02] duration-500
              "
            >
              <div className="relative w-full h-full">
                <VideoPlayer url={url} isVisible={visibleCards.has(i)} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

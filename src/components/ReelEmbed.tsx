import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX, Play, ChevronDown } from 'lucide-react';
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
    <div 
      className="relative w-full h-full group cursor-pointer overflow-hidden bg-black flex items-center justify-center" 
      onClick={() => { setIsMuted(!isMuted); setShowHint(false); }}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover md:object-contain bg-black"
        muted={isMuted}
        loop
        playsInline
        preload="auto"
      />

      {/* Anime Overlay Label - Dynamic Fire Theme */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30 max-w-sm pointer-events-none">
         <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary text-glow">Original Content</p>
         </div>
         <h3 className="text-5xl md:text-7xl text-white anime-title mb-4">
            PREMIUM <span className="text-gradient">CINEMATICS</span>
         </h3>
         <p className="text-[10px] md:text-xs text-white/50 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">
            Engineered to elevate brand storytelling.
         </p>
      </div>

      {/* Interaction Hint */}
      {showHint && isMuted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity duration-700">
          <div className="bg-primary/10 border border-primary/30 px-6 py-3 rounded-full backdrop-blur-md flex items-center gap-3 animate-pulse">
            <Play size={16} className="text-primary fill-primary" />
            <span className="text-white text-[9px] font-black uppercase tracking-widest">Tap to Unmute</span>
          </div>
        </div>
      )}

      {/* Mute Toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMuted(!isMuted);
          setShowHint(false);
        }}
        className="absolute top-8 right-6 md:top-12 md:right-12 p-4 rounded-full bg-black/20 border border-white/10 text-white transition-all hover:bg-white hover:text-black z-20 backdrop-blur-md"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
};

export const ReelEmbed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    
    // Mobile Snap Observer
    const reels = section.querySelectorAll('.reel-slide');
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              setVisibleIndex(index);
            }
          });
        },
        { threshold: 0.4 } // Lowered threshold for mobile viewports
      );

      reels.forEach(reel => observer.observe(reel));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section 
      id="reels" 
      ref={containerRef} 
      className="bg-black relative py-0 md:py-20"
    >
      {/* ── Background Branding ──────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <h2 className="text-[15vw] md:text-[20vw] font-black uppercase text-white leading-none text-center">
          PREMIUM<br/>EDITS
        </h2>
      </div>

      {/* ── Section Title (Desktop) ─────────────────────────────── */}
      <div className="hidden md:block text-center mb-16 relative z-10">
        <p className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4">Latest Work</p>
        <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
          Premium Cinematic <span className="text-primary">Reels</span>
        </h2>
      </div>

      {/* ── Progress Indicators (Removed globally fixed dots to prevent visual bugs on mobile) ── */}


      {/* ── Main Reel Container ──────────────────────────────────── */}
      <div 
        data-lenis-prevent
        className="
          flex flex-col h-[100dvh] overflow-y-auto snap-y snap-mandatory 
          md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6 md:px-8
          md:h-auto md:overflow-visible md:snap-none
          no-scrollbar relative z-10
        "
      >
        {SITE_CONFIG.REEL_URLS.map((item, i) => {
          const url = typeof item === 'string' ? item : item.url;
          return (
            <div
              key={i}
              data-index={i}
              className="
                reel-slide flex-shrink-0 w-full h-[100dvh] snap-start
                md:relative md:h-[70vh] md:w-full md:rounded-3xl md:overflow-hidden md:shadow-2xl md:border md:border-white/10
              "
              style={{ zIndex: SITE_CONFIG.REEL_URLS.length - i }}
            >
              <VideoPlayer 
                url={url} 
                // On desktop always visible/playable based on hover or always true? Let's keep them playing simultaneously on desktop or just make them hover-to-play.
                // Simple fix: always make them accessible on desktop, or we can just pass true if desktop.
                isVisible={window.innerWidth >= 768 ? true : visibleIndex === i} 
              />
            </div>
          );
        })}
      </div>

      {/* ── Scroll Hint (Only first slide on mobile) ───────────────────────── */}
      {visibleIndex === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce flex flex-col items-center gap-2 md:hidden">
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Swipe Up</p>
          <ChevronDown size={16} className="text-primary" />
        </div>
      )}
    </section>
  );
};

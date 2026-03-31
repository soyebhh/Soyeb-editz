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
            FIRE <span className="text-gradient">EDITS</span>
         </h3>
         <p className="text-[10px] md:text-xs text-white/50 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">
            Engineered for maximum retention and viral potential.
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

    // We use GSAP to pin the section and translate the reels
    // This creates the "3D scroll" feel and locks the user in until they finish
    const reels = section.querySelectorAll('.reel-slide');
    
    // On Mobile, we'll use native snap because it feels more like Instagram
    // On Desktop, we'll use pinned scrolling
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      gsap.to(reels, {
        xPercent: (i) => -100 * i,
        scale: (i) => i === visibleIndex ? 1 : 0.8,
        opacity: (i) => i === visibleIndex ? 1 : 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (reels.length - 1),
          start: "top top",
          end: () => `+=${window.innerHeight * reels.length}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (reels.length - 1));
            setVisibleIndex(index);
          }
        }
      });
    } else {
      // Mobile Snap Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              setVisibleIndex(index);
            }
          });
        },
        { threshold: 0.6 }
      );

      reels.forEach(reel => observer.observe(reel));
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section 
      id="reels" 
      ref={containerRef} 
      className="bg-black relative overflow-hidden flex flex-col md:flex-row"
    >
      {/* ── Background Branding ──────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <h2 className="text-[20vw] font-black uppercase text-white leading-none">
          SOYEB<br/>VISUALS
        </h2>
      </div>

      {/* ── Progress Indicators (Vertical on mobile, horizontal on desktop) ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:hidden">
        {SITE_CONFIG.REEL_URLS.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 transition-all duration-500 rounded-full ${i === visibleIndex ? 'h-8 bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]' : 'h-2 bg-white/20'}`}
          />
        ))}
      </div>

      {/* ── Main Reel Container ──────────────────────────────────── */}
      <div 
        className="
          flex-1 h-screen overflow-y-auto snap-y snap-mandatory 
          md:flex md:flex-nowrap md:overflow-visible md:h-screen
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
                reel-slide flex-shrink-0 w-full h-full snap-start
                md:absolute md:top-0 md:left-0 md:w-full md:h-full
              "
              style={{ 
                zIndex: SITE_CONFIG.REEL_URLS.length - i,
                // On mobile we use relative/snap, on desktop absolute for GSAP
                position: window.innerWidth < 768 ? 'relative' : 'absolute'
              }}
            >
              <VideoPlayer url={url} isVisible={visibleIndex === i} />
            </div>
          );
        })}
      </div>

      {/* ── Scroll Hint (Only first slide) ───────────────────────── */}
      {visibleIndex === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce flex flex-col items-center gap-2 md:hidden">
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Swipe Up</p>
          <ChevronDown size={16} className="text-primary" />
        </div>
      )}
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-[24px]" onClick={() => { setIsMuted(!isMuted); setShowHint(false); }}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      />

      {/* Premium Interaction Hint */}
      {showHint && isMuted && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-[4px] pointer-events-none transition-opacity duration-700">
          <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-full backdrop-blur-2xl flex items-center gap-3 animate-float">
            <Play size={20} className="text-white fill-white" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Tap to Unmute</span>
          </div>
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[24px]" />

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMuted(!isMuted);
          setShowHint(false);
        }}
        className="absolute bottom-6 right-6 p-4 rounded-full glass-morphism text-white transition-all hover:scale-110 active:scale-95 z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export const ReelEmbed: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const ctx = gsap.context(() => {
      // Title Animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        });
      }

      // Reel Cards staggered entry
      const reels = gsap.utils.toArray<HTMLElement>('.reel-card');
      reels.forEach((reel) => {
        gsap.to(reel, {
          scrollTrigger: {
            trigger: reel,
            start: "top 85%",
            end: "top 15%",
            toggleActions: "play reverse play reverse",
            onEnter: () => reel.classList.add('reel-active'),
            onLeave: () => reel.classList.remove('reel-active'),
            onEnterBack: () => reel.classList.add('reel-active'),
            onLeaveBack: () => reel.classList.remove('reel-active'),
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveIndex(index);
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      ctx.revert();
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="py-24 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-10">
          <div className="space-y-4">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-3 block opacity-60">Portfolio Selection</span>
            <h2 ref={titleRef} className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">
              Viral <span className="text-primary italic opacity-90">Impact</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            <p className="text-slate-400 max-w-sm text-lg font-medium leading-relaxed md:text-right border-r-2 border-primary/20 md:pr-8 pr-0">
              High-retention editing engineered to stop the scroll. We turn viewers into loyal followers.
            </p>

            <div className="flex items-center justify-between md:justify-end gap-8 w-full">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                  className="p-4 rounded-full glass-morphism text-white hover:bg-primary hover:text-white transition-all disabled:opacity-20 group"
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToIndex(Math.min(SITE_CONFIG.REEL_URLS.length - 1, activeIndex + 1))}
                  className="p-4 rounded-full glass-morphism text-white hover:bg-primary hover:text-white transition-all disabled:opacity-20 group"
                  disabled={activeIndex === SITE_CONFIG.REEL_URLS.length - 1}
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="relative flex flex-nowrap md:grid md:grid-cols-3 gap-8 md:gap-12 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-12 md:pb-0 scroll-smooth pt-8"
        >
          {SITE_CONFIG.REEL_URLS.map((item, i) => {
            const url = typeof item === 'string' ? item : item.url;
            const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || url.includes('mixkit.co');
            const staggerClass = i % 2 === 0 ? "md:translate-y-20" : "md:-translate-y-6";

            return (
              <div
                key={i}
                className={`reel-card flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-auto snap-center relative group transition-all duration-1000 opacity-20 ${staggerClass}`}
              >
                {/* Dynamic Accent Glow */}
                <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-tr from-primary/50 to-accent/50 opacity-0 group-[.reel-active]:opacity-20 group-hover:opacity-40 blur-xl transition-all duration-1000" />

                <div className="relative rounded-[36px] overflow-hidden p-0 cinematic-shadow border border-white/5 aspect-[9/16] z-10 transition-all duration-700 group-[.reel-active]:scale-[1.02] group-hover:border-white/20">
                  {isVideo ? (
                    <VideoPlayer url={url} />
                  ) : (
                    <iframe
                      src={`${url}${url.endsWith('/') ? '' : '/'}embed/`}
                      className="w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Refined Label */}
                <div className="mt-8 px-6 flex justify-between items-center opacity-0 group-[.reel-active]:opacity-100 transition-all duration-1000 delay-300">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 mb-2">Category {i + 1}</p>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Cinematic Reel</p>
                  </div>
                  <div className="w-10 h-[1.5px] bg-white/10" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex justify-center gap-3 mt-32">
          {SITE_CONFIG.REEL_URLS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-16 bg-primary' : 'w-4 bg-white/10 hover:bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .reel-card.reel-active {
          z-index: 20;
          opacity: 1 !important;
        }
        @media (max-width: 767px) {
           .reel-card.reel-active {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};


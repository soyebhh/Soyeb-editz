import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  return (
    <div className="relative w-full h-full group cursor-pointer" onClick={() => { setIsMuted(!isMuted); setShowHint(false); }}>
      <video
        src={url}
        className="w-full h-full object-cover rounded-[24px]"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      />

      {/* Interaction Hint */}
      {showHint && isMuted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none transition-opacity duration-500">
          <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 animate-bounce">
            <VolumeX size={16} className="text-white" />
            <span className="text-white text-xs font-bold uppercase tracking-tighter">Tap to Unmute</span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity rounded-[24px]" />

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMuted(!isMuted);
          setShowHint(false);
        }}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white transition-all hover:bg-white/20 z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
};

export const ReelEmbed: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
        duration: 0.6,
        ease: "power2.out"
      });
    });

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
      currentScrollRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="py-20 md:py-32 px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="space-y-2">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block opacity-80">Visual Storytelling</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Viral <span className="text-gradient italic">Results</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed border-l-2 border-primary/30 pl-6 py-1 md:text-right md:border-l-0 md:border-r-2 md:pr-6 md:pl-0">
              Engineered to stop the scroll. We focus on high-retention editing that turns viewers into followers.
            </p>

            <div className="flex items-center justify-between md:justify-end gap-6 w-full">
              {/* Swipe Hint (Mobile) */}
              <div className="flex md:hidden items-center gap-2 text-primary/60 animate-pulse">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0EA5E9]">Swipe</span>
                <div className="w-8 h-[1px] bg-primary/30" />
              </div>

              {/* Navigation Controls (Mobile & Desktop at Top) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                  className="p-3 md:p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-primary/20 hover:border-primary/40 active:opacity-70 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                  disabled={activeIndex === 0}
                  aria-label="Previous Reel"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Vertical Dots between buttons on Mobile */}
                <div className="flex flex-col gap-1 md:hidden">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${Math.floor(activeIndex / (SITE_CONFIG.REEL_URLS.length / 3)) === i ? 'bg-primary' : 'bg-white/10'}`} />
                  ))}
                </div>

                <button
                  onClick={() => scrollToIndex(Math.min(SITE_CONFIG.REEL_URLS.length - 1, activeIndex + 1))}
                  className="p-3 md:p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-primary/20 hover:border-primary/40 active:opacity-70 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                  disabled={activeIndex === SITE_CONFIG.REEL_URLS.length - 1}
                  aria-label="Next Reel"
                >
                  <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Layout: Scroll on Mobile, Grid on Desktop */}
        <div
          ref={scrollRef}
          className="relative flex flex-nowrap md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-8 md:pb-0 scroll-smooth pt-4 md:pt-12"
        >
          {SITE_CONFIG.REEL_URLS.map((item, i) => {
            const url = typeof item === 'string' ? item : item.url;
            const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || url.includes('mixkit.co');

            // Staggering logic for desktop only
            const staggerClass = i % 2 === 0 ? "md:translate-y-12" : "md:-translate-y-4";

            return (
              <div
                key={i}
                className={`reel-card flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-auto snap-center relative group transition-all duration-700 opacity-40 ${staggerClass}`}
              >
                {/* Accent Glow Ring */}
                <div className="absolute -inset-[3px] rounded-[35px] bg-ig-gradient opacity-0 scale-95 group-[.reel-active]:opacity-50 group-[.reel-active]:scale-100 transition-all duration-700 blur-[6px]" />

                <div className="relative rounded-[32px] overflow-hidden p-0 shadow-2xl border border-white/10 aspect-[9/16] z-10 transition-transform duration-500 group-[.reel-active]:-translate-y-3 group-hover:border-white/30">
                  {isVideo ? (
                    <VideoPlayer url={url} />
                  ) : (
                    <iframe
                      src={`${url}${url.endsWith('/') ? '' : '/'}embed/`}
                      className="w-full h-full rounded-[24px]"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Subtle Label */}
                <div className="mt-6 px-4 flex justify-between items-center opacity-0 group-[.reel-active]:opacity-100 transition-opacity duration-700">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Concept {i + 1}</p>
                    <p className="text-xs font-bold text-slate-400">Viral Strategy</p>
                  </div>
                  <div className="h-[1px] flex-grow mx-4 bg-white/10" />
                  <div className="w-2 h-2 rounded-full border border-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Pagination Dots (Top on Desktop, Hidden on Mobile as redundant) */}
        <div className="hidden md:flex justify-center gap-2 mt-20">
          {SITE_CONFIG.REEL_URLS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? 'w-12 bg-primary' : 'w-3 bg-white/5 hover:bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .reel-card.reel-active {
          z-index: 30;
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

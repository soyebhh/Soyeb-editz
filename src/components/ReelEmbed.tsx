import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-full group">
      <video
        src={url}
        className="w-full h-full object-cover rounded-[24px]"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px]" />
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsMuted(!isMuted);
        }}
        className="absolute bottom-4 right-4 p-2.5 rounded-full bg-slate-950/20 backdrop-blur-xl border border-white/10 text-white transition-all hover:bg-slate-950/40 active:scale-90 z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
};

export const ReelEmbed: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reels = gsap.utils.toArray<HTMLElement>('.reel-card');

    reels.forEach((reel) => {
      gsap.to(reel, {
        scrollTrigger: {
          trigger: reel,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
          onEnter: () => reel.classList.add('reel-active'),
          onLeave: () => reel.classList.remove('reel-active'),
          onEnterBack: () => reel.classList.add('reel-active'),
          onLeaveBack: () => reel.classList.remove('reel-active'),
        },
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
    });
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="py-12 md:py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Viral <span className="text-primary italic">Staged</span> Reels</h2>
          </div>
          <p className="text-slate-400 max-w-sm font-medium">
            Each reel is crafted to capture attention in the first 0.5 seconds and drive engagement.
          </p>
        </div>

        {/* Unique Staggered Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-6 lg:gap-8">
          {SITE_CONFIG.REEL_URLS.map((url, i) => {
            const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || url.includes('mixkit.co');

            // Staggering logic for mobile/tablet unique look
            const staggerClass = i % 2 === 0 ? "sm:translate-y-12" : "sm:-translate-y-4";

            return (
              <div
                key={i}
                className={`reel-card relative group transition-all duration-700 opacity-50 scale-95 ${staggerClass}`}
              >
                {/* Accent Glow Ring (Hero State) */}
                <div className="absolute -inset-[2px] rounded-[34px] bg-ig-gradient opacity-0 scale-95 group-[.reel-active]:opacity-40 group-[.reel-active]:scale-100 transition-all duration-500 blur-sm" />

                <div className="relative rounded-[32px] overflow-hidden p-0 shadow-2xl border border-white/10 aspect-[9/16] z-10 transition-transform duration-500 group-[.reel-active]:-translate-y-2">
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
                <div className="mt-4 px-2 opacity-0 group-[.reel-active]:opacity-100 transition-opacity duration-500">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Viral Projection {i + 1}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .reel-card.reel-active {
          z-index: 30;
        }
        @media (max-width: 640px) {
          .reel-card:nth-child(even) {
            transform: translateX(10%);
          }
          .reel-card:nth-child(odd) {
            transform: translateX(-5%);
          }
           .reel-card.reel-active {
            transform: scale(1.05) rotate(${Math.random() > 0.5 ? '1deg' : '-1deg'});
          }
        }
      `}</style>
    </section>
  );
};

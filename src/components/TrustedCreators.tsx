import React, { useEffect, useRef } from 'react';
import { BadgeCheck, Flame, Star, MessageCircle, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CREATORS = [
  {
    name: "Manjari Mishrra",
    handle: "@manjari.mishrra",
    url: "https://www.instagram.com/manjari.mishrra",
    image: "/d1.jpeg", // Majri DP
    followers: "555K",
    category: "Actor • Influencer • Fashion & Beauty",
    work: '"Haaye Rama" by Mika Singh',
    quote: "Soyeb ka editing style bohot unique hai — reels ka look and feel hi badal jaata hai. Highly recommend!"
  },
  {
    name: "Amit Das",
    handle: "@actoramitdas",
    url: "https://www.instagram.com/actoramitdas",
    image: "/d2.jpeg", // Amit DP
    followers: "279K",
    category: "Actor • Influencer • Entrepreneur",
    work: '"FULEKU" Movie — Amazon Prime Video',
    quote: "Professional, creative aur deadline pe kaam karta hai. Mere reels ki reach badh gayi uske baad!"
  }
];

export const TrustedCreators: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Visibility bug fixed by removing GSAP opacity:0 overlay which got stuck on mobile viewports
  }, []);

  return (
    <section ref={containerRef} className="trust-section py-24 bg-[#0A0A0A] relative z-10 w-full" id="trusted-creators">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">Featured Collaborations</p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white capitalize">
            Creators Who Trust <span className="text-primary">My Work</span>
          </h2>
        </div>

        {/* Creator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CREATORS.map((creator, idx) => (
            <div key={idx} className="creator-card glass-morphism p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 relative z-10">
                <div className="shrink-0 relative">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    <img 
                      src={creator.image} 
                      alt={creator.name} 
                      className="w-full h-full rounded-full object-cover bg-[#1A1A1A]" 
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white leading-none">{creator.name}</h3>
                    <BadgeCheck size={18} className="text-[#1DA1F2] fill-white" />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-3">
                    <a href={creator.url} target="_blank" rel="noreferrer" className="text-white/60 font-medium hover:text-white transition-colors flex items-center">
                      {creator.handle}
                    </a>
                    
                    {/* Sleek Instagram Vibe Followers */}
                    <div className="flex items-center gap-1">
                      <Flame size={14} className="text-[#f09433]" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] to-[#bc1888] font-black tracking-widest text-xs">{creator.followers} Followers</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/30 mb-1">{creator.category}</p>
                  <p className="text-[10px] md:text-xs text-white/60 italic font-medium">Notable: <span className="text-primary/90">{creator.work}</span></p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-primary/80 text-primary/80" />
                ))}
              </div>

              {/* Quote Block */}
              <div className="relative z-10 mb-8 p-5 bg-[#0A0A0A]/50 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-white/80 text-sm leading-relaxed italic border-l-2 border-primary/50 pl-4">
                  "{creator.quote}"
                </p>
              </div>

              {/* Premium Dark CTA instead of harsh white */}
              <a 
                href={creator.url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-tr from-[#1A1A1A] to-[#222222] border border-white/10 px-6 py-4 rounded-xl hover:border-white/30 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.98]"
              >
                <Instagram size={16} className="text-white" />
                View Profile on Instagram
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA Only */}
        <div className="text-center relative z-10 max-w-2xl mx-auto p-10 rounded-3xl border border-white/5 bg-gradient-to-b from-[#1A1A1A]/40 to-[#0A0A0A]">
          <p className="text-xl md:text-2xl font-bold text-white mb-8 font-display leading-tight">Join 20+ Creators Who've Gone Viral With Soyeb Visuals</p>
          
          <a
            href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20a%20creator%20looking%20to%20elevate%20my%20content."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[#0A0A0A] rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,215,0,0.15)] active:scale-95 mb-4"
          >
            <MessageCircle size={20} />
            Work With Me → WhatsApp
          </a>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5F5F0]/30 mt-4">
            Mumbai Based • Available Pan India
          </p>
        </div>
      </div>
    </section>
  );
};

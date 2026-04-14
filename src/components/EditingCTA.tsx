import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export const EditingCTA: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center glass-morphism p-12 md:p-20 rounded-[3rem] relative overflow-hidden border border-white/10">
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
          Need Your <span className="text-gradient italic">Reels</span> Edited?
        </h2>
        
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl font-medium">
          Let's transform your raw footage into high-retention, viral content. DM me for a custom quote.
        </p>

        <a 
          href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20interested%20in%20getting%20my%20reels%20edited." 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !px-10 !py-5 text-xl flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <MessageCircle size={24} />
          Edit My Reel
          <ArrowRight size={20} />
        </a>

        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Available Pan India • Specialized in High-Retention Edits
        </p>
      </div>
    </section>
  );
};

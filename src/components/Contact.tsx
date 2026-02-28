import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { MapPin, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyHandle = () => {
    navigator.clipboard.writeText(SITE_CONFIG.INSTAGRAM_HANDLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/10 backdrop-blur-3xl rounded-[50px] p-12 md:p-20 border border-white/5 text-center shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight text-white">Let's build your <br /><span className="text-primary italic">Social Presence.</span></h2>

        <div className="flex flex-col items-center gap-6">
          <a
            href={SITE_CONFIG.INSTAGRAM_URL}
            target="_blank"
            className="group flex items-center gap-6 p-6 rounded-3xl bg-slate-900/20 hover:bg-slate-900/40 hover:shadow-2xl transition-all border border-white/5 hover:border-white/10"
          >
            <div className="w-14 h-14 rounded-2xl bg-ig-gradient p-[2px]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                <span className="text-2xl">📸</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">DM for Bookings</p>
              <p className="text-xl font-black text-white">{SITE_CONFIG.INSTAGRAM_HANDLE}</p>
            </div>
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={copyHandle} className="flex items-center gap-2 px-6 py-3 bg-white/[0.02] text-slate-400 rounded-full font-bold hover:bg-white/5 hover:text-white transition-all border border-white/5">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy Handle"}
            </button>
          </div>

          <div className="mt-12 flex items-center gap-2 text-slate-500 font-medium">
            <MapPin size={16} className="text-primary" />
            {SITE_CONFIG.LOCATION}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999]">
      <div className="relative group">
        {/* Glow behind */}
        <div className="absolute -inset-2 bg-[#25D366] rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
        
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        
        {/* Button */}
        <a
          href="https://wa.me/918828182372?text=Hey%20Soyeb!%20I'm%20coming%20from%20your%20portfolio%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={32} />
        </a>
      </div>
    </div>
  );
};

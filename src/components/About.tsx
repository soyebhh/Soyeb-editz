import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ["Developer", "Editor", "Videographer", "Photographer", "Content Creator"];
  const typingSpeed = isDeleting ? 60 : 100;
  const pauseTime = isDeleting ? 400 : 1500;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(prev => 
          isDeleting 
            ? currentRole.substring(0, prev.length - 1) 
            : currentRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="about" className="section-padding bg-dark overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Editor Side */}
          <div className="fade-in-section">
            <div className="rounded-xl overflow-hidden border border-[#9B7FE833] bg-[#1e1e2e] shadow-2xl font-mono text-[13px] md:text-sm">
              {/* Editor Header */}
              <div className="bg-[#181825] px-4 py-2 flex items-center gap-2 border-b border-black/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 flex items-center bg-[#1e1e2e] px-3 py-1 rounded-t-lg border-t border-x border-white/5 relative top-[9px]">
                  <span className="w-2 h-2 rounded-full bg-[#e3ae2e] mr-2"></span>
                  <span className="text-white/60 text-xs">soyeb.js</span>
                </div>
              </div>

              {/* Editor Body */}
              <div className="p-4 md:p-6 flex">
                {/* Line Numbers */}
                <div className="pr-4 border-r border-white/5 text-[#3d3d5c] text-right select-none">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                </div>

                {/* Code Content */}
                <div className="pl-4 space-y-1 overflow-x-auto no-scrollbar">
                  <div>
                    <span className="text-[#C792EA]">const</span>{' '}
                    <span className="text-[#82AAFF]">soyeb</span>{' '}
                    <span className="text-[#FFD700]">=</span>{' '}
                    <span className="text-[#FFD700]">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9B7FE8]">name</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-[#C3E88D]">"Soyeb Khan"</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9B7FE8]">location</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-[#C3E88D]">"Mumbai, India"</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9B7FE8]">role</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-[#FFD700]">"{displayText}"</span>
                    <span className="inline-block w-[2px] h-[1em] bg-[#9B7FE8] ml-0.5 animate-pulse align-middle"></span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#9B7FE8]">status</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-[#C3E88D]">"Building things"</span>
                  </div>
                  <div>
                    <span className="text-[#FFD700]">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="fade-in-section">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 lowercase tracking-tighter">about me</h2>
            
            <div className="space-y-6 text-xl md:text-2xl text-white/90 leading-tight">
              <p className="font-bold">
                Developer. Editor. Creator.
              </p>
              <p className="text-white/60 font-light">
                Building on the web, shooting on the streets,<br />
                telling stories through a screen.
              </p>
              <div className="pt-4">
                <span className="text-accent border-b border-accent/30 pb-1">Mumbai.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-pulse {
          animation: blink 0.6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default About;

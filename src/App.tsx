import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Header from './components/Header';
import DeveloperView from './components/DeveloperView';
import EditorView from './components/EditorView';
import CustomCursor from './components/CustomCursor';

function App() {
  const [currentView, setCurrentView] = useState<'developer' | 'editor'>('developer');
  const grainSeedRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    // ── Effect 3: Animate SVG grain seed for shifting noise feel ──
    const grain = grainSeedRef.current;
    if (grain) {
      gsap.to({ seed: 0 }, {
        seed: 200,
        duration: 8,
        repeat: -1,
        ease: 'none',
        onUpdate: function () {
          grain.setAttribute('seed', String(Math.floor(this.targets()[0].seed)));
        }
      });
    }
  }, []);

  useEffect(() => {
    // ── Effect 4: Section reveal with blur + slide using GSAP ──
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          gsap.fromTo(
            el,
            { opacity: 0, y: 50, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
          );

          // Stagger any .stagger-child elements inside
          const children = el.querySelectorAll('.stagger-child');
          if (children.length > 0) {
            gsap.fromTo(
              children,
              { opacity: 0, y: 20, filter: 'blur(4px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
            );
          }

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className={`bg-dark min-h-screen selection:bg-accent selection:text-white ${currentView === 'editor' ? 'editor-view' : ''}`}>
      {/* ── Effect 3: Full-screen animated noise grain overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          pointerEvents: 'none',
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="appNoise">
            <feTurbulence
              ref={grainSeedRef}
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              seed="0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#appNoise)" />
        </svg>
      </div>

      <CustomCursor />
      <Header
        currentView={currentView}
        onSwitch={(view) => setCurrentView(view)}
      />

      <main>
        {currentView === 'developer' ? (
          <DeveloperView onSwitchToEditor={() => setCurrentView('editor')} />
        ) : (
          <EditorView onBack={() => setCurrentView('developer')} />
        )}
      </main>

      <footer className="py-12 border-t border-white/5 text-center bg-black/20">
        <div className="container-custom px-6">
          <p className="text-white/20 text-xs uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Soyeb Khan. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
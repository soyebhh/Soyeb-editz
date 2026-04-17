import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Video } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onSwitchToEditor: () => void;
}

// ── Effect 7: Floating Particles ──────────────────────────────────────────────
type Particle = {
  x: number; y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
};

function initParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: height + Math.random() * 40,
    radius: 1 + Math.random(),
    opacity: 0.3 + Math.random() * 0.3,
    speedY: 0.3 + Math.random() * 0.7,
    speedX: (Math.random() - 0.5) * 0.4,
  };
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const COUNT = 60;
    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      initParticle(W, H)
    );
    // Scatter initial y randomly so they don't all start from bottom at once
    particles.forEach(p => { p.y = Math.random() * H; });

    let rafId: number;

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -4) { Object.assign(p, initParticle(W, H)); }
        if (p.x < 0)  p.x = W;
        if (p.x > W)  p.x = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
        ctx!.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const p = initParticle(W, H);
        p.y = Math.random() * H;
        particles.push(p);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [canvasRef]);
}

// ─────────────────────────────────────────────────────────────────────────────

const Hero: React.FC<HeroProps> = ({ onSwitchToEditor }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const lettersRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const btn1Ref     = useRef<HTMLButtonElement>(null);
  const btn2Ref     = useRef<HTMLAnchorElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  const roles       = ['Editor', 'Developer', 'Builder', 'Content Creator'];
  const typingSpeed = isDeleting ? 50 : 100;
  const pauseTime   = 2000;

  // Effect 7 — hook
  useParticleCanvas(canvasRef);

  useEffect(() => {
    // ── Effect 2: Letter stagger with rotateX ──────────────────────────────
    const validLetters = lettersRef.current.filter(Boolean);
    if (headingRef.current) {
      gsap.set(headingRef.current, { transformPerspective: 800 });
    }
    gsap.fromTo(
      validLetters,
      { y: 80, opacity: 0, rotateX: -40 },
      {
        y: 0, opacity: 1, rotateX: 0,
        stagger: 0.07, ease: 'power4.out', duration: 0.9, delay: 0.15,
      }
    );
  }, []);

  useEffect(() => {
    // ── Typewriter logic ──────────────────────────────────────────────────
    let timer: ReturnType<typeof setTimeout>;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // ── Effect 6: GSAP button hover ────────────────────────────────────────────
  const onBtnEnter = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1.04,
      boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const onBtnLeave = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      boxShadow: '0 0 0px rgba(124, 58, 237, 0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const nameLetters = ['S', 'O', 'Y', 'E', 'B'];

  return (
    <section className="relative min-h-screen flex flex-col justify-center section-padding pt-32 lg:pt-0 overflow-hidden">

      {/* ── Effect 7: Particle canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Perspective grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at center, transparent 0%, #000 100%),
            linear-gradient(to right,  rgba(124,58,237,0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124,58,237,0.25) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          transform: 'perspective(600px) rotateX(60deg) scale(2)',
          transformOrigin: 'bottom center',
          pointerEvents: 'none',
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="fade-in-section visible">
          <p className="text-accent font-medium tracking-[0.2em] uppercase mb-6 text-sm stagger-child">
            Welcome to my space
          </p>

          {/* ── Effect 2: Name reveal ── */}
          <h1
            ref={headingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {nameLetters.map((char, i) => (
              <span
                key={i}
                className="inline-block"
                ref={(el) => { lettersRef.current[i] = el; }}
              >
                {char}
              </span>
            ))}
            <span
              className="text-accent inline-block"
              ref={(el) => { lettersRef.current[5] = el; }}
            >
              .
            </span>
          </h1>

          {/* ── Effect 8: Typewriter cursor glow ── */}
          <div className="mt-8 h-12 flex items-center font-mono">
            <span className="text-2xl md:text-4xl text-accent font-bold mr-3">{'>'}</span>
            <span className="text-2xl md:text-4xl text-white font-medium pr-2">
              {displayText}
            </span>
            <span className="typewriter-cursor text-2xl md:text-4xl font-medium border-r-2 border-[#7C3AED]">
              &nbsp;
            </span>
          </div>

          {/* ── Effect 6: Shimmer + GSAP hover buttons ── */}
          <div className="flex flex-wrap gap-4 mt-12">
            <button
              ref={btn1Ref}
              onClick={onSwitchToEditor}
              onMouseEnter={() => onBtnEnter(btn1Ref)}
              onMouseLeave={() => onBtnLeave(btn1Ref)}
              className="btn-primary group"
            >
              Editing Portfolio
              <Video size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <a
              ref={btn2Ref}
              href="#contact"
              onMouseEnter={() => onBtnEnter(btn2Ref)}
              onMouseLeave={() => onBtnLeave(btn2Ref)}
              className="btn-outline group border-accent/20 hover:border-accent text-accent"
            >
              Let's Collab
              <ExternalLink size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-30 z-10 pointer-events-none">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;

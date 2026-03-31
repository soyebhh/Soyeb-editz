import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

// ─── Config ───────────────────────────────────────────────────────────────────
const FRAME_COUNT = 113;
const FRAME_PATH  = '/assets/frame/ezgif-frame-';
const FRAME_EXT   = '.webp';

/** Pad number to 3 digits: 1 → "001" */
const pad = (n: number) => String(n).padStart(3, '0');

/** Build the URL for a given frame index (1-based). */
const frameUrl = (i: number) => `${FRAME_PATH}${pad(i)}${FRAME_EXT}`;

// ─── Image preloader ──────────────────────────────────────────────────────────
function preloadImages(
  onProgress: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i + 1);
      img.onload = img.onerror = () => {
        loaded++;
        onProgress(loaded, FRAME_COUNT);
        if (loaded === FRAME_COUNT) resolve(images);
      };
      images[i] = img;
    }
  });
}

// ─── Canvas draw with "object-fit: cover" logic ───────────────────────────────
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth  || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}

// ─── Component ────────────────────────────────────────────────────────────────
export const CanvasScrollHero: React.FC = () => {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const imagesRef   = useRef<HTMLImageElement[]>([]);
  const frameObj    = useRef({ value: 0 });
  const rafId       = useRef<number>(0);

  const [progress, setProgress]   = useState(0);   // 0 → 1
  const [isLoaded, setIsLoaded]   = useState(false);

  // ── 1. Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    preloadImages((loaded, total) => {
      if (!cancelled) setProgress(loaded / total);
    }).then((imgs) => {
      if (!cancelled) {
        imagesRef.current = imgs;
        setIsLoaded(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // ── 2. Resize canvas to fill viewport (retina-aware) ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = '100vw';
      canvas.style.height = '100vh';

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Redraw current frame after resize
      if (isLoaded && imagesRef.current.length) {
        const idx = Math.round(frameObj.current.value);
        const img = imagesRef.current[idx];
        if (img && ctx) drawCover(ctx, img, window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, [isLoaded]);

  // ── 3. Draw first frame immediately once loaded ────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && imagesRef.current[0]) {
      drawCover(ctx, imagesRef.current[0], window.innerWidth, window.innerHeight);
    }
  }, [isLoaded]);

  // ── 4. ScrollTrigger + rAF render loop ─────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    let lastDrawn = -1;

    // rAF loop: only redraws when the frame index actually changed
    const tick = () => {
      const idx = Math.round(frameObj.current.value);
      if (idx !== lastDrawn && imagesRef.current[idx]) {
        drawCover(ctx, imagesRef.current[idx], window.innerWidth, window.innerHeight);
        lastDrawn = idx;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    rafId.current = requestAnimationFrame(tick);

    const gsapCtx = gsap.context(() => {
      // 1. Initial Content Animation (Anime Reveal)
      const tl = gsap.timeline();
      tl.from(".hero-item", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })
      .from(".hero-badge", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // 2. Scroll-driven Frame Scrubbing
      gsap.to(frameObj.current, {
        value: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // 3. Fade out the text overlay
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.2,
          },
        });
      }
    }, wrapperRef);

    return () => {
      cancelAnimationFrame(rafId.current);
      gsapCtx.revert();
    };
  }, [isLoaded]);

  return (
    <div ref={wrapperRef} className="relative w-full min-h-screen">
      {/* ── Loading overlay ─────────────────────────────────────────────── */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
          {/* Animated brand name */}
          <p className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-8 animate-pulse">
            {SITE_CONFIG.BRAND} Visuals
          </p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-4">
            {Math.round(progress * 100)}%
          </p>
        </div>
      )}

      {/* ── Global Video Canvas Background ────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen block pointer-events-none -z-10"
      />

      {/* ── Text overlay (fades out as user scrolls) ──────────────────── */}
      <div
        ref={overlayRef}
        className="relative z-20 flex items-center justify-center w-full min-h-screen py-20"
      >
        <div className="text-center pointer-events-none px-4">
          <div className="pointer-events-auto">
          {/* Profile avatar */}
          <div className="hero-item inline-block mb-8 md:mb-10">
            <div className="relative inline-block p-1 rounded-full bg-gradient-to-tr from-primary to-accent shadow-[0_0_50px_rgba(252,211,77,0.3)]">
              <div className="relative bg-slate-950/60 rounded-full p-2 overflow-hidden backdrop-blur-sm border border-white/10">
                <img
                  src={SITE_CONFIG.PROFILE_IMG}
                  width={144}
                  height={144}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  alt={SITE_CONFIG.NAME}
                />
              </div>

              {/* Status badge */}
              <div className="hero-badge absolute -bottom-1 -right-1 md:bottom-1 md:right-1 flex items-center gap-2 px-3 py-1 bg-slate-900 border-2 border-primary rounded-full shadow-[0_0_20px_rgba(252,211,77,0.5)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white">
                  Live
                </span>
              </div>
            </div>
          </div>

          <h1 className="hero-item text-6xl md:text-[130px] font-black text-white mb-6 anime-title">
            {SITE_CONFIG.BRAND}{' '}
            <span className="text-gradient">Visuals</span>
          </h1>

          <p className="hero-item text-lg md:text-2xl text-white/80 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] italic uppercase tracking-wider">
            High-Impact <span className="text-primary font-black">Visual Storytelling</span>. We transform viewers into <span className="text-white text-glow">Fans</span>.
          </p>

          <div className="hero-item flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() =>
                document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-10 py-5 bg-primary text-slate-950 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_20px_60px_rgba(252,211,77,0.3)] active:scale-95 border-b-4 border-primary-900"
            >
              View Work
            </button>
            <a
              href={SITE_CONFIG.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-white active:scale-95 inline-block"
            >
              DM for Bookings
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { SITE_CONFIG } from './data/siteConfig';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

import { Header }         from './components/Header';
import { Hero }           from './components/Hero';
import { TrustedCreators } from './components/TrustedCreators';
import { Process }        from './components/Process';
import { ReelEmbed }      from './components/ReelEmbed';
import { PortfolioGrid }  from './components/PortfolioGrid';
import { Testimonials }   from './components/Testimonials';
import { Pricing }        from './components/Pricing';
import { FAQ }            from './components/FAQ';
import { Contact }        from './components/Contact';
import { WhatsAppFloat }  from './components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

/* ─── Time-based theme helper ─────────────────────────────── */
type ThemeName = 'dawn' | 'morning' | 'day' | 'golden' | 'dusk' | 'night';

const THEME_LABELS: Record<ThemeName, string> = {
  dawn:    '🌅 Dawn Mode',
  morning: '🌤 Morning Mode',
  day:     '☀️ Day Mode',
  golden:  '🌇 Golden Hour',
  dusk:    '🌆 Dusk Mode',
  night:   '🌙 Night Mode',
};

function getThemeByHour(hour: number): ThemeName {
  if (hour >= 5  && hour < 7)  return 'dawn';
  if (hour >= 7  && hour < 12) return 'morning';
  if (hour >= 12 && hour < 16) return 'day';
  if (hour >= 16 && hour < 19) return 'golden';
  if (hour >= 19 && hour < 21) return 'dusk';
  return 'night';
}

/* ─── JSON-LD structured data ────────────────────────────── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Person'],
  name: 'Soyeb Khan',
  brand: 'Soyeb Visuals',
  jobTitle: 'Instagram Reel Editor & Cinematographer',
  url: 'https://www.soyeb.in',
  areaServed: 'Mumbai, India',
  telephone: '+91 8828182372',
  sameAs: ['https://www.instagram.com/soyebhx/'],
  description: 'Leading professional video creator and cinematographer in Mumbai, specializing in high-impact visual storytelling and short-form content.',
};

/* ─── App ─────────────────────────────────────────────────── */
export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const badgeRef      = useRef<HTMLDivElement>(null);
  const cursorDot     = useRef<HTMLDivElement>(null);
  const cursorRing    = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [reducedMotion]);

  /* ── Time-based theme engine ── */
  useEffect(() => {
    const applyTheme = () => {
      const hour  = new Date().getHours();
      const theme = getThemeByHour(hour);
      const prev  = document.documentElement.getAttribute('data-theme') as ThemeName | null;

      if (prev === theme) return;           // nothing changed
      document.documentElement.setAttribute('data-theme', theme);

      // Flash the badge
      if (badgeRef.current) {
        badgeRef.current.textContent = THEME_LABELS[theme];
        // Reset animation
        badgeRef.current.style.animation = 'none';
        // Force reflow
        void badgeRef.current.offsetWidth;
        badgeRef.current.style.animation = '';
      }
    };

    applyTheme();
    // Re-check every minute (catches hour boundary)
    const interval = setInterval(applyTheme, 60_000);
    return () => clearInterval(interval);
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    if (reducedMotion) return;
    const dot  = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    let rX = 0, rY = 0;
    const onMove = (e: MouseEvent) => {
      dot.style.left  = `${e.clientX}px`;
      dot.style.top   = `${e.clientY}px`;
      // Ring — lerp via rAF
      rX += (e.clientX - rX) * 0.12;
      rY += (e.clientY - rY) * 0.12;
      ring.style.left = `${rX}px`;
      ring.style.top  = `${rY}px`;
    };

    let raf: number;
    const lerp = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => onMove(e));
    };

    const onEnter = () => ring.classList.add('hovered');
    const onLeave = () => ring.classList.remove('hovered');

    document.addEventListener('mousemove', lerp);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', lerp);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  /* ── Section-level parallax (subtle depth shift) ── */
  useEffect(() => {
    if (reducedMotion) return;
    const sections = document.querySelectorAll<HTMLElement>('.parallax-section');
    sections.forEach((sec) => {
      gsap.to(sec, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });

    /* Scroll-triggered section reveals — fromTo so headings are never stuck invisible */
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(st => {
      // Only kill the ones we created here — App-level ones
      if (!st.vars?.id) st.kill();
    });
  }, [reducedMotion]);

  return (
    <HelmetProvider>
      {/* ── Custom cursor (desktop only via CSS) ── */}
      <div id="cursor-dot"  ref={cursorDot}  aria-hidden="true" />
      <div id="cursor-ring" ref={cursorRing} aria-hidden="true" />

      {/* ── Theme badge ── */}
      <div ref={badgeRef} className="theme-badge" aria-hidden="true" />

      <div className="relative min-h-screen">
        <Helmet>
          <title>{SITE_CONFIG.SEO.title}</title>
          <meta name="description"        content={SITE_CONFIG.SEO.description} />
          <link rel="canonical"           href={SITE_CONFIG.SEO.canonical} />
          <meta property="og:title"       content={SITE_CONFIG.SEO.title} />
          <meta property="og:description" content={SITE_CONFIG.SEO.description} />
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={SITE_CONFIG.SEO.canonical} />
          <meta property="og:image"       content="/og-image.jpg" />
          <meta name="twitter:card"       content="summary_large_image" />
          <meta name="twitter:title"      content={SITE_CONFIG.SEO.title} />
          <meta name="twitter:description" content={SITE_CONFIG.SEO.description} />
          <script type="application/ld+json">{JSON.stringify(JSON_LD)}</script>
        </Helmet>

        {/* ── All HTML content ── */}
        <div className="relative z-10 flex flex-col">
          <Header />

          <main id="main-content" className="flex flex-col">
            <Hero />
            <TrustedCreators />
            <Process />
            <ReelEmbed />
            <PortfolioGrid />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
          </main>

          <footer className="py-12 border-t relative z-10" style={{ backgroundColor: 'var(--c-bg)', borderColor: 'var(--c-border)' }}>
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-xl font-display font-black text-white mb-2 uppercase tracking-widest">
                {SITE_CONFIG.BRAND} <span style={{ color: 'var(--c-primary)' }}>Visuals</span>
              </p>
              <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: 'var(--c-muted)' }}>
                Professional Video Editor, Cinematographer, and Instagram Reel Expert based in Mumbai, India.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest mb-8" style={{ color: 'var(--c-muted)', opacity: 0.4 }}>
                <span>Video Editor Mumbai</span>
                <span>•</span>
                <span>Instagram Reel Editor India</span>
                <span>•</span>
                <span>Cinematographer Mumbai</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--c-muted)', opacity: 0.25 }}>
                © {new Date().getFullYear()} {SITE_CONFIG.BRAND} • Visuals by {SITE_CONFIG.NAME}
              </p>
            </div>
          </footer>

          <WhatsAppFloat />
        </div>
      </div>
    </HelmetProvider>
  );
}
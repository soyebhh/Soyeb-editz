import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { SITE_CONFIG } from './data/siteConfig';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

import { Header }             from './components/Header';
import { CanvasScrollHero }   from './components/CanvasScrollHero';
import { ReelEmbed }      from './components/ReelEmbed';
import { Brands }         from './components/Brands';
import { Contact }        from './components/Contact';


import { PortfolioGrid }   from './components/PortfolioGrid';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const reducedMotion = usePrefersReducedMotion();

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.NAME,
    brand: SITE_CONFIG.BRAND,
    areaServed: 'Mumbai',
    telephone: SITE_CONFIG.PHONE,
    sameAs: [SITE_CONFIG.INSTAGRAM_URL],
  };

  return (
    <HelmetProvider>
      {/*
        Root wrapper — position: relative so z-index stacking context is clear:
          z-index 0  → ScrollScene (fixed 3D canvas, behind everything)
          z-index 10 → all HTML content below (header, sections, footer)
          z-index 9999 → grain overlay in index.css (body::after)
      */}
      <div className="relative min-h-screen selection:bg-primary/20">
        <Helmet>
          <title>{SITE_CONFIG.SEO.title}</title>
          <meta name="description" content={SITE_CONFIG.SEO.description} />
          <meta property="og:title" content={SITE_CONFIG.SEO.title} />
          <meta property="og:description" content={SITE_CONFIG.SEO.description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* ── All HTML content sits above the background ──────────── */}
        <div className="relative z-10">
          <Header />
          <main>
            <CanvasScrollHero />
            <ReelEmbed />
            <PortfolioGrid />
            <Brands />
            <Contact />
          </main>

          <footer className="py-16 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {SITE_CONFIG.BRAND} • Visuals by {SITE_CONFIG.NAME}
          </footer>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
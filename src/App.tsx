import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { SITE_CONFIG } from './data/siteConfig';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

import { Header }             from './components/Header';
import { Hero }   from './components/Hero';
import { TrustedCreators } from './components/TrustedCreators';
import { ReelEmbed }      from './components/ReelEmbed';
import { Brands }         from './components/Brands';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact }        from './components/Contact';
import { WhatsAppFloat } from './components/WhatsAppFloat';

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
    '@type': ['ProfessionalService', 'Person'],
    name: "Soyeb Khan",
    brand: "Soyeb Visuals",
    jobTitle: "Instagram Reel Editor & Cinematographer",
    url: 'https://www.soyeb.in',
    areaServed: 'Mumbai, India',
    telephone: '+91 8828182372',
    sameAs: ['https://www.instagram.com/soyebhx/'],
    description: "Leading professional video creator and cinematographer in Mumbai, specializing in high-impact visual storytelling and short-form content."
  };

  return (
    <HelmetProvider>
      {/*
        Root wrapper — position: relative so z-index stacking context is clear:
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
            <Hero />
            <TrustedCreators />
            <Brands />
            <Services />
            <Process />
            <ReelEmbed />
            <PortfolioGrid />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
          </main>

          <footer className="py-12 bg-[#0A0A0A] border-t border-white/5 relative z-10">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h3 className="text-xl font-display font-black text-white mb-2 uppercase tracking-widest">{SITE_CONFIG.BRAND} VISUALS</h3>
              <p className="text-[#F5F5F0]/50 text-sm mb-6 max-w-xl mx-auto">
                Professional Video Editor, Cinematographer, and Instagram Reel Expert based in Mumbai, India. Engineering viral growth for brands and creators worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#F5F5F0]/30 mb-8">
                <span>Video Editor Mumbai</span> •
                <span>Instagram Reel Editor India</span> •
                <span>Cinematographer Mumbai</span>
              </div>
              <p className="text-[#F5F5F0]/20 text-[10px] font-black uppercase tracking-[0.3em]">
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

export default App;
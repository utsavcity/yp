import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'motion/react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Leadership from './components/Leadership';
import Services from './components/Services';
import WhyNovaops from './components/WhyNovaops';
import TechShowcase from './components/TechShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<'sparkles' | 'compass'>('sparkles');

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return localStorage.getItem('novaops-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('novaops-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Scroll progress for top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Cursor glow tracking
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const springCursorX = useSpring(cursorX, { stiffness: 70, damping: 14 });
  const springCursorY = useSpring(cursorY, { stiffness: 70, damping: 14 });

  useEffect(() => {
    const handleCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleCursor);
    return () => window.removeEventListener('mousemove', handleCursor);
  }, [cursorX, cursorY]);

  // Track page scroll to set active section dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 320;

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const testimonialsEl = document.getElementById('testimonials');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (testimonialsEl && scrollPosition >= testimonialsEl.offsetTop) {
        setActiveSection('testimonials');
      } else if (servicesEl && scrollPosition >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'about' || sectionId === 'services' || sectionId === 'testimonials' || sectionId === 'contact') {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 80;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      setToastIcon('compass');
      setToastMessage(
        sectionId === 'contact'
          ? "Initializing premium Project Request module (Full integration coming next)..."
          : `Preparing navigation transition to the ${sectionId.toUpperCase()} section...`
      );
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const triggerToast = (message: string, icon: 'sparkles' | 'compass' = 'sparkles') => {
    setToastIcon(icon);
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="app-container" id="novaops-app">

      {/* Gold scroll progress bar at top */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />

      {/* Cursor glow follower */}
      <motion.div
        className="cursor-glow-follower"
        style={{
          left: springCursorX,
          top: springCursorY,
        }}
        aria-hidden="true"
      />

      {/* 1. Global Immersive Atmospheric Background */}
      <Background />

      {/* 2. Floating Liquid Glass Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />

      {/* 3. Main Continuous Cinematic Flow */}
      <main id="main-content-flow">
        <Hero
          onStartProject={() => handleNavigate('contact')}
          onExploreServices={() => handleNavigate('services')}
        />
        <About />
        <Leadership />
        <Services />
        <WhyNovaops />
        <TechShowcase />
        <Testimonials />
        <Contact />
      </main>

      {/* Dynamic unified Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Luxury Liquid Glass Interactive toast indicators */}
      {toastMessage && (
        <motion.div
          className="glass-panel"
          id="system-visual-toast"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            padding: '1.25rem 2rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--accent-gold-dim)',
            boxShadow: '0 10px 45px rgba(212, 175, 55, 0.15)',
            maxWidth: '380px',
            borderRadius: '16px'
          }}
        >
          {toastIcon === 'sparkles' ? (
            <Sparkles size={20} color="var(--accent-gold)" style={{ flexShrink: 0, animation: 'pulse 2s infinite' }} />
          ) : (
            <Compass size={20} color="var(--accent-blue-bright)" style={{ flexShrink: 0, animation: 'spinSlow 6s linear infinite' }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold)' }}>
              NOVAOPS SYSTEM
            </span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.4 }}>
              {toastMessage}
            </span>
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 2px var(--accent-gold)); }
          50% { transform: scale(1.1); opacity: 0.8; filter: drop-shadow(0 0 8px var(--accent-gold)); }
        }
      `}</style>
    </div>
  );
}
export {};

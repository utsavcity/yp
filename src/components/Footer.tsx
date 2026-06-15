import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, MessageSquare, Mail, Phone, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const columnReveal = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

export default function Footer({ onNavigate }: FooterProps) {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleWhatsAppClick = () => window.open("https://wa.me/917738410534", "_blank");

  return (
    <footer className="nova-footer" id="main-footer-signature">
      <div className="footer-top-divider">
        <div className="divider-glow-node" />
      </div>

      <div className="footer-container" id="footer-inner-content">

        {/* Brand column */}
        <motion.div
          className="footer-column brand-column"
          id="footer-brand-block"
          custom={0}
          variants={columnReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="footer-logo">
            <span className="logo-text">NOVAOPS<span className="logo-dot">.</span></span>
          </div>
          <span className="footer-tagline">"Your imagination, our creation."</span>
          <p className="footer-about-text">AI-powered software, intelligent systems, and scalable digital solutions crafted with flawless execution around your vision.</p>
          <div className="footer-credentials font-mono" id="copyright-watermark">
            &copy; {new Date().getFullYear()} NOVAOPS. All rights reserved.
          </div>
        </motion.div>

        {/* Navigation column */}
        <motion.div
          className="footer-column navigation-column"
          id="footer-nav-block"
          custom={1}
          variants={columnReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h4 className="footer-col-header font-display">NAVIGATION</h4>
          <ul className="footer-links-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="footer-nav-link"
                  onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
                  id={`footer-nav-item-${item.id}`}
                >
                  <span className="footer-bullet-dot" />
                  <span className="nav-label-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact column */}
        <motion.div
          className="footer-column contact-column"
          id="footer-contact-block"
          custom={2}
          variants={columnReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h4 className="footer-col-header font-display">DIRECT CHANNELS</h4>
          <ul className="footer-contacts-list font-mono" id="footer-contacts-list-ul">
            <li>
              <a href="tel:+918291419044" className="footer-contact-item">
                <Phone size={13} className="footer-icon-accent" />
                <div className="contact-item-text">
                  <span className="contact-role-label">Founder Line</span>
                  <span className="contact-value-text">+91 82914 19044</span>
                </div>
              </a>
            </li>
            <li>
              <a href="tel:+917738410534" className="footer-contact-item">
                <Phone size={13} className="footer-icon-accent" />
                <div className="contact-item-text">
                  <span className="contact-role-label">Co-Founder Line</span>
                  <span className="contact-value-text">+91 77384 10534</span>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:info@novaops.com" className="footer-contact-item">
                <Mail size={13} className="footer-icon-accent" />
                <div className="contact-item-text">
                  <span className="contact-role-label">Technical Inbox</span>
                  <span className="contact-value-text">info@novaops.com</span>
                </div>
              </a>
            </li>
            <li onClick={handleWhatsAppClick} style={{ cursor: 'pointer' }}>
              <div className="footer-contact-item wa-hover-tint">
                <MessageSquare size={13} className="footer-icon-accent whatsapp-icon-element" />
                <div className="contact-item-text">
                  <span className="contact-role-label flex items-center">WhatsApp Chat <ArrowUpRight size={10} style={{ marginLeft: '4px' }} /></span>
                  <span className="contact-value-text text-emerald-400">Instant Redirect</span>
                </div>
              </div>
            </li>
            <li className="location-footer-li">
              <div className="footer-contact-item">
                <MapPin size={13} className="footer-icon-accent" />
                <div className="contact-item-text">
                  <span className="contact-role-label">Office Location</span>
                  <span className="contact-value-text text-gray-400">Green Meadows, Shirdhon, Panvel, Maharashtra - 410221</span>
                </div>
              </div>
            </li>
          </ul>
        </motion.div>

      </div>

      <div className="footer-extreme-bottom" id="footer-legal-bar">
        <div className="footer-extreme-container">
          <div className="extreme-left font-mono">
            <span>METRIC: STABLE_BUILD_2026.06_V1</span>
            <span className="separator">|</span>
            <span>SECURE CLOUD PLATFORM</span>
          </div>
          <motion.button
            onClick={handleBackToTop}
            className="back-to-top-button"
            aria-label="Back to Top"
            id="back-to-top-trigger"
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add listener to modify glass transparency slightly on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="navbar-wrapper" id="site-header">
        <nav 
          className={`nova-navbar glass-panel ${isScrolled ? 'scrolled' : ''}`} 
          id="main-navigation"
        >
          {/* Logo Section */}
          <div className="logo-container" id="logo-trigger">
            <a 
              href="#home" 
              className="logo-text" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
            >
              NOVAOPS
              <span className="logo-dot">.</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links" id="desktop-menu-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Call to Action */}
          <a 
            href="#contact" 
            className="nav-cta" 
            id="nav-cta-contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
          >
            Start Project <ArrowUpRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
          </a>

          {/* Mobile Hamburguer / Trigger bar */}
          <div className="mobile-navbar-compact" id="mobile-navigation-trigger">
            <button
              className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              id="mobile-menu-hamburger"
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full screen Liquid Glass mobile overlay */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-fullscreen-overlay">
        <ul className="mobile-nav-links" id="mobile-overlay-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '20px' }}>
            <button 
              className="btn btn-primary"
              id="mobile-cta-contact"
              onClick={() => handleLinkClick('contact')}
            >
              Start Project <ArrowUpRight className="btn-icon" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

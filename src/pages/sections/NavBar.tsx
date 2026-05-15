import { useState, useEffect} from 'react';
import { Zap } from 'lucide-react';
import logo from '../../assets/logo.png';
import '../styles/Navigation.css';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#detailed-features', label: 'Capabilities' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#user-journey', label: 'How it Works' },
  { href: '#home-visit', label: 'Home Visit' },
  { href: '/comparison', label: 'Comparison' },
  { href: '#future-roadmap', label: 'RoadMap' },
  { href: '#features', label: 'Features' },
  { href: '#health-tools', label: 'Tools' },
];

const PremiumNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setElevated(scrollY > 60);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Active section detection
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveLink(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header className={`pnav-header ${elevated ? 'pnav-elevated' : ''}`}>
      {/* Scroll progress bar */}
      <div className="pnav-progress-track">
        <div className="pnav-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="pnav-inner">
        {/* ── Logo ── */}
        <a href="#" className="pnav-logo" aria-label="HealthNexus home">
          <div className="pnav-logo-mark">
            <img src={logo} alt="HealthNexus Logo" className="brand-icon" />
          </div>
          <span className="brand-text">HealthNexus</span>
        </a>

        {/* ── Desktop links ── */}
        <nav className="pnav-links" aria-label="Main navigation">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`pnav-link ${activeLink === href ? 'pnav-link--active' : ''}`}
              onClick={() => handleNavClick(href)}
            >
              <span className="pnav-link-text">{label}</span>
              <span className="pnav-link-dot" aria-hidden="true" />
            </a>
          ))}
        </nav>

        {/* ── CTA cluster ── */}
        <div className="pnav-cta-cluster">
          <a href="#" className="pnav-btn-ghost">Sign in</a>
          <a href="#" className="pnav-btn-primary">
            <Zap size={15} className="pnav-btn-icon" />
            Get Started
          </a>
        </div>

        {/* ── Mobile toggler ── */}
        <button
          className={`pnav-toggler ${menuOpen ? 'pnav-toggler--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="pnav-bar pnav-bar--top" />
          <span className="pnav-bar pnav-bar--mid" />
          <span className="pnav-bar pnav-bar--bot" />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`pnav-drawer ${menuOpen ? 'pnav-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="pnav-drawer-links">
          {navItems.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              className={`pnav-drawer-link ${activeLink === href ? 'pnav-drawer-link--active' : ''}`}
              onClick={() => handleNavClick(href)}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <span className="pnav-drawer-num">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="pnav-drawer-footer">
          <a href="#" className="pnav-btn-ghost pnav-btn--full">Sign in</a>
          <a href="#" className="pnav-btn-primary pnav-btn--full">
            <Zap size={15} className="pnav-btn-icon" />
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default PremiumNav;
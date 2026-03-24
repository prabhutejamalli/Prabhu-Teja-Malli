import React, { useState, useEffect } from 'react';
import type { NavLink } from '../../../types/portfolio.types';
import styles from './Navbar.module.css';

interface NavbarProps {
  links: NavLink[];
  activeSectionId: string;
  name: string;
}

const Navbar: React.FC<NavbarProps> = ({ links, activeSectionId, name }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <nav className={styles.nav}>
        <a href="#hero" className={styles.logo} aria-label="Home">
          <span className={styles.logoMark}>{initials}</span>
          <span className={styles.logoName}>{name.split(' ')[0]}</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={[
                  styles.link,
                  activeSectionId === link.id ? styles.active : '',
                ].join(' ')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.ctaBtn}>
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={[styles.bar, menuOpen ? styles.bar1Open : ''].join(' ')} />
          <span className={[styles.bar, menuOpen ? styles.bar2Open : ''].join(' ')} />
          <span className={[styles.bar, menuOpen ? styles.bar3Open : ''].join(' ')} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.drawer}>
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={[styles.drawerLink, activeSectionId === link.id ? styles.active : ''].join(' ')}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

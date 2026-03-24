import React from 'react';
import type { PersonalInfo } from '../../../types/portfolio.types';
import styles from './Hero.module.css';

interface HeroProps {
  info: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ info }) => (
  <section id="hero" className={styles.hero}>
    {/* Animated gradient blobs */}
    <div className={styles.blob1} aria-hidden />
    <div className={styles.blob2} aria-hidden />

    <div className={styles.content}>
      {info.available && (
        <div className={styles.badge}>
          <span className={styles.dot} />
          Available for opportunities
        </div>
      )}

      <p className={styles.greeting}>Hi there, I'm</p>

      <h1 className={styles.name}>{info.name}</h1>

      <h2 className={styles.title}>
        <span className={styles.titleText}>{info.title}</span>
      </h2>

      <p className={styles.tagline}>{info.tagline}</p>

      <div className={styles.ctas}>
        <a href="#projects" className={styles.btnPrimary}>
          View My Work
        </a>
        <a
          href={info.resumeUrl}
          className={styles.btnSecondary}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </div>

      <div className={styles.socials}>
        <a href={info.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <GitHubIcon />
          GitHub
        </a>
        <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <LinkedInIcon />
          LinkedIn
        </a>
        <a href={`mailto:${info.email}`} className={styles.socialLink}>
          <MailIcon />
          {info.email}
        </a>
      </div>
    </div>

    <div className={styles.scrollHint} aria-hidden>
      <div className={styles.scrollMouse}>
        <div className={styles.scrollWheel} />
      </div>
    </div>
  </section>
);

const GitHubIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default Hero;

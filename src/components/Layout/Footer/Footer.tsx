import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  name: string;
  github: string;
  linkedin: string;
}

const Footer: React.FC<FooterProps> = ({ name, github, linkedin }) => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <p className={styles.copy}>
        Designed & built by <strong>{name}</strong>
      </p>
      <div className={styles.socials}>
        <a href={github} target="_blank" rel="noopener noreferrer" className={styles.social}>
          GitHub
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.social}>
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

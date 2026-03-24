import React, { useRef } from 'react';
import useIntersection from '../../../hooks/useIntersection';
import styles from './RevealOnScroll.module.css';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps any content and fades it in when it enters the viewport.
 * Uses a CSS class toggle — zero JS animation, respects prefers-reduced-motion.
 */
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(ref);

  return (
    <div
      ref={ref}
      className={[styles.reveal, isVisible ? styles.visible : styles.hidden, className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;

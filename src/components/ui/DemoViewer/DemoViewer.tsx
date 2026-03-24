import React, { useEffect } from 'react';
import ECommerceDemo from '../../../demos/ECommerce/ECommerceDemo';
import TaskManagerDemo from '../../../demos/TaskManager/TaskManagerDemo';
import styles from './DemoViewer.module.css';

// Registry — add new demos here
const DEMO_REGISTRY: Record<string, React.ComponentType> = {
  ecommerce:   ECommerceDemo,
  taskmanager: TaskManagerDemo,
};

interface DemoViewerProps {
  demoId: string;
  title: string;
  techStack: string[];
  onClose: () => void;
}

const DemoViewer: React.FC<DemoViewerProps> = ({ demoId, title, techStack, onClose }) => {
  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const DemoComponent = DEMO_REGISTRY[demoId];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.viewer}>

        {/* ── Top Bar ── */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onClose}>
            ← Back to Portfolio
          </button>

          <div className={styles.titleArea}>
            <span className={styles.liveChip}>● Live Demo</span>
            <span className={styles.demoTitle}>{title}</span>
            <div className={styles.techTags}>
              {techStack.map(t => (
                <span key={t} className={styles.techTag}>{t}</span>
              ))}
            </div>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="Close demo">
            ✕
          </button>
        </div>

        {/* ── Demo Content ── */}
        <div className={styles.content}>
          {DemoComponent
            ? <DemoComponent />
            : <div className={styles.notFound}>Demo not found.</div>
          }
        </div>
      </div>
    </div>
  );
};

export default DemoViewer;

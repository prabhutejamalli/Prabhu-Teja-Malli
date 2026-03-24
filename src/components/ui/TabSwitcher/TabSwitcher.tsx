import React from 'react';
import type { Tab } from '../../../types/portfolio.types';
import styles from './TabSwitcher.module.css';

interface TabSwitcherProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

/**
 * Pure presentational tab-switcher. Has no knowledge of what the tabs represent.
 */
const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeId, onChange }) => (
  <div className={styles.switcher} role="tablist">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        role="tab"
        aria-selected={tab.id === activeId}
        className={[styles.tab, tab.id === activeId ? styles.active : ''].join(' ')}
        onClick={() => onChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabSwitcher;

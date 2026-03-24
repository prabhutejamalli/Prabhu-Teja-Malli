import React from 'react';
import styles from './SkillBadge.module.css';

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => (
  <span className={styles.badge}>{name}</span>
);

export default SkillBadge;

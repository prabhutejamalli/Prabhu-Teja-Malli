import React from 'react';
import type { SkillCategory } from '../../../types/portfolio.types';
import SkillBadge from '../../ui/SkillBadge/SkillBadge';
import RevealOnScroll from '../../ui/RevealOnScroll/RevealOnScroll';
import styles from './Skills.module.css';

interface SkillsProps {
  categories: SkillCategory[];
}

const Skills: React.FC<SkillsProps> = ({ categories }) => (
  <section id="skills" className={styles.section}>
    <div className={styles.container}>
      <RevealOnScroll>
        <p className={styles.eyebrow}>What I work with</p>
        <h2 className={styles.heading}>Skills & Technologies</h2>
      </RevealOnScroll>

      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <RevealOnScroll key={cat.id} delay={i * 80}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{cat.icon}</span>
                <h3 className={styles.cardTitle}>{cat.label}</h3>
              </div>
              <div className={styles.badges}>
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;

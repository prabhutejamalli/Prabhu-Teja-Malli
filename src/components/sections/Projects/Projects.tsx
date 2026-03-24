import React, { useState } from 'react';
import type { Project, Tab } from '../../../types/portfolio.types';
import ProjectCard from '../../ui/ProjectCard/ProjectCard';
import TabSwitcher from '../../ui/TabSwitcher/TabSwitcher';
import RevealOnScroll from '../../ui/RevealOnScroll/RevealOnScroll';
import styles from './Projects.module.css';

interface ProjectsProps {
  projects: Project[];
}

const TABS: Tab[] = [
  { id: 'real', label: '💼 Real Projects' },
  { id: 'demo', label: '🚀 Demo Projects' },
];

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeTab, setActiveTab] = useState<'real' | 'demo'>('demo');

  const filtered = projects.filter((p) => p.type === activeTab);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <RevealOnScroll>
          <p className={styles.eyebrow}>What I've built</p>
          <h2 className={styles.heading}>Projects</h2>
          <p className={styles.subtext}>
            Real projects I've delivered for clients, plus demo apps showcasing my technical range.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className={styles.tabWrapper}>
            <TabSwitcher
              tabs={TABS}
              activeId={activeTab}
              onChange={(id) => setActiveTab(id as 'real' | 'demo')}
            />
          </div>
        </RevealOnScroll>

        {filtered.length === 0 ? (
          <RevealOnScroll delay={150}>
            <div className={styles.empty}>
              <p>🚧 Real projects coming soon — check back shortly!</p>
              <p className={styles.emptyNote}>
                Switch to <strong>Demo Projects</strong> to see my technical work right now.
              </p>
            </div>
          </RevealOnScroll>
        ) : (
          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

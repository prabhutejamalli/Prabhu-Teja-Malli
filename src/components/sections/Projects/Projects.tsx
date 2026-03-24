import React, { useState } from 'react';
import type { Project, Tab } from '../../../types/portfolio.types';
import ProjectCard from '../../ui/ProjectCard/ProjectCard';
import TabSwitcher from '../../ui/TabSwitcher/TabSwitcher';
import DemoViewer from '../../ui/DemoViewer/DemoViewer';
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
  const [activeTab, setActiveTab]       = useState<'real' | 'demo'>('demo');
  const [openProject, setOpenProject]   = useState<Project | null>(null);

  const filtered = projects.filter((p) => p.type === activeTab);

  return (
    <>
      <section id="projects" className={styles.section}>
        <div className={styles.container}>
          <RevealOnScroll>
            <p className={styles.eyebrow}>What I've built</p>
            <h2 className={styles.heading}>Projects</h2>
            <p className={styles.subtext}>
              Real enterprise projects I've delivered, plus interactive demos you can try right here.
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
                <p>🚧 More real projects coming soon!</p>
                <p className={styles.emptyNote}>
                  Switch to <strong>Demo Projects</strong> to see interactive demos right now.
                </p>
              </div>
            </RevealOnScroll>
          ) : (
            <div className={styles.grid}>
              {filtered.map((project, i) => (
                <RevealOnScroll key={project.id} delay={i * 100}>
                  <ProjectCard
                    project={project}
                    onOpenDemo={
                      project.demoId
                        ? () => setOpenProject(project)
                        : undefined
                    }
                  />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen demo viewer — rendered outside section so it covers everything */}
      {openProject && openProject.demoId && (
        <DemoViewer
          demoId={openProject.demoId}
          title={openProject.title}
          techStack={openProject.techStack}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
};

export default Projects;

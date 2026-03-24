import React from 'react';
import type { Project } from '../../../types/portfolio.types';
import SkillBadge from '../SkillBadge/SkillBadge';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const GitHubIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
  </svg>
);

const ExternalLinkIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, techStack, links, highlights } = project;

  return (
    <article className={styles.card}>
      <div className={styles.topBar} />

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.links}>
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="GitHub repository"
              >
                <GitHubIcon />
              </a>
            )}
            {links.live && links.live !== '#' && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Live demo"
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        {highlights.length > 0 && (
          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div className={styles.tags}>
          {techStack.map((tech) => (
            <SkillBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

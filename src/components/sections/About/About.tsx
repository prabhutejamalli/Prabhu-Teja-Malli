import React from 'react';
import type { PersonalInfo, Stat, Experience, Education } from '../../../types/portfolio.types';
import RevealOnScroll from '../../ui/RevealOnScroll/RevealOnScroll';
import styles from './About.module.css';

interface AboutProps {
  info: PersonalInfo;
  stats: Stat[];
  experiences: Experience[];
  education: Education[];
}

const About: React.FC<AboutProps> = ({ info, stats, experiences, education }) => (
  <section id="about" className={styles.section}>
    <div className={styles.container}>
      <RevealOnScroll>
        <p className={styles.eyebrow}>Get to know me</p>
        <h2 className={styles.heading}>About Me</h2>
      </RevealOnScroll>

      <div className={styles.grid}>
        {/* Left — avatar + stats */}
        <RevealOnScroll delay={100}>
          <div className={styles.left}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>
                {info.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
              <div className={styles.avatarRing} />
            </div>

            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — bio + experience + education */}
        <RevealOnScroll delay={200}>
          <div className={styles.right}>
            <div className={styles.bio}>
              {info.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.infoChips}>
              <span className={styles.chip}>
                <span>📍</span> {info.location}
              </span>
              <span className={styles.chip}>
                <span>📧</span>
                <a href={`mailto:${info.email}`}>{info.email}</a>
              </span>
              <span className={styles.chip}>
                <span>🏢</span> Asics Technologies Pvt Ltd
              </span>
            </div>

            {/* Key Achievements */}
            <div className={styles.achievements}>
              <h3 className={styles.expHeading}>Key Achievements</h3>
              <div className={styles.achievementList}>
                <div className={styles.achievement}>
                  <span className={styles.achieveIcon}>🏆</span>
                  <p>Trained & mentored <strong>9 software trainees</strong> in React.js best practices</p>
                </div>
                <div className={styles.achievement}>
                  <span className={styles.achieveIcon}>⚡</span>
                  <p>Spearheaded UI optimisations that improved performance across <strong>2 major projects</strong></p>
                </div>
                <div className={styles.achievement}>
                  <span className={styles.achieveIcon}>🎯</span>
                  <p>Recognised for translating complex client requirements into actionable technical solutions</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            {experiences.length > 0 && (
              <div className={styles.experience}>
                <h3 className={styles.expHeading}>Experience</h3>
                {experiences.map((exp) => (
                  <div key={exp.id} className={styles.expCard}>
                    <div className={styles.expHeader}>
                      <div>
                        <p className={styles.expRole}>{exp.role}</p>
                        <p className={styles.expCompany}>
                          {exp.company}
                          {exp.current && <span className={styles.currentBadge}>Current</span>}
                        </p>
                      </div>
                      <div className={styles.expMeta}>
                        <span>{exp.period}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className={styles.expList}>
                      {exp.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className={styles.experience}>
                <h3 className={styles.expHeading}>Education</h3>
                {education.map((edu) => (
                  <div key={edu.id} className={styles.expCard}>
                    <div className={styles.expHeader}>
                      <div>
                        <p className={styles.expRole}>{edu.degree}</p>
                        <p className={styles.expCompany}>{edu.institution}</p>
                      </div>
                      <div className={styles.expMeta}>
                        <span>{edu.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

export default About;

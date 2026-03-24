import React from 'react';
import {
  personalInfo,
  navLinks,
  stats,
  skillCategories,
  projects,
  experiences,
  contactData,
} from '../data/portfolio.data';
import useScrollSpy from '../hooks/useScrollSpy';
import Navbar from '../components/Layout/Navbar/Navbar';
import Footer from '../components/Layout/Footer/Footer';
import Hero from '../components/sections/Hero/Hero';
import About from '../components/sections/About/About';
import Skills from '../components/sections/Skills/Skills';
import Projects from '../components/sections/Projects/Projects';
import Contact from '../components/sections/Contact/Contact';

const SECTION_IDS = navLinks.map((l) => l.id);

/**
 * Top-level composition component.
 * Imports data and passes it as props to sections — sections never import data directly (DIP).
 */
const Portfolio: React.FC = () => {
  const activeSectionId = useScrollSpy(SECTION_IDS);

  return (
    <>
      <Navbar links={navLinks} activeSectionId={activeSectionId} name={personalInfo.name} />

      <main>
        <Hero info={personalInfo} />
        <About info={personalInfo} stats={stats} experiences={experiences} />
        <Skills categories={skillCategories} />
        <Projects projects={projects} />
        <Contact data={contactData} />
      </main>

      <Footer
        name={personalInfo.name}
        github={personalInfo.github}
        linkedin={personalInfo.linkedin}
      />
    </>
  );
};

export default Portfolio;

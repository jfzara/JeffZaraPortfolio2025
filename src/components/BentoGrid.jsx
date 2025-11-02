import React from "react";
import styled from "styled-components";
import ContactCard from "./ContactCard";
import AboutCard from "./AboutCard";
import ProjectsCard from "./ProjectsCard";
import SkillsCard from "./SkillsCard";

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 1.5rem;
  padding: 1.5rem;

  @media(min-width: 900px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "contact contact contact contact about about about about about about about about"
      "projects projects projects projects projects projects projects skills skills skills skills skills";
    gap: 2rem;
  }
`;

const Slot = styled.div`
  grid-area: ${p => p.area || "auto"};
  width: 100%;
`;

const Toggles = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  button {
    padding: 0.6rem 1rem;
    background: transparent;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.1);
    cursor: pointer;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    &:hover { background: rgba(0,0,0,0.05); }
  }
`;

export default function BentoGrid({ showProjects, setShowProjects, showSkills, setShowSkills }) {
  return (
    <Grid role="region" aria-label="Contenu principal">
      {/* Contact + toggles */}
      <Slot area="contact">
        <ContactCard />
        <Toggles className="mobile-toggles">
          <button
            aria-expanded={showProjects}
            aria-controls="projects-section"
            onClick={() => setShowProjects(s => !s)}
          >
            {showProjects ? "Cacher projets" : "Voir projets"}
          </button>

          <button
            aria-expanded={showSkills}
            aria-controls="skills-section"
            onClick={() => setShowSkills(s => !s)}
          >
            {showSkills ? "Cacher compétences" : "Voir compétences"}
          </button>
        </Toggles>
      </Slot>

      {/* About */}
      <Slot area="about">
        <AboutCard />
      </Slot>

      {/* Projects */}
      <Slot area="projects" id="projects-section" style={{ display: showProjects ? "block" : "none" }}>
        <ProjectsCard />
      </Slot>

      {/* Skills */}
      <Slot area="skills" id="skills-section" style={{ display: showSkills ? "block" : "none" }}>
        <SkillsCard />
      </Slot>
    </Grid>
  );
}
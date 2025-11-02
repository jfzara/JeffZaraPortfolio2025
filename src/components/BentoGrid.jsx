import React from "react";
import styled, { keyframes } from "styled-components";
import ContactCard from "./ContactCard";
import AboutCard from "./AboutCard";
import ProjectsCard from "./ProjectsCard";
import SkillsCard from "./SkillsCard";

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedSlot = styled.div`
  display: ${p => (p.show ? "block" : "none")};
  animation: ${fadeIn} 0.5s ease forwards;
`;

export default function BentoGrid({ showProjects, setShowProjects, showSkills, setShowSkills }) {
  return (
    <Grid role="region" aria-label="Contenu principal">
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

      <Slot area="about"><AboutCard /></Slot>

      <Slot area="projects" id="projects-section">
        <AnimatedSlot show={showProjects}><ProjectsCard /></AnimatedSlot>
      </Slot>

      <Slot area="skills" id="skills-section">
        <AnimatedSlot show={showSkills}><SkillsCard /></AnimatedSlot>
      </Slot>
    </Grid>
  );
}
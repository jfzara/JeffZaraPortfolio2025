import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Wrap = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Tile = styled.div`
  padding: 1.5rem;
  border-radius: ${theme.radius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  transition: transform 180ms ease;
  &:hover {
    transform: translateY(-4px);
    filter: brightness(1.02);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
`;

const Sub = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: ${theme.colors.muted};
`;

const ViewAll = styled.a`
  display: inline-block;
  padding: 0.9rem 1.6rem;
  border-radius: ${theme.radius};
  background: ${theme.colors.cta};
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  &:hover {
    filter: brightness(1.05);
  }
`;

export default function ProjectsCard() {
  const items = [
    { t: "YouChef", s: "Plateforme recettes simple", color: theme.colors.project1 },
    { t: "Livano", s: "Vitrine optimisée SEO", color: theme.colors.project2 },
    { t: "CI/CD", s: "Déploiements fiables", color: theme.colors.project3 },
    { t: "Prototype", s: "MVP testé", color: theme.colors.project4 }
  ];

  return (
    <Wrap role="region" aria-label="Aperçu projets">
      <Grid>
        {items.map((it, i) => (
          <Tile key={i} style={{ background: it.color }}>
            <Title tabIndex="0">{it.t}</Title>
            <Sub tabIndex="0">{it.s}</Sub>
          </Tile>
        ))}
      </Grid>
      <ViewAll href="#projects">Découvrir</ViewAll>
    </Wrap>
  );
}
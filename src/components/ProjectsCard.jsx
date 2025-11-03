import React from "react";
import { useTheme } from "styled-components";
import { ShinyRevealButton } from "./ShinyRevealButton";
import { CardBase } from "./CardBase";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const Tile = styled.div`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  background: ${({ color }) => color};
  transition: transform 0.25s ease, filter 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    filter: brightness(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
`;

const Sub = styled.p`
  margin: 0;
  font-size: 1.1rem;
`;

export default function ProjectsCard() {
  const theme = useTheme();
  const items = [
    { t: "YouChef", s: "Plateforme recettes simple", color: theme.colors.section1 },
    { t: "Livano", s: "Vitrine optimisée SEO", color: theme.colors.section2 },
    { t: "CI/CD", s: "Déploiements fiables", color: theme.colors.section3 },
  ];

  return (
    <CardBase role="region" aria-label="Projets récents">
      <Grid>
        {items.map((it, i) => (
          <Tile key={i} color={it.color}>
            <Title tabIndex="0">{it.t}</Title>
            <Sub tabIndex="0">{it.s}</Sub>
          </Tile>
        ))}
      </Grid>
      <ShinyRevealButton href="#projects">
        <span>Voir tous les projets</span>
      </ShinyRevealButton>
    </CardBase>
  );
}
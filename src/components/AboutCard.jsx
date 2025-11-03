 // src/components/AboutCard.jsx
import React from "react";
import { useTheme } from "styled-components";
import { CardBase } from "./CardBase";
import {  ShinyRevealButton } from "./ShinyRevealButton";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Short = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0;
`;

export default function AboutCard() {
  const theme = useTheme();

  return (
    <CardBase role="region" aria-label="À propos">
      <Title tabIndex="0">Qui suis-je ?</Title>
      <Short tabIndex="0">
        Développeur React & Freelance basé à Montréal. Je transforme vos idées en expériences web simples, performantes et impactantes. 
        Stack principale : React, JS/TS, Styled-Components. Disponible pour missions freelance et projets startups.
      </Short>
      
      <ShinyRevealButton href="#contact">
        <span>Discutons de votre projet →</span>
      </ShinyRevealButton>
    
    </CardBase>
  );
}
import React from "react";
import styled from "styled-components";

const Card = styled.article`
  width: 100%;
  padding: 3rem 2.5rem;
  border-radius: ${p => p.theme.radius};
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #a6f5cc12;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Short = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0;
  color: ${p => p.theme.colors.muted};
`;

const Action = styled.a`
  display: inline-block;
  padding: 0.9rem 1.6rem;
  border-radius: ${p => p.theme.radius};
  background: ${p => p.theme.colors.accent2};
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  &:hover { filter: brightness(1.1); }
`;

export default function AboutCard() {
  return (
    <Card role="region" aria-label="À propos">
      <Title tabIndex="0">Qui suis-je ?</Title>
      <Short tabIndex="0">
        Hello, je suis Jean Fabrice (Jeff), développeur React & Freelance basé à Montréal. Je transforme vos idées en expériences web simples, performantes et impactantes. Stack principale : React, JS/TS, Styled-Components.
      </Short>
      <Action href="#contact">Discutons de votre projet →</Action>
    </Card>
  );
}
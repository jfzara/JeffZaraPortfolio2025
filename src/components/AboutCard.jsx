import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Card = styled.article`
    width: 100%;
    padding: 3rem 2.5rem;
    border-radius: 3px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #a6f5cc12;
 
`;

const Title = styled.h2`
  font-size: 2rem;
  line-height: 1.4;
  margin: 0;
`;

const Short = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0;
  color: ${theme.colors.muted};
`;

const Action = styled.a`
display: inline-block;
    padding: 0.9rem 1.6rem;
    border-radius: 3px;
    background: #08a14d;
   
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
  &:hover {
    filter: brightness(1.1);
  
  }
`;

export default function AboutCard() {
  return (
    <Card role="region" aria-label="À propos bref">
      <Title tabIndex="0">Qui suis-je ?</Title>
      <Short tabIndex="0">
        Je transforme vos idées en sites simples, lisibles et impactants — proches du client et faciles à maintenir.
      </Short>
   <Action href="#about">
  En savoir plus <span>&rarr;</span>
</Action>
    </Card>
  );
}
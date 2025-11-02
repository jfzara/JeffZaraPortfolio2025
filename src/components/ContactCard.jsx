import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import photo from "../assets/photo-technicien.jpeg";

const Card = styled.article`
  background: ${theme.colors.contact};
  border-radius: ${theme.radius};
  padding: 3rem 4rem; /* plus large horizontalement */
  
  gap: 3rem;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, filter 0.2s ease;

  width: 100%; /* s’étend sur toute la largeur du slot */
  max-width: 1200px; /* limite la largeur sur grand écran pour ne pas étirer trop le texte */
  margin: 0 auto;

  &:hover { transform: translateY(-5px); filter: brightness(1.03); }

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem;
  }
`;

const Photo = styled.div`
  width: 200px;
  height: 200px;
  border-radius: ${theme.radius};
  overflow: hidden;
  margin-bottom:1vw;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1; /* prend tout l’espace restant */
`;

const Headline = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Tagline = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: ${theme.colors.muted};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Primary = styled.a`
  background: ${theme.colors.cta};
  padding: 0.9rem 1.8rem;
  border-radius: ${theme.radius};
  font-weight: 800;
  font-size: 1.05rem;
  box-shadow: 0 10px 25px rgba(255,184,76,0.15);
  &:hover { transform: translateY(-2px); filter: brightness(1.05); }
`;

const Secondary = styled.a`
  padding: 0.8rem 1.5rem;
  border-radius: ${theme.radius};
  border: 1px solid rgba(0,0,0,0.1);
  background: transparent;
  font-weight: 700;
  font-size: 1rem;
  &:hover { background: rgba(0,0,0,0.03); }
`;

export default function ContactCard() {
  return (
    <Card role="region" aria-label="Contact">
      <Photo>
        <img src={photo} alt="Photo profil" />
      </Photo>
      <Content>
        <Headline tabIndex="0">Envie de lancer un projet ?</Headline>
        <Tagline tabIndex="0">Simple et rapide — discutons de vos besoins.</Tagline>
        <Actions>
          <Primary href="mailto:zarajeanfabrice@gmail.com">Envoyer un email</Primary>
          <Secondary href="#contact">Voir détails</Secondary>
        </Actions>
      </Content>
    </Card>
  );
}
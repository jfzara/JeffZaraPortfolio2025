import React from "react";
import styled from "styled-components";
import photo from "../assets/photo-technicien.jpeg";

const Card = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2.5rem;
  border-radius: ${p => p.theme.radius};
  background: ${p => p.theme.colors.contact};
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  align-items: center;
  justify-content: center;
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${p => p.theme.radius};
  object-fit: cover;
  @media(max-width: 900px){ width:150px; height:150px; }
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  gap:1rem;
`;

const Headline = styled.h1` margin:0; font-size:2rem; `;
const Tagline = styled.p` margin:0; color:${p => p.theme.colors.muted}; `;

const Actions = styled.div`
  display:flex;
  gap:1rem;
  flex-wrap:wrap;
`;

const Primary = styled.a`
  padding: 0.9rem 1.8rem;
  border-radius:${p => p.theme.radius};
  background: ${p => p.theme.colors.cta};
  color:#fff;
  font-weight:800;
  &:hover { transform: translateY(-2px); filter: brightness(1.05); }
`;

const Secondary = styled.a`
  padding:0.8rem 1.5rem;
  border-radius:${p => p.theme.radius};
  border:1px solid rgba(0,0,0,0.1);
  &:hover{ background: rgba(0,0,0,0.03); }
`;

export default function ContactCard() {
  return (
    <Card role="region" aria-label="Contact">
      <Photo src={photo} alt="Photo profil Jean Fabrice ZARA" />
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
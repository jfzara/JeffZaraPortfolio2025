import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Nav = styled.nav`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0.75rem 1.5rem;
  position:sticky;
  top:0;
  background: rgba(255,255,255,0.95);
  z-index:100;
  box-shadow:0 2px 5px rgba(0,0,0,0.05);
`;

const Brand = styled.a`
  font-weight:800;
  font-size:1rem;
  color:${theme.colors.text};
`;

const Actions = styled.div` display:flex; gap:0.75rem; `;
const Link = styled.a`
  padding:0.5rem 0.75rem;
  border-radius:${theme.radius};
  font-weight:700;
  &:hover{ background: rgba(0,0,0,0.03); transform:translateY(-1px); }
`;

const CTA = styled.a`
  padding:0.6rem 1rem;
  border-radius:${theme.radius};
  font-weight:800;
  background:${theme.colors.cta};
  color:${theme.colors.text};
  box-shadow:0 6px 16px rgba(255,184,76,0.14);
  &:hover{ transform: translateY(-2px); filter:brightness(1.02); }
`;

export default function Navbar() {
  return (
    <Nav aria-label="Navigation principale">
      <Brand href="#home">JeanFabrice — Dev</Brand>
      <Actions>
        <Link href="#projects">Projets</Link>
        <Link href="#skills">Compétences</Link>
        <CTA href="#contact">Contact</CTA>
      </Actions>
    </Nav>
  );
}
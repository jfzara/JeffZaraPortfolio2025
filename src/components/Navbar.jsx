import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Nav = styled.nav`
  background: transparent;
  padding: 0.6rem 1rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  position: sticky;
  top:0;
  z-index:50;
`;

const Brand = styled.a`
  font-weight:800;
  color: ${theme.colors.text};
  font-size:1rem;
  letter-spacing:-0.2px;
`;

const Actions = styled.div`
  display:flex;
  gap:0.6rem;
`;

const Link = styled.a`
  padding:0.45rem 0.6rem;
  border-radius: 3px;
  font-weight:700;
  color:${theme.colors.text};
  &:hover{ background: rgba(0,0,0,0.03); transform: translateY(-1px); }
`;

const CTA = styled.a`
  padding:0.5rem 0.9rem;
  background: ${theme.colors.cta};
  color:${theme.colors.text};
  border-radius:3px;
  font-weight:800;
  box-shadow: 0 6px 16px rgba(255,184,76,0.14);
  &:hover{ transform: translateY(-2px); filter: brightness(1.02); }
`;

export default function Navbar(){
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
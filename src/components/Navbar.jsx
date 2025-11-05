// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  background: rgba(191,191,191,0.95); /* gris clair semi-transparent */
  backdrop-filter: blur(8px);
  z-index: 100;
  font-family: "Space Grotesk", sans-serif;
`;

const Brand = styled.a`
  font-weight: 800;
  font-size: 1.2rem;
  color: #111;
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Bouton identique aux CTA
const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 1px;
  text-decoration: none;
  color: #fff;
  background: #000;
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;

  &:hover {
    background: #b0d2ff;
    color: #464646;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Brand href="#home">JeanFabrice — Dev</Brand>
      <Actions>
        <ContactButton href="#contact">Contact</ContactButton>
      </Actions>
    </Nav>
  );
}
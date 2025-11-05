// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";
import { ShinyRevealButton } from "./ShinyRevealButton";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  background: rgba(191,191,191,0.95); /* gris clair cohérent avec les sections */
  backdrop-filter: blur(8px);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  font-family: "Space Grotesk", sans-serif; /* police corrigée */
  transition: background 0.3s ease, color 0.3s ease;
`;

const Brand = styled.a`
  font-weight: 800;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: rotate(15deg);
  }
`;

export default function Navbar({ themeMode, toggleTheme }) {
  return (
    <Nav aria-label="Navigation principale">
      <Brand href="#home">JeanFabrice — Dev</Brand>

      <Actions>
        {/* Bouton Contact avec animation ShinyReveal intacte */}
        <ShinyRevealButton href="#contact">
          <span>Contact</span>
        </ShinyRevealButton>

        {/* Toggle Dark/Light */}
        <ThemeToggle
          onClick={toggleTheme}
          aria-label={
            themeMode === "light"
              ? "Activer le mode sombre"
              : "Activer le mode clair"
          }
        >
          {themeMode === "light" ? "🌙" : "☀️"}
        </ThemeToggle>
      </Actions>
    </Nav>
  );
}
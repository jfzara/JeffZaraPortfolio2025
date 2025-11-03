// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";
import { ShinyRevealButton } from "./ShinyRevealButton";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  background: ${({ theme }) =>
    theme.colors.bg === "#F5F5F5"
      ? "rgba(255,255,255,0.7)"
      : "rgba(26,26,46,0.7)"};
  backdrop-filter: blur(8px);
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, color 0.3s ease;
`;

const Brand = styled.a`
  font-weight: 800;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Link = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) =>
      theme.colors.bg === "#F5F5F5"
        ? "rgba(0,0,0,0.05)"
        : "rgba(255,255,255,0.1)"};
    transform: translateY(-1px);
  }
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
        <Link href="#projects">Projets</Link>
        <Link href="#skills">Compétences</Link>
        <ShinyRevealButton href="#contact">
          <span>Contact</span>
        </ShinyRevealButton>

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
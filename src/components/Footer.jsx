import React from "react";
import styled from "styled-components";

const Wrap = styled.footer`
  padding: 1rem 2rem;
  text-align: center;
  color: #e0e0e0; // gris clair, contraste suffisant
  font-size: 0.9rem;
  position: relative;
  z-index: 10;

  background: rgba(0, 0, 0, 0.3); // verre givré
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 255, 255, 0.3); // bordure neon subtile
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.05);

  a {
    color: #00eaff; // néon bleu
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  a:hover {
    text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff;
    color: #00ffff;
  }
`;

export default function Footer() {
  return (
    <Wrap aria-label="Pied de page">
      © 2025 Jean Fabrice ZARA — Montréal — Disponible pour projets — 
      <a href="https://github.com/zarajeanfabrice" target="_blank" rel="noreferrer"> GitHub</a>
    </Wrap>
  );
}

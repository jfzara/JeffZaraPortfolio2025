import React from "react";
import styled from "styled-components";

// Couleur très attirante pour les liens
const LINK_ACCENT_COLOR = "#007AFF"; // Bleu électrique vif (très visible sur blanc)
const HOVER_COLOR = "#005CE6"; // Bleu légèrement plus foncé au survol

const Wrap = styled.footer`
  padding: 1.5rem 4vw;
  text-align: center;
  color: #666666;
  font-size: 0.9rem;
  position: relative;
  z-index: 10;
  font-family: "Space Grotesk", sans-serif;

  background: #ffffff;
  border-top: 1px solid #eeeeee;
  backdrop-filter: none;
  box-shadow: none;

  a {
    color: ${LINK_ACCENT_COLOR}; // Nouveau bleu très attirant
    text-decoration: none;
    font-weight: 600; // Un peu plus de gras pour la mise en évidence
    transition: color 0.3s ease, text-decoration 0.3s ease;
  }

  a:hover {
    text-decoration: underline;
    color: ${HOVER_COLOR}; // Changement de couleur au survol pour feedback
  }
`;

export default function Footer() {
  return (
    <Wrap aria-label="Pied de page">
      © 2025 Jean Fabrice ZARA — Montréal — Disponible pour projets —
      <a
        href="https://github.com/zarajeanfabrice"
        target="_blank"
        rel="noreferrer"
      >
        {" "}
        GitHub
      </a>
    </Wrap>
  );
}
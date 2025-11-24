import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import QuadToggle from "./QuadToggle";

// Mise à jour des couleurs pour le thème minimaliste (Blanc/Noir)
const Color = {
  PrimaryAccent: "#333333", // Noir pour les accents subtils
  TextDark: "#333333",
  TextSubtle: "#666666",
  BackgroundWhite: "#FFFFFF",
};

const CONTENT_PADDING = "4vw";
const MAX_CONTENT_WIDTH = "1400px";

// Nav : Fond blanc, légèrement accentué au défilement
const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 990;
  font-family: "Space Grotesk", sans-serif;
  background: ${Color.BackgroundWhite}; // Fond blanc
  border-bottom: 1px solid
    ${({ $scrolled }) =>
      $scrolled ? "#EEEEEE" : "transparent"}; // Ligne subtile au défilement
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? `0 1px 10px rgba(0, 0, 0, 0.05)` : "none"}; // Ombre très légère
  transition: border-bottom 0.1s ease, box-shadow 0.3s ease;
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: ${MAX_CONTENT_WIDTH};
  width: 100%;
  margin: 0 auto;
  padding: 0 ${CONTENT_PADDING};
`;

// Brand : Texte noir/gris foncé, simple
const Brand = styled.a`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${Color.TextDark}; // Noir
  text-decoration: none;
  letter-spacing: 2px; // Réduction du letter-spacing pour plus de sobriété
  text-transform: uppercase;
  cursor: default;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem; // Augmentation de l'espace pour l'aération
  margin-left: auto;
`;

// TagButtonBase : Style minimaliste (texte seulement)
const TagButtonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem; // Padding réduit
  font-size: 0.95rem;
  font-weight: 500; // Moins gras
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: transparent; // Pas de fond
  color: ${Color.TextSubtle}; // Gris subtil pour les liens
  clip-path: none; // Retrait du clip-path
  text-shadow: none; // Retrait du néon
  transition: color 0.2s ease, text-decoration 0.2s ease;

  &:hover {
    color: ${Color.TextDark}; // Noir au survol
    text-decoration: underline; // Souligné au survol
    transform: none; // Retrait de la transformation au hover
  }
`;

const ContactButton = styled.a`
  ${TagButtonBase}
`;

const PreferencesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PreferencesButton = styled.button`
  ${TagButtonBase}
  width: auto; // Largeur ajustée au contenu

  // Style de bouton actif minimaliste
  ${({ $isActive }) =>
    $isActive &&
    `
    color: ${Color.TextDark};
    text-decoration: underline;
  `}
`;

export default function Navbar() {
  const [prefOpen, setPrefOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      <InnerNav>
        <Brand href="#home">JEAN FABRICE ZARA</Brand>
        <ButtonGroupWrapper>
          <ContactButton href="#contact">Contact</ContactButton>
          <PreferencesWrapper>
            <PreferencesButton
              ref={buttonRef}
              $isActive={prefOpen}
              onClick={() => setPrefOpen((p) => !p)}
            >
              Préférences
            </PreferencesButton>
            <QuadToggle
              isOpen={prefOpen}
              onClose={() => setPrefOpen(false)}
              parentRef={buttonRef}
            />
          </PreferencesWrapper>
        </ButtonGroupWrapper>
      </InnerNav>
    </Nav>
  );
}
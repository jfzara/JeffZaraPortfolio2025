// src/App.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import SectionsContainer from "./components/SectionsContainer";
import "./global.css";

const sections = [
  {
    title: "À PROPOS",
    subtitle: "Développeur React — Freelance Montréal",
    body: "<p>Création d’expériences web performantes, maintenables et orientées conversion.</p>",
    ctaText: "Discutons du projet",
    ctaHref: "#contact",
    bg: "#FFF7E6",
    deco: { right: "6vw", w: "6vw", color: "#E6F7F5", o: 0.09 }
  },
  {
    title: "PROJETS",
    subtitle: "Sélection de travaux récents",
    body: "<ul><li>YouChef — Plateforme recette</li><li>Livano — Vitrine SEO</li><li>CI/CD — Pipelines</li></ul>",
    ctaText: "Voir projets",
    ctaHref: "#projects",
    bg: "#FFF0F0",
    deco: { right: "4vw", w: "8vw", color: "#FFDFA8", o: 0.07 }
  },
  {
    title: "COMPÉTENCES",
    subtitle: "Stack & compétences",
    body: "<p>React, TypeScript, Styled-Components, Accessibilité, SEO, Performance.</p>",
    ctaText: "Contact pro",
    ctaHref: "#contact",
    bg: "#F0FFF6",
    deco: { left: "6vw", w: "6vw", color: "#002E2A", o: 0.06 }
  },
  {
    title: "CONTACT",
    subtitle: "Disponible pour missions",
    body: "<p>Mail : zarajeanfabrice@gmail.com — Disponible Montréal</p>",
    ctaText: "Envoyer un email",
    ctaHref: "mailto:zarajeanfabrice@gmail.com",
    bg: "#F7F7FF",
    deco: { right: "6vw", w: "7vw", color: "#2E0A7D", o: 0.08 }
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout>
        <SectionsContainer sections={sections} />
        <ThemeToggle onClick={() => setDarkMode(d => !d)} dark={darkMode} />
      </Layout>
    </ThemeProvider>
  );
}

// Composant interrupteur stylé
import styled from "styled-components";

const ThemeToggle = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 70px;
  height: 35px;
  background: ${({ dark }) => (dark ? "#333" : "#ddd")};
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ dark }) => (dark ? "36px" : "3px")};
    width: 28px;
    height: 28px;
    background: ${({ dark }) => (dark ? "#f5f5f5" : "#111")};
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// src/App.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import SectionsContainer from "./components/SectionsContainer";
import { ShinyRevealButton } from "./components/ShinyRevealButton";
import "./global.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    {
      title: "À PROPOS",
      subtitle: "Développeur React — Freelance Montréal",
      body: "<p>Création d’expériences web performantes, maintenables et orientées conversion.</p>",
      ctaText: "Discutons du projet",
      ctaHref: "#contact",
      bg: "#0A0A0C", // fond sombre
      deco: { right: "6vw", w: "6vw", color: "#00FFFF", o: 0.09 }
    },
    {
      title: "PROJETS",
      subtitle: "Sélection de travaux récents",
      body: "<ul><li>YouChef — Plateforme recette</li><li>Livano — Vitrine SEO</li><li>CI/CD — Pipelines</li></ul>",
      ctaText: "Voir projets",
      ctaHref: "#projects",
      bg: "#111111",
      deco: { right: "4vw", w: "8vw", color: "#FF0077", o: 0.07 }
    },
    {
      title: "COMPÉTENCES",
      subtitle: "Stack & compétences",
      body: "<p>React, TypeScript, Styled-Components, Accessibilité, SEO, Performance.</p>",
      ctaText: "Contact pro",
      ctaHref: "#contact",
      bg: "#1A1A1D",
      deco: { left: "6vw", w: "6vw", color: "#FFB800", o: 0.06 }
    },
    {
      title: "CONTACT",
      subtitle: "Disponible pour missions",
      body: "<p>Mail : zarajeanfabrice@gmail.com — Disponible Montréal</p>",
      ctaText: "Envoyer un email",
      ctaHref: "mailto:zarajeanfabrice@gmail.com",
      bg: "#222222",
      deco: { right: "6vw", w: "7vw", color: "#00FFFF", o: 0.08 }
    }
  ];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout>
        {/* Sections immersives */}
        <SectionsContainer sections={sections} />

        {/* Toggle Dark/Light */}
        <div style={{ textAlign: "center", margin: "3rem 0" }}>
          <ShinyRevealButton as="button" onClick={() => setDarkMode(d => !d)}>
            <span>{darkMode ? "LIGHT MODE" : "DARK MODE"}</span>
          </ShinyRevealButton>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
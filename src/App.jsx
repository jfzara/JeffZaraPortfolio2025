// src/App.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import SectionsContainer from "./components/SectionsContainer/SectionsContainer";
import ProjectsSection from "./components/ProjectsSection";
import QuadToggle from "./components/QuadToggle";
import MobileNavFab from "./components/SectionsContainer/MobileNavFab";

import "./global.css";

/* -------------------------------------------------------
   1. Sections dynamiques utilisées dans SectionsContainer
-------------------------------------------------------- */
const dynamicSections = [
  {
    id: "about",
    title: "À PROPOS",
    subtitle: "Développeur React — Freelance Montréal",
    body: "<p>Création d’expériences web performantes, maintenables et orientées conversion.</p>",
    ctaText: "Discutons du projet",
    ctaHref: "#contact",
    bg: "#FFF7E6",
    deco: { right: "6vw", w: "6vw", color: "#E6F7F5", o: 0.09 },
  },
  {
    id: "competences",
    title: "COMPÉTENCES",
    subtitle: "Stack & compétences",
    body: "<p>React, TypeScript, Styled-Components, Accessibilité, SEO, Performance.</p>",
    ctaText: "Contact pro",
    ctaHref: "#contact",
    bg: "#F0FFF6",
    deco: { left: "6vw", w: "6vw", color: "#002E2A", o: 0.06 },
  },
  {
    id: "contact",
    title: "CONTACT",
    subtitle: "Disponible pour missions",
    body: "<p>Mail : zarajeanfabrice@gmail.com — Disponible Montréal</p>",
    ctaText: "Envoyer un email",
    ctaHref: "mailto:zarajeanfabrice@gmail.com",
    bg: "#F7F7FF",
    deco: { right: "6vw", w: "7vw", color: "#2E0A7D", o: 0.08 },
  },
];

/* -------------------------------------------------------
   2. Sections disponibles dans la navigation mobile (FAB)
      → uniquement les sections dynamiques
-------------------------------------------------------- */
const navSections = dynamicSections.map((s) => ({
  id: s.id,
  title: s.title,
}));

/* -------------------------------------------------------
   3. Composant principal
-------------------------------------------------------- */
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Défilement doux déclenché par MobileNavFab
  const handleScrollToSection = (index) => {
    const { id } = navSections[index];
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout>
        {/* Sections scroll vertical avec vidéo + animations */}
        <SectionsContainer sections={dynamicSections} />

        <QuadToggle />

        {/* Section projets (composant séparé) */}
        <div id="projects">
          <ProjectsSection />
        </div>

        {/* Navigation mobile (bouton flottant FAB) */}
        <MobileNavFab
          sections={navSections}
          onDotClick={handleScrollToSection}
        />
      </Layout>
    </ThemeProvider>
  );
}

/* -------------------------------------------------------
   4. Entrée React
-------------------------------------------------------- */
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

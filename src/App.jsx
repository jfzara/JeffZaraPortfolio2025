// src/App.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import SectionsContainer from "./components/SectionsContainer/SectionsContainer";
import ProjectsSection from "./components/ProjectsSection";
import styled from "styled-components";
import QuadToggle from "./components/QuadToggle";
import "./global.css";

const sections = [
  {
    title: "À PROPOS",
    subtitle: "Développeur React — Freelance Montréal",
    body: "<p>Création d’expériences web performantes, maintenables et orientées conversion.</p>",
    ctaText: "Discutons du projet",
    ctaHref: "#contact",
    bg: "#FFF7E6",
    deco: { right: "6vw", w: "6vw", color: "#E6F7F5", o: 0.09 },
  },
  {
    title: "COMPÉTENCES",
    subtitle: "Stack & compétences",
    body: "<p>React, TypeScript, Styled-Components, Accessibilité, SEO, Performance.</p>",
    ctaText: "Contact pro",
    ctaHref: "#contact",
    bg: "#F0FFF6",
    deco: { left: "6vw", w: "6vw", color: "#002E2A", o: 0.06 },
  },
  {
    title: "CONTACT",
    subtitle: "Disponible pour missions",
    body: "<p>Mail : zarajeanfabrice@gmail.com — Disponible Montréal</p>",
    ctaText: "Envoyer un email",
    ctaHref: "mailto:zarajeanfabrice@gmail.com",
    bg: "#F7F7FF",
    deco: { right: "6vw", w: "7vw", color: "#2E0A7D", o: 0.08 },
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout>
      

        {/* Sections dynamiques */}
        <SectionsContainer sections={sections} />
        <QuadToggle />
 <ProjectsSection />
      
            {/* Section Projets indépendante */}
       
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

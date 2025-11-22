// src/components/Layout.jsx
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  display: block;
  padding: 0;
  background: ${({ theme }) => theme.colors.main_bg};
  transition: ${({ theme }) => theme.transition};
`;

export default function Layout({ children, toggleTheme, themeMode }) {
  return (
    <Page>
      {/* Définition du filtre SVG pour le grain */}
      <svg style={{ display: 'none' }}>
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" />
          <feComposite operator="in" in2="SourceGraphic" in="noise" result="blend" />
          <feComposite operator="in" in2="SourceGraphic" in="blend" result="blended_result" />
          <feMerge>
            <feMergeNode in="blended_result" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      <Navbar toggleTheme={toggleTheme} themeMode={themeMode} />
      <Main>{children}</Main>
      <Footer />
    </Page>
  );
}

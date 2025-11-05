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
      <Navbar toggleTheme={toggleTheme} themeMode={themeMode} />
      <Main>{children}</Main>
      <Footer />
    </Page>
  );
}
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { theme } from "../theme";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.bg};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  display: block;
  padding: 1rem;
`;

export default function Layout({ children }) {
  return (
    <Page>
      <Navbar />
      <Main className="container">{children}</Main>
      <Footer />
    </Page>
  );
}

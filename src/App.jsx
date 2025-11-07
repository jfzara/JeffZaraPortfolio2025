// src/App.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import SectionsSpace from "./components/SectionsSpace";
import { ShinyRevealButton } from "./components/ShinyRevealButton";
import CustomCursor from "./components/CustomCursor";

import "./global.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <CustomCursor />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Layout>
          <SectionsSpace />

          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            <ShinyRevealButton as="button" onClick={() => setDarkMode(d => !d)}>
              <span>{darkMode ? "LIGHT MODE" : "DARK MODE"}</span>
            </ShinyRevealButton>
          </div>
        </Layout>
      </ThemeProvider>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

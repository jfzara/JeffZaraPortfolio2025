import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import BentoGrid from "./components/BentoGrid";
import GlobalStyle from "./GlobalStyle"; // on va le créer juste après
import "./global.css";

function App() {
  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout themeMode={themeMode} toggleTheme={toggleTheme}>
        <BentoGrid
          showProjects={showProjects}
          setShowProjects={setShowProjects}
          showSkills={showSkills}
          setShowSkills={setShowSkills}
        />
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

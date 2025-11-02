import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import BentoGrid from "./components/BentoGrid";
import { lightTheme, darkTheme } from "./theme";
import "./global.css";

function App() {
  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout toggleTheme={() => setDarkMode(d => !d)}>
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
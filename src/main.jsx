import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import BentoGrid from "./components/BentoGrid";
import "./global.css";

function App() {
  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout>
        <BentoGrid
          showProjects={showProjects}
          setShowProjects={setShowProjects}
          showSkills={showSkills}
          setShowSkills={setShowSkills}
        />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={() => setDarkMode(d => !d)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);
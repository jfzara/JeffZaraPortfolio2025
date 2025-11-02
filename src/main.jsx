// src/main.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import BentoGrid from "./components/BentoGrid";
import "./global.css"; // ou global.css si tu as déjà ton CSS global

function App() {
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  return (
    <Layout>
      <BentoGrid
        showProjects={showProjects}
        setShowProjects={setShowProjects}
        showSkills={showSkills}
        setShowSkills={setShowSkills}
      />
    </Layout>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
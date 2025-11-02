import React, { useState } from "react";
import Layout from "./components/Layout";
import BentoGrid from "./components/BentoGrid";

export default function App() {
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

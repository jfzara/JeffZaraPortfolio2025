import React from "react";

export default function SectionSelector({ onSelect }) {
  return (
    <div className="selector-container">
      <h1 className="intro-title">Découvre mon univers</h1>
      <div className="selector-grid">
        <div
          className="selector-card"
          onClick={() => onSelect("projects")}
          style={{
            background: "linear-gradient(135deg, #7a5fff, #01d2d2)",
          }}
        >
          <h2>Projects</h2>
          <p>Projets, prototypes et créations.</p>
        </div>

        <div
          className="selector-card"
          onClick={() => onSelect("skills")}
          style={{
            background: "linear-gradient(135deg, #ff6fd8, #3813c2)",
          }}
        >
          <h2>Skills</h2>
          <p>Outils et langages favoris.</p>
        </div>

        <div
          className="selector-card"
          onClick={() => onSelect("competences")}
          style={{
            background: "linear-gradient(135deg, #5ee7df, #b490ca)",
          }}
        >
          <h2>Compétences</h2>
          <p>Design, développement, stratégie.</p>
        </div>
      </div>
    </div>
  );
}
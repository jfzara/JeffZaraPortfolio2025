import React from "react";
import * as S from "./ProjectsSection.styles";

export default function ProjectsSection() {
  // 🔹 Données de projets (placeholders)
  const majorProjects = [
    {
      id: 1,
      title: "Projet Majeur 1",
      description: "Une application web moderne avec React, Node et MongoDB.",
      color: "#00FFF0",
    },
    {
      id: 2,
      title: "Projet Majeur 2",
      description: "Un tableau de bord interactif avec animations fluides.",
      color: "#FF0077",
    },
  ];

  const minorProjects = [
    { id: 3, title: "Mini App JS", color: "#FFB700" },
    { id: 4, title: "Calculatrice React", color: "#00AEFF" },
    { id: 5, title: "API Fetch Demo", color: "#7B68EE" },
    { id: 6, title: "Projet SQL", color: "#00FF99" },
  ];

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>

      {/* === Grands projets === */}
      <S.MajorProjects>
        {majorProjects.map((p) => (
          <S.MajorCard key={p.id} color={p.color}>
            <div className="overlay" />
            <S.CardContent>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </S.CardContent>
          </S.MajorCard>
        ))}
      </S.MajorProjects>

      {/* === Petits projets === */}
      <S.MinorGrid>
        {minorProjects.map((p) => (
          <S.MinorCard key={p.id} color={p.color}>
            <span>{p.title}</span>
          </S.MinorCard>
        ))}
      </S.MinorGrid>
    </S.SectionContainer>
  );
}

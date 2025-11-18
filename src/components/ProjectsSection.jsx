import React, { useState } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChefPreview.mp4";

const tagPositions = {
  demo: { top: "-1rem", left: "50%", transform: "translateX(-50%)" },
  tech: { top: "50%", right: "-1rem", transform: "translateY(-50%)" },
  case: { bottom: "-1rem", left: "50%", transform: "translateX(-50%)" }
};

export default function ProjectsSection() {
  const majorProjects = [
    { id: 1, title: "Livano – Application immobilière", description: "Plateforme web complète ...", video: livanoPreview },
    { id: 2, title: "YouChef – Application de recettes", description: "Gestion de recettes CRUD ...", video: youChefPreview },
  ];

  const [tagsVisible, setTagsVisible] = useState({});

  const handleCardHover = (projectId) => {
    if (!tagsVisible[projectId]) {
      setTagsVisible(prev => ({ ...prev, [projectId]: true }));
    }
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>
      <S.MajorProjects>
        {majorProjects.map(p => (
          <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
            {["demo","tech","case"].map(type => (
              <div
                key={type}
                className={`tag ${tagsVisible[p.id] ? `pop-up-${type}` : ""}`}
                style={{
                  ...tagPositions[type],
                  background: tagsVisible[p.id] ? "#000" : "#00000000",
                  color: tagsVisible[p.id] ? "#fff" : "transparent"
                }}
              >
                {type === "demo" ? "DEMO" : type === "tech" ? "TECH STACK" : "CASE STUDY"}
              </div>
            ))}

            <video
              className="project-video"
              src={p.video}
              loop
              muted
              playsInline
            />

            <S.CardContent>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </S.CardContent>
          </S.MajorCard>
        ))}
      </S.MajorProjects>
    </S.SectionContainer>
  );
}

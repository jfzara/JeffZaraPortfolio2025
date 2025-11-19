import React, { useState } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChef_Preview.mp4";

const softBlobs = [
  "polygon(25% 0%, 75% 5%, 95% 45%, 70% 85%, 30% 95%, 5% 50%)",
  "polygon(20% 10%, 80% 0%, 95% 50%, 65% 85%, 25% 80%, 0% 45%)",
  "polygon(15% 5%, 85% 10%, 90% 55%, 70% 85%, 25% 80%, 5% 50%)",
  "polygon(10% 0%, 85% 15%, 90% 50%, 70% 85%, 20% 80%, 0% 40%)",
];

const tagPositionsFirstCard = {
  demo: { top: "-1rem", left: "50%", transform: "translateX(-50%)" },
  tech: { top: "40%", right: "-1rem", transform: "translateY(-50%)" },
  case: { bottom: "-1rem", left: "50%", transform: "translateX(-50%)" }
};

const tagPositionsSecondCard = {
  demo: { top: "0%", left: "-1rem", transform: "translateY(-50%)" },
  tech: { top: "-1rem", right: "20%", transform: "translateX(0)" },
  case: { bottom: "10%", right: "-1rem", transform: "translateY(0)" }
};

export default function ProjectsSection() {
  const majorProjects = [
    { id: 1, title: "Livano – Application immobilière", description: "Plateforme web complète ...", video: livanoPreview },
    { id: 2, title: "YouChef – Application de recettes", description: "Gestion de recettes CRUD ...", video: youChefPreview },
  ];

  const [tagShapes, setTagShapes] = useState({});
  const [tagsVisible, setTagsVisible] = useState({});

  const handleCardHover = (projectId) => {
    if (!tagsVisible[projectId]) {
      setTagsVisible(prev => ({ ...prev, [projectId]: true }));

      const newShapes = {};
      ["demo","tech","case"].forEach(type => {
        newShapes[type] = tagShapes[projectId]?.[type] || softBlobs[Math.floor(Math.random() * softBlobs.length)];
      });
      setTagShapes(prev => ({ ...prev, [projectId]: { ...prev[projectId], ...newShapes } }));
    }
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>
      <S.MajorProjects>
        {majorProjects.map((p, index) => {
          const tags = ["demo", "tech", "case"];
          const positions = index === 0 ? tagPositionsFirstCard : tagPositionsSecondCard;
          const bgColor = index === 0 ? "rgb(255 222 97)" : "rgba(0, 255, 240, 1)";
          return (
            <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
              {tags.map((type, i) => (
                <div
                  key={type}
                  className={`tag ${tagsVisible[p.id] ? `pop-up ${type}` : ""}`}
                  style={{
                    ...positions[type],
                    clipPath: tagShapes[p.id]?.[type] || softBlobs[0],
                    background: tagsVisible[p.id] ? bgColor : "#00000000",
                    color: tagsVisible[p.id] ? "#000" : "transparent",
                    animationDelay: tagsVisible[p.id] ? `${i * 0.3}s` : "0s"
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
          );
        })}
      </S.MajorProjects>
    </S.SectionContainer>
  );
}
